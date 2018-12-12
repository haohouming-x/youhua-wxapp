<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  mpType: 'app',
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/userInfo',
      isNew: 'userInfo/isNew',
    })
  },
  methods: {
    ...mapActions({
      userLogin: 'userInfo/userLogin'
    })
  },
  created () {
    // 登录
    this.userLogin().then(v => {
      if(this.isNew) {
        this.$router.push({path: '/pages/home/login', reLaunch: true});
      }
    });
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
