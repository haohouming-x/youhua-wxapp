<template>

    <div>
      <carousel-figure :swiperImgs="imgUrls"></carousel-figure>
      <div v-if="!isMember">
        <div class=" memberbox" @click="beMember"></div>
      </div>
      <div class="classifybox">
        <div class="classify-item" v-for="(item,index) in  classifies" :key="index" @click="handleClassify(item)">
          <remote-image className="classify-img" :src="item.image" />
          <div class="font-size--24">{{item.name}}</div>
        </div>
      </div>
      <div class="goodsbox">
        <div class="marleft">{{headline}}</div>
        <div class="goodsbox-outer">
          <div v-for="(item,index) in goods" :key="index" class="goods-item" @click="toDetails(item.id)">
            <remote-image mode="widthFix" className="good-item-img" :src="item.image" />
            <div class="tt">{{item.name}}</div>
            <div class="s_tt">{{item.describes}}</div>
            <div class="size">{{item.longSize}} * {{item.wideSize}}</div>
          </div>
        </div>
      </div>
      <normal-footer :footerData = "footerData"></normal-footer>
    </div>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import carouselFigure from '@/components/carouselFigure'
import normalFooter from '@/components/normalFooter'
import remoteImage from '@/components/remoteImage'
import config from '@/plugins/http/flyio/config'

export default {
  components: {
    carouselFigure,
    normalFooter,
    remoteImage
  },
  data () {
    return {
      isMember: false,
      // imgUrls: [
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg"}
      // ],
      // imgUrls: [],
      // classify: [
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "推荐商城"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "收藏"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", title: "肖像画"}
      // ],
      // classify: [],
      // goods: [
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 0},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 1},
      //   {url: "http://pic1.cxtuku.com/00/15/14/b456235b5796.jpg", name: "thelastsupper", title:"最后的晚餐", size:"20*30cm", id: 2}
      // ],
      // goods: [],
      headline: '',
      footerData: [
        {
          name: "首页",
          clickStatus: false,
          id: 0
        },{
          name: "我的画廊",
          clickStatus: true,
          id: 1
        },{
          name: "共享规则",
          clickStatus: true,
          id: 2
        },{
          name: "新手指南",
          clickStatus: true,
          id: 3
        }
      ],
      selectedClassifyIndex: 0,
      bannerpage: 1,
      imgdata: [],
      defaultnum: '',
      page: 1
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo/userInfo',
      isNew: 'userInfo/isNew',
      banners: 'banner/list',
      classifies: 'classify/list',
      goods: 'goods/currentList'
    }),
    imgUrls() {
      return this.banners.map(v => ({url: v.image, title: v.name}))
    }
  },
  created () {},
  mounted () {
    this.userLogin().then(v => {
      if(this.isNew) {
        this.$router.push({path: '/pages/home/login'});
        // shouquan().then(v => {
        //      const sex = v.xxx;
        //      const nickName = v.xxxx;
        //      this.changeUserInfo({}, {sex, nickName})
        //   });
      }
    });
    this.getBannerList();
    this.getClassifyListAndGoods({}, this.selectedClassifyIndex)
        .then(v => {
            if(this.classifies.length > 0) this.headline = this.classifies[0].name;
        });
    // this.changeUserInfo({}, this.userInfo)
    // console.log(this.userInfo);
  },

 created () {
  //  this.getbanners()


 },

 methods: {
   ...mapActions({
     getBannerList: 'banner/getBannerList',
     getClassifyListAndGoods: 'classify/getClassifyListAndGoods',
    //  getGoodsByClassifyId: 'goods/getGoodsByClassifyId'
    getGoodsListByClassifyId: 'goods/getGoodsListByClassifyId',
      userLogin: 'userInfo/userLogin'
   }),
   handleClassify (item){
    this.headline = item.name;

    // this.getGoodsByClassifyId({
    //   id: item.id
    // }).then((res) => {
    //   console.log(res)
    // })
    this.getGoodsListByClassifyId({id: item.id,page: this.page})
   },
   toDetails(id) {
    this.$router.push({path: '/pages/goodsDetail/index', query: {id: id}})
   },
   beMember() {
     this.$router.push('/pages/member/index')
   },
   handleClassify (item){
      this.headline = item.title
    },
    toDetails(id) {
    this.$router.push({path: '/pages/goodsDetail/index', query: {id: id}})
    },
    beMember() {
      this.$router.push('/pages/member/index')
    }
 }

}
</script>
<style >
  .memberbox{
    background: #cab0a7;
    height: 100rpx;
    width: 100%;
  }
  .classifybox{
    margin-top: 20rpx;
    overflow: hidden;
  }
  .classify-item{
    float: left;
    text-align: center;
    width: 25%;
    margin-bottom: 40rpx;
  }
  .classify-img{
    width: 100rpx;
    height: 100rpx;
    /* width: 80%; */
    border-radius: 50%;
  }
  .font-size--24{
    font-size:24rpx;
  }
  .goodsbox-outer{
    overflow: hidden;
  }
  .goods-item{
    float: left;
    width: 46%;
    margin: 2%;
  }
  .marleft{
    margin-left: 1.5%;
  }
  .good-item-img{
    width: 100%;
  }
  .tt {
    font-size: 32rpx;
  }
  .s_tt {
    font-size: 28rpx;
  }
  .size {
    font-size: 24rpx;
    color: #ccc;
  }
</style>
