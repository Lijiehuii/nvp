<template>
	<view class="selection">
		<view class="selection-title">每日精选</view>
		<view class="selection-item" v-for="(item,i) in selectionData" :key="i">
			<big-card :cardData="item" @set-follow-status="setFollowStatus" @set-collection-status="setCollectionStatus"
				@set-like-status="setlikeStatus" @show-share="showShare"></big-card>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			selectionData: {
				type: Array,
				default: []
			}
		},
		name: "home-selection",
		data() {
			return {

			};
		},
		methods: {
			setFollowStatus(id) {
				this.$emit("set-follow-status", {
					id,
					type: "selection"
				})
			},
			setCollectionStatus(id) {
				this.$emit("set-collection-status", {
					id,
					type: "selection"
				})
			},
			setlikeStatus(id) {
				this.$emit("set-like-status", {
					id,
					type: "selection"
				})
			},
			showShare(data) {
				this.$emit("show-share", {
					data,
					type: "selection"
				})
			}
		}
	}
</script>

<style lang="scss">
	.selection {
		height: calc(100vh - 44px);
		padding: 20rpx;
		box-sizing: border-box;
		overflow: auto;

		.selection-title {
			margin-bottom: 20rpx;
			margin-left: 5rpx;
			letter-spacing: 1.5px;
			font-weight: bold;
		}
	}
</style>
