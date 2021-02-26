/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 * 
 * @Author: 酋小怪
 * @Date: 2021-01-11 14:14:35
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-01-12 16:37:44
 * @Description: file content
 * @FilePath: \src\utils\fileUtils.js
 */

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
 * @Date: 2021-01-11 14:14:35
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-01-11 14:14:37
 * @Description: file content
 * @FilePath: \src\utils\fileUtils.js
 */
import EXIF from 'exif-js'

export default {
    getOrientation: (file) => {
        return new Promise((resolve) => {
            EXIF.getData(file, function() {
                const orient = EXIF.getTag(this, 'Orientation')
                resolve(orient)
            })
        })
    },

    dataURLtoFile: (dataurl, filename, fileType) => {

        const arr = dataurl.split(',')
            // const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: fileType });
    },

    rotateImage: (image, width, height, orientation, fileType) => {

        const orientations = {
            3: [-1, -1, Math.PI],
            6: [1, -1, Math.PI / 2],
            8: [-1, 1, Math.PI * 3 / 2]
        }
        const change = orientations[orientation]
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        ctx.save()
        if (orientation == 3) {
            canvas.width = width
            canvas.height = height
        } else {
            canvas.width = height
            canvas.height = width
        }
        ctx.rotate(change[2])
        ctx.drawImage(image, 0, 0, width * change[0], height * change[1])


        ctx.restore()
        return canvas.toDataURL(fileType)
    },
}