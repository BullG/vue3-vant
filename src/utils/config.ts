/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 * 
 * @Author: 酋小怪
 * @Date: 2021-02-24 16:50:07
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-02-25 14:33:01
 * @Description: file content
 * @FilePath: \src\utils\config.ts
 */


import axios from 'axios';
function getServerConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get('./config.json')
            .then(result => {
                if (process.env.NODE_ENV === 'production') {
                    window['__APPID__'] = result.data['VUE_APP_APP_ID']
                    window['__API_DOMAIN__'] = result.data['VUE_APP_API_DOMAIN']
                    window['__IMG_DOMAIN__'] = result.data['VUE_APP_IMG_DOMAIN']
                    window['__SHOW_CONSOLE__']=result.data['VUE_APP_SHOW_CONSOLE']
                } else {
                    window['__APPID__'] = process.env.VUE_APP_APP_ID
                    window['__API_DOMAIN__'] = process.env.VUE_APP_API_DOMAIN
                    window['__IMG_DOMAIN__'] = process.env.VUE_APP_IMG_DOMAIN
                    window['__SHOW_CONSOLE__']=process.env.VUE_APP_SHOW_CONSOLE
                }

                resolve(true)
            })
            .catch(error => {
                console.log(error)
                window['__APPID__'] = process.env.VUE_APP_APP_ID
                window['__API_DOMAIN__'] = process.env.VUE_APP_API_DOMAIN
                window['__IMG_DOMAIN__'] = process.env.VUE_APP_IMG_DOMAIN
                window['__SHOW_CONSOLE__']=process.env.VUE_APP_SHOW_CONSOLE
                reject()
            })
    })
}

export default getServerConfig
