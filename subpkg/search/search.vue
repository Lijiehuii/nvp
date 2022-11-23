<template>
	<view class="search-view">
		<view class="search-bar">
			<uni-search-bar v-model="keyword" :radius="100" cancelButton="none" :focus="true" @input="input"
				@cancel="cancel">
			</uni-search-bar>
		</view>
		<view class="search-list" v-if="searchList.length !== 0">
			<card-list v-for="(item,i) in searchList" :key="i" @click="goToDetail( )" :CardData="item">
			</card-list>
		</view>
		<view v-else="searchList.length === 0">
			<view class="history-box" v-if="historyList.length !== 0">
				<view class="history-title">
					<text>搜索历史</text>
					<uni-icons type="trash-filled" size="20" @click="cleanHistoryList"></uni-icons>
				</view>
				<view class="history-list">
					<view class="list-item" v-for="(item,i) in histories" :key="i" @click="goToSearch(item)">{{item}}
					</view>
				</view>
			</view>
			<view class="hotkeyword-box">
				<view class="hotkeyword-title">
					<text>热门搜索</text>
				</view>
				<view class="hotkeyword-list">
					<view class="list-item" v-for="(item,i) in hotkeyword" :key="i" @click="goToSearch(item.name)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hotkeyword from "../../static/apijs/hotkeyword.js"
	export default {
		data() {
			return {
				// 防抖
				timer: null,
				keyword: "",
				searchList: [],
				historyList: [],
				hotkeyword: hotkeyword.list
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync("keyword") || '[]')
			// this.getHotkeyword()
		},
		methods: {
			input(e) {
				console.log("输入的value", e);
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyword = e
					console.log("this.keyword=>", this.keyword);
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.keyword.length === 0) {
					this.searchList = []
					return
				}
				const {
					data: res
				} =
				await uni.$http.get("/xpc/search?kw=" + this.keyword + "&sort=hot")
				console.log(res);
				if (!res.data?.list) {
					return uni.$showMsg("正在努力搜索,请耐心等候~")
				}
				this.searchList = res.data.list;
				console.log("this.searchList", this.searchList);
				this.saveSearchHistory()
			},
			// async getHotkeyword() {
			// 	const {
			// 		data: res
			// 	} = await uni.$http.get("/xpc/search/recommend_kws")
			// 	this.hotkeyword = res.data.list
			// 	console.log("this.hotkeyword=>", this.hotkeyword);
			// },
			goToDetail() {
				console.log(123);
			},
			goToSearch(item) {
				console.log(item);
				this.keyword = item
				this.getSearchList()
			},
			saveSearchHistory() {
				this.historyList = this.historyList.filter(h => {
						return h != this.keyword
					}),
					this.historyList.push(this.keyword)
				uni.setStorageSync("keyword", JSON.stringify(this.historyList))
			},
			cleanHistoryList() {
				this.historyList = []
				uni.setStorageSync("keyword", '[]')
			},
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-view {
		position: sticky;
		top: 0;
		left: 0;

		.search-bar {
			position: sticky;
			top: 0;
			left: 0;
		}

		.search-list {
			padding: 0 5px;
		}

		.history-box,
		.hotkeyword-box {
			padding: 0 20rpx;
			margin-bottom: 20rpx;

			.history-title,
			.hotkeyword-title {
				display: flex;
				justify-content: space-between;
				height: 40px;
				font-size: 30rpx;
				align-items: center;
			}

			.history-list,
			.hotkeyword-list {
				display: flex;
				flex-wrap: wrap;
				font-size: 24rpx;

				.list-item {
					padding: 10rpx 20rpx;
					margin: 0 25rpx 25rpx 0;
					background-color: #efefef;
					color: black;
					border: none;
					font-weight: bold;
					border-radius: 8rpx;
				}
			}
		}
	}
</style>
