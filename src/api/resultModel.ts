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
 * @Author:酋小怪
 * @Date: 2020-12-30 14:25:18
 * @LastEditTime: 2020-12-30 14:25:18
 * @LastEditors:酋小怪
 * @Description: In User Settings Edit
 * @FilePath: \loan-apply-cli-ts\src\api\resultModel.ts
 */

/**
 * @description: all interface return value
 */
export interface CommonResultModel {
    code: string | number;
    msg: string;
    data: any;
}