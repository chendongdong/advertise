<template>
    <!-- <ending :style="{opacity: showEnding?1:0}" @back="backThisPage"></ending> -->
  <div class="popular-science" id="content">
    <div class="swiper-containerfck">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperData" :key="index">
          <img :src="getPath(item.url)" @touchstart="toucheImg">
          <!-- <div class="swiper-fixed"></div> -->
        </div>
      </div>
    </div>
    <!-- <transition-group name="fade">
      <div class="text-container"  v-for="(item,index) in swiperData" :key="index" v-show="currentIndex==index">
        <div class="swiper-desc" v-html="item.desc"></div>
      </div>
    </transition-group> -->
    <!-- <img class="btn-save" src="../assets/icon_science_save.png" alt="长按保存"> -->
    <!-- <img class="btn-next" src="~@/assets/BOTTON_btn_100_.gif" alt="下一页" @click="jump2Next"> -->
    <img class="save-img" :src="getPath(swiperData[currentIndex].saveImg)" id="saveImg" v-finger:swipe="swiper">
    <img class="all-logo" src="~@/assets/allLogo.png">
  </div>
</template>
<script>
  import TouchUtils from '../utils/touchUtils'
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  // import Ending from './Ending.vue'

  export default {
    components: {
      // Ending: () => import('./Ending.vue')
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
            url: '2-2_01.jpg',
            saveImg: 'icon_save_1.jpg',
          },
          {
            url: '2-2_02.jpg',
            saveImg: 'icon_save_2.jpg',
          },
          {
            url: '2-2_03.jpg',
            saveImg: 'icon_save_3.jpg',
          },
          {
            url: '2-2_04.jpg',
            saveImg: 'icon_save_4.jpg',
          }
        ],
        startx: null,
        starty: null,
        endx: null,
        endy: null,
      }
    },
    methods: {
      toucheImg(e) {
        if (e&&e.preventDefault){
          e.preventDefault()
        } else {
          window.event.returnValue = false
        }
        return false
      },
      touchStart(e) {
        this.startx = e.touches[0].pageX;
        this.starty = e.touches[0].pageY;
      },
      togglebgmicon(flag) {
        this.$emit('toggle-bgm-icon', flag)
      },
      // jump2Next() {
      //   this.showEnding = true;
      //   this.togglebgmicon(false);
      // },
      backThisPage() {
        this.showEnding = false;
        this.togglebgmicon(false);
			},
      getPath(name) {
        return require('../assets/' + name)
      },
      swiper(e) {
        switch (e.direction) {
          case 'Up':
            // this.jump2Next()
            break;
          case 'Down':
            this.$emit('back')
            break;
          case 'Left':
              this.mySwiper.slideNext();
            break;
          case 'Right':
              this.mySwiper.slidePrev();
            break;
        }
			},
    },
    mounted() {
      // this.$nextTick(function () {
        let height = document.body.clientHeight
        let width = document.body.clientWidth
        let ele = document.getElementById('content')
        let eleHeight = ele.getBoundingClientRect().height
        if (height < eleHeight) {
          ele.style.height = height +'px'
        }
        ele.style.backgroundImage = "url(" + require('../assets/icon_science_bcg.jpg') +")";
        ele.style.backgroundRepeat = "no-repeat";
        ele.style.backgroundPosition = "center";
        ele.style.backgroundSize = width + 'px ' + height + 'px';
        let _myThis = this;
        this.mySwiper = new Swiper('.swiper-containerfck', {
          notNextTick: true,
          direction: 'horizontal',
          loop: true,
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 0, // 两张图片的间距
          effect: 'coverflow',
          touchMoveStopPropagation : false,
          coverflowEffect: {
            rotate: 0,  //设置为0
            stretch: -48,
            depth: 130,
            modifier: 1,
            slideShadows : false
          },
          on: {
            slideChange: function () {
              if (parseFloat(this.realIndex).toString() != "NaN") {
                _myThis.currentIndex = this.realIndex%_myThis.swiperData.length;
              }
              console.log('currentIndex=', _myThis.currentIndex)
            },
          },
        })
        document.oncontextmenu = function (e) {
          e.preventDefault();
        };
      // })
    },
  }
</script>
<style lang="scss">
  .popular-science {
    /*background: url("../assets/icon_science_bcg.jpg") no-repeat center;*/
    /*background-size: 100%;*/
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;

    .text-container {
      width: 76vw;
      position: fixed;
      left: 50%;
      transform: translateX(-42%);
      top: 67vh;
      .swiper-title {
        font-family: SourceHanSansCN-Medium;
        font-size: 2.4vh;
        color: #000;
        letter-spacing: 0.2vw;
      }
      .swiper-desc {
        margin-top: 1vh;
        font-family: SourceHanSansCN-Normal;
        font-size: 1.7vh;
        line-height:1.5;
        color: #3B3B3B;
        letter-spacing: 0;
        position: relative;
      }
    }

    .swiper-containerfck {
      position: fixed;
      width: 100vw;
      height: 70.4vh;
      box-sizing: border-box;
      padding-top: 5.02vh;
      overflow: visible !important;
      z-index: 3;
      touch-action: none;
      .swiper-wrapper {
        .swiper-slide {
          width: 74vw;
          height: 59.2vh;
          // transition: all .2s;
          .text-container {
            display: block;
          }
          img {
            width: 100%;
            // height: 100%;
            pointer-event:none;
            -webkit-user-select:none;
            -moz-user-select:none;
            user-select:none;
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
      z-index: 10;
      opacity: 0;
    }
    .btn-save {
      position: fixed;
      width: 22.9vw;
      /*height: 4.7vh;*/
      left: 50%;
      transform: translateX(-50%);
      top: 78vh;
      z-index: 1;
    }
    .btn-next {
      position: fixed;
      width: 6vw;
      /*height: 1.6vh;*/
      left: 50%;
      transform: translateX(-50%);
      bottom: 5vh;
      z-index: 3;
      opacity: .6;
    }
    .slideUp{
      position: fixed;
      bottom: 0;
      width: 100vw;
      height: 9vh;
      z-index: 4;
      padding: 0 40vw;
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
    .all-logo{
      display: block;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 2.8vh;
      width: 88vw;
      margin: 0 auto;
    }
  }
</style>
