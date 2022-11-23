<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandle" :focus="true">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">请输入搜索内容~</text>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			bgcolor: {
				type: String,
				default: '#fff'
			},

			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			searchBoxHandle() {
				console.log("ok");
				this.$emit("mySearch")
			}
		}
	}
</script>
<style lang="scss">
	.my-search-container {
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;

		.my-search-box {
			width: 100%;
			height: 36px;
			background-color: #eee;
			// border-radius: 18px;
			display: flex;
			justify-content: center;
			align-items: center;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
				color: #aaa;
			}
		}
	}
</style>
