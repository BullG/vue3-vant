// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import { Dialog, Toast } from 'vant'
import type { AxiosResponse } from 'axios';
import type { CreateAxiosOptions, RequestOptions, Result } from './types';

import { VAxios } from './Axios';
// import { getToken } from '@/utils/auth';
import { AxiosTransform } from './axiosTransform';

import { checkStatus } from './checkStatus';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';

import { isString } from '@/utils/is';
import { formatRequestDate } from '@/utils/dateUtil';
import { setObjToUrlParams, deepMerge } from '@/utils';
import { errorResult } from './const';


/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options;

    try { Toast.clear(true) } catch (err) {
      console.log(err)
    }

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，msg这些信息时开启
    if (!isTransformRequestResult) {
      return res.data;
    }
    // 错误的时候返回
    const res_data = res.data;
    if (!res_data) {
      return errorResult;
    }
    //  这里 code，data，msg为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, msg } = res_data;
    //  接口请求成功
    if (code === ResultEnum.SUCCESS) {
      return res_data.data;
    }
    // 接口请求错误，统一提示错误信息
    if (code === ResultEnum.ERROR) {
      if (msg) {
        if (options.errorMessageMode === 'dialog') {
          Dialog.alert({
            message: msg,
          })
        } else {
          Toast.fail(msg);
        }
        Promise.reject(new Error(msg));
      } else {
        Toast.fail('未知错误');
        Promise.reject(new Error('sys.api.errorMessage'));
      }
      return errorResult;
    }

    return errorResult;
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, useToast } = options;
    if (useToast) {
      Toast.loading({
        duration: 0
      })
    }
    if (joinPrefix) {
      config.url = `${process.env.VUE_APP_API_URL_PREFIX}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    if (config.method === RequestEnum.GET) {
      const now = new Date().getTime();
      if (!isString(config.params)) {
        config.data = {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          params: Object.assign(config.params || {}, {
            _t: now,
          }),
        };
      } else {
        // 兼容restful风格
        config.url = config.url + config.params + `?_t=${now}`;
        config.params = undefined;
      }
    } else {
      if (!isString(config.params)) {
        formatDate && formatRequestDate(config.params);
        config.data = config.params;
        config.params = undefined;
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data);
        }
      } else {
        // 兼容restful风格
        config.url = config.url + config.params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    // const token = getToken();
    // if (token) {
    //   // jwt token
    //   config.headers.Authorization = token;
    // }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {};
    const msg: string =
      response && response.data && response.data.error ? response.data.error.message : '';
    const err: string = error.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        Dialog.alert({
          // message: 'Network Error'
          message: '网络连接超时'
        })
      }
      if (err && err.includes('Network Error')) {
        Dialog.alert({
          // message: 'Network Error'
          message: '网络错误'
        })
      }
    } catch (newErr) {
      throw new Error(newErr);
    }
    checkStatus(error.response && error.response.status, msg);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 30 * 1000,
        // 基础接口地址
        baseURL: window['__API_DOMAIN__'],
        // 接口可能会有通用的地址部分，可以统一抽取出来
        prefixUrl: process.env.VUE_APP_API_URL_PREFIX,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: true,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'toast',
          // 接口地址
          apiUrl: window['__API_DOMAIN__'],
          useToast: false
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();
// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
