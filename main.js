import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
import comment from './utils/index.js'

Vue.prototype.$getTime = comment.getTime;
Vue.prototype.$dataSet = comment.dataSet;
Vue.prototype.$duration = comment.duration;

// 导入网络请求的包
import {
	$http
} from "@escook/request-miniprogram"

uni.$http = $http


$http.baseUrl = 'https://apis.netstart.cn'

// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中..."
	})

	// if (options.url.indexOf('/my/') !== -1) {
	// 	options.header = {
	// 		Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
	// 	}
	// }
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

// 封装弹框的方法
uni.$showMsg = function(title = "数据请求失败!", duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: "none"
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
