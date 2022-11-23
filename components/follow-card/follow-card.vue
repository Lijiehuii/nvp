<template>
	<view class="follow" @click="goToUserdetail(userData.id)">
		<view class="follow-user">
			<view class="left">
				<view class="img">
					<van-image width="100%" height="100%" round use-loading-slot show-loading show-error lazy-load
						:src="'https://images.weserv.nl/?url='+userData.avatar">
						<van-loading slot="loading" type="spinner" size="20" vertical />
					</van-image>
				</view>
				<view class="user-info">
					<view class="username">
						{{userData.username}}
					</view>
					<view class="user-follower">
						{{"粉丝 " + follower}}
					</view>
				</view>
			</view>
			<view class="right" @click.stop="unfollow(userData)">
				已关注
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			userData: {
				type: Object,
				default: {}
			}
		},
		name: "follow-card",
		data() {
			return {};
		},
		computed: {
			follower() {
				return this.$dataSet(this.userData?.follower + 1)
			}
		},
		methods: {
			unfollow(user) {
				this.$emit("unfollow", user)
			},
			goToUserdetail(id) {
				console.log(id);
				uni.navigateTo({
					url: "/subpkg/userinfo_detail/userinfo_detail?user_id=" + id
				})
			},
		}
	}
</script>

<style lang="scss">
	.follow-user {
		display: flex;
		padding: 20rpx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;

		.left {
			display: flex;
			align-items: center;

			.img {
				width: 50px;
				height: 50px;
				margin-right: 10px;

				image {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 999px;
				}
			}

			.user-info {
				display: flex;
				flex-direction: column;

				.user-follower {
					color: #999;
				}
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
		font-size: 24rpx;
		color: #999;
		background-color: rgb(240, 240, 240);
	}
</style>
