/*
 *                   江城子 . 程序员之歌
 * 
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 * 
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 * 
 * 
 * @Author: 酋小怪
 * @Date: 2021-01-26 10:04:42
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-02-03 15:14:59
 * @Description: file content
 * @FilePath: \src\utils\booking.ts
 */


import { useRoute } from 'vue-router'
import {
    getQuery
} from '@/utils/tools'
export default function() {

    const route = useRoute()
    const activityId = route.query.activityId ?? getQuery('activityId') ?? ''
    const userId = route.query.userId ?? getQuery('userId') ?? ''
    const productId = route.query.productId ?? getQuery('productId') ?? ''
    return {
        route,
        activityId,
        userId,
        productId
    }

}