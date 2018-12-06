<template>
    <div class="pay_page">
      <div class="pay_info">
        <img src="../../assets/images/icon3.png" alt="">
        <div class="info_box">
          <div class="info-box_top">
            <label>收件人：</label>
            <span>{{ userAddress.name }}</span><span>{{ userAddress.contact }}</span>
          </div>
          <div class="info-box_bottom">
            <label>收件地址：</label>
            <span>{{ userAddress.provice }}{{ userAddress.city }}{{ userAddress.district }}{{ userAddress.detailedAddress }}</span>
          </div>
        </div>
      </div>
      <ul class="order_list">
        <li v-for = "item in orderList" :key = "item">
          <div class="img_box">
            <img src="../../assets/images/img1.png" alt="">
          </div>
          <div class="p-info_box">
            <div class="name">{{ item.name }}</div>
            <div class="hold_prc">押金：￥{{ item.hold_prc }}</div>
            <div class="old_prc">￥{{ item.old_prc }}</div>
          </div>
          <div class="info_status" :class="item.status === 0 ? 'clr-orange' : ''">{{ item.status == 0 ? '待退还' : '待寄送' }}</div>
        </li>
      </ul>
      <div class="pay_footer">
        <div class="footer_inner">
          <div class="inner_le">
            <div class="footer-le_btn" @click="toHomePage">
              <img src="../../assets/images/icon1.png" alt="">
              <p class="btn_text">首页</p>
            </div>
            <div class="footer-le_btn">
              <img src="../../assets/images/icon2.png" alt="">
              <p class="btn_text">客服</p>
            </div>
            <div class="tips_box">
              <p class="clr_text">押金：￥300</p>
              <p class="clr_text">随时可退</p>
            </div>
          </div>
          <div class="inner_ri" @click="payNow">付款</div>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        address: {},
        // userAddress: "广东省广州市荔湾区",
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
        ],
        orderData: {
          orderBill: []
        }
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo/userInfo',
        userAddress: 'payPage/userAddress',
        orderList: 'myGallery/orderlist'
      }),
    },
    mounted() {
      let id = this.userInfo.id == undefined ? 10010 : this.userInfo.id;
      this.getAddress({id}).then(v => {
        // console.log(this.userAddress);
        if (this.userAddress == "") {
          wx.showModal({
            title: '提示',
            content: '您还没有设置地址',
            confirmText: '立即设置',
            success: res => {
              if (res.confirm) {
                this.$router.push({path: '/pages/address/address'});
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        }
      });
      console.log("订单列表",this.orderList);
      // let list = this.orderList;
      // for (var i in list) {
      //   this.orderData.orderBill.push({status: list[i].status});
      //   console.log(this.orderData);
      // }
    },
    methods: {
      toHomePage() {
        this.$router.push('/pages/home/index')
      },
      payNow() {
        if (this.userAddress == "") {
          wx.showModal({
            title: '提示',
            content: '您还没有设置地址',
            confirmText: '立即设置',
            success: res => {
              if (res.confirm) {
                this.$router.push({path: '/pages/address/address'});
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        } else {
          // 支付TODO
        }
      },
      changeAddress() {
        if (this.userAddress != "") {
          this.$router.push({path: '/pages/address/address'});
        }
      },
      ...mapActions({
        getAddress: 'payPage/getAddress'
      }),
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

  .order_list li .p-info_box {
    overflow: hidden;
  }

  .order_list li .p-info_box .name {
    line-height: 36rpx;
    font-size: 36rpx;
    color: #333;
    margin: 30rpx 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .order_list li .p-info_box .hold_prc {
    line-height: 28rpx;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 30rpx;
  }

  .order_list li .p-info_box .old_prc {
    width: 100rpx;
    line-height: 28rpx;
    font-size: 28rpx;
    color: #f7bf64;
    position: relative;
  }

  .p-info_box .old_prc::after {
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

  .pay_footer {
    height: 100rpx;
  }

  .pay_footer .footer_inner {
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    border-top: 1px solid #eee;
    position: fixed;
    bottom: 0;
    overflow: hidden;
  }

  .footer_inner .inner_le {
    width: 50%;
    float: left;
  }

  .footer_inner .inner_le .footer-le_btn {
    width: 100rpx;
    height: 100rpx;
    position: relative;
    overflow: hidden;
    float: left;
  }

  .footer_inner .inner_le .footer-le_btn::after {
    content: " ";
    width: 1rpx;
    height: 50rpx;
    background-color: #eee;
    position: absolute;
    right: 1rpx;
    top: 1px;
    bottom: 1px;
    margin: auto;
  }

  .footer-le_btn img {
    width: 50rpx;
    height: 50rpx;
    margin: 10rpx auto;
    display: block;
  }

  .footer-le_btn .btn_text {
    font-size: 24rpx;
    line-height: 24rpx;
    text-align: center;
    color: #666;
  }

  .tips_box .clr_text {
    margin-top: 20rpx;
    line-height: 24rpx;
    text-align: center;
    font-size: 24rpx;
    color: #f7bf64;
  }

  .footer_inner .inner_ri {
    width: 50%;
    line-height: 100rpx;
    text-align: center;
    font-size: 36rpx;
    color: #fff;
    float: left;
    background-color: #f7bf64;
  }
</style>

