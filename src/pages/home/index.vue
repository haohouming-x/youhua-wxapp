<template>
      
    <div>
      <carousel-figure :option="swiperOption" :swiperImgs="imgUrls"></carousel-figure>
      <div v-if="!isMember">
        <div class=" memberbox" @click="beMember"></div>
      </div>
      <div class="classifybox">
        <div class="classify-item" v-for="(item,index) in  classify" :key="index" @tap="handleClassify(item)">
          <image class="classify-img"  :src="item.url" />
          <div class="font-size--24">{{item.title}}</div>
        </div>
      </div>
      <div class="goodsbox">
        <div class="marleft">{{headline}}</div>
        <div class="goodsbox-outer">
          <div v-for="(item,index) in goods" :key="index" class="goods-item" @click="toDetails(item.id)">
            <image mode="widthFix" class="good-item-img" :src="item.url" />
            <div>{{item.name}}</div>
            <div>{{item.title}}</div>
            <div>{{item.size}}</div>
          </div>
        </div>
      </div>
      <normal-footer :footerData = "footerData"></normal-footer>
    </div>

</template>
<script>
import carouselFigure from '@/components/carouselFigure'
import normalFooter from '@/components/normalFooter'
export default {
  components: {
    carouselFigure,
    normalFooter
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        interval: 3000,
        duration: 500,
        circular: true,
        indicatorDots: true
      },
      isMember: false,
      imgUrls: [
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg"}
      ],
      classify: [
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "推荐商城"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "收藏"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"}
      ],
      goods: [
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 0},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 1},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 2}
      ],
      headline: '推荐商城',
      footerData: [
        {
          name: "首页",
          clickStatus: false,
          id: 0
        },{
          name: "购物车",
          clickStatus: true,
          id: 1
        },{
          name: "共享规则",
          clickStatus: true,
          id: 2
        },{
          name: "新手指南",
          clickStatus: true,
          id: 3
        }
      ]
    }
  },
 created () {},
 methods: {
   handleClassify (item){
    console.log(item)
    this.headline = item.title
   },
   toDetails(id) {
    this.$router.push({path: '/pages/goodsDetail/index', query: {id: id}})
   },
   beMember() {
     this.$router.push('/pages/member/index')
   }
 }
  
}
</script>
<style >
  .memberbox{
    background: #cab0a7;
    height: 100rpx;
    width: 100%;
  }
  .classifybox{
    margin-top: 20rpx;
    overflow: hidden;
  }
  .classify-item{
    float: left;
    text-align: center;
    width: 25%;
    margin-bottom: 40rpx;
  }
  .classify-img{
    width: 100rpx;
    height: 100rpx;
    /* width: 80%; */
    border-radius: 50%;
  }
  .font-size--24{
    font-size:24rpx;
  }
  .goodsbox-outer{
    overflow: hidden;
  }
  .goods-item{
    float: left;
    width: 46%;
    margin: 2%;
  }
  .marleft{
    margin-left: 1.5%;
  }
  .good-item-img{
    width: 100%;
  }
</style>
