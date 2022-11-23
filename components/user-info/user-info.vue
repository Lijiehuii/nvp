<template>
	<view class="user-info">
		<view class="top">
			<view class="img" v-if="userInfoData.avatar">
				<van-image width="100%" height="100%" round use-loading-slot show-loading show-error lazy-load
					:src="'https://images.weserv.nl/?url='+userInfoData.avatar">
					<van-loading slot="loading" type="spinner" size="20" vertical />
				</van-image>
			</view>
			<view class="user-msg">
				<view class="username">
					{{userInfoData.username}}
				</view>
				<view class="city">
					{{userInfoData.ip_location}}
				</view>
			</view>
		</view>
		<view class="sign">
			{{userInfoData.verify_description ? userInfoData.verify_description :"暂无简介" }}
		</view>
		<view class="user-bottom">
			<view class="left">
				<view class="data">
					<view class="count">
						{{popularity}}
					</view>
					人气
				</view>
				<view class="data">
					<view class="count">
						{{follower}}
					</view>
					粉丝
				</view>
				<view class="data">
					<view class="count">
						{{followee}}
					</view>
					关注
				</view>
			</view>
			<view class="right" :class="{followed:userInfoData.follow}" @click="followUser(userInfoData)">
				{{userInfoData.follow ? "已关注" : "关注"}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		props: {
			userInfoData: {
				type: Object,
				default: {}
			}
		},
		name: "user-info",
		data() {
			return {

			};
		},
		computed: {
			popularity() {
				return this.$dataSet(this.userInfoData?.count?.count_popularity)
			},
			follower() {
				return this.$dataSet(this.userInfoData?.count?.count_follower)
			},
			followee() {
				return this.$dataSet(this.userInfoData?.count?.count_followee)
			}
		},
		methods: {
			...mapMutations("m_user", ["updateFollowUser", "filterFollowUser"]),
			Loading() {
				uni.showLoading({
					title: "数据加载中..."
				})
				let timer = setTimeout(() => {
					uni.hideLoading()
					clearTimeout(timer)
				}, 1000)
			},
			followUser(user) {
				console.log(user);
				if (this.userInfoData.follow) {
					this.filterFollowUser(user.id)
				} else if (!this.userInfoData.follow) {
					let user = {
						follow: true,
						userinfo: this.userInfoData
					}
					this.updateFollowUser(user)
				}
				this.Loading()
				this.$emit("set-follow-status", user.id)
			}
		}
	}
</script>

<style lang="scss">
	.user-info {
		width: 100%;
		position: relative;
		padding: 40rpx 20rpx 30rpx 20rpx;
		box-sizing: border-box;
		width: 100%;
		height: 50vmin;

		.top {
			display: flex;
			align-items: center;

			.img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 999px;
				border: 2px solid #000;
				margin-right: 30rpx;

				image {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 999px;
				}
			}

			.user-msg {
				font-size: 40rpx;
				color: #000;

				.username {
					margin-bottom: 10rpx;
				}

				.city {
					font-size: 26rpx;
					color: #999;
				}
			}
		}

		.sign {
			color: #999;
			margin: 40rpx 0;
		}

		.user-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;

				.data {
					width: 90rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					font-size: 26rpx;
					color: #999;

					.count {
						font-size: 30rpx;
						font-weight: bold;
						color: #000;
					}
				}
			}

			.right {
				width: 60px;
				height: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
				// padding: 3rpx 15rpx;
				border-radius: 999px;
				background-color: rgb(229, 76, 58);
				color: #fff;
				font-size: 24rpx;

				&.followed {
					color: #999;
					background-color: rgba(0, 0, 0, .2);
				}
			}
		}
	}
</style>
