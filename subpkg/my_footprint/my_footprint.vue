<template>
	<view class="my-foot">
		<uni-swipe-action>
			<block v-for="(footprint,i) in footprint" :key="i" v-if="footprint.length !== 0">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(footprint)">
					<footprint-card :footData="footprint"></footprint-card>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<view class="clean" v-if="footprint.length > 1" @click="show = true">
			<uni-icons type="trash" size="40"></uni-icons>
		</view>
		<div class="cleanAll" @click.stop="show=false">
			<van-dialog style="z-index: 400" :show="show" title="确定要清除所有浏览历史吗?" show-cancel-button @confirm="cleanAll">
			</van-dialog>
		</div>
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
					text: "删除历史",
					style: {
						backgroundColor: "rgb(229, 76, 60)"
					}
				}],
				show: false
			};
		},
		onLoad() {
			if (this.footprint.length >= 1) {
				uni.setNavigationBarTitle({
					title: "浏览历史(" + this.footprint.length + ")"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "浏览历史"
				})
			}
		},
		computed: {
			...mapState("m_user", ["footprint"])
		},
		methods: {
			...mapMutations("m_user", ["filterFootprint", "resetFootprint"]),
			cleanAll() {
				this.resetFootprint()
			},
			swipeItemClickHandler(footData) {
				this.filterFootprint(footData)
			},
		},
		watch: {
			footprint(newVal) {
				if (newVal.length >= 1) {
					uni.setNavigationBarTitle({
						title: "浏览历史(" + newVal.length + ")"
					})
				} else {
					uni.setNavigationBarTitle({
						title: "浏览历史"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-foot {
		padding: 20rpx;
		box-sizing: border-box;

		.clean {
			position: fixed;
			bottom: 50px;
			right: 20px;
		}
	}
</style>
