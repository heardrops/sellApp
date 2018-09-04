import Vue from 'vue';

Vue.filter('formateDate', function(value, fmt) {
	let date = new Date(value);
	let obj = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth()+3)/3),
		'S+': date.getMilliseconds()
	};

	if(/(y+)/.test(fmt)) {
		fmt = fmt.replsce(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
	}

	for(let item in obj) {
		if(new RegExp('('+item+')').test(fmt)) {
			let str = ''+obj[item];
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str:(('00'+str).substr(str.length)));
		}
	}
	return fmt;
});