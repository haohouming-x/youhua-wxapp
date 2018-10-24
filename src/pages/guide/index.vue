<template>
  <div>
    <div>
      <image class="head-img" :src="guide.url" mode="widthFix" />
    </div>
    <div class="content">
      <div>使用流程</div>
      <div>会员期内不限次数下单</div>
      <div class="dis-flex">
        <div>选油画</div>
        <div>待收货</div>
        <div>放家里</div>
        <div>约归还</div>
        <div>上门取</div>
      </div>
      <div class="text-cen">会员期内循环租借</div>
      <div>优势</div>
      <div class="ad-box">
        <div class="over" v-for="(item,index) in  advantageList" :key="index">
          <div v-if="index %2 != 1">
            <div class="flo-left  ad-img-box"><image class="ad-img" :src="item.url" /></div>
            <div class="flo-left ad-content">
              <div>{{item.name}}</div>
              <div>{{item.title}}</div>
            </div>
          </div>
          <div v-else>
            <div class="flo-left ad-content">
              <div>{{item.name}}</div>
              <div>{{item.title}}</div>
            </div>
            <div class="flo-left  ad-img-box"><image class="ad-img" :src="item.url" /></div>
            
          </div>
        </div>
      </div>
      <div>
        <div>大家都在用</div>
        <div></div>
      </div>

    </div>
    <div class="bottom">
      开通会员租油画
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      guide: { 
        url: 'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg'
      },
      advantageList: [
        {url: 'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg', name: '快递往返免邮费',title:'深圳、上海可到,一键归还,快递费我们承担,17:00前下单当日发货'},
        {url: 'http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg', name: '快递往返免邮费',title:'深圳、上海可到,一键归还,快递费我们承担,17:00前下单当日发货'}
      ]
    }
  },
  created() {},
  methods: {}
}
</script>
<style>
  .head-img{
    width: 100%;
  }
  .content{
    width: 90%;
    margin: 0 auto;
  }
  .over{
    overflow: hidden;
  }
  .flo-left{
    float: left;
  }
  
  .dis-flex{
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
  .text-cen{
    text-align: center;
  }
  .ad-box{
    margin-bottom: 100rpx;
  }
  .ad-img{
    width: 100rpx;
    height: 100rpx;
    margin-top: 20rpx;
    border-radius: 50%;
  }
  .ad-img-box{
    width:20%;
  }
  .ad-content{
    width: 80%;
  }
  .bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #f29c37;
    text-align: center;
    padding: 20rpx;
    color: #fff;
  }
</style>
