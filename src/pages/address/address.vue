<template>
  <div class="new_address">
    <ul class="address_list">
      <li>
        <label for="">收件人姓名</label>
        <input type="text" placeholder="请填写" :value="name">
      </li>
      <li>
        <label for="">电话号码</label>
        <input type="tel" placeholder="请填写" class="middle" :value="contact">
        <div class="send_btn" @click="getCode">{{ countDown }}</div>
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
        <input type="text" placeholder="请填写" >
      </li>
    </ul>

    <div class="submit_outer">
      <div class="submit_btn">确定</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        region: ['广东省','广州市','海珠区'],
        customItem: '全部',
        canGet: true,
        countDown: '获取验证码'
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo/userInfo',
        userAddress: 'address/userAddress',
      }),
    },
    mounted() {
      
    },
    methods: {
      change(e) {
        console.log('picker发送选择改变，携带值为',  e.mp.detail.value)
        // this.region = e.detail.value
      },
      getCode() {
        if (this.canGet) {
          var that = this;
          that.canGet = false;
          that.countDown = 5;
          var timer = setInterval(function() {
            that.countDown = that.countDown - 1;
            if (that.countDown <= 0) {
              clearInterval(timer);
              timer = null;
              that.countDown = "重新获取";
              that.canGet = true;
            }
          },1000)
        }
      },
      submitAddress() {
        // this.newAddress({

        // })
      },
      ...mapActions({
        newAddress: 'address/newAddress'
      }),
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

  .submit_outer {
    height: 80rpx;
  }

  .submit_btn {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #fff;
    background-color: coral;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
