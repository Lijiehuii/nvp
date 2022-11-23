<template>
	<view class="user-detail">
		<van-skeleton title avatar row="3" :loading="loading">
			<user-info :userInfoData="userInfoData" @set-follow-status="setFollowStatus"></user-info>
		</van-skeleton>
		<van-tabs :active="userTabbar" sticky animated swipeable>
			<van-tab title="作品" name="1">
				<user-creation :userCreation="userCreation"></user-creation>
			</van-tab>
			<van-tab :title="'喜欢'" name="2">
				<user-like :userLike="userLike"></user-like>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import user10884012 from "../../static/apijs/user10884012.js"
	import userapproved10884012 from "../../static/apijs/userapproved10884012.js"
	import userarticle10884012 from "../../static/apijs/userarticle10884012.js"
	import userlike10884012 from "../../static/apijs/userlike10884012.js"
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				userInfoData: {},
				userCreation: userarticle10884012,
				userCollection: userapproved10884012,
				userLike: userlike10884012,
				// userTabbar:
				loading: true
			};
		},
		onLoad(options) {
			console.log(options);
			this.getUserInfoData()
			// console.log("this.userInfoData", this.userInfoData);
			// console.log("this.userCollection", this.userCollection);
			// console.log("this.userCreation", this.userCreation);
			// console.log("this.userLike", this.userLike);
		},

		methods: {
			getUserInfoData() {
				this.userInfoData = {
					...user10884012,
					follow: false
				}
				for (let i = 0; i < this.followUserData.length; i++) {
					if (this.followUserData[i].id === this.userInfoData.id) {
						this.userInfoData.count.count_follower++
						this.userInfoData.follow = true
					}
				}
				this.loading = false
			},
			setFollowStatus(id) {
				console.log("id=>", id);
				if (this.userInfoData.follow) {
					this.userInfoData.count.count_follower--
				} else if (!this.userInfoData.follow) {
					this.userInfoData.count.count_follower++
				}
				this.userInfoData.follow = !this.userInfoData.follow
			}
		},
		computed: {
			...mapState("m_user", ["followUserData"])
		}
	}
</script>

<style lang="scss">
	.user-detail {
		padding: 30rpx 20rpx;
		box-sizing: border-box;
	}
</style>
