
/*
 * 
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃ 　
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃　　　　　　　　　　　
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug　　
 * 　　　┃　　　┃　　+　　　　　　　　　
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 * 
 * 
 * @Author: 酋小怪
 * @Date: 2021-01-05 14:17:11
 * @LastEditTime: 2021-01-05 14:17:12
 * @LastEditors: 酋小怪
 * @Description: In User Settings Edit
 * @FilePath: \loan-apply-cli-ts\src\api\sys\upload
 */


import { defHttp } from '@/utils/axios/index';
import { CommonResultModel } from '../resultModel'
import {UploadFileParams} from '@/utils/axios/types'

enum Api {
    
    UPLOAD_IMG = '/app-qing/application/uploadImage'
}
/**
 * @description:Upload Image
 */
export function upLoadImage(params: UploadFileParams) {
    return defHttp.uploadFile<CommonResultModel>({
        url: Api.UPLOAD_IMG,
    }, params);
}