<template>

  <swiper
    :indicator-dots="newOption.indicatorDots"
    :autoplay="newOption.autoplay"
    :circular="newOption.circular"
    :interval="newOption.interval"
    :duration="newOption.duration"
    @change="swiperChange"
    >
      <block v-for="(item, index) in swiperImgs" :key="index">
        <swiper-item>
          <!-- <view class="slide-image" style="background-image: url('{{item}}')"></view> -->

            <remote-image :src="item.url" className="slide-image" @click="handleTap(item)" />

        </swiper-item>
      </block>
    </swiper>

</template>
<script>
import remoteImage from '@/components/remoteImage'

  const defaultSwiperOption = {
        autoplay: true,
        interval: 3000,
        duration: 500,
        circular: true,
        indicatorDots: true
  };

  export default {
    props: {
      option: Object,
      swiperImgs:Array
    },
    components: {
      remoteImage
    },
    data () {
      return {
        current: 0
      }
    },
    computed: {
       newOption() {
           return {
              ...defaultSwiperOption,
              ...this.option
           }
       }
    },
    created () {

    },
    methods: {
      swiperChange (e) {
        let index = e.mp.detail.current
        this.current = index
        // console.log(e)
      },
      handleTap (item) {
        this.$emit('click', item);
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
