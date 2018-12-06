<template>
  <div>
    <div class="img_box">
      <image class="head-img" :src="guide.url" mode="widthFix" />
    </div>
    <div class="content">
      <div class="use_tt">使用流程</div>
      <div class="use_s_tt">会员期内不限次数下单</div>
      <div class="dis-flex">
        <div class="u_box">
          <div class="u_icon">X</div>
          <p class="u_text">选油画</p>
        </div>
        <div class="u_box">
          <div class="u_icon">D</div>
          <p class="u_text">待收货</p>
        </div>
        <div class="u_box">
          <div class="u_icon">F</div>
          <p class="u_text">放家里</p>
        </div>
        <div class="u_box">
          <div class="u_icon">Y</div>
          <p class="u_text">约归还</p>
        </div>
        <div class="u_box last">
          <div class="u_icon">S</div>
          <p class="u_text">上门取</p>
        </div>
      </div>
      <div class="text-cen">会员期内循环租借</div>
      <div class="b_title">优势</div>
      <div class="ad-box">
        <div class="over" v-for="(item,index) in  advantageList" :key="index">
          <div v-if="index %2 != 1">
            <div class="flo-left  ad-img-box"><image class="ad-img" :src="item.url" /></div>
            <div class="flo-left ad-content">
              <div class="n_tt">{{item.name}}</div>
              <div class="n_info">{{item.title}}</div>
            </div>
          </div>
          <div v-else>
            <div class="flo-left ad-content">
              <div class="n_tt">{{item.name}}</div>
              <div class="n_info">{{item.title}}</div>
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
    <div class="bottom" @click="beMember()">
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
  methods: {
    beMember() {
      this.$router.push('/pages/member/index')
    }
  }
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
    margin-bottom: 48rpx;
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
    font-size: 24rpx;
    color: #ccc;
    margin: 30rpx 0 80rpx;
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
  .use_tt {
    font-size: 32rpx;
    color: #333;
    margin-bottom: 24rpx;
  }
  .use_s_tt {
    font-size: 24rpx;
    color: #666;
    margin-bottom: 24rpx;
  }
  .u_box {
    position: relative;
  }
  .u_box::after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
    transform: matrix(.71,.71,-.71,.71,0,0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: -15px;
  }
  .u_box.last::after {
    display: none;
  }
  .u_icon {
    width: 80rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #666;
    border: 1px solid #666;
    border-radius: 100%;
    display: block;
    margin: auto;
  }
  .u_text {
    font-size: 24rpx;
    color: #333;
    text-align: center;
    margin-top: 12rpx;
  }
  .n_tt {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 12rpx;
  }
  .n_info {
    line-height: 40rpx;
    font-size: 24rpx;
    color: #ccc;
  }
  .b_title {
    font-size: 32rpx;
    color: #333;
    margin-bottom: 24rpx;
  }
  .img_box {
    margin-bottom: 24rpx;
  }
</style>
