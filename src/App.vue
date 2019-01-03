<script>
export default {
  mpType: 'app',
  created () {
    // FRAME: 小程序初始化后
    // 做授权或者登录之类的操作
    // ...

    // FRAME: 例子示范使用日期插件。
    const logs = (wx.getStorageSync('logs') || [])
    const currentTime = this.$date()
    const lastLogin = logs.length > 0 ? logs[logs.length-1] : null;
    const diffSecond = currentTime.diff(lastLogin, 'second');
    // console.log(`前后打开小程序相差${diffSecond}秒`);
    logs.push(`${currentTime.format('datetime')}`)

    // FRAME: 例子处理数字
    const number = this.$math(2.03043).toFixed(2); // 2.03

    // FRAME: 例子判断为空
    const foo = '';
    const isEmpty = this.$iBox.validator.isEmpty(foo) // true
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
