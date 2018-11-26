<template>
  <div class="new_address">
    <ul class="address_list">
      <li>
        <label for="">收件人姓名</label>
        <input type="text" placeholder="请填写">
      </li>
      <li>
        <label for="">电话号码</label>
        <input type="tel" placeholder="请填写" class="middle">
        <div class="send_btn">获取验证码</div>
      </li>
      <li>
        <label for="">验证码</label>
        <input type="text" placeholder="请填写">
      </li>
      <li>
        <label for="">所在城市</label>
        <picker mode="region" @change="change" :value="region" class="r_picker">
          <view class="region">
            {{region[0]}},{{region[1]}},{{region[2]}}
          </view>
        </picker>
      </li>
      <li>
        <label for="">详细地址</label>
        <input type="text" placeholder="请填写">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        region: ['广东省','广州市','海珠区'],
        customItem: '全部'
      }
    },
    mounted() {
      
    },
    methods: {
      change: function (e) {
        console.log('picker发送选择改变，携带值为',  e.mp.detail.value)
        // this.region = e.detail.value
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .new_address {
    background-color: #fff;
  }

  .address_list {
    margin-bottom: 100rpx
  }

  .address_list li {
    padding: 20rpx;
    border-bottom: 1rpx solid #eee;
  }

  .address_list li label {
    width: 150rpx;
    height: 60rpx;
    line-height: 60rpx;
    display: inline-block;
    vertical-align: middle;
    font-size: 28rpx;
    margin-right: 30rpx;
  }

  .address_list li input {
    width: 535rpx;
    font-size: 28rpx;
    display: inline-block;
    vertical-align: middle;
  }

  .address_list li input.middle {
    width: 315rpx;
  }

  .address_list li .send_btn {
    width: 222rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    font-size: 24rpx;
    color: #fff;
    background-color: coral;
    border-radius: 60rpx;
  }
  
  .address_list li .r_picker {
    width: 535rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: left;
    font-size: 28rpx;
    display: inline-block;
    vertical-align: middle;
  }
</style>
