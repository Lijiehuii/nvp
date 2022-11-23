<template>
	<view>
		<view class="cate-list" v-for="(item,i) in cateList" :key="i" @click="goToCateListDetail(item)">
			<card-list :CardData="item">
			</card-list>
		</view>
		<view class="nomore" v-if="nomore">
			没有更多数据了~
		</view>
	</view>
</template>

<script>
	import cate1_1 from "../../static/apijs/cate1_1.js"
	import cate1_2 from "../../static/apijs/cate1_2.js"
	import cate1_3 from "../../static/apijs/cate1_3.js"
	export default {
		data() {
			return {
				navBarTitle: "",
				cateList: [],
				cateid: 0,
				page: 1,
				isLoading: false,
				nomore: false
			};
		},
		onLoad(options) {
			this.navBarTitle = options.cate_title
			uni.showNavigationBarLoading()
			uni.setNavigationBarTitle({
				title: this.navBarTitle
			})
			uni.hideNavigationBarLoading()
			this.cateid = options.cate_id
			this.getCateList()
		},
		onPullDownRefresh() {
			this.cateList = []
			this.nomore = false
			this.page = 1
			setTimeout(() => {
				uni.stopPullDownRefresh()
				this.getCateList()
				uni.$showMsg("刷新成功!")
			}, 1000)
		},
		onReachBottom() {
			console.log("到底了");
			if (this.isLoading || this.nomore) {
				return
			}
			if (this.page < 3) {
				this.page++
				uni.$showMsg("正在加载更多!")
				this.getCateList()
				this.isLoading = false
			} else if (this.page == 3) {
				this.page++
				uni.$showMsg("数据已经加载完,没有更多数据了~")
				this.getCateList()
				this.isLoading = false
				this.nomore = true
			}
		},
		methods: {
			getCateList() {
				this.isLoading = true
				// const {
				// 	data: res
				// } = await uni.$http.get("/xpc/articles?category_id=" + this.cateid + "&page=" + this.page)
				// this.cateList = [...this.cateList, ...res.data.list]
				// console.log("this.cateList=>", this.cateList);
				// console.log(cate1);
				// console.log("id=>", id);
				if (this.page === 1) {
					this.cateList = [...this.cateList, ...cate1_1.list]
				} else if (this.page === 2) {
					this.cateList = [...this.cateList, ...cate1_2.list]
				} else if (this.page === 3) {
					this.cateList = [...this.cateList, ...cate1_3.list]
				}
				console.log("this.cateList=>", this.cateList);
				this.isLoading = false
			},
			goToCateListDetail(item) {
				console.log(item);
			}
		}
	}
</script>

<style lang="scss">
	.nomore {
		padding: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
