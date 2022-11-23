<template>
	<view class="big-card">
		<view class="card-top">
			<view class="author">
				<view class="left" @click="goToUserdetail(cardData.author.userinfo.id)">
					<view class="img">
						<van-image width="100%" height="100%" use-loading-slot round cover show-loading show-error
							lazy-load :src="'https://images.weserv.nl/?url='+cardData.author.userinfo.avatar">
							<van-loading slot="loading" type="spinner" size="30" vertical />
						</van-image>
					</view>
					<view class="author">
						{{cardData.author.userinfo.username}}
					</view>
				</view>
				<view class="right">
					<view class="follow" @click.stop="followUser(cardData.author.userinfo.id)">
						<view class="to-follow" v-if="!cardData.author.follow">+ 关注</view>
						<view class="followed" v-else>已关注</view>
					</view>
					<view class="more" @click.stop="showShare(cardData)">
						<uni-icons type="more-filled" color="#ddd" size="18"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="card-middle" @click="goToVideoDetail(cardData.id)">
			<view class="card-title">{{cardData.title}}</view>
			<view class="img">
				<van-image width="100%" height="220px" use-loading-slot show-loading show-error lazy-load
					:src="'https://images.weserv.nl/?url='+cardData.cover">
					<van-loading slot="loading" type="spinner" size="50" vertical />
				</van-image>
				<view class="img-bottom">
					<view class="views">
						{{view + " 观看"}}
					</view>
					<view class="line">|</view>
					<view class="duration">{{duration}}</view>
				</view>
			</view>
		</view>
		<view class="card-bottom">
			<view class="data" @click="setCollectionStatus(cardData.id)">
				<uni-icons type="star-filled" color="rgb(244, 173, 40)" size="25" v-if="cardData.collection">
				</uni-icons>
				<uni-icons type="star" size="25" v-else="!cardData.collection">
				</uni-icons>
				{{collection}}
			</view>
			<view class="data" @click="setlikeStatus(cardData.id)">
				<uni-icons type="hand-up-filled" color="rgb(216, 77, 64)" size="25" v-if="cardData.like"></uni-icons>
				<uni-icons type="hand-up" size="25" v-else="!cardData.like"></uni-icons>
				{{like}}
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
		props: {
			cardData: {
				type: Object,
				default: {}
			}
		},
		name: "big-card",
		data() {
			return {
				seconds: 3,
			};
		},
		computed: {
			...mapState("m_user", ["followUserData", "token"]),
			view() {
				return this.$dataSet(this.cardData.count?.count_view)
			},
			like() {
				return this.$dataSet(this.cardData.count?.count_like)
			},
			collection() {
				return this.$dataSet(this.cardData.count?.count_collect)
			},
			duration() {
				return this.$duration(this.cardData.duration)
			}
		},
		methods: {
			...mapMutations("m_user", ["updateFollowUser", "filterFollowUser", "updateCollection", "filterCollection",
				"updateLike", "filterLike", "updateRedirectInfo"
			]),
			showShare(data) {
				this.$emit("show-share", data)
			},
			goToVideoDetail(id) {
				console.log(id);
				uni.navigateTo({
					url: "/subpkg/video_detail/video_detail?video_id=" + id
				})
			},
			goToUserdetail(id) {
				console.log(id);
				uni.navigateTo({
					url: "/subpkg/userinfo_detail/userinfo_detail?user_id=" + id
				})
			},
			dataSet(count) {
				if (count > 1000 && count < 10000) {
					let newCount = Math.ceil(count / 100) / 10
					if (newCount % parseInt(newCount) === 0) {
						return newCount + ".0k"
					} else {
						return newCount + "k"
					}
				} else if (count > 10000) {
					let newCount = Math.ceil(count / 1000) / 10
					if (newCount % parseInt(newCount) === 0) {
						return newCount + ".0w"
					} else {
						return newCount + "w"
					}
				}
				return count
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
			followUser(id) {
				if (!this.token) {
					return this.delayNavigate()
				}
				let author = this.cardData.author
				if (author.follow) {
					this.filterFollowUser(author.userinfo.id)
				} else if (!author.follow) {
					this.updateFollowUser(author)
				}
				this.Loading()
				this.$emit("set-follow-status", id)
			},
			setCollectionStatus(id) {
				let video = this.cardData
				if (!this.token) {
					return this.delayNavigate()
				}
				if (video.collection) {
					this.filterCollection(video.id)
				} else if (!video.collection) {
					this.updateCollection(video)
				}
				this.Loading()
				this.$emit("set-collection-status", id)
			},
			setlikeStatus(id) {
				let video = this.cardData
				if (!this.token) {
					return this.delayNavigate()
				}
				if (video.like) {
					this.filterLike(video.id)
				} else if (!video.like) {
					this.updateLike(video.id)
				}
				this.Loading()
				this.$emit("set-like-status", id)
			},
			delayNavigate() {
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: "/pages/mine/mine",
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/home/home'
								})
							}
						})
						return this.seconds = 3
					}
					this.showTicps(this.seconds)
				}, 1000)
			},
			showTicps(n) {
				uni.showToast({
					icon: "none",
					title: "请登录后再进行操作" + n + "秒之后自动跳转至登录页面",
					mask: true,
					duration: 1500
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.big-card {
		margin-bottom: 20rpx;
		padding: 20rpx 0;
		background-color: #fff;
		border-radius: 20rpx;

		.card-top {
			padding: 10rpx 20rpx 0rpx 20rpx;

			.author {
				display: flex;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;
					font-size: 13px;

					.img {
						// border: 3px solid #000;
						width: 30px;
						height: 30px;
						margin-right: 10rpx;
						border-radius: 999px;
						box-sizing: border-box;

						image {
							display: block;
							width: 100%;
							height: 100%;
							border-radius: 999px;
						}
					}


				}

				.right {
					display: flex;
					font-size: 16px;
					align-items: center;

					.follow {
						font-size: 13px;

						.to-follow {
							color: rgb(227, 79, 63);
							font-weight: bold;
						}

						.followed {
							color: #999;
							font-weight: bold;
						}
					}

					.more {
						transform: rotateZ(90deg);
					}
				}
			}
		}

		.card-middle {
			width: 100%;
			margin: 20rpx 0;
			position: relative;

			.card-title {
				font-size: 16px;
				font-weight: bold;
				margin: 20rpx;
			}

			.img {
				width: 100%;
				height: 100%;
				position: relative;

				.img-bottom {
					width: 100%;
					justify-content: flex-end;
					position: absolute;
					bottom: 10rpx;
					padding: 10rpx;
					box-sizing: border-box;
					color: #fff;
					display: flex;
					font-size: 24rpx;
					background-image: linear-gradient(180deg, rgba(0, 0, 0, .0), rgba(0, 0, 0, .5));

					.line {
						margin: 0 10rpx;
					}
				}
			}
		}

		.card-bottom {
			padding: 10rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 15px;

			.data {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				.collection {
					position: absolute;
					left: 0;
				}
			}
		}
	}
</style>
