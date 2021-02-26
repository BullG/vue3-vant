/*
 *                                |~~~~~~~|
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *     |~.\\\_\~~~~~~~~~~~~~~xx~~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
 *     |  \  o \_         ,XXXXX),                         _..-~ o /  |
 *     |    ~~\  ~-.     XXXXX`)))),                 _.--~~   .-~~~   |
 *      ~~~~~~~`\   ~\~~~XXX' _/ ';))     |~~~~~~..-~     _.-~ ~~~~~~~
 *               `\   ~~--`_\~\, ;;;\)__.---.~~~      _.-~
 *                 ~-.       `:;;/;; \          _..-~~
 *                    ~-._      `''        /-~-~
 *                        `\              /  /
 *                          |         ,   | |
 *                           |  '        /  |
 *                            \/;          |
 *                             ;;          |
 *                             `;   .       |
 *                             |~~~-----.....|
 *                            | \             \
 *                           | /\~~--...__    |
 *                           (|  `\       __-\|
 *                           ||    \_   /~    |
 *                           |)     \~-'      |
 *                            |      | \      '
 *                            |      |  \    :
 *                             \     |  |    |
 *                              |    )  (    )
 *                               \  /;  /\  |
 *                               |    |/   |
 *                               |    |   |
 *                                \  .'  ||
 *                                |  |  | |
 *                                (  | |  |
 *                                |   \ \ |
 *                                || o `.)|
 *                                |`\\) |
 *                                |       |
 *                                |       |
 * 
 * @Author: your name
 * @Date: 2020-12-25 11:19:39
 * @LastEditTime: 2021-01-04 09:17:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \loan-apply-cli-ts\src\utils\axios\checkStatus.ts
 */

import { Toast } from 'vant'
export function checkStatus(status: number, msg: string): void {
  try {
    Toast.clear(true)
  } catch (err) {
    console.log(err)
  }
 
  
  switch (status) {
    case 400:
      console.log(`${msg}`);
      break;
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      console.log('sys.api.errMsg401');

      break;
    case 403:
      console.log('sys.api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      console.log('sys.api.errMsg404');
      break;
    case 405:
      console.log('sys.api.errMsg405');
      break;
    case 408:
      console.log('sys.api.errMsg408');
      break;
    case 500:
      console.log('sys.api.errMsg500');
      break;
    case 501:
      console.log('sys.api.errMsg501');
      break;
    case 502:
      console.log('sys.api.errMsg502');
      break;
    case 503:
      console.log('sys.api.errMsg503');
      break;
    case 504:
      console.log('sys.api.errMsg504');
      break;
    case 505:
      console.log('sys.api.errMsg505');
      break;
    default:
  }
}
