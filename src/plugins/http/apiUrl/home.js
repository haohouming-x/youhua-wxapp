// API
const API = {
  // 公共服务
  'globalUrl.getProvince': '/api/banners', // 获取省市
  'globalUrl.login': '/mpapp/login_or_create', // 小程序登录
  'globalUrl.getConsumer': '/api/consumers/{id}',
  'user.getAddress': '/api/consumers/{id}/receipt_infos',
  'address.info': '/api/receipt_infos/{id}',
  // 轮播图
  'home.getBanner': '/api/banners', // 获取轮播图
  // 分类数据
  'home.getClassifies': '/api/classifies', // 查询分类数据
  'home.getClassGoods': '/api/classifies/{id}/goods', // 分类id下的商品列表
  'member.userinfo': '/api/consumers/{id}/member' // 更新会员信息
}

export default API
