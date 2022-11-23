<template>
	<view class="my-follow">
		<uni-swipe-action>
			<block v-for="(user,i) in followUserData" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(user)">
					<follow-card :userData="user" @unfollow="unfollow"></follow-card>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<view class="unlike" @click.stop="show = false">
			<van-dialog style="z-index: 400" :show="show" :title="'取消对 '+userData.username+' 的关注'" show-cancel-button
				@confirm.stop="confirm" @cancel="show = false">
			</van-dialog>
		</view>
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
					text: "取消关注",
					style: {
						backgroundColor: "rgb(229, 76, 60)"
					}
				}],
				show: false,
				userData: {}
			};
		},
		onLoad() {
			if (this.followUserData.length >= 1) {
				uni.setNavigationBarTitle({
					title: "我的关注(" + this.followUserData.length + ")"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "我的关注"
				})
			}
		},
		computed: {
			...mapState("m_user", ["followUserData"])
		},
		methods: {
			...mapMutations("m_user", ["filterFollowUser"]),
			unfollow(user) {
				this.show = true
				this.userData = user
			},
			confirm() {
				this.filterFollowUser(this.userData.id)
			},
			swipeItemClickHandler(user) {
				this.filterFollowUser(user.id)
			}
		},
		watch: {
			followUserData(newVal) {
				if (newVal.length >= 1) {
					uni.setNavigationBarTitle({
						title: "我的关注(" + newVal.length + ")"
					})
				} else {
					uni.setNavigationBarTitle({
						title: "我的关注"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-follow {
		padding: 20rpx;
		box-sizing: border-box;

	}
</style>
