<template>
  <ul class="rule-raido_sel">
    <li v-for = "item in ruleData" :key = "item" :id = "item.id" @click = "openRule(item)" :class="selectId === item.id ? 'on' : ''">
      <div class="rule-list_title">{{ item.title }}</div>
      <div class="rule-list_content">
        {{ item.content }}
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      ruleData: Object,
      selectId: null
    },
    mounted() {
      console.log(this.ruleData);
    },
    methods: {
      openRule(item) {
        this.selectId = item.id;
      }
    }
  }
</script>

<style lang="postcss">
  .rule-raido_sel {
    margin-bottom: 20rpx;
    padding: 0 40rpx;
    background-color: #fff;
    overflow: hidden;
  }

  .rule-raido_sel li {
    height: 100rpx;
    border-bottom: 1px solid #EEEEEE;
  }

  .rule-raido_sel :last-child {
    border-bottom: none;
  }

  .rule-raido_sel .rule-list_title {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 32rpx;
    color: #333;
    position: relative;
  }

  .rule-raido_sel .rule-list_title::after {
    content: " ";
    display: inline-block;
    height: 20rpx;
    width: 20rpx;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotateZ(90deg);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotateZ(90deg);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
  }

  .rule-raido_sel .rule-list_content {
    padding-left: 40rpx;
    margin-bottom: 20rpx;
    font-size: 32rpx;
    line-height: 2;
    color: #333;
    display: none;
  }

  .rule-raido_sel li.on {
    height: auto;
  }

  .rule-raido_sel li.on .rule-list_title {
    font-size: 36rpx;
  }

  .rule-raido_sel li.on .rule-list_title::after {
    display: none;
  }

  .rule-raido_sel li.on .rule-list_content {
    display: block;
  }
</style>
