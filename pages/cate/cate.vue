<template>
	<view class="cate">
		<!-- 自定义的搜索组件 -->
		<!-- <my-search :bgcolor="'pink'" :radius="13"></my-search> -->
		<my-search @mySearch="goToSearch "></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区 -->
			<scroll-view class="left" scroll-y="true" :style="{height: wh+'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view class="left-scroll-view-item" :class="{active:cateSelect === i }" @click="setCateSelect(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动区 -->
			<scroll-view class="right" scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,i2) in cateListLevel2" :key="i2">
					<view class="cate-lv2-title">
						/ {{item2.cat_name}} /
					</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-list-item" v-for="(item3,i3) in item2.children" :key="i3"
							@click="goToGoodsList(item3)">
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from "@/mixins/tabbar-badge.js"
	export default {
		mixins: [badgeMix],
		data() {
			return {
				wh: 0,
				cateList: [],
				cateSelect: 0,
				cateListLevel2: [],
				scrollTop: 0
			};
		},
		onLoad() {
			this.getCateList()

			// 获取设备可用高度
			this.wh = uni.getSystemInfoSync().windowHeight - 50
			console.log("this.wh", this.wh);
		},
		methods: {
			// 获取分类页面的数据
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.cateList = res.message
				// 起始的二级分类的值
				this.cateListLevel2 = this.cateList[0].children

				console.log("this.cataList=>", this.cateList);
			},
			setCateSelect(i) {
				this.cateSelect = i

				this.cateListLevel2 = this.cateList[i].children;

				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			goToGoodsList(item) {
				console.log(item.cat_id);
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			goToSearch() {
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	// .cate {
	// 	background-color: #fff;
	// }
	.scroll-view-container {
		display: flex;

		.left {
			width: 120px;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #FFFFFF;
					position: relative;

					&::before {
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
						content: "";
						display: block;
						width: 3px;
						height: 30px;
						background-color: #C00000;
						border-radius: 999px;
					}
				}
			}
		}

		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;

			.cate-lv3-list-item {
				width: 33.3%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;

				image {
					display: block;
					width: 60px;
					height: 60px;
				}

				text {
					font-size: 12px;
				}
			}
		}
	}
</style>
