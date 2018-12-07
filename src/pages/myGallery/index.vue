<template>
  <div class="wrap">
    <div class="item" v-for="(item, index) in payGoods" :key="index">
      <div class="item-imgbox">
        <remote-image mode="widthFix" className="item-image" :src="item.image" />
      </div>
      <div class="dis-flex">
        <div>
          <div class="marbot">{{item.name}}</div>
          <div>{{item.longSize}}*{{item.wideSize}}</div>
        </div>
        <div class="text-ri">
          <div class="marbot"> 押金:<text class="item-amount">{{item.depositPrice}}</text></div>
          <text class="delete" v-if="item.status ==='AE'">删除</text>
          <text class="return" v-if="item.status === 'RT'">退还</text>
        </div>
      </div>
    </div>
    <div class="item" v-for="(item, index) in orderList" :key="index">
      <div class="item-imgbox">
        <remote-image mode="widthFix" className="item-image" :src="item.goods ? item.goods.image : ''" />
      </div>
      <div class="dis-flex">
        <div>
          <div class="marbot">{{item.goods && item.goods.name}}</div>
          <div>{{item.longSize}}*{{item.goods && item.goods.wideSize}}</div>
        </div>
        <div class="text-ri">
          <div class="marbot"> 退还押金:<text class="item-amount">{{item.depositPrice}}</text></div>
          <text class="delete" v-if="item.status ==='AE'">删除</text>
          <text class="return" v-if="item.status === 'RT'">退还</text>
        </div>
      </div>
    </div>
    <div class="history" @click="toHistoryPage">查看历史记录></div>
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
          <div class="tips_box">
            <p class="clr_text">总计: {{orderTotal}}</p>
          </div>
        </div>
        <template v-if="!showLogistics">
          <div class="inner_ri" @click="pay" v-if="orderTotal != 0">去结算</div>
          <div class="inner_ri dis" v-else>去结算</div>
        </template>
        <div class="inner_ri dis" @click="logistics" v-else-if="!!orderId">物流中</div>
        <div class="inner_ri dis" v-else>去结算</div>
      </div>
    </div>
    <div class="mask" v-if="popShow">
      <div class="mask-inner">
        <div class="mask-inner-title">
          物流状态
          <i @click="closePop">关闭</i>
        </div>
        <div class="mask-inner-content">
          <ul class="list" v-if="!noLogisticsInfo">
            <li v-for="(item,index) in showList" :key="index" :class="{active: item.status === 1 , last : index === 3}">
              <div class="info-middle">{{ item.label }}</div>
              <div class="info-le">
                <p class="time">{{ item.time }}</p>
                <p class="date">{{ item.date }}</p>
                <p class="count" v-if="index == 3 ? true : false">(预计2天)</p>
                <p class="count" v-else-if="index == 0 ? true : false"></p>
                <p class="count" v-else>(预计1天)</p>
              </div>
              <div class="status-icon" :class="{active : item.status == 1}">{{ index === 0 ? "G" : index === 1 ? "T" : index === 2 ? "S" : "A" }}</div>
            </li>
          </ul>
          <div v-else>暂无物流信息</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import remoteImage from '@/components/remoteImage'

export default {
  components: {
    remoteImage
  },
  data () {
    return {
      // datalist: [
      //   {url:"http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: 'thelastsupper',size: '60cm*60cm',amount: '200', isreturn: 'true' },
      //   {url:"http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: 'thelastsupper',size: '60cm*60cm',amount: '200', isreturen: 'false'}
      // ],
      total: 0,
      datalist: [],
      showList: [],
      popShow: false,
      noLogisticsInfo: true
    }
  },
  created () {

  },
  mounted () {
    // for (var i = 0; i < this.showList.length; i++) {
    //   this.showList[i].date =  this.showList[i].dateTimes.substring(5, 10);
    //   this.showList[i].time =  this.showList[i].dateTimes.substring(11, 16);
    // }

    const getOrderTotal = (orders) => {
      return orders.reduce((acc, v) => {
        // if(v.status && v.status==='AE'){
        //   acc += v['depositPrice']
        // }
        // if (v.status && v.status ==='RT') {
          acc -= v['depositPrice']
        // }
        return acc
      }, 0)
    }

    wx.getStorage({
      key: 'id',
      success: (res) => {
        this.getCurrentData(res.data)
          .then(([payGoods, orders]) => {
              // orders === getters.orderList
              let total = payGoods.reduce((acc, v) =>  acc + v['depositPrice'], 0)
              console.log(total);
              console.log(getOrderTotal(orders));
              total += getOrderTotal(orders);

              this.setTotal(total);
          })
          .catch(v => console.log(v))
      },
      fail: (res) => {
        if(res.errMsg === 'getStorage:fail data not found') {
          this.getCurrentOrders()
            .then(orders => {
              this.setTotal(getOrderTotal(orders));
            })
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      payGoods: 'goods/waitPayList',
      orderList: 'myGallery/orderList',
      logisticsInfo: 'myGallery/logisticsInfo',
      orderId: 'myGallery/orderId',
      orderTotal: 'myGallery/orderTotal',
      showLogistics: 'myGallery/showLogistics'
    })
  },
  methods: {
    ...mapActions({
      getLocalGoods: 'goods/getPayGoods',
      getCurrentOrders: 'myGallery/getCurrentOrders',
      setTotal: 'myGallery/setTotal',
      getOrderLogistics: 'myGallery/getOrderLogistics'
    }),
    toHistoryPage() {
      this.$router.push('/pages/myGallery/historyRecord')
    },
    pay() {
      this.$router.push('/pages/myGallery/payPage')
    },
    logistics() {
      this.getOrderLogistics({id: this.orderId})
          .then(v => {
            // 数据读取后
             console.log(this.logisticsInfo)
            if (this.logisticsInfo.length > 0) {
              console.log( this.logisticsInfo)
              this.noLogisticsInfo = false;
              this.showList = this.logisticsInfo;
              for (var i = 0; i < this.showList.length; i++) {
                if(this.showList[i].datetime) {
                  this.showList[i].date =  this.showList[i].datetime.substring(5, 10);
                  this.showList[i].time =  this.showList[i].datetime.substring(11, 16);
                }
              };
              this.popShow = true;
            } else {
              this.noLogisticsInfo = true;
              this.popShow = true;
            }
          })
    },
    toHomePage() {
      this.$router.push('/pages/home/index')
    },
    closePop() {
      this.popShow = false;
    },
    getCurrentData(goodsIds) {
      return Promise.all([
        this.getLocalGoods({id: goodsIds}),
        this.getCurrentOrders()
      ])
    }
  }
}
</script>
<style>
  .wrap{
    background: #f5f5f5;
    padding: 10rpx 0;
  }
  .item{
    width: 100%;

    margin: 30rpx auto;
    background: #fff;
  }
  .item-imgbox{
    padding-top: 20rpx;
    text-align: center;
  }

  .item-image{
    width: 90%;
  }
  .item-amount::before{
    content: "￥";
  }
  .item-amount{
    color: #ea6f6c;
  }
  .marbot{
    margin-bottom: 20rpx;
  }
  .dis-flex{
    width:90%;
    font-size: 24rpx;
    margin: 20rpx auto;
    padding-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .text-ri{
    text-align: right;
  }
  .delete{
    color:#a5a5a5;
    text-align: center;
    border: 1px solid #f29c37;
    border-radius: 12rpx;
    padding: 0 40rpx;
  }
  .return{
    background: #f29c37;
    text-align:center ;
    color: #fff;
    border-radius: 12rpx;
    padding: 0 40rpx;
  }
  .history{
    text-align: center;
    margin-bottom: 100rpx;
  }
  .bottom{
    position: fixed;
    bottom: 0;

    width: 100%;
    background: #fff;
    display: flex;
    text-align: center;
  }
  .home{
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
  }
  .service{
    height: 80rpx;
    line-height: 80rpx;
  }
  .total{
    flex:3;
    height: 80rpx;
    line-height: 80rpx;
  }
  .pay{
    flex:2;
    background: #f29c37;
    color:#fff;
    height: 80rpx;
    line-height: 80rpx;
  }
  .pay-disabled {
    background: #ccc;
  }
  .mask {
    width: 100%;
    height: 100%;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.25);
  }
  .mask::before {
    content: "";
    /* width: 100%; */
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .mask-inner {
    width: 90%;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    border-radius: 16px;
  }
  .mask-inner-title {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    background-color: coral;
    position: relative;
  }
  .mask-inner-title i {
    display: block;
    height: 40rpx;
    line-height: 40rpx;
    position: absolute;
    top: 1px;
    bottom: 1px;
    right: 20rpx;
    margin: auto;
  }
  .mask-inner-content {
    min-height: 200rpx;
    padding: 100rpx 0 50rpx;
    background-color: #fff;
  }
  .mask-inner-content .list {
    padding-left: 25%;
  }
  .mask-inner-content .list li {
    min-height: 115rpx;
    padding: 0 36rpx;
    position: relative;
    border-left: 1rpx solid #eee;
  }
  .list li.active {
    border-left: 1px dashed #eee;
  }
  .list li.last {
    border-color: #fff;
  }
  .list li .info-middle {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #333;
    position: absolute;
    top: -20rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list li .info-le {
    width: 100rpx;
    text-align: center;
    font-size: 28rpx;
    color: #333;
    position: absolute;
    left: -25%;
    top: -20rpx;
  }
  .info-le .time {
    height: 32rpx;
    line-height: 32rpx;
    font-size: 24rpx;
    color: #666;
  }
  .info-le .date {
    height: 28rpx;
    line-height: 28rpx;
    font-size: 20rpx;
    color: #999;
  }
  .info-le .count {
    height: 28rpx;
    line-height: 28rpx;
    font-size: 20rpx;
    color: #666;
  }
  .list li .status-icon {
    width: 40rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    color: #666;
    font-size: 24rpx;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 100%;
    position: absolute;
    top: -24rpx;
    left: -24rpx;
  }
  .list li .status-icon.active {
    border-color: coral;
    background-color: coral;
    color: #fff;
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
    width: 65%;
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
    width: 35%;
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
