<template>
  <div class="rule">
    <div class="rule_title">共享油画规则</div>
    <div class="about_msg">
      <div class="msg_title">联系我们</div>
      <ul class="msg_content">
        <li class="msg_item" v-for = "item in msg" :key = "item">
          <label for="">{{item.title}}</label><span>{{item.value}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: [
          {
            title: "拨打客服电话：",
            value: "200-253-4500"
          },{
            title: "客服服务时间",
            value: "08：00~22：00"
          },{
            title: "在官方微信中留言：",
            value: "微信搜索 “瑙琥”"
          },{
            title: "媒体与商务合作：",
            value: "ghjhsdhj@123.net"
          },{
            title: "原装品牌合作：",
            value: "ghjhsdhj@123.net"
          }
        ]
      }
    },
    computed: {
      
    },
    mounted () {
      
    },
    methods: {
      
    }
  }
</script>

<style lang='postcss'>
  page {
    background-color: #f5f5f5;
  }

 .rule_title {
    line-height: 64rpx;
    font-size: 64rpx;
    color: #ccc;
    padding: 40rpx 40rpx 60rpx;
    background-color: #fff;
  }

  .about_msg .msg_title {
    line-height: 64rpx;
    font-size: 32rpx;
    padding: 0 40rpx;
    margin-top: 20rpx;
    background-color: #fff;
  }

  .about_msg .msg_content {
    padding: 0 40rpx;
    background-color: #fff;
    overflow: hidden;
  }

  .about_msg .msg_content .msg_item {
    margin-bottom: 24rpx;
    line-height: 46rpx;
    font-size: 28rpx;
  }

  .about_msg .msg_content .msg_item > span {
    color: #f29c37;
  }
</style>
