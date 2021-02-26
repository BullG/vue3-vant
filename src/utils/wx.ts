/*
 * ......................................&&.........................
 * ....................................&&&..........................
 * .................................&&&&............................
 * ...............................&&&&..............................
 * .............................&&&&&&..............................
 * ...........................&&&&&&....&&&..&&&&&&&&&&&&&&&........
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............
 * ................&...&&&&&&&&&&&&&&&&&&&&&&&&&&&&.................
 * .......................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ...................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...............
 * ..................&&&   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ...............&&&&&@  &&&&&&&&&&..&&&&&&&&&&&&&&&&&&&...........
 * ..............&&&&&&&&&&&&&&&.&&....&&&&&&&&&&&&&..&&&&&.........
 * ..........&&&&&&&&&&&&&&&&&&...&.....&&&&&&&&&&&&&...&&&&........
 * ........&&&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&....&&&.......
 * .......&&&&&&&&.....................&&&&&&&&&&&&&&&&.....&&......
 * ........&&&&&.....................&&&&&&&&&&&&&&&&&&.............
 * ..........&...................&&&&&&&&&&&&&&&&&&&&&&&............
 * ................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&..&&&&&............
 * ..............&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&....&&&&&............
 * ...........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&......&&&&............
 * .........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........&&&&............
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&............
 * ......&&&&&&&&&&&&&&&&&&&...&&&&&&...............&&&.............
 * .....&&&&&&&&&&&&&&&&............................&&..............
 * ....&&&&&&&&&&&&&&&.................&&...........................
 * ...&&&&&&&&&&&&&&&.....................&&&&......................
 * ...&&&&&&&&&&.&&&........................&&&&&...................
 * ..&&&&&&&&&&&..&&..........................&&&&&&&...............
 * ..&&&&&&&&&&&&...&............&&&.....&&&&...&&&&&&&.............
 * ..&&&&&&&&&&&&&.................&&&.....&&&&&&&&&&&&&&...........
 * ..&&&&&&&&&&&&&&&&..............&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ..&&.&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&&&&&&&&&&&&.......
 * ...&&..&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&...&&&&&&&&&&&&......
 * ....&..&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&&&&&.....
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............&&&&&&&....
 * .......&&&&&.&&&&&&&&&&&&&&&&&&..&&&&&&&&...&..........&&&&&&....
 * ........&&&.....&&&&&&&&&&&&&.....&&&&&&&&&&...........&..&&&&...
 * .......&&&........&&&.&&&&&&&&&.....&&&&&.................&&&&...
 * .......&&&...............&&&&&&&.......&&&&&&&&............&&&...
 * ........&&...................&&&&&&.........................&&&..
 * .........&.....................&&&&........................&&....
 * ...............................&&&.......................&&......
 * ................................&&......................&&.......
 * .................................&&..............................
 * ..................................&..............................
 * 
 * @Author: 酋小怪
 * @Date: 2020-12-31 15:37:46
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-01-18 14:08:53
 * @Description: 微信网页授权处理
 * @FilePath: \src\utils\wx.ts
 */
import { getLocalStorage, getQuery, setLocalStorage, removeLocalStorage } from './tools'
import { Dialog } from 'vant'
import { getOpenId } from '@/api/sys/wx'
export function beforeGetOpenId(): void {
    if (getLocalStorage('nb_wx_openId')) { }
    else if (getQuery('code')) {
        const code: any = getQuery('code')
        const changeUrl = `${window.location.protocol}`;
        // const changeUrl = `${window.location.host}${window.location.pathname}${window.location.hash}${window.location.search}`;
        window.history.pushState({}, '0', changeUrl);
        setLocalStorage('code', code)
    } else {
        const url = encodeURIComponent(window.location.href);
        const getCodeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window['__APPID__']}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
        window.location.href = getCodeUrl;
    }
}
export async function confirmOpenId(): Promise<any> {
    beforeGetOpenId()
    const codes = getLocalStorage('code')
    if (!!codes) {
        removeLocalStorage('code')
        const { data, code, msg } = await getOpenId({ code: codes })
        if (code == 200) {
            setLocalStorage('nb_wx_openId', data)
        } else {
            Dialog.alert({
                message: msg,
            })
        }
    }
}

export function isInWeiXin(): boolean {
    const ua = window.navigator.userAgent.toLowerCase();
    const match = ua.match(/MicroMessenger/i);
    if (match === null) {
      return false;
    }
    if (match.includes('micromessenger')) {
      return true;
    }
    return false
  
  }
