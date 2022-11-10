<template>
	<view class="search-view">
		<view class="search-bar">
			<uni-search-bar :radius="100" cancelButton="none" :focus="true" @input="input" @cancel="cancel">
			</uni-search-bar>
		</view>
		<view class="search-list" v-if="searchList.length !== 0">
			<view class="search-item" v-for="(item,i) in searchList" :key="i" @click="goToDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="history-box" v-else="searchList.length === 0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="17" @click="cleanHistoryList"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="goToGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 防抖
				timer: null,
				keyword: "",
				searchList: [],
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync("keyword") || '[]')
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
				await uni.$http.get("/api/public/v1/goods/qsearch", {
					query: this.keyword
				})
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.searchList = res.message;
				console.log("this.searchList", this.searchList);
				this.saveSearchHistory()
			},
			goToDetail(id) {
				console.log(id);
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				})
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
			goToGoodsList(keyword) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + keyword
				})
			}
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

		.search-list {
			padding: 0 5px;

			.search-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 12px;
				padding: 13px 0;
				border-bottom: 1px solid #efefef;

				.goods-name {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.history-box {
			padding: 0 5px;

			.history-title {
				display: flex;
				justify-content: space-between;
				height: 40px;
				font-size: 13px;
				align-items: center;
			}

			.history-list {
				display: flex;
				flex-wrap: wrap;

				.uni-tag {
					margin-top: 5px;
					margin-right: 5px;
					background-color: #efefef;
					color: #000;
					border: none;
				}
			}
		}
	}
</style>
