<template>
  <div class="payed">
    <div class="pay_icon">
      <img src="../../assets/images/pay-success.png" alt="">
    </div>
    <div class="pay_text">支付成功</div>
    <div class="detail_btn" @click="$router.push({path: '/pages/myGallery/index'})">订单详情</div>
    <div class="back_btn" @click="$router.push({path: '/pages/home/index', reLaunch: true})">返回首页</div>
  </div>
</template>

<script>

</script>

<style lang='postcss'>
  page {
    background-color: #f5f5f5;
  }

  .pay_icon {
    padding: 60rpx 0 50rpx;
  }

  .pay_icon img {
    width: 160rpx;
    height: 160rpx;
    display: block;
    margin: auto;
  }

  .pay_text {
    margin-bottom: 50rpx;
    line-height: 32rpx;
    text-align: center;
    font-size: 32rpx;
  }

  .detail_btn {
    width: 480rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    color: #fff;
    background-color: coral;
    border: 1px solid coral;
    margin: 0 auto 30rpx;
    border-radius: 10rpx;
  }

  .back_btn {
    width: 480rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    background-color: #fff;
    border: 1px solid #ccc;
    margin: auto;
    border-radius: 10rpx;
  }
</style>
