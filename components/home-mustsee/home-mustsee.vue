<template>
	<view class="must-see">
		<view class="must-see-item" v-for="(item,i) in mustSeeData" :key="i">
			<big-card :cardData="item" @set-follow-status="setFollowStatus" @set-collection-status="setCollectionStatus"
				@set-like-status="setlikeStatus" @show-share="showShare"></big-card>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mustSeeData: {
				type: Array,
				default: []
			},
		},
		name: "must-see",
		data() {
			return {

			};
		},
		methods: {
			setFollowStatus(id) {
				this.$emit("set-follow-status", {
					id,
					type: "mustSee"
				})
			},
			setCollectionStatus(id) {
				this.$emit("set-collection-status", {
					id,
					type: "mustSee"
				})
			},
			setlikeStatus(id) {
				this.$emit("set-like-status", {
					id,
					type: "mustSee"
				})
			},
			showShare(data) {
				this.$emit("show-share", {
					data,
					type: "mustSee"
				})
			}
		}
	}
</script>

<style lang="scss">
	.must-see {
		height: calc(100vh - 44px);
		padding: 20rpx;
		overflow: auto;
		background-color: #f1f1f1;
		box-sizing: border-box;
	}
</style>
