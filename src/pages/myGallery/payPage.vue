<template>
    <div class="pay_page">
      <div class="pay_info">
        <img src="../../assets/images/icon3.png" alt="">
        <div class="info_box">
          <div class="info-box_top">
            <label>收件人：</label>
            <span>{{ userName }}</span><span>{{ userNumber }}</span>
          </div>
          <div class="info-box_bottom">
            <label>收件地址：</label>
            <span>{{ userAddress }}</span>
          </div>
        </div>
      </div>
      <ul class="order_list">
        <li v-for = "item in orderList" :key = "item">
          <div class="img_box">
            <img src="../../assets/images/img1.png" alt="">
          </div>
          <div class="info_box">
            <div class="name">{{ item.name }}</div>
            <div class="hold_prc">押金：￥{{ item.hold_prc }}</div>
            <div class="old_prc">￥{{ item.old_prc }}</div>
          </div>
          <div class="info_status" :class="item.status === 0 ? 'clr-orange' : ''">{{ item.status == 0 ? '待退还' : '待寄送' }}</div>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: "王霞",
        userNumber: "12321342121",
        userAddress: "广东省广州市荔湾区",
        orderList: [
          {
            name: "油画名称",
            hold_prc: "300",
            old_prc: "2800",
            status: 0
          },{
            name: "油画名称",
            hold_prc: "300",
            old_prc: "2800",
            status: 1
          }
        ]
      }
    }
  }
</script>

<style lang="postcss">
  .pay_info {
    padding: 40rpx 30rpx;
    border-bottom: 20rpx solid #f5f5f5;
    background-color: #fff;
  }

  .pay_info > img {
    width: 40rpx;
    height: 40rpx;
    display: inline-block;
    vertical-align: middle;
  }

  .info_box {
    margin-left: 20rpx;
    display: inline-block;
    vertical-align: middle;
  }

  .info-box_top {
    margin-bottom: 10rpx;
    color: #666;
    font-size: 32rpx;
  }

  .info-box_top span {
    margin-right: 30rpx;
  }

  .info-box_bottom {
    color: #666;
    font-size: 32rpx;
  }

  .order_list {
    background-color: #fff;
    padding: 60rpx 40rpx;
  }

  .order_list li {
    margin-bottom: 60rpx;
    border-radius: 20rpx;
    box-shadow: 0 4px 10px 2px rgba(0, 0, 0, .06);
    height: 200rpx; 
    position: relative;
  }

  .order_list li .img_box {
    width: 200rpx;
    height: 200rpx;
    float: left;
    margin-right: 30rpx;
    position: relative;
    border-radius: 20rpx;
    overflow: hidden;
  }

  .order_list li .img_box img {
    width: 200rpx;
    height: 200rpx;
    object-fit: cover;
    display: block;
  }

  .order_list li .info_box .name {
    line-height: 36rpx;
    font-size: 36rpx;
    color: #333;
    margin: 30rpx 0;
  }

  .order_list li .info_box .hold_prc {
    line-height: 28rpx;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 30rpx;
  }

  .order_list li .info_box .old_prc {
    width: 100rpx;
    line-height: 28rpx;
    font-size: 28rpx;
    color: #f7bf64;
    position: relative;
  }

  .info_box .old_prc::after {
    content: " ";
    width: 100%;
    height: 1px;
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #f7bf64;
  }

  .info_status {
    height: 24rpx;
    line-height: 24rpx;
    font-size: 24rpx;
    color: #666;
    position: absolute;
    bottom: 25rpx;
    right: 25rpx;
  }

  .info_status.clr-orange {
    color: #f7bf64;
  }
</style>

