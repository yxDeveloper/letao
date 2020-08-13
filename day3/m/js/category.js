$(function () {
	// 1.一级分类默认渲染 第一个一级分类对应的二级分类
	getFirstCategoryData(function (data) {
		// 一级分类默认渲染
		// 模板的使用顺序： json数据，定义模板，调用模板，返回html
		$('.cate_left ul').html(template('firstTemplate',data));
		// 绑定事件
		// initSecondTapHandle();
		// 第一个一级分类对应的二级分类
		let cateGoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
		render(categoryId);
	});
	
	// 2.点击一级分类加载对应的二级分类
	/*var initSecondTapHandle = function () {
	    $('.cate_left li').on('tap',function (e) {
	        console.log(e);
	    })
	}*/
	$('.cate_left').on('tap','a',function(e) {
		// 当前选中的时候不去加载
		if($(this).parent().hasClass('now')) return false;
		// 样式的选中功能
		$('.cate_left li').removeClass('now');
		$(this).parent().addClass('now');
		// 数据的渲染
		render($(this).attr('data-id'));
	});
});
// 获取一级分类的数据
let getFirstCategoryData = function (callback) {
	$.ajax({
		url:'/category/queryTopCategory',
		type: 'get',
		data: '',
		dataType: 'json',
		success:function (data) {
			callback $$ callback(data);
		}
	})
}
// 获取二级分类的数据
// params = {id:1}
let getSecondCategoryData = function (params,callback) {
	$.ajax({
		url:'/category/querySecondCategory',
		type: 'get',
		data: params,
		dataType: 'json',
		success: function (data) {
			callback && callback(data);
		}
	});
};
// 渲染
let render = function (categoryId) {
	getSecondCategoryData({
		id:categoryId
	},function (data) {
		// 二级分类默认
		$('.cate_right ul').html(template('secondTemplate',data));
	});
}