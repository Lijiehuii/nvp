<template>
	<view class="footprint">
		<view class="img">
			<van-image width="100%" height="100%" use-loading-slot show-loading show-error lazy-load
				:src="'https://images.weserv.nl/?url='+footData.cover">
				<van-loading slot="loading" type="spinner" size="20" vertical />
			</van-image>
		</view>
		<view class="desc">
			<view class="title">
				{{footData.title}}
			</view>
			<view class="user">
				<view class="user-img">
					<img :src="footData.author.avatar">
				</view>
				<view class="username">
					{{footData.author.username}}
				</view>
			</view>
			<view class="time">
				{{time}}
				<view class="more">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			footData: {
				type: Object,
				default: {}
			}
		},
		name: "footprint-card",
		data() {
			return {

			};
		},
		computed: {
			time() {
				return this.$getTime(this.footData?.time)
			}
		}
	}
</script>

<style lang="scss">
	.footprint {
		padding: 20rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		display: flex;

		.img {
			flex: 0 0 45vmin;
			width: 45vmin;
			height: 25vmin;
			margin-right: 10px;

			image {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
			}
		}

		.desc {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 16px;
				color: #000;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.user {
				display: flex;

				.user-img {
					width: 20px;
					height: 20px;
					margin-right: 5px;
					font-size: 14px;

					image {
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 999px;
					}
				}
			}

			.time {
				color: #999;
				font-size: 12px;
			}
		}
	}
</style>
