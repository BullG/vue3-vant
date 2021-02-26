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
 * @Author: your name
 * @Date: 2020-12-25 11:24:34
 * @LastEditTime: 2021-02-25 10:53:34
 * @LastEditors: 酋小怪
 * @Description: In User Settings Edit
 * @FilePath: \loan-apply-cli-ts\declaration.d.ts
 */

declare module 'vue-wechat-title'
declare module 'lodash-es'
declare module 'nprogress'
declare type TargetContext = '_self' | '_blank';

declare global {
    interface Document {
      title:string
    }
  }

