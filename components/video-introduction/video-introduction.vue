<template>
	<view class="introduction" v-if="">
		<view class="video-title">{{videoData.title}}</view>
		<view class="label">
			<view class="" v-for="(la,i) in videoData.categories" :key="i">
				{{la.category_name}}-{{la.sub.category_name}}
			</view>
			<view class="pull-time">
				{{addTime}}
			</view>
			<view class="play-count">
				{{view + "次播放"}}
			</view>
		</view>
		<view class="content">
			{{videoData.content}}
		</view>
		<view class="operation">
			<view class="data" @click="setCollectionStatus">
				<uni-icons type="star-filled" color="rgb(246, 173, 42)" size="30" v-if="videoData.collection">
				</uni-icons>
				<uni-icons type="star" size="30" v-else="!videoData.collection">
				</uni-icons>
				{{collection}}
			</view>
			<view class="data" @click="setlikeStatus">
				<uni-icons type="hand-up-filled" color="rgb(218, 84, 70)" size="30" v-if="videoData.like">
				</uni-icons>
				<uni-icons type="hand-up" size="30" v-else="!videoData.like"></uni-icons>
				{{like}}
			</view>
		</view>
		<view class="tags">
			<view class="tag" v-for="(tag,i) in videoData.tags" :key="i">
				{{tag.name}}
			</view>
		</view>
		<view class="author">
			<view class="title">创作人</view>
			<view class="author-info" @click="goToUserdetail(videoData.author.userinfo.id)">
				<view class="img" v-if="videoData.author.userinfo.avatar">
					<image :src="'https://images.weserv.nl/?url='+videoData.author.userinfo.avatar"></image>
				</view>
				<view class="username">
					{{videoData.author.userinfo.username}}
				</view>
				<view class="follow-status" :class="{follow:videoData.author.follow}" @click.stop="followUser">
					{{videoData.author.follow?"已关注":"关注"}}
				</view>
			</view>
		</view>
		<view class="video-like">
			<van-skeleton title avatar row="3" :loading="likeloading">
				<view class="title">{{VideoLikeData.title}}</view>
				<video-likecard v-for="(like,i) in VideoLikeData.list" :likeData="like" :key="i"></video-likecard>
			</van-skeleton>
		</view>
		</van-skeleton>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		props: {
			videoData: {
				type: Object,
				default: {}
			},
			VideoLikeData: {
				type: Object,
				default: {}
			}
		},
		name: "video-introduction",
		data() {
			return {
				loading: true,
				likeloading: true
			};
		},
		watch: {
			view(newVal) {
				if (newVal !== "undefined") {
					this.loading = false
				}
			},
			VideoLikeData(newVal) {
				if (newVal !== "undefined") {
					this.likeloading = false
				}
			},
		},
		methods: {
			...mapMutations("m_user", ["updateFollowUser", "filterFollowUser", "updateCollection", "filterCollection",
				"updateLike", "filterLike", "updateRedirectInfo"
			]),
			followUser() {
				this.Loading()
				let user = this.videoData.author
				if (user.follow) {
					this.filterFollowUser(user.userinfo.id)
				} else if (!user.follow) {
					this.updateFollowUser(user)
				}
				this.$emit("set-follow-status")
			},
			Loading() {
				uni.showLoading({
					title: "数据加载中..."
				})
				let timer = setTimeout(() => {
					uni.hideLoading()
					clearTimeout(timer)
				}, 1000)
			},
			setCollectionStatus() {
				this.$emit("set-collection-status")
				if (this.videoData.collection) {
					this.filterCollection(this.videoData.id)
				} else if (!this.videoData.collection) {
					this.updateCollection(this.videoData)
				}
				this.Loading()
			},
			setlikeStatus() {
				if (this.videoData.like) {
					this.filterLike(this.videoData.id)
				} else if (!this.videoData.like) {
					this.updateLike(this.videoData.id)
				}
				this.$emit("set-like-status")
				this.Loading()
			},
			goToUserdetail(id) {
				console.log(id);
				uni.navigateTo({
					url: "/subpkg/userinfo_detail/userinfo_detail?user_id=" + id
				})
			},
		},
		computed: {
			addTime() {
				return this.$getTime(parseInt(this.videoData.publish_time + "000"))
			},
			view() {
				return this.$dataSet(this.videoData.count?.count_view)
			},
			like() {
				return this.$dataSet(this.videoData.count?.count_like)
			},
			collection() {
				return this.$dataSet(this.videoData.count?.count_collect)
			},
		}
	}
</script>

<style lang="scss">
	.introduction {
		height: calc(100vh - 273px);
		overflow: auto;
		padding: 30rpx 25rpx;
		box-sizing: border-box;

		.video-title {
			font-size: 38rpx;
			color: #000;
			font-weight: bold;
		}

		.label {
			font-size: 24rpx;
			display: flex;
			justify-content: space-between;
			padding: 30rpx 0;
			box-sizing: border-box;
			color: #999;
		}

		.content {
			color: #444;
			font-size: 28rpx;
			// width: ;
		}

		.operation {
			padding: 30rpx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-bottom: 1px solid #eee;

			.data {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			padding-top: 30rpx;
			border-bottom: 1px solid #eee;
			font-size: 20rpx;

			.tag {
				padding: 10rpx 20rpx;
				box-sizing: border-box;
				background-color: #eee;
				border-radius: 5rpx;
				margin-right: 20px;
				margin-bottom: 30rpx;
			}
		}

		.author {
			padding: 30rpx 0;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 20rpx;
			}

			.author-info {
				width: 80%;
				display: flex;
				padding: 30rpx 20rpx;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				box-shadow: 5rpx 5rpx 5px #aaa;
				border-radius: 20rpx;
				font-size: 28rpx;

				.img {
					width: 60px;
					height: 60px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-radius: 999px;
					border: 1px solid #aaa;

					image {

						display: block;
						width: 100%;
						height: 100%;
						border-radius: 999px;
					}
				}

				.follow-status {
					text-align: center;
					width: 66px;
					font-size: 24rpx;
					padding: 5rpx 30rpx;
					box-sizing: border-box;
					border-radius: 999px;
					color: rgb(230, 75, 63);
					background-color: rgb(253, 238, 233);

					&.follow {
						color: rgb(162, 162, 162);
						background-color: rgb(240, 240, 240);
					}
				}
			}
		}

		.video-like {
			padding: 30rpx 0;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
