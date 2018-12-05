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
          <div class="marbot"> 退还押金:<text class="item-amount">{{item.depositPrice}}</text></div>
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
          <div class="marbot"> 退还押金:<text class="item-amount">{{item.goods && item.goods.depositPrice}}</text></div>
          <text class="delete" v-if="item.status ==='AE'">删除</text>
          <text class="return" v-if="item.status === 'RT'">退还</text>
        </div>
      </div>
    </div>
    <div class="history" @click="toHistoryPage">查看历史记录></div>
    <div class="bottom">
      <div class="home" @click="toHomePage">首页</div>
      <contact-button type="default-light" size="18" session-from="weapp" class="service">
        客服
      </contact-button>
      <div class="total">总计: <text class="item-amount">{{total}}</text></div>
      <template v-if="canPay">
        <div class="pay" @click="pay" v-if="total > 0">去结算</div>
        <div class="pay pay-disabled" v-else>去结算</div>
      </template>
      <div class="pay pay-disabled" @click="logistics" v-else>物流中</div>
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
      datalist: []
    }
  },
  created () {

    },
    mounted () {
      const getOrderTotal = (orders) => {
        return orders.reduce((acc, v) => {
          if(v.status && v.status==='AE'){
            acc += v['depositPrice']
          }
          if (v.status && v.status ==='RT') {
            acc -= v['depositPrice']
          }
          return acc
        }, 0)
      }

      wx.getStorage({
        key: 'id',
        success: (res) => {
          this.getCurrentData(res.data)
            .then(([payGoods, orders]) => {
               let total = payGoods.reduce((acc, v) =>  acc + v['depositPrice'], 0)
               total += getOrderTotal(orders);

               this.total = total;
            })
        },
        fail: (res) => {
          if(res.errMsg === 'getStorage:fail data not found') {
            this.getCurrentOrders()
              .then(orders => {
                this.total = getOrderTotal(orders);
              })
          }
        }
      })
    },
    computed: {
      ...mapGetters({
        payGoods: 'goods/waitPayList',
        orderList: 'myGallery/orderList',
        // TODO 挂载到视图
        logisticsInfo: 'myGallery/logisticsInfo',
        orderId: 'myGallery/orderId',
        canPay: 'myGallery/canPay'
      })
    },
    methods: {
       ...mapActions({
         getLocalGoods: 'goods/getPayGoods',
         getCurrentOrders: 'myGallery/getCurrentOrders',
         getOrderLogistics: 'myGallery/getOrderLogistics'
       }),
      toHistoryPage() {
        this.$router.push('/pages/myGallery/historyRecord')
      },
      pay() {
        this.$router.push('/pages/myGallery/payPage')
      },
      logistics() {
        // TODO 弹框控制(发送前显示或数据读取后)

        this.getOrderLogistics({id: this.orderId})
           .then(v => {
              // 数据读取后
              // console.log(this.logisticsInfo)
           })
      },
      toHomePage() {
        this.$router.push('/pages/home/index')
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
</style>
