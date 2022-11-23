<template>
	<view class="my-like">
		<uni-swipe-action>
			<block v-for="(item,i) in like" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
					<!-- <follow-card :userData="user" @unfollow="unfollow"></follow-card> -->
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
					text: "不喜欢",
					style: {
						backgroundColor: "rgb(229, 76, 60)"
					}
				}],
			};
		},
		onLoad() {
			if (this.like.length >= 1) {
				uni.setNavigationBarTitle({
					title: "我的喜欢(" + this.like.length + ")"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "我的喜欢"
				})
			}
		},
		computed: {
			...mapState("m_user", ["like"])
		},
		methods: {
			...mapMutations("m_user", ["filterLike"]),
			swipeItemClickHandler(likeData) {
				this.filterLike(likeData)
			}
		},
		watch: {
			like(newVal) {
				if (newVal.length >= 1) {
					uni.setNavigationBarTitle({
						title: "我的喜欢(" + newVal.length + ")"
					})
				} else {
					uni.setNavigationBarTitle({
						title: "我的喜欢"
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
