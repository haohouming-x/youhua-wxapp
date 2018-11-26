<template>
  <div class="rule">
    <div class="rule_title">共享油画规则</div>
    <rule :ruleData = "ruleList"></rule>
    <div class="about_msg">
      <div class="msg_title">联系我们</div>
      <ul class="msg_content">
        <li class="msg_item" v-for = "item in msg" :key = "item">
          <label for="">{{ item.title }}</label><span>{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import rule from '../../components/rule'

  export default {
    components: {
      rule
    },
    data() {
      return {
        msg: [
          {
            title: "拨打客服电话：",
            value: "200-253-4500"
          },{
            title: "客服服务时间：",
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
        ],
        ruleList: [
          {
            id: 0,
            title: "Z.如何尊享租画体验",
            content: "完成享受租画体验步骤如下：<br>1.注册XXX会员。</br>2.在页面选择自己喜欢的油画添加到购物车。3.确认下单（将这幅油画寄给我）。4.填写快递信息（如：姓名、电话、签收地址）。5.等待送达并查验商品签收。"
          },{
            id: 1,
            title: "Z.如何尊享租画体验",
            content: "完成享受租画体验步骤如下：1.注册XXX会员。2.在页面选择自己喜欢的油画添加到购物车。3.确认下单（将这幅油画寄给我）。4.填写快递信息（如：姓名、电话、签收地址）。5.等待送达并查验商品签收。"
          },{
            id: 2,
            title: "Z.如何尊享租画体验",
            content: "完成享受租画体验步骤如下：1.注册XXX会员。2.在页面选择自己喜欢的油画添加到购物车。3.确认下单（将这幅油画寄给我）。4.填写快递信息（如：姓名、电话、签收地址）。5.等待送达并查验商品签收。"
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
    padding: 40rpx;
    background-color: #fff;
  }

  .about_msg .msg_title {
    line-height: 64rpx;
    font-size: 24rpx;
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
    font-size: 24rpx;
  }

  .about_msg .msg_content .msg_item > span {
    color: #f29c37;
  }
</style>
