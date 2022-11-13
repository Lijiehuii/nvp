<template>
	<view>
		<view class="address-choose-btn" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" @click="chooseAdddress">请选择收货地址+</button>
		</view>

		<view class="address-info-box" v-else @click="chooseAdddress">
			<view class="user-msg">
				<view class="user-msg-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="user-msg-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="address-text">
				<view class="address-text-left">
					收货地址：
				</view>
				<view class="address-text-right">
					{{addStr}}
				</view>
			</view>
		</view>

		<image class="address-border" src="/static/cart-images/line.jpg" mode="widthFix"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
	} from "vuex"
	export default {
		data() {
			return {};
		},
		methods: {
			...mapMutations('m_user', ["updateAddress"]),
			async chooseAdddress() {
				console.log(12);
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					console.log(succ);
					this.updateAddress(succ)
				}
				if (err && err.errMsg === 'chooseAddress:fail auth deny') {
					this.reAuth()
				}
			},
			// 让用户重新授权
			async reAuth() {
				const [err2, confimResult] = await uni.showModel({
					content: '检测到您当前尚未打开地址授权,是否设置打开',
					confirmText: '确认',
					cancelText: '取消'
				})
				if (err2) return

				console.log(confimResult);

				if (confimResult.cancel) {
					return uni.$showMsg("您取消了地址授权!")
				} else if (confimResult.confirm) {
					return uni.openSetting({
						success: (settingResult) => {
							console.log(settingResult);
							if (!settingResult, authSeeting['scope.address']) {
								return uni.$showMsg('你取消了授权!')
							} else if (settingResult, authSeeting['scope.address']) {
								return uni.$showMsg('授权成功!请选择收货地址')
							}
						}
					})
				}

			}
		},
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addStr'])
		},
	}
</script>

<style lang="scss">
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.address-choose-btn {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		display: flex;
		height: 90px;
		font-size: 12px;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.user-msg {
			display: flex;
			justify-content: space-between;

			.user-msg-right {
				display: flex;
				justify-content: space-between;

			}
		}

		.address-text {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.address-text-left {
				white-space: nowrap;
			}
		}
	}
</style>
