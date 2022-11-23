const date = new Date().getTime();
const getTime = time => {
	let t = new Date(time).getTime();
	let value = (date - t) / 1000; // 换算成秒 
	let twoMinute = 2 * 60;
	let nMinute = 60 * 60;
	let oneDay = 24 * 60 * 60;
	let oneWeek = 7 * 24 * 60 * 60;

	if (value <= twoMinute) { // 相差2分钟内
		return "刚刚";
	} else if (twoMinute <= value && value <= nMinute) { // 2分钟到1小时内分钟
		return parseInt(value / 60) + "分钟前";
	} else if (nMinute <= value && value <= oneDay) { // 相差24小时以内
		return parseInt(value / 60 / 60) + "小时内";
	} else if (oneDay <= value && value <= oneWeek) { // 相差7天内
		return parseInt(value / 60 / 60 / 24) + "天前";
	} else if (oneWeek <= value) { //超过七天显示
		let data1 = new Date(time);
		let year = data1.getFullYear();
		let month = data1.getMonth() + 1;
		let day = data1.getDate();
		let time3 = year + '-' + month + '-' + day;
		return time3;
	}
}

const dataSet = count => {
	if (count > 1000 && count < 10000) {
		let newCount = Math.ceil(count / 100) / 10
		if (newCount % parseInt(newCount) === 0) {
			return newCount + ".0k"
		} else {
			return newCount + "k"
		}
	} else if (count > 10000) {
		let newCount = Math.ceil(count / 1000) / 10
		if (newCount % parseInt(newCount) === 0) {
			return newCount + ".0w"
		} else {
			return newCount + "w"
		}
	}
	return count
}

const duration = du => {
	let duration = du
	let mtime = ''
	let min = parseInt(duration / 60);
	let sec = duration % 60;
	return mtime = (min < 10 ? "0" + min : min) + "'" + (sec < 10 ? "0" + sec : sec) + "''"
}

export default {
	getTime,
	dataSet,
	duration
}
