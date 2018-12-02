<template>
  <div class="wrap">
    <div class="item" v-for="(item, index) in paygoods" :key="index">
      <div class="item-imgbox"> <image mode="widthFix" class="item-image" :src="item.goods ? item.goods.image : ''  " /></div>
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
    <div class="item" v-for="(item, index) in orderlist" :key="index">
      <div class="item-imgbox"> <image mode="widthFix" class="item-image" :src="item.goods ? item.goods.image : ''" /></div>
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
    <div class="history" @click="toHistoryPage">查看历史记录></div>
    <div class="bottom">
      <div class="home" @click="toHomePage">首页</div>
      <div class="service">客服</div>
      <div class="total">总计: <text class="item-amount">{{total}}</text></div>
      <div class="pay" @click="pay">去结算</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {  
  data () {
    return {
      // datalist: [
      //   {url:"http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: 'thelastsupper',size: '60cm*60cm',amount: '200', isreturn: 'true' },
      //   {url:"http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: 'thelastsupper',size: '60cm*60cm',amount: '200', isreturen: 'false'}
      // ],
      total: 0,
      coustomerid: 1,
      datalist: []
    }
  },
  created () {
    
    },
    mounted () {
      let  that= this
      let total =0
      let ortotal=0
      wx.getStorage({
        key: 'id',
        success(res ) {
          // console.log(res.data)
            that.getgoods({id: res.data}).then((res) => {
              // console.log(res)
              res.forEach((value,index,arr) => {
                // console.log(res[index]['console.log(that.total)'])
                total += value['depositPrice']  
              })
              console.log(total)
              that.total =total
            })
            
        }
      })
      this.getorderlist({id:this.coustomerid,status:['WS','AS']}).then((res)=> {
        // console.log(res)
        res.forEach((value,index,arr)=> {
          // console.log(value.status)
          if(value.status&& value.status==='AE'){
            ortotal +=value['depositPrice']
          }
          if (value.status&&value.status ==='RT') {
            ortotal -= value['depositPrice']
          }
          
        })
        console.log('订单：' + ortotal)
        console.log('第一次：' +that.total)
        that.total += ortotal
        console.log('第二次+：' +that.total)
      })

    },
    computed: {
      ...mapGetters({
        paygoods: 'myGallery/list',
        orderlist: 'myGallery/orderlist'
      })
    },
    methods: {
       ...mapActions({
         getgoods: 'myGallery/getgoods',
         getorderlist: 'myGallery/getorderlist'
       }),
      toHistoryPage() {
        this.$router.push('/pages/myGallery/historyRecord')
      },
      pay() {
        this.$router.push('/pages/myGallery/payPage')
      },
      toHomePage() {
        this.$router.push('/pages/home/index')
      },
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
    flex: 1;
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
</style>
