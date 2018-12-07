<template>
    <div class="pay_page">
      <div class="pay_info" @click="toAddress">
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
        <li v-for = "item in waitPayGoods" :key = "item">
          <div class="img_box">
            <remote-image mode="widthFix" className="item-image" :src="item.image" />
          </div>
          <div class="p-info_box">
            <div class="name">{{ item.name }}</div>
            <div class="hold_prc">押金：￥{{ item.depositPrice }}</div>
            <div class="old_prc">￥{{ item.marketPrice }}</div>
          </div>
          <div class="info_status">待寄送</div>
        </li>
        <li v-for = "item in orderList" :key = "item">
          <div class="img_box">
            <remote-image mode="widthFix" className="item-image" :src="item.goods ? item.goods.image : ''" />
          </div>
          <div class="p-info_box">
            <div class="name">{{ item.goods && item.goods.name }}</div>
            <div class="hold_prc">押金：￥{{ item.depositPrice }}</div>
            <div class="old_prc">￥{{ item.goods && item.goods.marketPrice }}</div>
          </div>
          <div class="info_status clr-orange">待退还</div>
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
              <button open-type="contact" plain="true" size="21" session-from="weapp" style="border: 0; padding:0 3rpx;">
                <img src="../../assets/images/icon2.png" alt="">
                <p class="btn_text">
                  客服
                </p>
              </button>
            </div>
            <div class="tips_box">
              <p class="clr_text">押金：￥{{orderTotal}}</p>
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
  import remoteImage from '@/components/remoteImage'

  export default {
    components: {
      remoteImage
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo/userInfo',
        userAddress: 'address/userAddress',
        hasUserAddress: 'address/hasUserAddress',
        waitPayGoods: 'goods/waitPayList',
        orderTotal: 'myGallery/orderTotal',
        orderList: 'myGallery/orderList'
      }),
      payOrders() {
        return this.orderList.map(v => ({
          status: 'RT',
          goodsId: v.goods.id
        }))
      },
      payLocals() {
        return this.waitPayGoods.map(v => ({
          status: 'AE',
          goodsId: v.id
        }))
      }
    },
    onShow() {
      if(this.orderTotal === 0) this.$router.push('/pages/myGallery/index')
    },
    mounted() {
      this.getAddress().then(v => {
        console.log(this.hasUserAddress);
        if (!this.hasUserAddress) {
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
    },
    methods: {
      toHomePage() {
        this.$router.push('/pages/home/index')
      },
      payNow() {
        if (!this.hasUserAddress) {
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
          this.postOrder()
            .then(v => {
              console.log(v)
              return this.payOrder(v.id)
            })
            .then(res => {
              // res 为jssdk需要的参数
              const {timestamp: timeStamp, ...other} = res;

              wx.requestPayment({
                 ...other,
                 timeStamp,
                 success: () => {
                   console.log('ok')
                   wx.removeStorage({key: 'id'});
                 }
              })
            })
        }
      },
      postOrder() {
        const data = [...this.payLocals, ...this.payOrders];

          if(data.length <= 0 ) {
            wx.showToast({
              title: '请先选择商品',
              icon: 'error',
              duration: 1500
            })
          }

          const {
            name: consigneeName,
            contact: consigneeConcat,
            province, city, district, detailedAddress
          } = this.userAddress;

          const consigneeAddress = province + city + district + detailedAddress;

          return this.postUserOrder({
            orderBill: data,
            consigneeName,
            consigneeConcat,
            consigneeAddress
          })
      },
      toAddress() {
          this.$router.push({path: '/pages/address/address'});
      },
      changeAddress() {
        if (this.hasUserAddress) {
          this.toAddress();
        }
      },
      ...mapActions({
        getAddress: 'address/getUserAddress',
        postUserOrder: 'myGallery/postUserOrder',
        payOrder: 'pay/order'
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
  .order_list li .img_box img, .item-image {
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
