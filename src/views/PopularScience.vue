<template>
  <div class="popular-science">
    <!--<save-img class="save-html" v-if="!dataUrl"></save-img>-->
    <!--<img v-if="dataUrl" :src="dataUrl" class="save-image"/>-->
    <!--<div class="content">-->
    <!--<div class="title">爱自己 更要分享给你爱的人</div>-->
    <!--</div>-->
    <!--<div class="arrow-top"  @click="jump2Next"></div>-->
    <!--<swiper :options="swiperOption">-->
    <!--　　<swiper-slide v-for="items in imageUrls" :key="items">-->
    <!--　　　　<img :src="getPath(items)" alt="">-->
    <!--　　</swiper-slide>-->
    <!--　　<div class="swiper-pagination" slot="pagination"></div>-->
    <!--</swiper>-->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperData" :key="index">
          <img :src="getPath(item.url)">
          <div class="text-container">
            <div class="swiper-title">{{item.title}}</div>
            <div class="swiper-desc" v-html="item.desc"></div>
            <div class="swiper-desc" v-if="index==2">
              <span class="desc-circle"></span>
              用户姓名(变动长度) 愿成为特殊摄影展的传播人
            </div>
          </div>
        </div>
      </div>
    </div>
    <img class="btn-save" src="../assets/icon_science_save.png" alt="长按保存">
    <img class="btn-next" src="../assets/click_btn.png" alt="下一页" @click="jump2Next">
    <!--<div class="save-img"-->
         <!--v-show="showSaveImg" @touchend="showSaveImg=false"></div>-->
    <img class="save-img" :src="getPath(swiperData[currentIndex].saveImg)">
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { XButton, XHeader } from 'vux'
  import SaveImg from './SaveImg.vue'
  import html2canvas from 'html2canvas'

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    components: {
      XButton, XHeader, SaveImg
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    data() {
      return {
        showSaveImg: false,
        mySwiper: null,
        dataUrl: null,
        currentIndex:0,
        swiperData: [
          {
            url: 'icon_science_1.png',
            saveImg: 'icon_save_1.png',
            title: '是血脉的联系  也是隐患的深藏',
            desc: '5%-10%乳腺癌的发生都与遗传基因或基因突变相关'
          },
          {
            url: 'icon_science_2.png',
            saveImg: 'icon_save_2.png',
            title: '星辰初启  莫将韶华湮灭在黑暗中',
            desc: '一线城市的乳腺癌患病率日趋年轻化<br>长期熬夜、饮酒、压力大都是诱因'
          },
          {
            url: 'icon_science_3.png',
            saveImg: 'icon_save_3.png',
            title: '母爱如大海  愿绵延安康',
            desc: '35岁后生育，患乳腺癌的风险是25岁前生育的3倍'
          },
          {
            url: 'icon_science_4.png',
            saveImg: 'icon_save_4.png',
            title: '坚如磐石  也有让其顷刻崩塌的裂痕',
            desc: '男性一生中患乳腺癌的风险大约为1/1000'
          }
        ]
      }
    },
    methods: {
      jump2Next() {
        this.$router.push({path: '/ending'})
      },
      getPath(name) {
        return require('../assets/' + name)
      }
    },
    mounted() {
      this.$nextTick(function () {
        let _myThis = this;
        this.mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: true,
//          autoplay: 5000,
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 20,
          // 如果需要分页器
          pagination: '.swiper-pagination',
          on: {

            slideChange: function () {
              _myThis.currentIndex = this.activeIndex % 4;
              console.log('滑动了---：index: ' + _myThis.currentIndex );
            },
          },
        })
//        html2canvas(document.querySelector('#captureId')).then(canvas => {
//          let imgUrl = canvas.toDataURL('image/png')
//          this.dataUrl = imgUrl
//          console.log('生成图片成功')
//        })

      })
    }
  }
</script>
<style lang="scss">
  .popular-science {
    background: url("../assets/icon_science_bcg.png") no-repeat center;
    background-size: 100%;
    width:100vw;
    height:100vh;
    position: relative;
    padding-top: 10px;

    .text-container {
      padding-top: 20px;
      width: 70vw;
      margin: 0 auto;
      .swiper-title {
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        color: #000;
        letter-spacing: 1px;
      }
      .swiper-desc {
        margin-top: 5px;
        font-family: SourceHanSansCN-Normal;
        font-size: 10px;
        color: #565656;
        letter-spacing: 2px;
      }
      .swiperr-circle {
        background: #565656;
        border: 2px solid #FFFFFF;
        width: 18px;
        height: 18px;
        border-radius: 50%;
      }
    }

    .swiper-container {
      position: fixed;
      width: 100vw;
      height: 220px;
      padding: 10px 0;
      overflow: visible !important;
      z-index: 3;
    }
    .swiper-container .swiper-wrapper .swiper-slide {
      width: 70vw;
      height: 100%;
      border-radius: 20px;
      .text-container{
        display: block;
      }
    }
    .swiper-container .swiper-wrapper .swiper-slide img {
      width: 100%;
      height: 100%;
      /*background: red;*/
      border-radius: 20px;
    }
    .swiper-container .swiper-wrapper .swiper-slide-prev {
      margin-top: 18px;
      height: 90% !important;
      .text-container{
        display: none;
      }
    }
    .swiper-container .swiper-wrapper .swiper-slide-prev img {
      height: 100% !important;
    }
    .swiper-container .swiper-wrapper .swiper-slide-next {
      margin-top: 18px;
      height: 90% !important;
      .text-container{
        display: none;
      }
    }
    .swiper-container .swiper-wrapper .swiper-slide-next img {
      height: 100% !important;
    }
    .swiper-container .swiper-wrapper .swiper-slide-active {
      width: 70vw;
      /*background: yellow;*/
      .text-container{
        display: block;
      }
    }
    .save-img{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100vw;
      height: 100vh;
      z-index: 2;
      opacity: 0;
    }
    .btn-save{
      position: absolute;
      width: 80px;
      height: 30px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 100px;
      z-index: 1;
    }
    .btn-next{
      position: absolute;
      width: 21px;
      height: 12px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 42px;
      z-index: 3;
    }
  }
</style>
