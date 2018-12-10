<template>
  <div class="wrap">
    <div class="card">
      <div> {{member.name}}</div>
      <div>{{member.presentPrice}}元 <text>{{member.originalPrice}}元</text> </div> 
      <div>自购买当日起90天内免费更换油画</div>
    </div>
    <div class="just">
      <text>原价</text>
      <text class="money">{{member.originalPrice}}</text>
    </div>
    <div class="just">
      <text>现金</text>
      <text class="money">{{member.presentPrice}}</text>
    </div>
    <div class="desc-box">
      <div>什么是共享油画季卡会员</div>
      <div>MEMBERSHIPLAN</div>
    </div>
    
    <div class="planbox">
      <div v-for="(item, index) in planlist" :key="index">
          <div class="text-cen"><image class="plan-img" :src="item.url" /></div>
        <div class="text-cen">{{item.name}}</div>
        <div>{{item.title}}</div>
        <div>{{item.describe}}</div>
      </div>
    </div>
    <div class="bottom">
      立即支付(<text class="money">{{member.presentPrice}}</text>)

    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return{
      planlist: [
        {url:'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: '无限换租',title:'租够再下一单',describe:'开通包月会员'},
        {url:'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: '无限换租',title:'租够再下一单',describe:'开通包月会员'},
        {url:'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: '无限换租',title:'租够再下一单',describe:'开通包月会员'}
      ],
      member: {}
    }
  },
  computed: {
    ...mapGetters({
      list: 'member/list'
    })
  },
  methods: {
    ...mapActions({
      getmember: 'member/getmarketings'
    })
  },
  created() {

  },
  mounted () {
    this.getmember().then((res) => {
      this.member = this.list[0]
      console.log(this.member)
    })
  }
}
</script>
<style>
  .wrap{
    padding-top: 50rpx;
  }
  .card{
    
    background: #34353c;
    width: 80%;
    margin: 0 auto;
    color: #fff;
    padding: 20rpx ; 
    border-radius: 20rpx;
    
  }
  .planbox{
    display: flex;
    margin: 20rpx 0;
  }
  .planbox div{
    flex: 1;
    margin: 1%;
  }
  .plan-img{
    width: 100rpx;
    height: 100rpx;
    
    border-radius: 50% ;
  }
  .text-cen{
    text-align: center;
  }
  .desc-box{
    text-align: center;
    margin: 20rpx 0;
  }
  .just{
    display: flex;
    width: 90%;
    margin: 30rpx auto;
    justify-content: space-between;
  }
  .money::before{
    content: "￥";
  }
  .bottom{
    width: 100%;
    position: fixed;
    bottom: 0;
    color: #fff;
    padding: 20rpx 0;
    background: #f29c37;
    text-align: center;
  }
</style>
