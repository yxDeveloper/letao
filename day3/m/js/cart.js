$(() => {
	// 区域滚动
	mui('.mui-scroll-wrapper').scroll({
		indicators:false,
		// 显示滚动条
	});
	// 初始化上下拉
	mui.init({
		pullRefresh: {
			container: "#refreshContainer",
			down: {
				auto: true,
				callback: function () {
					// 1.初始化页面	自动下拉刷新
					let that = this;
					// 定义一个全局的 下拉组件对象	使用里面的方法
					
				}
			}
		}
	})
});