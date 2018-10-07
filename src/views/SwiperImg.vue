<template>
  <div class="swiper-img">
    <swiper-next :style="{opacity: showSwiperNext?1:0}" ref="next"></swiper-next>
    <div class="swiper-fixed" v-show="!showSwiperNext">
      <div class="swiper-container" :style="swiperStyle">
        <div class="swiper-card" v-for="(item,index) in swiperCardList"
             :style="{backgroundImage:`url(${item.bgUrl})`}">
          <div class="container"
               :style="{height: item.borderHeight + 'vw',top: item.borderTop + 'vw',backgroundImage: `url(${item.borderImgSrc})`,}">
            <canvas class="shortCanvas" :width="pageSize.width * .58"
                    :height="item.height * .01 * pageSize.height"
                    :style="{top: item.videoTop + 'vw',height:item.height + 'vw'}"></canvas>
          </div>
          <img :src="item.longPressSrc" alt="长按查看">
        </div>
      </div>
      <img v-if="index !== 0" :class="['left','btn',{'isTransparent':isSwipering}]" src="../assets/left_btn.png"
           alt="右滑">
      <img v-if="index !== 3" :class="['right','btn',{'isTransparent':isSwipering}]" src="../assets/right_btn.png"
           alt="左滑">
      <img :class="['click','btn',{'isTransparent':isSwipering || !isSatisfied}]"
           :style="{top:offsetY<0 ?(171.18+offsetY/pageSize.width*100+'vw'):(171.18+'vw')}"
           src="../assets/click_btn.png" alt="查看详细">
      <canvas class="longCanvas" :style="{opacity:isCanvasShow?1:0}"
              :width="pageSize.width"
              :height="pageSize.height"
              v-finger:tap="tapArrow"
              v-finger:swipe="swiper"
              v-finger:long-tap="longTap"
              v-finger:touch-end="touchend"></canvas>
      <img class="longVideoWordPic pic1" :src="swiperCardList[this.index].longVideoWordPicList[0]"
           v-show="longVideoCount >= 170"
           :style="{top:offsetY<0 ? 7.25-offsetY/pageSize.width*100+'vw': 7.25+'vw'}" alt="">
      <img class="longVideoWordPic pic2" :src="swiperCardList[this.index].longVideoWordPicList[1]"
           v-show="longVideoCount >= 170"
           :style="{top:offsetY<0 ? 7.25-offsetY/pageSize.width*100+'vw': 7.25+'vw'}" alt="">
      <img class="longVideoWordPic pic3" :src="swiperCardList[this.index].longVideoWordPicList[2]"
           v-show="longVideoCount > 200"
           :style="{
			     opacity:longVideoCount > 230 ? 1:(longVideoCount-200)/30,
				 top:offsetY<0?28.5-offsetY/pageSize.width*100+'vw':28.5+'vw',
				 width:swiperCardList[index].thirdPicSize.width+'vw',
				 height:swiperCardList[index].thirdPicSize.height+'vw'
				 }" alt="">
      <img class="longVideoWordPic pic4" :src="swiperCardList[this.index].longVideoWordPicList[3]"
           v-show="longVideoCount > 240"
           :style="{
			     opacity:longVideoCount > 260 ? 1:(longVideoCount-240)/20,
			     top:offsetY<0?swiperCardList[index].fourthPicSize.top-offsetY/pageSize.width*100+'vw':swiperCardList[index].fourthPicSize.top+'vw',
			     left:swiperCardList[index].fourthPicSize.left+'vw',
			     width:swiperCardList[index].fourthPicSize.width+'vw',
			     height:swiperCardList[index].fourthPicSize.height+'vw',
			     }" alt="">
      <img class="longVideoWordPic pic5" :src="swiperCardList[this.index].longVideoWordPicList[4]"
           v-show="longVideoCount >= 170"
           :style="{bottom:offsetY<0?12.88-offsetY/pageSize.width*100+'vw':12.88+'vw'}" alt="">
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XButton, XHeader} from 'vux'
  import SwiperNext from './SwiperNext.vue'

  export default {
    components: {
      XButton, XHeader, SwiperNext
    },
    data() {
      return {
        showSwiperNext: false,
        pageSize: {
          width: 0,
          height: 0,
        },
        longVideoArr0: [],
        longVideoArr1: [],
        longVideoArr2: [],
        longVideoArr3: [],
        shortVideoArr0: [],
        shortVideoArr1: [],
        shortVideoArr2: [],
        shortVideoArr3: [],
        shortVideoNumList: [91, 101, 101, 101],
        shortCanvasDOM: null,
        longCanvasDOM: null,
        longCtx: null,
        shortCtx: [],
        touchStartPoint: {
          clientX: null,
          clientY: null
        },
        offsetY: 0,
        index: 0,//标记用户目前正在看的图片的序列号
        isSwipering: false,//是否正在滑动
        isCanvasShow: false,//是否显示canvas
        intervalTimer: null,
        timeoutTimer: null,
        frameNum: 30,//帧数 video中取图片保证每秒30帧
        upendSpeed: 4,//倒放倍数
        longVideoCount: 0,
        isSatisfied: false,
        picWordList: ['冰面', '星空', '海洋', '岩石'],
        swiperCardList: [
          {
            height: 96.46,
            videoTop: 15.3,
            borderTop: 17.63,
            borderHeight: 145.17,
            bgUrl: require('../assets/bg13.png'),
            postSrc: require('../assets/frame1.png'),
            borderImgSrc: require('../assets/frame_border1.png'),
            longPressSrc: require('../assets/longPressBtn1.png'),
            longVideoWordPicList: [
              require('../assets/swiperCardList/1-2_01_X光左上信息.png'),
              require('../assets/swiperCardList/1-2_01_X光右上信息.png'),
              require('../assets/swiperCardList/1-2_01_患者信息.png'),
              require('../assets/swiperCardList/1-2_01_手写体.png'),
              require('../assets/swiperCardList/1-2_指纹Icon.png'),
            ],
            thirdPicSize: {
              width: 595 / 12.42,
              height: 304 / 12.42
            },
            fourthPicSize: {
              width: 238 / 12.42,
              height: 95 / 12.42,
              left: 560 / 12.42,
              top: 852 / 12.42
            }
          },
          {
            height: 83.9,
            videoTop: 18.52,
            borderTop: 20.61,
            borderHeight: 142.27,
            bgUrl: require('../assets/bg24.png'),
            postSrc: require('../assets/frame2.png'),
            borderImgSrc: require('../assets/frame_border2.png'),
            longPressSrc: require('../assets/longPressBtn2.png'),
            longVideoWordPicList: [
              require('../assets/swiperCardList/1-2_02_X光左上信息.png'),
              require('../assets/swiperCardList/1-2_02_X光右上信息.png'),
              require('../assets/swiperCardList/1-2_02_患者信息.png'),
              require('../assets/swiperCardList/1-2_02_手写体.png'),
              require('../assets/swiperCardList/1-2_指纹Icon.png'),
            ],
            thirdPicSize: {
              width: 520 / 12.42,
              height: 226 / 12.42
            },
            fourthPicSize: {
              width: 539 / 12.42,
              height: 107 / 12.42,
              left: 321 / 12.42,
              top: 889 / 12.42
            }
          },
          {
            height: 57.97,
            videoTop: 16.91,
            borderTop: 35.43,
            borderHeight: 127.456,
            bgUrl: require('../assets/bg13.png'),
            postSrc: require('../assets/frame3.png'),
            borderImgSrc: require('../assets/frame_border3.png'),
            longPressSrc: require('../assets/longPressBtn3.png'),
            longVideoWordPicList: [
              require('../assets/swiperCardList/1-2_03_X光左上信息.png'),
              require('../assets/swiperCardList/1-2_03_X光右上信息.png'),
              require('../assets/swiperCardList/1-2_03_患者信息.png'),
              require('../assets/swiperCardList/1-2_03_手写体.png'),
              require('../assets/swiperCardList/1-2_指纹Icon.png'),
            ],
            thirdPicSize: {
              width: 503 / 12.42,
              height: 311 / 12.42
            },
            fourthPicSize: {
              width: 242 / 12.42,
              height: 96 / 12.42,
              left: 663 / 12.42,
              top: 1024 / 12.42
            }
          },
          {
            height: 93.24,
            videoTop: 26.73,
            borderTop: 6.68,
            borderHeight: 156.12,
            bgUrl: require('../assets/bg24.png'),
            postSrc: require('../assets/frame4.png'),
            borderImgSrc: require('../assets/frame_border4.png'),
            longPressSrc: require('../assets/longPressBtn4.png'),
            longVideoWordPicList: [
              require('../assets/swiperCardList/1-2_04_X光左上信息.png'),
              require('../assets/swiperCardList/1-2_04_X光右上信息.png'),
              require('../assets/swiperCardList/1-2_04_患者信息.png'),
              require('../assets/swiperCardList/1-2_04_手写体.png'),
              require('../assets/swiperCardList/1-2_指纹Icon.png'),
            ],
            thirdPicSize: {
              width: 595 / 12.42,
              height: 304 / 12.42
            },
            fourthPicSize: {
              width: 528 / 12.42,
              height: 125 / 12.42,
              left: 272 / 12.42,
              top: 964 / 12.42
            }
          }
        ],
        longTouchRange: {
          xRange: [16.2, 67.6],
          yRange: [130.6, 32.21]
        },
        leftArrowRange: {
          xRange: [1.6, 12.32],
          yRange: [71.1, 16.75]
        },
        rightArrowRange: {
          xRange: [86.07, 12.32],
          yRange: [71.1, 16.75]
        },
        downArrowRange: {
          xRange: [46.86, 6.28],
          yRange: [171.18, 3.06]
        },
        swiperDownRange: {
          xRange: [0, 100],
          yRange: [129, 39, 60.95]
        },
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'language'
      ]),
      swiperStyle() {
        return {
          left: `-${this.index}00%`
        }
      }
    },
    methods: {
      validate(clientX, clientY, rangeXMin, rangeXMax, rangeYMin, rangeYMax) {
        let xRatio = clientX / this.pageSize.width * 100,
          yRatio = (clientY - this.offsetY) / this.pageSize.width * 100;
        return xRatio >= rangeXMin && xRatio <= rangeXMax && yRatio >= rangeYMin && yRatio <= rangeYMax;
      },
      tapArrow(e) {
        if (this.isCanvasShow === false) {
          let client = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
          };
          let arr = [this.leftArrowRange, this.rightArrowRange, this.downArrowRange],
            rangeXMin, rangeXMax, rangeYMin, rangeYMax, tapIndex = null;
          for (let i = 0; i < arr.length; i++) {
            rangeXMin = arr[i].xRange[0];
            rangeXMax = arr[i].xRange[0] + arr[i].xRange[1];
            rangeYMin = arr[i].yRange[0];
            rangeYMax = arr[i].yRange[0] + arr[i].yRange[1];
            if (this.validate(client.x, client.y, rangeXMin, rangeXMax, rangeYMin, rangeYMax)) {
              tapIndex = i;
              break;
            }
          }
          console.log(tapIndex);
          switch (tapIndex) {
            case 0: // 点击左箭头
              if (this.index !== 0) {
                this.setIndex(this.index - 1);
              }
              break;
            case 1: // 点击右箭头
              if (this.index !== 3) {
                this.setIndex(this.index + 1);
              }
              break;
            case 2: // 点击下箭头
              this.showSwiperNext = true;
              this.$refs.next.addText();
              break;
          }
        }
      },
      swiper(e) {
        switch (e.direction) {
          case 'Left':
            if (this.index !== 3 && !this.isCanvasShow) {
              this.setIndex(this.index + 1)
            }
            break;
          case 'Right':
            if (this.index !== 0 && !this.isCanvasShow) {
              this.setIndex(this.index - 1)
            }
            break;
          case 'Up':
            if (this.isSatisfied && !this.isCanvasShow) {
              let client = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
              };
              let rangeXMin = this.swiperDownRange.xRange[0],
                rangeXMax = this.swiperDownRange.xRange[0] + this.swiperDownRange.xRange[1],
                rangeYMin = this.swiperDownRange.yRange[0],
                rangeYMax = this.swiperDownRange.yRange[0] + this.swiperDownRange.yRange[1];
              if (this.validate(client.x, client.y, rangeXMin, rangeXMax, rangeYMin, rangeYMax)) {
                this.showSwiperNext = true;
                this.$refs.next.addText()
              }
            }
        }
      },
      shortVideoPlay(index) {
        if (this.intervalTimer) {
          clearInterval(this.intervalTimer);
        }
        let i = 0;
        this.intervalTimer = setInterval(() => {
          this.shortCtx[index].drawImage(this['shortVideoArr' + index][i], 0, 0, this.pageSize.width * .58, this.swiperCardList[index].height * .01 * this.pageSize.height);
          i++;
          if (i >= this.shortVideoNumList[this.index]) {
            i = 0;
          }
        }, 33.33);
      },
      initCanvas(index) {
        this.shortCtx[index].drawImage(this['shortVideoArr' + index][0], 0, 0, this.pageSize.width * .58, this.swiperCardList[index].height * .01 * this.pageSize.height);
      },
      setIndex(num) {
        this.initCanvas(num);
        this.index = num;
        this.isSwipering = true;
        if (this.timeoutTimer) {
          clearTimeout(this.timeoutTimer);
        }
        this.timeoutTimer = setTimeout(() => {
          this.isSwipering = false;
          clearTimeout(this.timeoutTimer);
          this.shortVideoPlay(this.index);
        }, 500)
      },
      longTap(e) {
        console.log('longTap');
        let client = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };
        let rangeXMin = this.longTouchRange.xRange[0],
          rangeXMax = this.longTouchRange.xRange[0] + this.longTouchRange.xRange[1],
          rangeYMin = this.longTouchRange.yRange[0],
          rangeYMax = this.longTouchRange.yRange[0] + this.longTouchRange.yRange[1];
        if (this.validate(client.x, client.y, rangeXMin, rangeXMax, rangeYMin, rangeYMax)) {
          this.longVideoCount = 0;
          this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
          this.isCanvasShow = true;
          clearInterval(this.intervalTimer);
          this.intervalTimer = setInterval(() => {
            this.longVideoCount++;
            if (this.longVideoCount < 305) {
              if (this.longVideoCount >= 60) {
                this.isSatisfied = true;
              }
              this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
            } else {
              this.longVideoCount--;
              clearInterval(this.intervalTimer);
            }
          }, 1000 / this.frameNum);
        }
      },
      touchend() {
        console.log('touchend');
        if (this.isCanvasShow) {
          clearInterval(this.intervalTimer);
          this.intervalTimer = setInterval(() => {
            console.log(this.longVideoCount, this.upendSpeed);
            if (this.longVideoCount < this.upendSpeed) {
              this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
              this.longVideoCount = 0;
              this.isCanvasShow = false;
              clearInterval(this.intervalTimer);
              this.shortVideoPlay(this.index);
            } else {
              this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
              this.longVideoCount -= this.upendSpeed
            }
          }, 1000 / this.frameNum);
        }
      },
    },
    created() {
      //提前加载4个短视频和一个长视屏
      for (let i = 0, len = this.shortVideoNumList.length, wordLen; i < len; i++) {
        wordLen = this.shortVideoNumList[i] < 100 ? 2 : 3;
        for (let j = 0; j < this.shortVideoNumList[i]; j++) {
          this['shortVideoArr' + i][j] = new Image();
          this['shortVideoArr' + i][j].src = require(`../assets/shortVideo/0${i + 1}/0${i + 1}_微动${j.toString().padStart(wordLen, '0')}.jpg`)

        }
        for (let j = 0; j < 305; j++) {
          this['longVideoArr' + i][j] = new Image();
          this['longVideoArr' + i][j].src = require(`../assets/longVideo/0${i + 1}/0${i + 1}_${this.picWordList[i] + j.toString().padStart(3, '0')}.jpg`);
        }
      }

    },
    mounted() {
      this.shortCanvasDOM = document.getElementsByClassName('shortCanvas');
      this.longCanvasDOM = document.getElementsByClassName('longCanvas')[0];
      let swiperDOM = document.getElementsByClassName('swiper-img')[0];
      this.pageSize.width = swiperDOM.getBoundingClientRect().width;
      this.pageSize.height = swiperDOM.getBoundingClientRect().height;
      this.offsetY = (this.pageSize.height - this.pageSize.width * 1.9034) / 2;
      this.downArrowRange.yRange[0]=this.offsetY<0 ?(this.downArrowRange.yRange[0]+this.offsetY/this.pageSize.width*100):(this.downArrowRange.yRange[0]);
      this.longCtx = this.longCanvasDOM.getContext('2d');
      for (let i = 0; i < 4; i++) {
        this.shortCtx[i] = this.shortCanvasDOM[i].getContext('2d');
      }
      //第一个短视频播放
      this.shortVideoPlay(this.index);
      //阻止微信端的长按触发'选择浏览器打开'....
      document.oncontextmenu = function (e) {
        e.preventDefault();
      };
      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
    }
  }
</script>
<style lang="scss">
  .swiper-img {
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    .swiper-fixed {
      width: 100vw;
      height: 190.338vw;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      .swiper-container {
        width: 400vw;
        height: 190.338vw;
        display: flex;
        overflow: hidden;
        position: absolute;
        z-index: 11;
        top: 0;
        left: 0;
        transition: left .3s linear;
        .swiper-card {
          width: 100vw;
          height: 190.338vw;
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          .container {
            width: 100vw;
            position: absolute;
            z-index: 12;
            left: 0;
            background-repeat: no-repeat;
            background-size: cover;
            .shortCanvas {
              position: absolute;
              z-index: 13;
              width: 58vw;
              left: 50%;
              transform: translateX(-50%);
            }
          }
          img {
            display: block;
            width: 49.92vw;
            height: 22.54vw;
            position: absolute;
            top: 136.23vw;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .btn {
        position: absolute;
        z-index: 20;
      }
      .isTransparent {
        opacity: 0;
      }
      .left {
        width: 12.32vw;
        height: 16.75vw;
        left: 1.61vw;
        top: 70.1vw;
      }
      .right {
        width: 12.32vw;
        height: 16.75vw;
        left: 86.07vw;
        top: 70.1vw;
      }
      .click {
        width: 6.28vw;
        height: 3.06vw;
        left: 46.86vw;
        bottom: 16.10vw;
      }
      .longCanvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 190.338vw;
        z-index: 500;
      }
      .longVideoWordPic {
        position: absolute;
        z-index: 900;
      }
      .pic1 {
        width: 25.28vw;
        height: 6.76vw;
        left: 5.64vw;
      }
      .pic2 {
        width: 19.4vw;
        height: 10.71vw;
        left: 70.96vw;
      }
      .pic3 {
        left: 5.64vw;
      }
      .pic5 {
        width: 17.71vw;
        height: 17.71vw;
        left: 41.14vw;
      }
    }
  }
</style>
