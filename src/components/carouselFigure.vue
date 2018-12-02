<template>

  <swiper :indicator-dots="option.indicatorDots"
    :autoplay="option.autoplay" 
    :circular="option.circular" 
    :interval="option.interval"
    :duration="option.duration"
    @change="swiperChange"
    >
      <block v-for="(item, index) in swiperImgs" :key="index">
        <swiper-item>
          <!-- <view class="slide-image" style="background-image: url('{{item}}')"></view> -->
          
            <image :src="item.link" class="slide-image" @click="handleTap(item)"/>
        
        </swiper-item>
      </block>
    </swiper>
    
</template>
<script>
  export default {
    props: {
      option: Object,
      swiperImgs:Array
    },
    data () {
      return {
        current: 0
      }
    },
    computed: {},
    created () {

    },
    methods: {
      swiperChange (e) {
        let index = e.mp.detail.current
        this.current = index
        // console.log(e)
      },
      handleTap (item) {
        console.log(item)
      }
    }

  }
</script>
<style>
  swiper{
    height: 375rpx;
  }
  .slide-image{
      width: 100%;
      height: 100%;
  } 
</style>
