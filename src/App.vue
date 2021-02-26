<!--
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
 * @Date: 2020-12-22 14:33:00
 * @LastEditTime: 2020-12-23 11:30:33
 * @LastEditors: 酋小怪
 * @Description: In User Settings Edit
 * @FilePath: \loan-apply\src\App.vue
 -->

<template>
	<router-view
		class="router-view"
		v-slot="{ Component,route }"
		v-wechat-title="$route.meta.title"
	>
		<transition :name="transitionName">
			<keep-alive v-if="route.meta.keepAlive">
				<component :is="Component" />
			</keep-alive>
			<component
				:is="Component"
				v-else
			/>
		</transition>

	</router-view>
	<MobileConsole />
</template>

<script>
	import { initReplaceRouterNames } from '@/utils/router'
	import MobileConsole from '@/components/MobileConsole.vue'
	export default {
		name: 'App',
		components: { MobileConsole },
		data() {
			return {
				// transitionName: 'slide-left',
				transitionName: 'van-fade',
			}
		},

		setup() {
			initReplaceRouterNames()
		},
		watch: {
			$route(to, from) {
				// 有主级到次级
				if (to.meta.index != from.meta.index) {
					// this.transitionName = 'slide-left' // 向左滑动
					this.transitionName = 'van-slide-right' // 向左滑动
				} 
				// else if (to.meta.index < from.meta.index) {
				// 	// 由次级到主级
				// 	// this.transitionName = 'slide-right'
				// 	this.transitionName = 'van-slide-left'

				// } 
				else {
					this.transitionName = 'van-fade' //同级无过渡效果
				}
				// try {
				// 	document.body.scrollTop = 0
				// 	document.documentElement.scrollTop = 0
				// } catch (err) {
				// 	console.log(err)
				// }
			},
		},
	}
</script>
<style lang="less">
	html,
	body {
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	#app {
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}

	.router-view {
		width: 100%;
		height: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: 0 auto;
		-webkit-overflow-scrolling: touch;
	}

	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
		height: 100%;
		will-change: transform;
		transition: all 500ms;
		position: absolute;
		backface-visibility: hidden;
	}
	.slide-right-enter {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}
	.slide-right-leave-active {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	.slide-left-enter {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	.slide-left-leave-active {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}

	.apply-page {
		background: #eee;
		min-height: 100%;
		box-sizing: border-box;
	}
	.btn-group {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 30px;
		background-color: #fff;
		.btn {
			width: 312px;
			padding: 18px 0;
			font-size: 26px;
			color: #fff;
			line-height: 1em;
			text-align: center;
			cursor: pointer;
			border-radius: 50px;
			touch-action: none;
			&.gray {
				background: linear-gradient(to right, #ada09c, #98817f);
			}
			&.color {
				background: linear-gradient(to right, #ff7144, #fc4434);
			}
		}
	}
	// .van-picker-column {
	// 	position: relative;
	// 	z-index: 1;
	// 	&::before {
	// 		width: 100%;
	// 		height: 100%;
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		content: '';
	// 	}
	// 	& > ul {
	// 		z-index: -1;
	// 		position: relative;
	// 	}
	// }
</style>
