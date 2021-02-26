/*
 * @Author: 酋小怪
 * @Date: 2020-12-22 14:33:00
 * @LastEditTime: 2021-02-24 16:50:49
 * @LastEditors: 酋小怪
 * @Description: In User Settings Edit
 * @FilePath: \src\main.ts
 */
import { Area, Button, Calendar, Cell, Checkbox, CheckboxGroup, DatetimePicker, Dialog, Empty, Field, Form, Icon, List, Loading, NoticeBar, Overlay, Picker, Popup, PullRefresh, Tabbar, TabbarItem, Toast, Uploader, Image as VanImage } from 'vant'
import { createApp } from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'

import router from './router'
// 在微信浏览器中可用
import VueWechatTitle from 'vue-wechat-title'

import getServerConfig from './utils/config'






const app = createApp(App) // 创建实例
app.use(Area).use(Button).use(Calendar).use(Cell).use(Checkbox).use(CheckboxGroup).use(DatetimePicker).use(Dialog).use(Empty).use(Field).use(Form).use(Icon).use(List).use(Loading).use(NoticeBar).use(Overlay).use(Picker).use(Popup).use(PullRefresh).use(Tabbar).use(TabbarItem).use(Toast).use(Uploader).use(VanImage)

Toast.setDefaultOptions({
    type: 'loading',
    message: '请稍等',
    duration: 1000 * 10,
    forbidClick: true
})

app.use(router)
app.use(VueWechatTitle)
getServerConfig().then(() => {
    app.mount('#app', true)
})

