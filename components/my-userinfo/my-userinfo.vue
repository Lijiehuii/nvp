<template>
	<view class="my-userinfo-view">
		<!-- 用户信息 -->
		<view class="user-msg">
			<view class="img">
				<image :src="userinfo.avatarUrl" class="avatar"></image>
			</view>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>

		<view class="panel">
			<view class="pannel-body">
				<view class="panel-item" @click="goToCreation">
					<text class="count">{{creationCount}}</text>
					<text class="title">作品</text>
				</view>
				<view class="panel-item" @click="goToFollow">
					<text class="count">{{followCount}}</text>
					<text class="title">关注</text>
				</view>
				<view class="panel-item" @click="goToCollection">
					<text class="count">{{collectionCount}}</text>
					<text class="title">收藏</text>
				</view>
				<view class="panel-item" @click="goToLike">
					<text class="count">0</text>
					<text class="title">粉丝</text>
				</view>
			</view>
		</view>

		<view class="panel">
			<view class="panel-item-list" @click="history">
				<text class="title">浏览历史</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
			<view class="panel-item-list" @click="setting">
				<text class="title">我的设置</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
			<view class="panel-item-list" @click="loginout">
				<text class="title">退出登录</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from "vuex"
	export default {
		name: "my-userinfo",
		data() {
			return {};
		},
		onLoad() {
			this.panelData[0].count = this.followCount
			this.panelData[1].count = this.likeCount
			this.panelData[2].count = this.collectionCount
			this.panelData[3].count = this.footCount
		},
		computed: {
			...mapState("m_user", ["userinfo"]),
			...mapGetters("m_user", ["followCount", "likeCount", "collectionCount", "creationCount"])
		},
		methods: {
			...mapMutations('m_user', ['updateFollowUser', 'updateLike', 'updateCollection', 'updateUserInfo',
				'updateToken', "reset"
			]),
			history() {
				uni.navigateTo({
					url: "/subpkg/my_footprint/my_footprint"
				})
				console.log(123);
			},
			async loginout(i) {
				const [err, succ] = await uni.showModal({
					title: "提示",
					content: "确定要退出登录吗?"
				}).catch(err => err)
				if (succ && succ.confirm) {
					this.updateUserInfo({})
					this.updateToken("")
					this.reset()
				}
				// console.log("这是退出登录");
			},
			goToCreation() {
				uni.navigateTo({
					url: "/subpkg/my_creation/my_creation"
				})
			},
			goToFollow() {
				uni.navigateTo({
					url: "/subpkg/my_follow/my_follow"
				})
			},
			goToCollection() {
				uni.navigateTo({
					url: "/subpkg/my_collection/my_collection"
				})
			},
			goToLike() {
				// uni.navigateTo({
				// 	url: "/subpkg/my_like/my_like"
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.my-userinfo-view {
		height: 100vh;
		// background-color: #f4f4f4;
		background-image: linear-gradient(180deg, rgb(246, 213, 208), rgb(245, 236, 237));

		.user-msg {
			height: 400rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.img {
				width: 90px;
				height: 90px;

				.avatar {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 999px;
					border: 1px solid #fff;
					box-shadow: 0 1px 5px black;
				}
			}


			.nickname {
				font-size: 16px;
				color: rgb(1, 0, 0);
				font-weight: bold;
				margin-top: 10px;
			}
		}

		.panel {
			margin: 20px 10px;
			background-color: #fff;
			margin-bottom: 8px;
			border-radius: 7px;
			box-shadow: 0rpx 10rpx 5rpx #999;

			.panel-titel {
				padding-left: 10px;
				line-height: 40px;
				font-size: 15px;
				border-bottom: 1px solid #f4f4f4;
			}

			.pannel-body {
				display: flex;
				justify-content: space-around;

				.panel-item {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					padding: 10px 0;
					font-size: 16px;

					.title {
						font-size: 14px;
						color: #999;
					}
				}
			}

			.panel-item-list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font: 15px;
				padding: 0 10px;
				line-height: 45px;
			}
		}
	}
</style>
