// API
const API = {
  // 公共服务
  'globalUrl.getProvince': '/api/banners', // 获取省市
  // 轮播图
  'home.getBanner': '/api/banners', // 获取轮播图
  // 分类数据
  'home.getClassifies': '/api/classifies', // 查询分类数据
  'home.getClassGoods': '/api/classifies/{$id}/goods' // 分类id下的商品列表
}

export default API
