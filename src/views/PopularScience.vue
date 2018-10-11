<template>
  <div>
    <audio controls ref="bcg2Audio" hidden loop>
      <source src="../assets/audio/BGM_2.mp3" type="audio/mpeg">
      您的浏览器不支持
    </audio>
    <ending v-if="showEnding"></ending>
  <div class="popular-science" id="content" v-show="!showEnding">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperData" :key="index">
          <img :src="getPath(item.url)" @touchstart="toucheImg">
          <!-- <div class="swiper-fixed"></div> -->
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
  // import Ending from './Ending.vue'

  export default {
    components: {
      Ending: () => import('./Ending.vue')
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
            saveImg: 'icon_save_1.jpg',
            title: '是血脉的联系  也是隐患的深藏',
            desc: '5%-10%乳腺癌的发生都与遗传基因或基因突变相关'
          },
          {
            url: 'icon_science_2.png',
            saveImg: 'icon_save_2.jpg',
            title: '星辰初启  莫将韶华湮灭在黑暗中',
            desc: '一线城市的乳腺癌患病率日趋年轻化<br>长期熬夜、饮酒、压力大都是诱因'
          },
          {
            url: 'icon_science_3.png',
            saveImg: 'icon_save_3.jpg',
            title: '母爱如大海  愿绵延安康',
            desc: '35岁后生育，患乳腺癌的风险是25岁前生育的3倍'
          },
          {
            url: 'icon_science_4.png',
            saveImg: 'icon_save_4.jpg',
            title: '坚如磐石  也有让其顷刻崩塌的裂痕',
            desc: '男性一生中患乳腺癌的风险大约为1/1000'
          }
        ],
        startx: null,
        starty: null,
        endx: null,
        endy: null,
        isFirst: true
      }
    },
    methods: {
      toucheImg(e) {
        console.log('取消了---')
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
        this.$refs.bcg2Audio.pause()
        this.$router.push({path: '/ending'})
      },
      getPath(name) {
        return require('../assets/' + name)
      },
      //判断是否是安卓还是ios
      isIOS(){
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS
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
        ele.style.backgroundImage = "url(" + require('../assets/icon_science_bcg.jpg') +")";
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
          effect: 'coverflow',
          coverflowEffect: {
            // rotate: 50,
            // stretch: 0,
            // depth: 100,
            // modifier: 1,
            // slideShadows : false
            rotate: 0,  //设置为0
            stretch: 20,
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
        console.log('popular mounted=-----')
        let _this = this
        this.$refs.bcg2Audio.addEventListener('canplay', function () {
          console.log('bcg2Audio 音频准备就绪')
          if (_this.isFirst) {
            _this.isFirst = false
            if (_this.isIOS()) {
              this.pause()
              this.currentTime = 0
            }
            this.play()
          }
        }, false)
        document.addEventListener("WeixinJSBridgeReady", function () {
          console.log('WeixinJSBridgeReady---')
          // 背景音乐，直接播放
          if (_this.isFirst) {
            _this.isFirst = false
            if (_this.isIOS()) {
              _this.$refs.bcg2Audio.pause()
              _this.$refs.bcg2Audio.currentTime = 0
              _this.$refs.bcg2Audio.play()
            } else {
              _this.$refs.bcg2Audio.play()
            }
          }
        }, false);
        document.addEventListener('YixinJSBridgeReady', function() {
//          console.log('YixinJSBridgeReady---')
          // 背景音乐，直接播放
          if (_this.isFirst) {
            _this.isFirst = false
            if (_this.isIOS()) {
              _this.$refs.bcg2Audio.pause()
              _this.$refs.bcg2Audio.currentTime = 0
              _this.$refs.bcg2Audio.play()
            } else {
              _this.$refs.bcg2Audio.play()
            }
          }
        }, false);
      })
    }
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

    .swiper-container {
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
          width: 80vw;
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
      z-index: 2;
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
  }
</style>
