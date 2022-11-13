<template>
	<view class="login-view">
		<uni-icons type="contact-filled" size="100" color="#aaa"></uni-icons>
		<!-- <button type="primary" class="login-btn" @click="getUserInfo">一键登录</button> -->
		<button type="primary" class="login-btn" @click="getUserProfile">一键登录</button>
		<text class="tips-text">登录后解锁更多权益</text>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from "vuex"
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		},
		methods: {
			...mapMutations("m_user", ["updateUserInfo", "updateToken", "updateRedirectInfo"]),
			getUserProfile(e) {
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '用来授权登录该小程序!',
					success: (userInfo) => {
						uni.$showMsg('登录成功!')
						console.log("用户信息", userInfo);
						this.updateUserInfo(userInfo.userInfo)
						this.getToken(userInfo)
					},
					fail: (err) => {
						console.log(err);
						uni.$showMsg('登录失败!')
					},
					complete: () => {},
				})
			},
			async getToken(userInfo) {
				// 获取code的值
				const [err, res] = await uni.login().catch(err => err);
				if (err || res.errMsg !== "login:ok") {
					return uni.$showMsg("登录失败!")
				}
				console.log("code=>", res.code);
				const query = {
					code: res.code,
					encryptedData: userInfo.encryptedData,
					iv: userInfo.iv,
					signature: userInfo.signature
				}

				console.log(query);
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				console.log(loginResult);
				console.log(res.code);
				console.log("2323=>", this.redirectInfo);
				// this.updateToken(res.code)
				this.updateToken(
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
				)
				this.navigeteBack()
				if (loginResult.meta.status !== 400) {
					return uni.$showMsg("登录失败!")
				}

			},
			navigeteBack() {
				console.log(456);
				console.log("this.redirectInfo=>", this.redirectInfo);
				if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
					console.log(123);
					uni.switchTab({
						url: this.redirectInfo.from,
						compute: () => {
							this.updateRedirectInfo("")
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-view {
		position: relative;
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		&::after {
			position: absolute;
			bottom: 0;
			left: 0;
			content: "";
			display: block;
			height: 40px;
			border-radius: 100%;
			width: 100%;
			background-color: #fff;
			transform: translateY(50%);
		}

		.login-btn {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #C00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
