/*
 *                                |~~~~~~~|
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *     |~.\\\_\~~~~~~~~~~~~~~xx~~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
 *     |  \  o \_         ,XXXXX),                         _..-~ o /  |
 *     |    ~~\  ~-.     XXXXX`)))),                 _.--~~   .-~~~   |
 *      ~~~~~~~`\   ~\~~~XXX' _/ ';))     |~~~~~~..-~     _.-~ ~~~~~~~
 *               `\   ~~--`_\~\, ;;;\)__.---.~~~      _.-~
 *                 ~-.       `:;;/;; \          _..-~~
 *                    ~-._      `''        /-~-~
 *                        `\              /  /
 *                          |         ,   | |
 *                           |  '        /  |
 *                            \/;          |
 *                             ;;          |
 *                             `;   .       |
 *                             |~~~-----.....|
 *                            | \             \
 *                           | /\~~--...__    |
 *                           (|  `\       __-\|
 *                           ||    \_   /~    |
 *                           |)     \~-'      |
 *                            |      | \      '
 *                            |      |  \    :
 *                             \     |  |    |
 *                              |    )  (    )
 *                               \  /;  /\  |
 *                               |    |/   |
 *                               |    |   |
 *                                \  .'  ||
 *                                |  |  | |
 *                                (  | |  |
 *                                |   \ \ |
 *                                || o `.)|
 *                                |`\\) |
 *                                |       |
 *                                |       |
 * 
 * @Author: 酋小怪
 * @Date: 2021-02-05 10:53:06
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-02-25 15:20:51
 * @Description: file content
 * @FilePath: \src\api\sys\wx.ts
 */
import { defHttp } from '@/utils/axios/index';
import { CommonResultModel } from '../resultModel'
import { GetUserWxOpenIdByCodeParams,GetwxJssdkParams } from './model'

enum Api {
    WX_OPEN_ID = '/application/getOpenId',
    WX_JS_SDK=''
}
/**
 * @description:Get WX  OpenId
 */

export function getOpenId(params: GetUserWxOpenIdByCodeParams) {
    return defHttp.request<CommonResultModel>({
        url: Api.WX_OPEN_ID,
        method: 'GET',
        params
    }, {
        isTransformRequestResult: false
    });
}

export function wxJssdk  (params: GetwxJssdkParams)  {
    return defHttp.request<CommonResultModel>({
      url: Api.WX_JS_SDK,
      method: 'GET',
      params,
    },{
        isTransformRequestResult: false
    })
}
