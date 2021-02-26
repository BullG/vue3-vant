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
 * @Date: 2021-01-18 09:35:27
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-01-18 11:02:20
 * @Description: file content
 * @FilePath: \src\utils\router.ts
 */

import router from '@/router'
import {setStorage} from './tools'

export function initReplaceRouterNames(): void {
    const RPNames= router.options.routes.filter(route => {
        route.meta && route.meta.jumpType && route.meta.jumpType === 'replace'
    }).map(route => route.name)
    setStorage('RPNames',JSON.stringify(RPNames))
}