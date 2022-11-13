<template>
	<view class="my-userinfo-view">
		<!-- 用户信息 -->
		<view class="user-msg">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>

		<view class="panel">
			<view class="pannel-body">
				<view class="panel-item" v-for="(item1,i1) in panelData1" :key="i1">
					<text class="count">{{item1.count}}</text>
					<text class="title">{{item1.title}}</text>
				</view>
			</view>
		</view>

		<view class="panel">
			<text class="panel-titel">我的订单</text>
			<view class="pannel-body">
				<view class="panel-item" v-for="(item2,i2) in panelData2" :key="i2">
					<image :src="item2.imgSrc"></image>
					<text class="title">{{item2.title}}</text>
				</view>
			</view>
		</view>

		<view class="panel">
			<view class="panel-item-list" v-for="(item3,i3) in panelData3" :key="i3" @click="bottomClick(i3)">
				<text class="title">{{item3}}</text>
				<uni-icons type="arrowright" size="15"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		name: "my-userinfo",
		data() {
			return {
				panelData1: [{
					title: "收藏的店铺",
					count: 24
				}, {
					title: "收藏的商品",
					count: 24
				}, {
					title: "关注的商品",
					count: 24
				}, {
					title: "足迹",
					count: 24
				}],
				panelData2: [{
					title: "待付款",
					imgSrc: "/static/user-images/tobepaid.jpg"
				}, {
					title: "待收货",
					imgSrc: "/static/user-images/track.jpg"
				}, {
					title: "退款/退货",
					imgSrc: "/static/user-images/refund.jpg"
				}, {
					title: "全部订单",
					imgSrc: "/static/user-images/allorder.jpg"
				}],
				panelData3: ["收货地址", "联系客服", "退出登录"]
			};
		},
		computed: {
			...mapState("m_user", ["userinfo"])
		},
		methods: {
			...mapMutations('m_user', ['updateAddress', 'updateUserInfo',
				'updateToken'
			]),
			async bottomClick(i) {
				if (i === 0) {
					console.log("这是收货地址");
				}
				if (i === 1) {
					console.log("这是联系客服");
				}
				// 退出登录
				if (i === 2) {
					const [err, succ] = await uni.showModal({
						title: "提示",
						content: "确定要退出登录吗?"
					}).catch(err => err)
					if (succ && succ.confirm) {
						this.updateAddress({})
						this.updateUserInfo({})
						this.updateToken("")
					}
					console.log("这是退出登录");
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.my-userinfo-view {
		height: 100vh;
		background-color: #f4f4f4;

		.user-msg {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.avatar {
				display: block;
				width: 90px;
				height: 90px;
				border-radius: 999px;
				border: 2px solid #fff;
				box-shadow: 0 1px 5px black;
			}

			.nickname {
				font-size: 16px;
				color: #fff;
				font-weight: bold;
				margin-top: 10px;
			}
		}

		.panel {
			position: relative;
			top: -10px;
			margin: 0 10px;
			background-color: #fff;
			margin-bottom: 8px;
			border-radius: 7px;

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
					font-size: 13px;

					image {
						display: block;
						width: 35px;
						height: 35px;
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
