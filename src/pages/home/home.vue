<template>
      <!-- <view>
      <swiper indicator-dots="indicatorDots"
      autoplay="autoplay" circular="circular" >
        <block v-for="(item, index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item.url" class="slide-image" />
            
          </swiper-item>
        </block>
      </swiper> -->
      
    <div>
        <!-- <carousel-figure :option="options" :swiperImgs="imgUrls"></carousel-figure> -->
    <carousel-figure :option="swiperOption" :swiperImgs="imgUrls"></carousel-figure>
   
   </div>
</template>
<script>
import carouselFigure from '@/components/carouselFigure'
console.log(carouselFigure)
export default {
  components: {
    carouselFigure
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        interval: 3000,
        duration: 500,
        circular: true,
        indicatorDots: true
      },
      imgUrls: [
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg"},
        {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg"}
      ]
    }
  },
 created () {}
  
}
</script>
<style >
  .back{
    color:blue;
    
  }
  .color{
      color:red;
    }
</style>
