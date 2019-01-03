<template>
  <div class="counter-warp">
    <p>Vuex counter：</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a @click="goBack()" class="home">返回首页</a>
  </div>
</template>

<script>
// Use Vuex
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    // FRAME: 使用vuex的mapState注入状态
    ...mapState({
      // 根据modules文件夹下的store文件名为这里使用的store键名
      count: state => state.counter.count
    })
  },
  mounted () {
    this.getProvince({
      testParams: '1'
    }).then(res => {
      console.log(res)
    })
  },
  methods: {
    // FRAME: 使用vuex的mapActions注入状态操作方法（第一个参数写的字符串为store文件名，同上）
    ...mapActions('counter', [
      'increment',
      'decrement',
      'getProvince'
    ]),
    goBack () {
      wx.navigateBack({
        url: '/pages/index/index'
      })
    }
  }
}

</script>
<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
