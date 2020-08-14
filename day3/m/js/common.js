window.CT = {};
CT.getParamsByUrl = function () {
	// 对象存储地址栏信息
	let params = {};
	let search = location.search;
	if (search) {
		search = search.replace('?','');
		// 如果有多个键值对
		let arr = search.split('&');
		arr.forEach(function (item, i) {
			let itemArr = item.split('=');
			params[itemArr[0]] = itemArr[1];
		});
	};
	return params;
};
CT.serialize2object = function (serializeStr) {
	let obj = {};
	// key=value&k=v
	if(serializeStr){
		let arr = serializeStr.split('&');
		arr.forEach(function (item,i) {
			let itemArr = item.split('=');
			obj[itemArr[0]] = itemArr[1];
		})
	}
	return obj;
}
CT.getItemById = function (arr,id) {
	let obj = null;
	arr.forEach(function (item,i) {
		if(item.id == id){
			obj = item;
		}
	});
	return obj;
}