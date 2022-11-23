<template>
	<view class="user-like">
		<like-card v-for="(item,i) in userLike.list" :likeData="item.resource" :key="i"></like-card>
	</view>
</template>

<script>
	export default {
		props: {
			userLike: {
				type: Object,
				default: {}
			}
		},
		name: "user-like",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.user-like {
		height: calc(100vh - 262px);
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>
