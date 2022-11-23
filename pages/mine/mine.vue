<template>
	<view class="mine-view">
		<view class="login" v-if='token === ""'>
			<my-login></my-login>
		</view>
		<view class="userinfo" v-else="!token">
			<my-userinfo></my-userinfo>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		onLoad() {},
		computed: {
			...mapState('m_user', ['token', "followUserData"])
		},
	}
</script>

<style lang="scss">
	.mine-view {
		height: 100%;
	}
</style>
