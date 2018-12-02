<template>
  <div class="new_address">
    <ul class="address_list">
      <li>
        <label for="">收件人姓名</label>
        <input type="text" placeholder="请填写" :value="name">
      </li>
      <li>
        <label for="">电话号码</label>
        <input type="tel" placeholder="请填写" :value="contact">
        <!-- <input type="tel" placeholder="请填写" class="middle" :value="contact"> -->
        <!-- <div class="send_btn" @click="getCode">{{ countDown }}</div> -->
      </li>
      <!-- <li>
        <label for="">验证码</label>
        <input type="text" placeholder="请填写">
      </li> -->
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
        <input type="text" placeholder="请填写" :value="detailedAddress">
      </li>
      <li>
        <label for="">备注</label>
        <input type="text" placeholder="请填写" :value="remark">
      </li>
    </ul>

    <div class="submit_outer">
      <div class="submit_btn" @click="submitAddress">确定</div>
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
        countDown: '获取验证码',
        addressInfo: {
          name: '',
          contact: '',
          province: '',
          city: '',
          district: '',
          detailedAddress: '',
          remark: '',
        }
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
        this.region = e.mp.detail.value;
        this.addressInfo.province = this.region[0];
        this.addressInfo.city = this.region[1];
        this.addressInfo.district = this.region[2];
      },
      getCode() {
        this.canGet = this.contact === '' ? false : true;
        if (this.canGet) {
          var that = this;
          that.canGet = false;
          that.countDown = 5;
          var timer = setInterval(() => {
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
      submitAddress() { // 提交
        let addressInfo = this.addressInfo;
        let id = this.userInfo.id;
        if (addressInfo.name == '') {
          wx.showToast({
            title: '请输入名称',
            icon: 'none',
            duration: 1500
          })
        } else if (addressInfo.contact == '') {
          wx.showToast({
            title: '请输入手机号码',
            icon: 'none',
            duration: 1500
          })
        } else if (addressInfo.detailedAddress == '') {
          wx.showToast({
            title: '请输入详细地址',
            icon: 'none',
            duration: 1500
          })
        } else {
          this.newAddress({
            id,
            addressInfo
          })
        }
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
    background-color: #f7bf64;
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
    height: 100rpx;
  }

  .submit_btn {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    color: #fff;
    background-color: #f7bf64;
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
