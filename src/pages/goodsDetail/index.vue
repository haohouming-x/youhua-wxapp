<template>
  <div>
    <div>
      <div class="headbox">
        <carousel-figure :swiperImgs="imgUrls"></carousel-figure>
      </div>
      <div class="dis-flex">
        <div class="text-le">
          <div class="prod-name">{{detail.name}}</div>
          <div class="prod-size">{{detail.size}}</div>
        </div>
        <div class="text-ri">
          <del class="prod-market-prive">市场价<span>{{detail.markerPrice}}</span></del>
          <div class="prod-msg">销量:{{detail.salesVolume}} | 押金:{{detail.deposit}}</div>
        </div>
      </div>
    </div>
    <div class="marleft title">
      押金规则
    </div>
    <div class="rule-content">押金规则内容</div>
      <div class="prod-content">
        <wxParse :content="article" @preview="preview" @navigate="navigate" />
      </div>
      <div class="marleft title">同类油画推荐</div>
      <div class="over">

        <div class="item" v-for="(item,index) in recommed" :key="index" @click="toDetails(item.id)">
          <remote-image className="item-img" mode="widthFix" :src="item.image" />
          <div>{{item.name}}</div>
          <div>{{item.describes}}</div>
        </div>
      </div>
      <!-- <div class="bottom">
        <div class="home" @click="toHomePage">首页</div>
        <div class="service">客服</div>
        <div class="collect" @click="$router.push('/pages/myGallery/index')">收藏</div>
        <div class="rent" @click="rent">租这幅</div>
      </div> -->
      <div class="pay_footer">
      <div class="footer_inner">
        <div class="inner_le">
          <div class="footer-le_btn" @click="toHomePage">
            <img src="../../assets/images/icon1.png" alt="">
            <p class="btn_text">首页</p>
          </div>
          <div class="footer-le_btn">
            <button open-type="contact" plain="true" size="21" session-from="weapp" style="border: 0; padding:0 3rpx;">
              <img src="../../assets/images/icon2.png" alt="">
              <p class="btn_text">
                客服
              </p>
            </button>
          </div>
          <div class="footer-le_btn ri" @click="$router.push('/pages/myGallery/index')">
            <img src="../../assets/images/icon4.png" alt="">
            <p class="btn_text">收藏</p>
          </div>
        </div>
        <div class="inner_ri" @click="rent">租这幅</div>
      </div>
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
      article: '',
      detail: {

      },
      recommed: [

      ],
      yemianid: '',
      imgUrls: []
    }
  },
  computed: {
    ...mapGetters({
      isMember: 'userInfo/isMember'
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
      if (!this.isMember) {
        this.$router.push('/pages/member/index')
        return ;
      }

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
  mounted(){
   // console.log(this.$route.query.id)

   this.yemianid = this.$route.query.id
   this.toGetGooods(this.yemianid)
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
    margin: 0 auto 60rpx;
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
  .text-le {
    width: 60%;
  }
  .text-ri {
    width: 40%;
  }
  .prod-name {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 36rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 16rpx 0;
  }
  .prod-size {
    font-size: 28rpx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prod-market-prive {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    margin: 16rpx 0;
    position: relative;
    float: right;
  }
  .prod-market-prive::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: #333;
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 0;
    margin: auto;
  }
  .prod-market-prive span {
    color: #f55;
  }
  .prod-msg {
    font-size: 28rpx;
    float: right;
  }
  .title {
    font-size: 32rpx;
    margin-bottom: 24rpx;
  }
  .rule-content {
    font-size: 28rpx;
    margin: 0 5% 60rpx 5%;
  }
  .prod-content {
    margin: 0 5%;
  }
  .pay_footer {
    height: 100rpx;
  }
  .pay_footer .footer_inner {
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    border-top: 1px solid #eee;
    position: fixed;
    bottom: 0;
    overflow: hidden;
  }
  .footer_inner .inner_le {
    width: 40%;
    float: left;
  }
  .footer_inner .inner_le .footer-le_btn {
    width: 100rpx;
    height: 100rpx;
    position: relative;
    overflow: hidden;
    float: left;
  }
  .footer_inner .inner_le .footer-le_btn::after {
    content: " ";
    width: 1rpx;
    height: 50rpx;
    background-color: #eee;
    position: absolute;
    right: 1rpx;
    top: 1px;
    bottom: 1px;
    margin: auto;
    display: block;
  }
  .footer_inner .inner_le .footer-le_btn.ri::after {
    display: none;
  }
  .footer-le_btn img {
    width: 50rpx;
    height: 50rpx;
    margin: 10rpx auto;
    display: block;
  }
  .footer-le_btn .btn_text {
    font-size: 24rpx;
    line-height: 24rpx;
    text-align: center;
    color: #666;
  }
  .tips_box .clr_text {
    margin-top: 20rpx;
    line-height: 60rpx;
    text-align: center;
    font-size: 32rpx;
    color: #f7bf64;
  }
  .footer_inner .inner_ri {
    width: 60%;
    line-height: 100rpx;
    text-align: center;
    font-size: 36rpx;
    color: #fff;
    float: left;
    background-color: #f7bf64;
  }
  .footer_inner .inner_ri.dis {
    background-color: #ccc;
  }
</style>
