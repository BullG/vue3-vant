/*
 * @Author:酋小怪
 * @Date: 2020-12-22 15:32:15
 * @LastEditTime: 2021-01-06 15:18:48
 * @LastEditors: Please set LastEditors
 * @Description: postcss配置
 * @FilePath: \loan-apply\postcss.config.js
 */

const pxtorem = require('postcss-pxtorem')
module.exports = ({ file }) => {

    let remUnit
    if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
        remUnit = 37.5
    } else {
        remUnit = 75
    }
    return {
        plugins: [
            pxtorem({
                rootValue: remUnit,
                propList: ['*'],
                selectorBlackList: ['.norem']
            })
        ]
    }
}