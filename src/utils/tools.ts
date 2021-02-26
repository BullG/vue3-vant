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
 * @Date: 2020-12-30 09:58:57
 * @LastEditTime: 2021-01-18 10:51:29
 * @LastEditors: 酋小怪
 * @Description: 工具函数主要用于项目业务需要
 * @FilePath: \loan-apply-cli-ts\src\utils\tools.ts
 */
import { isObject } from './is'
import { pickBy, identity } from 'lodash-es'
import { SelectColumns } from '@/types/columns'

/**
 * @description: 从身份证号码中获取出生日期
 * @param {string} idCard
 * @return {string} birthday
 */
export function getBirth(idCard: string): string {
    let birthday = "";
    if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
            birthday = "19" + idCard.slice(6, 12);
        } else if (idCard.length == 18) {
            birthday = idCard.slice(6, 14);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        //通过正则表达式来指定输出格式为:1990-01-01
    }
    if (idCard.length !== 15 && idCard.length !== 18) {
        birthday = ""
    }
    return birthday;
}

/**
 * @description: 判断链接是否是程序内部链接
 * @param {string} url
 * @return {boolean}
 */
export function isInsidePage(url: string): boolean {
    return /^nb_zh_pages\//.test(url)
}

/**
 * @description: 获取程序内部跳转路由name
 * @param {string} url
 * @return {string} 路由name,用于程序内部跳转
 */
export function getInsidePageName(url: string): string {
    const s = url.replace(/^nb_zh_pages\//, '')
    return s.split('?')[0]
}



/**
 * @description: 判断一个对象是否有某个属性
 * @param {object} obj
 * @param {string} key
 * @return {*} boolean
 */
export function hasOwnProperty(obj: object, key: string): boolean {
    return obj.hasOwnProperty(key)
}
/**
 * @description: 根据指定的key来给指定的对象数组排序
 * @param {Array} array
 * @param {string} key
 * @return {*} array
 */
export function sortObjArrByOneAttr(array: Array<any>, key: string): unknown {
    if (!array.every(isObject)) return new Error('不是要求的数组：非对象数组')
    if (!array.every(item => hasOwnProperty(item, key))) return new Error('指定的Key不存在')
    return array.sort(function (a: any, b: any): any {
        return a[key] - b[key]
    })

}

/**
 * @description: 对象数组根据指定属性去重
 * @param {Array} arr
 * @param {string} name
 * @return {*}
 */
export function removeDuplication(arr: Array<any>, name: string): unknown {
    if (!Array.isArray(arr)) return new Error('请传入数组')
    let hash = {}
    return arr.reduce((acc, cur) => {
        hash[cur[name]] ? '' : (hash[cur[name]] = true && acc.push(cur))
        return acc
    }, [])
}

/**
 * @description: 从当前页面的链接中获取指定的值
 * @param {string} name
 * @return {*}
 */
export function getQuery(name: string): unknown {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * @description: 从类似  a=1&b=2&c=3的字符窜中获取某个可以对应的值
 * @param {string} str
 * @param {string} name
 * @return {*}
 */
export function getValueByNameFromStr(str: string, name: string): unknown {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = str.match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * @description: 获取hash模式地址url参数
 * 例如：http://localhost:8080/#/?token=rTyJ7bcRb7KU4DMcWo4216&roleId=512213631174180864
 * 
 * @param {String} name 
 * @return {Boolean | String} 返回获取值 
 * 
 */
export function getUrlHashParam(name: string): Boolean | String {
    const w = window.location.hash.indexOf("?");
    const query = window.location.hash.substring(w + 1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] == name) {
            return pair[1];
        }
    }
    return false;
}


export function setStorage(key: string, value: string): void {
    sessionStorage.setItem(key, value);
}

export function getStorage(key: string): string {
    const value = sessionStorage.getItem(key)
    if (value === null || value === 'undefined') return ''
    return value
}

export function setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): string {
    const value = localStorage.getItem(key)
    if (value === null || value === 'undefined') return ''
    return value
}
export function removeLocalStorage(key: string): void {
    try {
        localStorage.removeItem(key)
    } catch (err) {
        console.log(err)
    }
}

/**
 * @description: 删掉对象中属性值为（false）的属性
 * @param {object} obj
 * @return {object}
 */
export function getFullValue(obj: object): object {
    return pickBy(obj, identity)
}

/**
 * @description: 删掉对象中属性值为（null或undefined）的属性,保留为0或者空字符窜的属性
 * @param {object} obj
 * @return {object}
 */
export function cleanObj(obj: object): object {
    let new_obj = Object.assign({}, obj)
    for (let propName in new_obj) {
        if (new_obj[propName] === null || new_obj[propName] === undefined) {
            delete new_obj[propName];
        }
    }
    return new_obj
}

/**
 * @description: 从给定的对象数组中根据（value）来获取（text）
 * @param {Array} array
 * @param {string} value
 * @return {string}
 */
export function getTextByValue(array: Array<SelectColumns>, value: string | number): string | number {
    for (let index in array) {
        if (array[index].value == value) {
            return array[index].text
        }
    }
    return ''
}

/**
 * @description: 从给定的对象数组中根据（value）来获取索引
 * @param {Array} array
 * @param {string} value
 * @return {number}
 */
export function getIndexByValue(array: Array<SelectColumns>, value: string | number): string | number {
    for (let index in array) {
        if (array[index].value == value) {
            return index
        }
    }
    return 0
}


