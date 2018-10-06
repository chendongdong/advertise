<template>
  <div class="swiper-img" :style="swiperStyle">
    <div class="swiper-card" v-for="(item,index) in swiperCardList" :style="{backgroundImage:`url(${item.bgUrl})`}">
      <div class="container"
           :style="{height: item.borderHeight + 'vh',top: item.borderTop + 'vh',backgroundImage: `url(${item.borderImgSrc})`,}">
        <canvas class="shortCanvas" :width="pageSize.width * .58"
                :height="item.height * .01 * pageSize.height"
                :style="{top: item.videoTop + 'vh',height:item.height + 'vh'}"></canvas>
        <img :src="item.longPressSrc" alt="长按查看">
      </div>
    </div>
    <img v-if="index !== 0" :class="['left','btn',{'isTransparent':isSwipering}]" src="../assets/left_btn.png"
         alt="右滑">
    <img v-if="index !== 3" :class="['right','btn',{'isTransparent':isSwipering}]" src="../assets/right_btn.png"
         alt="左滑">
    <img :class="['click','btn',{'isTransparent':isSwipering || !isSatisfied}]"
         src="../assets/click_btn.png" alt="查看详细">
    <canvas class="longCanvas" :style="{opacity:isCanvasShow?1:0}"
            :width="pageSize.width"
            :height="pageSize.height"
            v-finger:tap="tapArrow"
            v-finger:swipe="swiper"
            v-finger:long-tap="longTap"
            v-finger:touch-end="touchend"></canvas>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XButton, XHeader} from 'vux'

  export default {
    components: {
      XButton, XHeader,
    },
    data() {
      return {
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
        shortVideoNumList: [90, 100, 100, 100],
        shortCanvasDOM: null,
        longCanvasDOM: null,
        longCtx: null,
        shortCtx: [],
        touchStartPoint: {
          clientX: null,
          clientY: null
        },
        index: 0,//标记用户目前正在看的图片的序列号
        isSwipering: false,//是否正在滑动
        isCanvasShow: false,//是否显示canvas
        intervalTimer: null,
        timeoutTimer: null,
        frameNum: 30,//帧数 video中取图片保证每秒30帧
        upendSpeed: 3,//倒放倍数
        longVideoCount: 0,
        isSatisfied: false,
        picWordList: ['冰面', '星空', '海洋', '岩石'],
        swiperCardList: [
          {
            height: 50.7,
            videoTop: 8,
            borderTop: 9.3,
            borderHeight: 76.3,
            bgUrl: require('../assets/bg13.png'),
            postSrc: require('../assets/frame1.png'),
            borderImgSrc: require('../assets/frame_border1.png'),
            longPressSrc: require('../assets/longPressBtn1.png'),
          },
          {
            height: 44.1,
            videoTop: 9.7,
            borderTop: 10.8,
            borderHeight: 74.7,
            bgUrl: require('../assets/bg24.png'),
            postSrc: require('../assets/frame2.png'),
            borderImgSrc: require('../assets/frame_border2.png'),
            longPressSrc: require('../assets/longPressBtn2.png'),
          },
          {
            height: 30.5,
            videoTop: 8.9,
            borderTop: 18.6,
            borderHeight: 67,
            bgUrl: require('../assets/bg13.png'),
            postSrc: require('../assets/frame3.png'),
            borderImgSrc: require('../assets/frame_border3.png'),
            longPressSrc: require('../assets/longPressBtn3.png'),
          },
          {
            height: 49,
            videoTop: 14,
            borderTop: 3.5,
            borderHeight: 82,
            bgUrl: require('../assets/bg24.png'),
            postSrc: require('../assets/frame4.png'),
            borderImgSrc: require('../assets/frame_border4.png'),
            longPressSrc: require('../assets/longPressBtn4.png'),
          }
        ],
        longTouchRange: {
          xRange: [.162, .676],
          yRange: [.686, .169]
        },
        leftArrowRange: {
          xRange: [.016, .123],
          yRange: [.374, .088]
        },
        rightArrowRange: {
          xRange: [.861, .123],
          yRange: [.374, .088]
        },
        downArrowRange: {
          xRange: [0, 1],
          yRange: [.686, .314]
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
        let xRatio = clientX / this.pageSize.width, yRatio = clientY / this.pageSize.height;
        return xRatio >= rangeXMin && xRatio <= rangeXMax && yRatio >= rangeYMin && yRatio <= rangeYMax;
      },
      tapArrow(e) {
        let client = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };
        let arr = [this.leftArrowRange, this.rightArrowRange],
          rangeXMin, rangeXMax, rangeYMin, rangeYMax, tapIndex = null;
        for (let i = 0; i < 2; i++) {
          rangeXMin = arr[i].xRange[0];
          rangeXMax = arr[i].xRange[0] + arr[i].xRange[1];
          rangeYMin = arr[i].yRange[0];
          rangeYMax = arr[i].yRange[0] + arr[i].yRange[1];
          if (this.validate(client.x, client.y, rangeXMin, rangeXMax, rangeYMin, rangeYMax)) {
            tapIndex = i;
            break;
          }
        }
        switch (tapIndex) {
          case 0:
            if (this.index !== 0) {
              this.setIndex(this.index - 1)
            }
            break;
          case 1:
            if (this.index !== 3) {
              this.setIndex(this.index + 1)
            }
            break;
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
            if(this.isSatisfied && !this.isCanvasShow){
              let client = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
              };
              let rangeXMin = this.downArrowRange.xRange[0],
                rangeXMax = this.downArrowRange.xRange[0] + this.downArrowRange.xRange[1],
                rangeYMin = this.downArrowRange.yRange[0],
                rangeYMax = this.downArrowRange.yRange[0] + this.downArrowRange.yRange[1];
              console.log(client.x, client.y, rangeXMin, rangeXMax, rangeYMin, rangeYMax);
              if (this.validate(client.x, client.y, rangeXMin, rangeXMax, rangeYMin, rangeYMax)) {
                this.$router.push({path: '/swiper-next'})
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
              clearInterval(this.intervalTimer);
            }
          }, 1000 / this.frameNum);
        }
      },
      touchend() {
        if (this.isCanvasShow) {
          clearInterval(this.intervalTimer);
          this.intervalTimer = setInterval(() => {
            if (this.longVideoCount < this.upendSpeed) {
              this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
              this.longVideoCount = 0;
              this.isCanvasShow = false;
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
          this['shortVideoArr' + i][j].src = i === 0
            ? require(`../assets/shortVideo/0${i + 1}/0${i + 1}_微动${j.toString().padStart(wordLen, '0')}.jpg`)
            : require(`../assets/shortVideo/0${i + 1}/0${i + 1}_微动${j.toString().padStart(wordLen, '0')}.jpg`);
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
      this.pageSize.width = swiperDOM.getBoundingClientRect().width / 4;
      this.pageSize.height = swiperDOM.getBoundingClientRect().height;
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
    width: 400vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    transition: left .3s linear;
    .swiper-card {
      width: 100vw;
      height: 100vh;
      background-size: 100% 100%;
      position: relative;
      .container {
        width: 100vw;
        position: absolute;
        left: 0;
        background-size: 100% 100%;
        .shortCanvas {
          position: absolute;
          width: 58vw;
          left: 50%;
          transform: translateX(-50%);
        }
        img {
          display: block;
          width: 67.6vw;
          height: 16.9vh;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }

    }
    .border {
      position: fixed;
      top: 90%;
      left: 0;
      width: 100%;
      height: 0;
      border-top: 1px solid red;
    }
    .btn {
      position: fixed;
    }
    .isTransparent {
      opacity: 0;
    }
    .left {
      width: 12.3vw;
      height: 8.8vh;
      left: 1.6vw;
      top: 42.8%;
      transform: translateY(-50%);
    }
    .right {
      width: 12.3vw;
      height: 8.8vh;
      right: 1.6vw;
      top: 42.8%;
      transform: translateY(-50%);
    }
    .click {
      width: 23px;
      height: 12px;
      left: 50%;
      bottom: 8.5%;
      transform: translateX(-50%);
    }
    .longCanvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
  }
</style>
