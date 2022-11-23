<template>
	<view class="comment">
		<view class="comment-wrapper" v-if="videoCommentData.list.length !== 0">
			<view v-for="(item,i) in videoCommentData.list" :key="i">
				<comment-list :commentData="item"></comment-list>
			</view>
		</view>
		<view class="comment-input">
			<input :value="inputVal" type="text" placeholder="我有话要说" @input="onchange" />
			<!-- <input class="uni-input" focus placeholder="自动获得焦点" /> -->
			<button :disabled="!inputVal" @click="send">发布</button>
		</view>
		<view class="nocomment" v-if="videoCommentData.list.length === 0">
			暂时还没有人评论,快发布评论抢沙发~
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		props: {
			videoCommentData: {
				type: Object,
				default: {}
			},
			showTab: {
				type: Boolean,
				default: false
			}
		},
		name: "video-comment",
		data() {
			return {
				inputVal: ""
			};
		},
		computed: {
			...mapState("m_user", ["userinfo"])
		},
		methods: {
			onchange(e) {
				if (!e.detail.value) {
					this.inputVal = ""
				}
				this.inputVal = e.detail.value
				console.log(this.inputVal);
			},
			send() {
				console.log(this.inputVal);
				let time = parseInt((new Date().getTime()) / 1000)
				console.log(time);
				let comment = {
					addtime: time,
					content: this.inputVal,
					ip_location: "广东",
					userInfo: {
						avatar: this.userinfo.avatarUrl,
						username: this.userinfo.nickName
					}
				}
				this.$emit("post-comments", comment)
				uni.$showMsg("发布成功!")
				this.inputVal = ""
			}
		}
	}
</script>

<style lang="scss">
	.comment {
		height: calc(100vh - 273px);
		padding: 30rpx 30rpx 0 30rpx;
		box-sizing: border-box;
		position: relative;
		overflow: auto;

		.comment-wrapper {
			height: calc(100vh - 333px);
			box-sizing: border-box;
			overflow: auto;
		}

		.comment-input {
			width: 100%;
			box-sizing: border-box;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			padding: 20rpx 30rpx;
			background-color: #fff;
			justify-content: space-between;
			align-items: center;

			input {
				width: 100%;
				background-color: #ddd;
				color: #000;
				border-radius: 20rpx;
				font-size: 26rpx;
				padding-left: 20rpx;
				margin-right: 20rpx;
			}

			button {
				font-size: 24rpx;
				flex: 0 0 40px;
				height: 30px;
				padding: 0;
				margin: 0;
			}
		}

		.nocomment {
			line-height: 200rpx;
			text-align: center;
		}
	}
</style>
