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
					// window.down = this;
					setTimeout(function () {
						getCartData(function (data) {
							// 渲染页面
							$('.mui-table-view').html(template('cart',data));
							// 加载状态隐藏
							that.endPulldownToRefresh();
							// 注册刷新事件 防止多次绑定 先解绑再次绑定
							$('.fa-refresh').off('click').on('tap',function () {
								// 重新加载
								// 4.点击刷新按钮 刷新
								that.pulldownLoading();
							});
						});
					},1000);
				}
			}
		}
	});
	// 1.初始化页面  自动下拉刷新
	// 2.侧滑的时候  点击编辑  弹出对话框 （尺码，数量）
	// $('.fa-refresh').on('tap',function () {
	// 	// 刷新		触发下拉操作
	// 	mui('#refreshContainer').pullRefresh().pulldownLoading();
	// })
	// 3.侧滑的时候  点击删除  弹出对话框  确认框
	$('.mui-table-view').on('tap','.mui-icon-compose',function () {
		// 弹窗的内容
		// 默认的子字符串 ===》 html格式的字符串
		// 获取当前按钮对应商品的数据
		// 根据id去缓存获取
		let id = $(this).parent().attr('data-id');
		let item = CT.getItemById(window.cartData.data,id);
		let html = template('edit',item);
		// confirm 在使用字符串作为内容的时候 '普通\n文字' \n 加上<br> \t 默认空格
		mui.confirm(html.replace(/\n/g,''),'商品编辑',['确认','取消'],function (e) {
			if (e.index == 0) {
				// 发送请求
				let size = $('.btn_size.now').html();
				let num = $('.p_number input').val();
				CT.loginAjax({
					type: 'post',
					url: '/cart/updateCart',
					data: {
						id: id,
						size: size,
						num: num
					},
					dataType: 'json',
					success: function (data) {
						if(data.success == true) {
							// 窗口关闭
							// 列表更新
							item.num = num;
							item.size = size;
							// 缓存的数据  window.cartData.data 已修改
							// 渲染页面
							$('.mui-table-view').html(template('cart',window.cartData));
							// 整个列表重新渲染
							// setAmount();
						}
					}
				});
				// return false
			} else {
				// TODO
			}
		})
	}); 
	$('body').on('tap','.btn_size',function () {
		$(this).addClass('now').siblings().removeClass('now');
	});
	$('body').on('tap','.p_number span',function () {
		let $input = $(this).siblings('input');
		let currNum = $input.val();
		// 字符串 转数字
		let maxNum = parseInt($input.attr('data-max'));
		if ($(this).hasClass('jian')) {
			if(currNum <= 1) {
				mui.toast('至少一件商品');
				return false;
			}
			currNum--;
		} else {
			// 不超库存
			if(currNum >= maxNum) {
				// 消息框点击的时候会消失 正好和加好在一块 （击穿 tap，点击穿透）
				setTimeout(function () {
					mui.toast('库存不足');
				},100);
				return false;
			}
			currNum++;
		}
		$input.val(currNum);
	});
	$('.mui-table-view').on('tap','.mui-icon-trash',function () {
		let $this = $(this);
		let id = $this.parent().attr('data-id');
		mui.confirm('您确认是否删除该商品？','商品删除',['确认','取消'], function(e) {
			if (e.index == 0) {
				CT.loginAjax({
					type: 'get',
					url: '/cart/deleteCart',
					data: {
						id: id
					},
					dataType:'json',
					success: function (data) {
						if(data.success == true){
							// 删除
							$this.parent().parent().remove();
							setAmount();
						}
					}
				})
			} else {
				// TODO
			}
		})
	});
	// 5.点击复选框  计算总金额
	$('.mui-table-view').on('change','[type-checkbox]',function () {
		// 总金额 = 每个商品数量*单价 的总和
		setAmount();
	});
});
/**/
let setAmount = function () {
	
}