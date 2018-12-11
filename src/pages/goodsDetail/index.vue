<template>
  <div>
    <div>
      <div class="headbox">
        <carousel-figure :swiperImgs="imgUrls"></carousel-figure>
      </div>
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
          <remote-image className="item-img" mode="widthFix" :src="item.image" />
          <div>{{item.name}}</div>
          <div>{{item.describes}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="home" @click="toHomePage">首页</div>
        <div class="service">客服</div>
        <div class="collect" @click="$router.push('/pages/myGallery/index')">收藏</div>
        <div class="rent" @click="rent">租这幅</div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import carouselFigure from '@/components/carouselFigure'
import remoteImage from '@/components/remoteImage'
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    wxParse,
    carouselFigure,
    remoteImage
  },
  data() {
    return{
      article: '<div>htmllllllllllllllllllllllll</div>',
      detail: {
        // url: 'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',
        url: '',
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
      ],
      yemianid: '',
      imgUrls: []
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/userInfo'
    })
  },
  methods: {
    ...mapActions('goodsDetail', [
     'getGoods'
   ]),
    toGetGooods (id) {
      this.getGoods({
        id: id
      }).then((res) => {
        console.log(res)
        this.detail.url = res.image
        this.detail.name = res.name
        this.detail.size = res.longSize +'*' + res.wideSize
        this.detail.markerPrice = res.marketPrice
        this.detail.deposit  =res.depositPrice
        this.detail.salesVolume =res.stock
        this.article =res.details
        this.imgUrls = res.pictures.map(v => ({url: v.image}))
        this.recommed = res.classify
      })
    },
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
      let that =this
      let yemianids = []
      
        wx.getStorage({
            key: 'id',
            success (res) {
              console.log(res)
              if  (res.data) {
                yemianids = res.data
                if(yemianids.indexOf(that.yemianid) !== -1 ) {
                  console.log('indexof')
                  wx.showToast({
                    title: '已添加',
                    icon: 'none',
                    duration: 2000
                  })
                } else {

                    yemianids.push(that.yemianid)
                    console.log('yes')
                    wx.setStorage({
                      key:"id",
                      data:yemianids
                    })
                    wx.showToast({
                      title: '添加成功',
                      icon: 'success',
                      duration: 2000
                    })
                }
              }
            },
            complete (res) {
              if (res.errMsg === 'getStorage:fail data not found') {
                //console.log('com')
                yemianids.push(that.yemianid)
                wx.setStorage({
                  key:"id",
                  data:yemianids
                })
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000
                  })
              }
            }
        })
     
        
      
      


      //  this.$router.push('/pages/myGallery/index')
    }
  },
  created() {

    // this.toGetGooods(this.$route.query.id)

  },
  onShow() {
    if (!this.userInfo.isMember) {
      this.$router.push('/pages/member/index')
    }
    // console.log(this.$route.query.id)
    this.yemianid = this.$route.query.id
    this.toGetGooods(this.$route.query.id)
  },
  mounted(){
   // console.log(this.$route.query.id)
   // this.yemianid = this.$route.query.id
   // this.toGetGooods(this.$route.query.id)
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
