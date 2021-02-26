<!--
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
 *        佛曰:  
 *                写字楼里写字间，写字间里程序员；  
 *                程序人员写程序，又拿程序换酒钱。  
 *                酒醒只在网上坐，酒醉还来网下眠；  
 *                酒醉酒醒日复日，网上网下年复年。  
 *                但愿老死电脑间，不愿鞠躬老板前；  
 *                奔驰宝马贵者趣，公交自行程序员。  
 *                别人笑我忒疯癫，我笑自己命太贱；  
 *                不见满街漂亮妹，哪个归得程序员？
 * 
 * @Author: 酋小怪
 * @Date: 2021-02-24 16:42:53
 * @LastEditors: 酋小怪
 * @LastEditTime: 2021-02-24 16:59:59
 * @Description: file content
 * @FilePath: \src\components\MobileConsole.vue
 -->

<!-- MobileConsole -->
<template>
  <teleport to="#vconsole">
    <div v-if="state.show" class="vc-tigger" @click="toggleVc" >调试</div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, reactive } from 'vue'
import VConsole from 'vconsole'
import { useDOMCreate } from '@/hooks/useDOMCreate'
interface IState {
  lastClickTime: number
  count: number
  limit: number
  vConsole: any,
  show:boolean
}
export default defineComponent({
  name: 'MobileConsole',
  props: {},
  setup() {
    useDOMCreate('vconsole')
    const state = reactive<IState>({
      lastClickTime: 0,
      count: 0,
      limit: ['production', 'prod'].includes(process.env.NODE_ENV || '') ? 5 : 0,
      vConsole: null,
      show:!['production', 'prod'].includes( window['__SHOW_CONSOLE__'])
    })
    const hasClass = (obj: HTMLElement | null, cls: string) => {
      return obj?.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    }
    const addClass = (obj: HTMLElement | null, cls: string) => {
      if (!hasClass(obj, cls)) obj?.classList.add(cls)
    }
    const removeClass = (obj: HTMLElement | null, cls: string) => {
      if (hasClass(obj, cls)) {
        obj?.classList.remove(cls)
      }
    }
    const toggleClass = (obj: HTMLElement | null, cls: string) => {
      if (hasClass(obj, cls)) {
        removeClass(obj, cls)
      } else {
        addClass(obj, cls)
      }
    }
    const toggleVc = () => {
      const nowTime = new Date().getTime()
      if (nowTime - state.lastClickTime < 3000) {
        state.count++
      } else {
        state.count = 0
      }
      state.lastClickTime = nowTime
      if (state.count >= state.limit) {
        if (!state.vConsole) {
          state.vConsole = new VConsole()
        }
        const vconDom = document.getElementById('__vconsole')
        toggleClass(vconDom, 'vconsole_show')
        state.count = 0
      }
    }
    
    onUnmounted(() => {
      state.vConsole = null
    })
    return {
      toggleVc,
      state,
    }
  }
})
</script>
<style lang="less">
.vc-tigger {
  position: fixed;
  top: 0;
  right: 0;
  padding:10px 20px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background: rgb(122, 241, 196);
  opacity: 0.5;
}
#__vconsole{
  display: none;
}
.vconsole_show {
  display: block !important;
}
</style>
