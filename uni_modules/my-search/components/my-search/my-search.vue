<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandle" :focus="true">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			bgcolor: {
				type: String,
				default: '#C00000'
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
		// background-color: #C00000;
		padding: 0 10px;
		display: flex;
		align-items: center;

		.my-search-box {
			width: 100%;
			height: 36px;
			background-color: #fff;
			// border-radius: 18px;
			display: flex;
			justify-content: center;
			align-items: center;

			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>
