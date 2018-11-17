<template>
  <div>
    <div class="footerouter">
      <div class="footer">
        <div class="footer-item" v-for="(item,index) in footerData" :key="index" @click="linkTo(item.id,item.clickStatus)">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      footerData: Object
    },
    mounted() {
      
    },
    methods: {
      linkTo(id,status) {
        if (id == 0 && status == true) {
          this.$router.push('/pages/home/index')
        } else if (id == 1 && status == true) {
          this.$router.push('/pages/commonRule/commonRule')
        } else if (id == 2 && status == true) {
          this.$router.push('/pages/myGallery/index')
        } else if (id == 3 && status == true) {
          this.$router.push('/pages/guide/index')
        }
      }
    }
  }
</script>

<style lang="postcss">
  .footerouter {
    height: 80rpx;
  }

  .footer {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    color: #333;
    overflow: hidden;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1rpx solid #eee;
  }

  .footer :last-child {
    border-right: none !important;
  }

  .footer-item {
    width: 25%;
    height: 80rpx;
    line-height: 80rpx;
    float: left;
    box-sizing: border-box;
    border-right: 1rpx solid #eee;
  }
</style>
