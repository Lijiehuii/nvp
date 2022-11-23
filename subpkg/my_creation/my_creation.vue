<template>
	<view class="my-creation">
		<view class="fab">
			<uni-fab :horizontal="horizontal" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				horizontal: "right",
				vertical: "bottom",
			};
		}
	}
</script>

<style lang="scss">
	.my-creation {
		width: 100vw;
		height: 100vh;
	}
</style>
