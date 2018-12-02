<template>
    <div class="login_page">
      <!-- <img :src="" alt=""> -->
      <open-data type="userAvatarUrl" class="userHeader"></open-data>
      <open-data type="userNickName" class="userName"></open-data>
      <button v-if = "canIUse" open-type = "getUserInfo"  @getuserinfo="bindGetUserInfo">授权登录</button>
      <div v-else>请升级微信版本</div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        // userHead:
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo/userInfo'
      }),
    },
    mounted() {
      // if(!this.userinfo) {

      //   return;
      // }
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: (res) => {
                console.log(res.userInfo);
              }
            })
          } else {
            wx.authorize({
              scope: 'scope.record',
              success: res => {
                console.log(res.userInfo);
              }
            })
          }
        }
      })
    },
    methods: {
      ...mapActions({
        changeUserInfo: 'userInfo/changeUserInfo'
      }),
      bindGetUserInfo (e) {
        //console.log(e);
        const {nickName, avatarUrl: image, gender} = e.mp.detail.userInfo;
        const sex = gender === 1 ? 'nan' : 'nv';
        const id = this.userInfo.id;

        this.changeUserInfo({
          id, nickName, image, sex
        }).then(v => {
          this.$router.push({path: '/pages/home/index'});
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .userHeader {
    width: 150rpx;
    height: 150rpx;
    display: block;
    margin: auto 40rpx;
  }

  .userName {
    width: 100%;
    font-size: 36rpx;
    text-align: center;
  }

  button {
    width: 400rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #fff;
    background-color: green;
  }
</style>
