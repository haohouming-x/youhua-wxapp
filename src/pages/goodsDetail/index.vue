<template>
  <div>
    <div>
      <div class="headbox"><img class="head-img" mode="widthFix" :src="detail.url" alt=""></div>
      <div class="dis-flex">
        <div>
          <div>{{detail.name}}</div>
          <div>{{detail.markerPrice}}</div>
        </div>
        <div class="text-ri">
          <div>市场价{{detail.markerPrice}}</div>
          <div>销量:{{detail.salesVolume}} | 押金:{{detail.deposit}}</div>
        </div>
      </div>
    </div>
    <div class="marleft">
      押金规则
    </div>
      <wxParse :content="article" @preview="preview" @navigate="navigate" />
      <div class="marleft">同类油画推荐</div>
      <div class="over">
        
        <div class="item" v-for="(item,index) in recommed" :key="index" @click="toDetails(item.id)">
          <image class="item-img" mode="widthFix" :src="item.url" />
          <div>{{item.name}}</div>
          <div>{{item.title}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="home" @click="toHomePage">首页</div>
        <div class="service">客服</div>
        <div class="collect">收藏</div>
        <div class="rent" @click="rent">租这幅</div>
      </div>
  </div>
</template>
<script>
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    wxParse
  },
  data() {
    return{
      article: '<div>htmllllllllllllllllllllllll</div>',
      detail: {
        url: 'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',
        name: 'the last supper',
        size: '60cm*60cm',
        markerPrice: '200',
        salesVolume: '50',
        deposit: '100'
      },
      recommed: [
        {url: 'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: 'thelastsupper',title:'最后的晚餐',id:0},
        {url: 'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: 'thelastsupper',title:'最后的晚餐',id:1},
        {url: 'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: 'thelastsupper',title:'最后的晚餐',id:2}
      ]
    }
  },
  methods: {
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    },
    toDetails(id) {
      this.$router.push({path: '/pages/goodsDetail/index', query: {id: id}})
    },
    toHomePage() {
      this.$router.push('/pages/home/index')
    },
    rent() {
      this.$router.push('/pages/myGallery/index')
    }
  },
  created() {

  }
}
</script>
<style>
  @import url("~mpvue-wxparse/src/wxParse.css");
  .headbox{
    text-align: center;
  }
  .head-img{
    width: 90%;
  }
  .dis-flex{
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .text-ri{
    text-align: right;
  }
  .marleft{
    margin-left: 5%;
  }
  .over{
    overflow: hidden;
    margin-bottom:100rpx;
  }
  .item {
    width: 48%;
    margin: 1%;
    float: left;
  }
  .item-img{
    width: 100%;
  }
  .bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    text-align: center;
    background: #fff;
  }
  .home{
    flex:1;
    padding:20rpx 0; 
  }
  .service{
    flex:1;
    padding:20rpx 0; 
  }
  .collect{
    flex:1;
    padding:20rpx 0; 
  }
  .rent{
    flex: 3;
    background: #f29c37;
    padding:20rpx 0;
    color: #fff; 
  }
</style>
