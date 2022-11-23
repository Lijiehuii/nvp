<template>
	<view class="video-detail">
		<van-skeleton title row="10" :loading="loading">
			<view class="video" @touchend="dblclick">
				<view class="video-context">
					<video :autoplay="true" :controls="true" id="video" loop
						:src="'https://images.weserv.nl/?url='+videoDetailData.video.content.progressive[0].https_url"
						@fullscreenchange="screenChange"></video>
				</view>
			</view>
			<view class="video-info">
				<van-tabs :active="active" animated swipeable @change="onChange">
					<van-tab title="简介">
						<video-introduction :videoData="videoDetailData" :VideoLikeData="VideoLikeData"
							@set-collection-status="setCollectionStatus" @set-like-status="setlikeStatus"
							@set-follow-status="setFollowstatus">
						</video-introduction>
					</van-tab>
					<van-tab title="评论">
						<video-comment :videoCommentData="videoResourceData" @post-comments="postComments"
							:showTab="showTab">
						</video-comment>
					</van-tab>
				</van-tabs>
			</view>
		</van-skeleton>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	import video10934897 from "../../static/apijs/video10934897.js"
	import videolike10934897 from "../../static/apijs/videolike10934897.js"
	import videoresource10934897 from "../../static/apijs/videoresource10934897.js"
	export default {
		data() {
			return {
				video_id: 0,
				videoDetailData: {},
				touchNum: 0,
				play: true,
				videoContext: "",
				fullscreen: false,
				videoController: true,
				VideoLikeData: {},
				videoResourceData: {},
				showTab: true,
				foot: {},
				loading: true,
				failLoading: false,
				active: 0
			};
		},
		onLoad(options) {
			uni.showLoading({
				title: "数据加载中..."
			})
			this.videoContext = uni.createVideoContext("video", this);
			this.video_id = options.video_id
			this.getVideoDetail()
			this.getVideoLike()
			this.getVideoResource()
		},
		computed: {
			...mapState("m_user", ["like", "collection", "followUserData"])
		},
		methods: {
			...mapMutations("m_user", ["updateFootprint"]),
			onChange(event) {
				this.active = event.detail.name
			},
			setCollectionStatus() {
				if (this.videoDetailData.collection) {
					this.videoDetailData.count.count_collect--
				} else if (!this.videoDetailData.collection) {
					this.videoDetailData.count.count_collect++
				}
				this.videoDetailData.collection = !this.videoDetailData.collection
				console.log(this.videoDetailData.count.count_collect);
			},
			setlikeStatus() {
				if (this.videoDetailData.like) {
					this.videoDetailData.count.count_like--
				} else if (!this.videoDetailData.like) {
					this.videoDetailData.count.count_like++
				}
				this.videoDetailData.like = !this.videoDetailData.like
				console.log(this.videoDetailData.like, this.videoDetailData.count.count_like);
			},
			setFollowstatus() {
				if (this.videoDetailData.author.follow) {
					this.videoDetailData.author.userinfo.count.count_follower--
				} else if (!this.videoDetailData.author.follow) {
					this.videoDetailData.author.userinfo.count.count_follower++
				}
				this.videoDetailData.author.follow = !this.videoDetailData.author.follow
				console.log(this.videoDetailData.author.follow);
			},
			toplay() {
				let timer = setTimeout(() => {
					this.videoContext.play()
					clearTimeout(timer)
				}, 2000)
			},
			async getVideoDetail() {
				const {
					data: res
				} = await uni.$http.get("/xpc/article/" + this.video_id)
				uni.hideLoading()
				if (res.message !== "OK") {
					this.failLoading = true
					return console.log(this.failLoading);
				}
				this.loading = false
				this.videoDetailData = res.data
				// this.videoDetailData = video10934897
				this.videoDetailData = {
					...this.videoDetailData,
					like: false,
					collection: false,
					author: {
						...this.videoDetailData.author,
						follow: false
					}
				}
				for (let i = 0; i < this.collection.length; i++) {
					if (this.collection[i].id === this.videoDetailData.id) {
						this.videoDetailData.collection = true
						this.videoDetailData.count.count_collect++
					}
				}
				for (let i = 0; i < this.like.length; i++) {
					if (this.like[i] === this.videoDetailData.id) {
						this.videoDetailData.like = true
						this.videoDetailData.count.count_like++
					}
				}
				for (let i = 0; i < this.followUserData.length; i++) {
					if (this.followUserData[i]?.id === this.videoDetailData.author.userinfo.id) {
						this.videoDetailData.author.follow = true
						this.videoDetailData.author.userinfo.count.count_follower++
					}
				}
				let time = new Date().getTime()
				this.foot = {
					time,
					id: this.videoDetailData.id,
					cover: this.videoDetailData.cover,
					title: this.videoDetailData.title,
					author: {
						username: this.videoDetailData.author.userinfo.username,
						avatar: this.videoDetailData.author.userinfo.avatar,
					}
				}

				this.updateFootprint(this.foot)
			},
			async getVideoLike() {
				const {
					data: res
				} = await uni.$http.get("/xpc/article/" + this.video_id + "/next")
				console.log("Like=>", res);

				if (res) {
					this.VideoLikeData = res.data
				} else {
					this.VideoLikeData = videoresource10934897
				}
			},
			async getVideoResource() {
				const {
					data: res
				} = await uni.$http.get("/xpc/comments?resource_id=" + this.video_id)
				if (res) {
					this.videoResourceData = res.data
				} else {
					this.videoResourceData = videolike10934897
				}
			},
			dblclick() {
				this.touchNum++
				let timer = setTimeout(() => {
					if (this.touchNum == 1) {
						console.log('单击')
					}
					if (this.touchNum >= 2) {
						if (this.play) {
							this.play = false
							this.videoContext.pause()
							console.log("视频已暂停!");
						} else if (!this.play) {
							this.play = true
							this.videoContext.play()
							console.log("视频已播放!");
						}
					}
					this.touchNum = 0
					clearTimeout(timer)
				}, 250)
			},
			postComments(item) {
				this.videoResourceData.list = [item, ...this.videoResourceData.list];
			}
		}
	}
</script>

<style lang="scss">
	.video-detail {
		height: 100vh;
	}

	.video {
		width: 100%;
		position: relative;
		top: 0;
		left: 0;
		// z-index: 999;

		video {
			width: 100%;
		}

		.videoController {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, .5);

			.botttom {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
			}
		}

		.video-info {
			border-bottom: 1px solid #999;
		}
	}
</style>
