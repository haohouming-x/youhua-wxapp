<template>
      
    <div>
      <carousel-figure :option="swiperOption" :swiperImgs="imgUrls"></carousel-figure>
      <div v-if="!isMember">
        <div class=" memberbox" @click="beMember"></div>
      </div>
      <div class="classifybox">
        <div class="classify-item" v-for="(item,index) in  classify" :key="index" @click="handleClassify(item)">
          <image class="classify-img"  :src="item.image" />
          <div class="font-size--24">{{item.name}}</div>
        </div>
      </div>
      <div class="goodsbox">
        <div class="marleft">{{headline}}</div>
        <div class="goodsbox-outer">
          <div v-for="(item,index) in goods" :key="index" class="goods-item" @click="toDetails(item.id)">
            <image mode="widthFix" class="good-item-img" :src="item.image" />
            <div>{{item.name}}</div>
            <div>{{item.describes}}</div>
            <div>{{item.longSize}} * {{item.wideSize}}</div>
          </div>
        </div>
      </div>
      <normal-footer :footerData = "footerData"></normal-footer>
    </div>

</template>
<script>
import { mapState, mapActions } from 'vuex'
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
      // imgUrls: [
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg"}
      // ],
      imgUrls: [],
      // classify: [
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "推荐商城"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "收藏"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"}
      // ],
      classify: [],
      // goods: [
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 0},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 1},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 2}
      // ],
      goods: [],
      headline: '',
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
      ],
      bannerpage: 1,
      imgdata: [],
      defaultnum: ''
    }
  },
  computed: {
    ...mapState({
      count: state => state.home.count
    }) 
  },
 created () {
  //  this.getbanners()
  
  
 },
 mounted () {
Promise.all([this.togetBanner(),this.toClassifies()]).then((res) => {
    console.log(res)
  })
 },
 methods: {
   ...mapActions('home', [
     'getbanner',
     'getClassifies',
     'getClassGoods'
   ]),
    togetClassGoods () {
      console.log(this.defaultnum)
      this.getClassGoods({
        id: this.defaultnum
      }).then((res) => {
        console.log(res)

      })
    },
    togetBanner () {
      this.getbanner({
      }).then((res) => {
        this.imgUrls = res
      })
    },
    toClassifies () {
      this.getClassifies({}).then((res) => {
        // console.log(res)
        this.classify = res
        this.defaultnum = res[0].id
        this.headline = res[0].name
        this.getClassGoods({
          id: res[0].id
        }).then((res) => {
          console.log(res)
          this.goods = res
        })
      })
    },
   handleClassify (item){
    console.log(item.id)
    this.headline = item.name
    this.getClassGoods({
      id: item.id
    }).then((res) => {
      console.log(res)
    })
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
