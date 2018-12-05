<template>
  <div class="history_record">
    <ul class="hr_list" v-if="orderList.length > 0">
      <li class="hr_item" v-for = "item in orderList" :key = "item">
        <div class="img_title">
          {{ item.goods && item.goods.name }}
          <div class="times">{{ item.createdAt }}</div>
        </div>
        <remote-image mode="widthFix" :src="item.goods ? item.goods.image : ''" />
      </li>
    </ul>
    <ul class="hr_list" v-else>
      <li class="hr_item hr_none">暂无历史记录</li>
    </ul>
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
    mounted() {
      this.getOrderList().then(v => {
      console.log(this.orderList)
       });
    },
    computed: {
      ...mapGetters({
        orderList: 'myGallery/completedOrderList',
      })
    },
    methods: {
      ...mapActions({
        'getOrderList': 'myGallery/getCompletedOrders'
      })
    }
  }
</script>

<style lang="postcss">
  page {
    background-color: #f5f5f5;
  }

  .hr_list {
    padding: 0 40rpx;
  }

  .hr_list .hr_item {
    margin-bottom: 20rpx;
  }

  .hr_list .hr_item .img_title {
    padding: 20rpx 0 20rpx 10rpx;
    line-height: 32rpx;
    font-size: 32rpx;
    color: #333;
    position: relative;
  }

  .img_title .times {
    line-height: 24rpx;
    font-size: 24rpx;
    color: #666;
    position: absolute;
    right: 0;
    bottom: 20rpx;
  }

  .hr_list .hr_item img {
    width: 100%;
    height: 480rpx;
    object-fit: cover;
    display: block;
    border-radius: 10rpx;
  }

  .hr_list .hr_none {
    text-align: center;
    color: #ccc;
    margin-top: 200rpx;
  }
</style>
