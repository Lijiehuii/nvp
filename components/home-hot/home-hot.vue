<template>
	<view class="hot">
		<view class="hot-item" v-for="(item,i) in hotData" :key="i">
			<big-card :cardData="item" @set-follow-status="setFollowStatus" @set-collection-status="setCollectionStatus"
				@set-like-status="setlikeStatus"></big-card>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			hotData: {
				type: Array,
				default: []
			},
		},
		name: "hot",
		data() {
			return {

			};
		},
		methods: {
			setFollowStatus(id) {
				this.$emit("set-follow-status", {
					id,
					type: "hot"
				})
			},
			setCollectionStatus(id) {
				this.$emit("set-collection-status", {
					id,
					type: "hot"
				})
			},
			setlikeStatus(id) {
				this.$emit("set-like-status", {
					id,
					type: "hot"
				})
			},
		}
	}
</script>

<style lang="scss">
	.hot {
		height: calc(100vh - 44px);
		overflow: auto;
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>
