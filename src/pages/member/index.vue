<template>
  <div class="wrap">
    <div class="card">
      <div class="card_title"> 瑙琥共享油画会员卡</div>
      <div class="card_prc">现价：240元 <text class="card_prc_o">原价：300元</text> </div> 
      <div class="card_info">自购买当日起90天内免费更换油画</div>
    </div>
    <div class="just">
      <text>原价</text>
      <text class="money">4555</text>
    </div>
    <div class="just">
      <text>现金</text>
      <text class="money">300</text>
    </div>
    <div class="desc-box">
      <div class="chn_title">什么是共享油画季卡会员</div>
      <div class="eng_title">MEMBERSHIPLAN</div>
    </div>
    
    <div class="planbox">
      <div v-for="(item, index) in planlist" :key="index">
        <div class="text-cen"><image class="plan-img" :src="item.url" /></div>
        <div class="text-cen m_name">{{item.name}}</div>
        <div class="m_title">{{item.title}}</div>
        <div class="m_describe">{{item.describe}}</div>
      </div>
    </div>
    <div class="bottom">
      立即支付(<text class="money">199</text>)

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return{
      planlist: [
        {url:'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: '无限换租',title:'租够再下一单',describe:'开通包月会员'},
        {url:'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: '无限换租',title:'租够再下一单',describe:'开通包月会员'},
        {url:'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg',name: '无限换租',title:'租够再下一单',describe:'开通包月会员'}
      ]
    }
  },
  methods: {

  },
  created() {

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
    /* margin: 1%; */
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
  .m_name {
    text-align: center;
    font-size: 32rpx;
    margin-bottom: 32rpx;
  }
  .m_title {
    text-align: center;
    font-size: 28rpx;
    color: #ccc;
    margin-bottom: 48rpx;
  }
  .m_describe {
    text-align: center;
    font-size: 28rpx;
    color: #333;
  }
  .chn_title {
    margin: 96rpx 0 12rpx;
  }
  .eng_title {
    color: #ccc;
    font-size: 24rpx;
    margin-bottom: 48rpx;
  }
  .card_title {
    margin-bottom: 32rpx;
  }
  .card_prc {
    font-size: 28rpx;
    margin-bottom: 32rpx;
  }
  .card_prc_o {
    color: #666;
    font-size: 24rpx;
    margin-left: 12rpx;
  }
  .card_info {
    color: #666;
    font-size: 24rpx;
    margin-bottom: 128rpx;
  }
</style>
