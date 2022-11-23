<template>
	<view class="home-view">
		<van-tabs :active="active" @change="onChange" sticky animated swipeable>
			<van-tab title="入场必看">
				<home-mustsee :mustSeeData="mustSeeData" @set-follow-status="setFollowStatus"
					@set-collection-status="setCollectionStatus" @set-like-status="setlikeStatus"
					@show-share="showShareSelect"></home-mustsee>
			</van-tab>
			<van-tab title="推荐">
				<home-recon :recommendData="recommendData" :swiperList="swiperList" :recomCard="MiddleCard"
					@show-share="showShareSelect">
				</home-recon>
			</van-tab>
			<van-tab title="每日精选">
				<home-selection :selectionData="selectionData" @set-follow-status="setFollowStatus"
					@set-collection-status="setCollectionStatus" @set-like-status="setlikeStatus"
					@show-share="showShareSelect"></home-selection>
			</van-tab>
			<van-tab title="热门">
				<home-hot :hotData="hotData" @set-follow-status="setFollowStatus"
					@set-collection-status="setCollectionStatus" @set-like-status="setlikeStatus"
					@show-share="showShareSelect"></home-hot>
			</van-tab>
		</van-tabs>
		<view @click.stop="showShare = false">
			<van-share-sheet :show="showShare" title="立即分享给好友" :options="options"
				@select="onSelect(selectVideoData.data,$event)" />
		</view>
	</view>
</template>

<script>
	import recommend from "../../static/apijs/recommend.js"
	import mustSee from "../../static/apijs/mustSee.js"
	import hot from "../../static/apijs/hot.js"
	import selection from "../../static/apijs/selection.js"
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				active: 1,
				recommendData: [],
				swiperList: [],
				MiddleCard: [],
				mustSeeData: [],
				selectionData: [],
				hotData: [],
				showShare: false,
				options: [
					[{
							name: '微信',
							icon: '../../static/images/share-icons//wechat.png'
						},
						{
							name: '朋友圈',
							icon: '../../static/images/share-icons/wechat-moments.png'
						},
						{
							name: 'QQ',
							icon: '../../static/images/share-icons/qq.png'
						},
					],
					[{
							name: '复制链接',
							icon: '../../static/images/share-icons/link.png'
						},
						{
							name: '不感兴趣',
							icon: '../../static/images/share-icons/unlike.png'
						},
					],
				],
				selectVideoData: ""
			};
		},
		onLoad() {
			this.getMainData()
			if (this.recommendData === []) {
				uni.$showLoading({
					title: "数据正在加载中..."
				})
			}
			this.getHotData()
			this.getMustSeeData()
			this.getSelectionData()
		},
		computed: {
			...mapState("m_user", ["followUserData", "like", "collection"])
		},
		watch: {
			followUserData(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.update()
				}
			},
			like(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.update()
				}
			},
			collection(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.update()
				}
			}
		},
		methods: {
			update() {
				if (this.active === 0) {
					this.getMustSeeData()
				}
				if (this.active === 2) {
					this.getSelectionData()
				}
				if (this.active === 3) {
					this.getHotData()
				}
			},
			onSelect(video, e) {
				let id = video.id
				if (e.detail.name == "复制链接") {
					uni.setClipboardData({
						data: video.share_info.url, //要被复制的内容
						success: () => { //复制成功的回调函数
							uni.showToast({ //提示
								title: '复制成功'
							})
						}
					});
				}
				if (e.detail.name == "不感兴趣") {
					this.unlike(id)
				}
			},
			unlike(id) {
				if (this.selectVideoData.type === "recommend") {
					this.MiddleCard = this.MiddleCard.filter(r => {
						return r.id !== id
					})
				}
				if (this.selectVideoData.type === "mustSee") {
					this.mustSeeData = this.mustSeeData.filter(m => {
						return m.id !== id
					})
				}
				if (this.selectVideoData.type === "selection") {
					this.selectionData = this.selectionData.filter(s => {
						return s.id !== id
					})
				}
				if (this.selectVideoData.type === "hot") {
					this.hotData = this.hotData.filter(h => {
						return h.id !== id
					})
				}
			},
			showShareSelect(video) {
				this.selectVideoData = video
				this.showShare = true
			},
			onChange(event) {
				this.active = event.detail.name
				console.log("this.active=>", this.active);
			},
			async getMainData() {
				const {
					data: res
				} = await uni.$http.get("/xpc/home/recommend")
				this.recommendData = res.data.children
				this.swiperList = this.recommendData[0].children
				this.MiddleCard = this.recommendData.filter(m => {
					return m.type === "uiMiddleCard"
				})
				// this.recommendData = recommend.children
				// this.swiperList = this.recommendData[0].children
				// this.MiddleCard = this.recommendData.filter(m => {
				// 	return m.type === "uiMiddleCard"
				// })
				this.MiddleCard = this.MiddleCard.map(m => {
					return {
						...m.children[0].model.resource
					}
				})
			},
			getMustSeeData() {
				this.mustSeeData = mustSee.children.map(m => {
					return {
						...m.children[0].model.resource,
						collection: false,
						like: false,
						author: {
							...m.children[0].model.resource.author,
							follow: false
						}
					}
				})
				for (let i = 0; i < this.mustSeeData.length; i++) {
					for (let j = 0; j < this.followUserData.length; j++) {
						if (this.mustSeeData[i].author.userinfo.id == this.followUserData[j].id) {
							this.mustSeeData[i].author.follow = true
						}
					}
				}
				for (let i = 0; i < this.mustSeeData.length; i++) {
					for (let j = 0; j < this.like.length; j++) {
						if (this.mustSeeData[i].id == this.like[j]) {
							this.mustSeeData[i].like = true
							this.mustSeeData[i].count.count_like++
						}
					}
				}
				for (let i = 0; i < this.mustSeeData.length; i++) {
					for (let j = 0; j < this.collection.length; j++) {
						if (this.mustSeeData[i].id == this.collection[j].id) {
							this.mustSeeData[i].collection = true
							this.mustSeeData[i].count.count_collect++
						}
					}
				}
			},
			getSelectionData() {
				this.selectionData = selection.children.filter(s => {
					return s.type === "uiBigCard"
				})
				this.selectionData = this.selectionData.map(s => {
					return {
						...s.children[0].model.resource,
						collection: false,
						like: false,
						author: {
							...s.children[0].model.resource.author,
							follow: false
						}
					}
				})
				for (let i = 0; i < this.selectionData.length; i++) {
					for (let j = 0; j < this.followUserData.length; j++) {
						if (this.selectionData[i].author.userinfo.id == this.followUserData[j].id) {
							this.selectionData[i].author.follow = true
						}
					}
				}
				for (let i = 0; i < this.selectionData.length; i++) {
					for (let j = 0; j < this.like.length; j++) {
						if (this.selectionData[i].id == this.like[j]) {
							this.selectionData[i].like = true
							this.selectionData[i].count.count_like++
						}
					}
				}
				for (let i = 0; i < this.selectionData.length; i++) {
					for (let j = 0; j < this.collection.length; j++) {
						if (this.selectionData[i].id == this.collection[j].id) {
							this.selectionData[i].collection = true
							this.selectionData[i].count.count_collect++
						}
					}
				}
			},
			getHotData() {
				this.hotData = hot.children.filter(h => {
					return h.children.length === 1
				})
				this.hotData = this.hotData.map(h => {
					return {
						...h.children[0].model.resource,
						collection: false,
						like: false,
						author: {
							...h.children[0].model.resource.author,
							follow: false
						}
					}
				})
				for (let i = 0; i < this.hotData.length; i++) {
					for (let j = 0; j < this.followUserData.length; j++) {
						if (this.hotData[i].author.userinfo.id == this.followUserData[j].id) {
							this.hotData[i].author.follow = true
						}
					}
				}
				for (let i = 0; i < this.hotData.length; i++) {
					for (let j = 0; j < this.like.length; j++) {
						if (this.hotData[i].id == this.like[j]) {
							this.hotData[i].like = true
							this.hotData[i].count.count_like++
						}
					}
				}
				for (let i = 0; i < this.hotData.length; i++) {
					for (let j = 0; j < this.collection.length; j++) {
						if (this.hotData[i].id == this.collection[j].id) {
							this.hotData[i].collection = true
							this.hotData[i].count.count_collect++
						}
					}
				}
			},
			setFollowStatus(item) {
				console.log("这是mustSee的id=>", item);
				if (item.type === "mustSee") {
					this.mustSeeData = this.mustSeeData.map(m => {
						if (m.author.userinfo.id === item.id) {
							return {
								...m,
								author: {
									...m.author,
									follow: !m.author.follow
								}
							}
						}
						return m
					})
				}
				if (item.type === "selection") {
					this.selectionData = this.selectionData.map(s => {
						if (s.author.userinfo.id === item.id) {
							return {
								...s,
								author: {
									...s.author,
									follow: !s.author.follow
								}
							}
						}
						return s
					})
				}
				if (item.type === "hot") {
					this.hotData = this.hotData.map(h => {
						if (h.author.userinfo.id === item.id) {
							return {
								...h,
								author: {
									...h.author,
									follow: !h.author.follow
								}
							}
						}
						return h
					})
				}
				// console.log(this.hotData);
			},
			setCollectionStatus(item) {
				if (item.type === "mustSee") {
					this.mustSeeData = this.mustSeeData.map(m => {
						if (m.id === item.id) {
							if (m.collection) {
								m.count.count_collect--
								return {
									...m,
									collection: !m.collection
								}
							}
							if (!m.collection) {
								m.count.count_collect++
								return {
									...m,
									collection: !m.collection
								}
							}
						}
						return m
					})
				}
				if (item.type === "selection") {
					this.selectionData = this.selectionData.map(s => {
						if (s.id === item.id) {
							if (s.collection) {
								s.count.count_collect--
								return {
									...s,
									collection: !s.collection
								}
							}
							if (!s.collection) {
								s.count.count_collect++
								return {
									...s,
									collection: !s.collection
								}
							}
						}
						return s
					})
				}
				if (item.type === "hot") {
					this.hotData = this.hotData.map(h => {
						if (h.id === item.id) {
							if (h.collection) {
								h.count.count_collect--
								return {
									...h,
									collection: !h.collection
								}
							}
							if (!h.collection) {
								h.count.count_collect++
								return {
									...h,
									collection: !h.collection
								}
							}
						}
						return h
					})
				}
				// console.log(this.mustSeeData);
			},
			setlikeStatus(item) {
				if (item.type === "mustSee") {
					this.mustSeeData = this.mustSeeData.map(m => {
						if (m.id === item.id) {
							if (m.like) {
								m.count.count_like--
								return {
									...m,
									like: !m.like
								}
							}
							if (!m.like) {
								m.count.count_like++
								return {
									...m,
									like: !m.like
								}
							}
						}
						return m
					})
				}
				if (item.type === "selection") {
					this.selectionData = this.selectionData.map(s => {
						if (s.id === item.id) {
							if (s.like) {
								s.count.count_like--
								return {
									...s,
									like: !s.like
								}
							}
							if (!s.like) {
								s.count.count_like++
								return {
									...s,
									like: !s.like
								}
							}
						}
						return s
					})
				}
				if (item.type === "hot") {
					this.hotData = this.hotData.map(h => {
						if (h.id === item.id) {
							if (h.like) {
								h.count.count_like--
								return {
									...h,
									like: !h.like
								}
							}
							if (!h.like) {
								h.count.count_like++
								return {
									...h,
									like: !h.like
								}
							}
						}
						return h
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.home-view {
		background-color: #fff;
		overflow: auto;
		box-sizing: border-box;
		background-color: #f1f1f1;
	}

	.tabbars {
		padding: 10rpx;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
		left: 0;
		background-color: #fff;
		z-index: 999;
		font-size: 28rpx;

		.tabbar {
			width: 25%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 20rpx;
			padding-bottom: 10rpx;
			position: relative;

			&.active {
				border-bottom: 2px solid #C00000;
			}
		}
	}
</style>
