<template>
	<view class="user-creation">
		<creation-card v-for="(c,i) in userCreation.list" :key="i" :creationData="c"></creation-card>
	</view>
</template>

<script>
	export default {
		props: {
			userCreation: {
				type: Object,
				default: {}
			}
		},
		name: "user-creation",
		data() {
			return {

			};
		},
	}
</script>

<style lang="scss">
	.user-creation {
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>
