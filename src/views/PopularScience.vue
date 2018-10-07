<template>
  <div>
    <ending :style="{opacity: showEnding?1:0}"></ending>
  <div class="popular-science" id="content" v-show="!showEnding">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperData" :key="index">
          <div :style="{'background-image': `url(${getPath(item.url)})`}" class="swiper-img"></div>
          <!--<transition name="fade">-->
           <!--<div class="text-container" v-show="currentIndex==index">-->
              <!--<div class="swiper-title">{{item.title}}</div>-->
              <!--&lt;!&ndash;<div class="swiper-desc" v-html="item.desc"></div>&ndash;&gt;-->
            <!--</div>-->
          <!--</transition>-->
        </div>
      </div>
    </div>
    <transition-group name="fade">
      <div class="text-container"  v-for="(item,index) in swiperData" :key="index" v-show="currentIndex==index">
        <div class="swiper-title">{{item.title}}</div>
        <div class="swiper-desc" v-html="item.desc"></div>
      </div>
    </transition-group>
    <img class="btn-save" src="../assets/icon_science_save.png" alt="长按保存">
    <img class="btn-next" src="../assets/click_btn.png" alt="下一页" @click="jump2Next">
    <img class="save-img" :src="getPath(swiperData[currentIndex].saveImg)">
    <div @touchstart="touchStart" @touchend="touchEnd" class="slideUp" @click="showEnding=true"></div>
  </div>
  </div>
</template>
<script>
  import TouchUtils from '../utils/touchUtils'
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import Ending from './Ending.vue'

  export default {
    components: {
      Ending
    },
    data() {
      return {
        showEnding: false,
        showSaveImg: false,
        mySwiper: null,
        dataUrl: null,
        currentIndex: 0,
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
        ],
        startx: null,
        starty: null,
        endx: null,
        endy: null
      }
    },
    methods: {
      touchStart(e) {
        this.startx = e.touches[0].pageX;
        this.starty = e.touches[0].pageY;
      },
      touchEnd(e) {
        this.endx = e.changedTouches[0].pageX;
        this.endy = e.changedTouches[0].pageY;
        var direction = TouchUtils.getDirection(this.startx, this.starty, this.endx, this.endy)
        switch (direction) {
          case 0:
            console.log("未滑动！");
            break;
          case 1:
            console.log("向上！")
            this.showEnding = true
//            this.$router.push({path: '/ending'})
            break;
          case 2:
            console.log("向下！")
            break;
          case 3:
            console.log("向左！")
            break;
          case 4:
            console.log("向右！")
            break;
          default:
        }
      },
      jump2Next() {
        console.log('点击了--')
        this.$router.push({path: '/ending'})
      },
      getPath(name) {
        return require('../assets/' + name)
      }
    },
    mounted() {
      this.$nextTick(function () {
        let height = document.body.clientHeight
        let width = document.body.clientWidth
        let ele = document.getElementById('content')
        let eleHeight = ele.getBoundingClientRect().height
        if (height < eleHeight) {
          ele.style.height = height +'px'
        }
        ele.style.backgroundImage = "url(" + require('../assets/icon_science_bcg.png') +")";
        ele.style.backgroundRepeat = "no-repeat";
        ele.style.backgroundPosition = "center";
        ele.style.backgroundSize = width + 'px ' + height + 'px';

        let _myThis = this;
        this.mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: true,
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 0, // 两张图片的间距
          on: {
            slideChange: function () {
              if (!isNaN(this.realIndex)) {
                _myThis.currentIndex = this.realIndex;
              }
              console.log('currentIndex=', _myThis.currentIndex)
            },
          },
        })
        document.oncontextmenu = function (e) {
          e.preventDefault();
        };
      })
    }
  }
</script>
<style lang="scss">
  .popular-science {
    /*background: url("../assets/icon_science_bcg.png") no-repeat center;*/
    /*background-size: 100%;*/
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;

    .text-container {
      width: 63vw;
      position: fixed;
      /*background: red;*/
      left: 50%;
      transform: translateX(-50%);
      top: calc((83% - 30px)*0.8);
      /*bottom: calc(20% + 30px);*/
      .swiper-title {
        font-family: SourceHanSansCN-Medium;
        font-size: 16px;
        color: #000;
        letter-spacing: 1px;
      }
      .swiper-desc {
        margin-top: 2px;
        font-family: SourceHanSansCN-Normal;
        font-size: 10px;
        color: #565656;
        letter-spacing: 2px;
        position: relative;
      }
      .desc-circle {
        background: #565656;
        border: 1px solid #FFFFFF;
        width: 12px;
        height: 12px;
        display: inline-block;
        margin-top: 1.5px;
        border-radius: 50%;
      }
      .desc-circle-text {
        position: absolute;
        left: 18px;
        top: 0;
      }
    }

    .swiper-container {
      position: fixed;
      width: 100vw;
      height: calc(83% - 30px);
      box-sizing: border-box;
      padding-top: 5%;
      overflow: visible !important;
      z-index: 3;
      touch-action: none;

      .swiper-wrapper {
        .swiper-slide {
          width: 75vw;
          height: 85%;

          .text-container {
            display: block;
          }
          .swiper-img {
            width: 100%;
            height: 100%;
            background: url("../assets/icon_science_1.png") no-repeat center;
            background-size: 100%;
          }
        }
        .swiper-slide-prev {
          margin-top: 12.5%;
          height: 75% !important;
          .text-container {
            display: none;
          }
          .swiper-img {
            height: 75% !important;
          }
        }
        .swiper-slide-next {
          margin-top: 12.5%;
          height: 75% !important;
          .text-container {
            display: none;
          }
          .swiper-img {
            height: 75% !important;
          }
        }
        .swiper-slide-active {
          width: 75vw;
          .text-container {
            display: block;
          }
        }
      }
    }
    .save-img {
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
    .btn-save {
      position: fixed;
      width: 80px;
      height: 30px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 17%;
      z-index: 1;
    }
    .btn-next {
      position: fixed;
      width: 23px;
      height: 12px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5%;
      z-index: 3;
    }
    .slideUp{
      position: fixed;
      bottom: 0;
      width: 100vw;
      height: 10%;
      z-index: 4;
      padding: 0 30%;
      box-sizing: border-box;
    }
    .fade-enter-active{
      transition: opacity 1.5s;
    }
    .fade-leave-active {
      transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }
  }
</style>
