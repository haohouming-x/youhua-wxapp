<template>
  <div class="history_record">
    <ul class="hr_list" v-if="history_list != ''">
      <li class="hr_item" v-for = "item in history_list" :key = "item">
        <div class="img_title">
          {{ item.name }}
          <div class="times">{{ item.times }}</div>
        </div>
        <img :src = item.imgUrl alt="">
      </li>
    </ul>
    <ul class="hr_list" v-else>
      <li class="hr_item hr_none">暂无历史记录</li>
    </ul>
  </div>
</template>

<script>
   export default {
    data() {
      return {
        history_list: [
          // {
          //   name: "油画1",
          //   times: "2018-10-26 23:12",
          //   imgUrl: "../../assets/images/img1.png"
          // },{
          //   name: "油画2",
          //   times: "2018-10-26 23:12",
          //   imgUrl: "../../assets/images/img1.png"
          // },{
          //   name: "油画3",
          //   times: "2018-10-26 23:12",
          //   imgUrl: "../../assets/images/img1.png"
          // }
        ]
      }
    },
    mounted() {
      
    },
    methods: {
      
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
