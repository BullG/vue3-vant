/*
 *           佛曰:  
 *                   写字楼里写字间，写字间里程序员；  
 *                   程序人员写程序，又拿程序换酒钱。  
 *                   酒醒只在网上坐，酒醉还来网下眠；  
 *                   酒醉酒醒日复日，网上网下年复年。  
 *                   但愿老死电脑间，不愿鞠躬老板前；  
 *                   奔驰宝马贵者趣，公交自行程序员。  
 *                   别人笑我忒疯癫，我笑自己命太贱；  
 *                   不见满街漂亮妹，哪个归得程序员？
 * 
 * @Author: 酋小怪
 * @Date: 2020-12-30 14:31:56
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-02-05 11:05:10
 * @Description: file content
 * @FilePath: \src\api\sys\common.ts
 */

import { defHttp } from '@/utils/axios/index';
import { CommonResultModel } from '../resultModel'


enum Api {
    HOME_LIST = '/product/list',
    BANK_LIST = '/application/getOrgInfo',
}
/**
 * @description:Get Index Pages Products
 */
export function getProductList() {
    return defHttp.request<CommonResultModel>({
        url: Api.HOME_LIST,
        method: 'GET',
    });
}


export function getOrgList() {
    return defHttp.request<CommonResultModel>({
        url: Api.BANK_LIST,
        method: 'GET'
    });
}





