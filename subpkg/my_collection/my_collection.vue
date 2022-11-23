<template>
	<view class="my-like">
		<uni-swipe-action>
			<block v-for="(item,i) in collection" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
					<like-card :likeData="item" :key="i" v-if="item !== []"></like-card>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				options: [{
					text: "不收藏",
					style: {
						backgroundColor: "rgb(229, 76, 60)"
					}
				}],
			};
		},
		onLoad() {
			if (this.collection.length >= 1) {
				uni.setNavigationBarTitle({
					title: "我的收藏(" + this.collection.length + ")"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "我的收藏"
				})
			}
		},
		computed: {
			...mapState("m_user", ["collection"])
		},
		methods: {
			...mapMutations("m_user", ["filterCollection"]),
			swipeItemClickHandler(collectionData) {
				this.filterCollection(collectionData.id)
			}
		},
		watch: {
			collection(newVal) {
				if (newVal.length >= 1) {
					uni.setNavigationBarTitle({
						title: "我的收藏(" + newVal.length + ")"
					})
				} else {
					uni.setNavigationBarTitle({
						title: "我的收藏"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-like {
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>
