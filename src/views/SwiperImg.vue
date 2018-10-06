<template>
	<div class="swiper-img" :style="swiperStyle">
		<div class="swiper-card" v-for="(item,index) in swiperCardList" :style="{backgroundImage:`url(${item.bgUrl})`}">
			<div class="container"
			     :style="{height: item.borderHeight + 'vh',top: item.borderTop + 'vh',backgroundImage: `url(${item.borderImgSrc})`}">
				<img class="image" :src="getPath(index)" :style="{height: item.height + 'vh',top: item.videoTop + 'vh'}">
				<img class="longTap" :src="item.longPressSrc" alt="长按查看">
			</div>
			<video class="big-video" :src="dynamicSrc[index]" preload="auto"></video>
		</div>
		<img v-if="index !== 0" :class="['left','btn',{'isTransparent':isSwipering}]" src="../assets/left_btn.png"
		     alt="右滑">
		<img v-if="index !== 3" :class="['right','btn',{'isTransparent':isSwipering}]" src="../assets/right_btn.png"
		     alt="左滑">
    <!--isSwipering || !swiperCardList[index].isSatisfied-->
		<img :class="['click','btn',{'isTransparent': false}]"
		     src="../assets/click_btn.png" alt="查看详细">
		<canvas :style="{opacity:isCanvasShow?1:0}" ref="canvas" :width="canvasDOM.width" :height="canvasDOM.height"
		        v-finger:tap="tapArrow" v-finger:swipe="swiper" v-finger:long-tap="longTap"
		        v-finger:touch-end="touchend" @touchstart="touchStart" @touchend="touchEnd"></canvas>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import {XButton, XHeader} from 'vux'
  import TouchUtils from '../utils/touchUtils'
	export default {
		components: {
			XButton, XHeader,
		},
		data() {
			return {
				canvasDOM: {
					width: 0,
					height: 0,
				},
				longVideoDOM: null,
				ctx: null,
				dynamicSrc: ['', '', '', ''],//长视屏播放地址
				swiperMarkX: null,//标记clientX来确认左右滑
				touchStartPoint: {
					clientX: null,
					clientY: null
				},
				index: 0,//标记用户目前正在看的图片的序列号
				isSwipering: false,//是否正在滑动
				isCanvasShow: false,//是否显示canvas
				intervalTimer: null,
				timeoutTimer: null,
				canvasPicArr: [],//存储用来在canvas中倒放
				frameNum: 30,//帧数 video中取图片保证每秒30帧
				upendSpeed: 2,//倒放倍数
        imgIndx: 0,
				swiperCardList: [
					{
						height: 50.7,
						videoTop: 8,
						borderTop: 9.3,
						borderHeight: 76.3,
						len: 90,
            direct: '01/01_微动',
						bgUrl: require('../assets/bg13.png'),
						borderImgSrc: require('../assets/frame_border1.png'),
						shortVideoSrc: require('../assets/frame1.mp4'),
						longPressSrc: require('../assets/longPressBtn1.png'),
						longVideoSrc: require('../assets/animation1.mp4'),
						isSatisfied: false,
					},
					{
						height: 44.1,
						videoTop: 9.7,
						borderTop: 10.8,
						borderHeight: 74.7,
            len: 100,
            direct: '02/02_微动',
						bgUrl: require('../assets/bg24.png'),
						borderImgSrc: require('../assets/frame_border2.png'),
						shortVideoSrc: require('../assets/frame2.mp4'),
						longPressSrc: require('../assets/longPressBtn2.png'),
						longVideoSrc: require('../assets/animation2.mp4'),
						isSatisfied: false
					},
					{
						height: 30.5,
						videoTop: 8.9,
						borderTop: 18.6,
						borderHeight: 67,
            len: 100,
            direct: '03/03_微动',
						bgUrl: require('../assets/bg13.png'),
						borderImgSrc: require('../assets/frame_border3.png'),
						shortVideoSrc: require('../assets/frame3.mp4'),
						longPressSrc: require('../assets/longPressBtn3.png'),
						longVideoSrc: require('../assets/animation3.mp4'),
						isSatisfied: false,
					},
					{
						height: 49,
						videoTop: 14,
						borderTop: 3.5,
						borderHeight: 82,
            len: 100,
            direct: '04/04_微动',
						bgUrl: require('../assets/bg24.png'),
						borderImgSrc: require('../assets/frame_border4.png'),
						shortVideoSrc: require('../assets/frame4.mp4'),
						longPressSrc: require('../assets/longPressBtn4.png'),
						longVideoSrc: require('../assets/animation4.mp4'),
						isSatisfied: false,
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
					xRange: [.469, .063],
					yRange: [.899, .016]
				},
        startx: null,
        starty: null,
        endx: null,
        endy: null
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
      getPath(index) {
        let imgIndxFormat = this.imgIndx
        if (index == 0) {
          if (imgIndxFormat < 10) {
            imgIndxFormat = '0' + imgIndxFormat
          }
        } else {
          if (imgIndxFormat < 10) {
            imgIndxFormat = '00' + imgIndxFormat
          } else if (imgIndxFormat < 100) {
            imgIndxFormat = '0' + imgIndxFormat
          }
        }
        return require('../assets/image/' + this.swiperCardList[index].direct + imgIndxFormat + '.jpg')
      },
      touchStart(e) {
        console.log('touchStart---')
        this.startx = e.touches[0].pageX;
        this.starty = e.touches[0].pageY;
      },
      touchEnd(e) {
        console.log('touchEnd---')
        this.endx = e.changedTouches[0].pageX;
        this.endy = e.changedTouches[0].pageY;
        var direction = TouchUtils.getDirection(this.startx, this.starty, this.endx, this.endy)
        switch (direction) {
          case 0:
            console.log("未滑动！");
            break;
          case 1:
            console.log("向上！")
            this.$router.push({path: '/swiper-next'})
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
			validate(clientX, clientY, rangeXMin, rangeXMax, rangeYMin, rangeYMax) {
				let xRatio = clientX / this.canvasDOM.width, yRatio = clientY / this.canvasDOM.height;
				return xRatio >= rangeXMin && xRatio <= rangeXMax && yRatio >= rangeYMin && yRatio <= rangeYMax;
			},
			tapArrow(e) {
				let client = {
					x: e.changedTouches[0].clientX,
					y: e.changedTouches[0].clientY
				};
				let arr = [this.leftArrowRange, this.rightArrowRange, this.downArrowRange],
					rangeXMin, rangeXMax, rangeYMin, rangeYMax, tapIndex = null;
				for (let i = 0; i < 3; i++) {
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
							console.log(this.index);
							this.setIndex(this.index - 1)
              this.imgIndx = 0
						}
						break;
					case 1:
						if (this.index !== 3) {
							this.setIndex(this.index + 1)
              this.imgIndx = 0
						}
						break;
					case 2:
					   console.log('tap 点击了')
//						if (this.swiperCardList[this.index].isSatisfied) {
							this.$router.push({path: '/swiper-next'})
//						}
						break;
				}
			},
			swiper(e) {
				switch (e.direction) {
					case 'Left':
						if (this.index !== 3) {
							this.setIndex(this.index + 1)
              this.imgIndx = 0
            }
						break;
					case 'Right':
						if (this.index !== 0) {
							this.setIndex(this.index - 1)
              this.imgIndx = 0
						}
						break;
				}
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
					this.canvasPicArr = [];
					this.timeoutTimer = setTimeout(() => {
						if (this.intervalTimer !== null) {
							clearInterval(this.intervalTimer);
							this.intervalTimer = null;
						}
					}, this.longVideoDOM[this.index].duration * 1000);
					this.longVideoDOM[this.index].play();
					this.ctx.drawImage(this.longVideoDOM[this.index], 0, 0, this.canvasDOM.width, this.canvasDOM.height);
					this.isCanvasShow = true;
					let img, i = 0;
					this.intervalTimer = setInterval(() => {
						this.ctx.drawImage(this.longVideoDOM[this.index], 0, 0, this.canvasDOM.width, this.canvasDOM.height);
						if (i % this.upendSpeed === 0) {
							img = new Image();
							img.src = this.$refs.canvas.toDataURL("image/png");
							this.canvasPicArr[i / this.upendSpeed] = img;
						}
						i++;
					}, 1000 / this.frameNum)
				}
			},
			touchend() {
				if (this.isCanvasShow) {
					clearInterval(this.intervalTimer);
					this.longVideoDOM[this.index].pause();
					if (this.longVideoDOM[this.index].currentTime >= 2) {
						this.swiperCardList[this.index].isSatisfied = true;
					}
					let img = new Image();
					this.intervalTimer = setInterval(() => {
						if (this.canvasPicArr.length === 0) {
							clearInterval(this.intervalTimer);
							this.intervalTimer = null;
							this.isCanvasShow = false;
							this.longVideoDOM[this.index].currentTime = 0;
						} else {
							img = this.canvasPicArr.pop();
							this.ctx.drawImage(img, 0, 0, this.canvasDOM.width, this.canvasDOM.height);
						}
					}, 1000 / (this.frameNum * this.upendSpeed));
				}
			},
			setIndex(num) {
				this.index = num;
				this.isSwipering = true;
				if (this.timeoutTimer !== null) {
					clearTimeout(this.timeoutTimer);
					this.timeoutTimer = null;
				}
				this.timeoutTimer = setTimeout(() => {
					this.isSwipering = false;
					clearTimeout(this.timeoutTimer);
					this.timeoutTimer = null;
					if (this.dynamicSrc[this.index] === '') {
						this.dynamicSrc[this.index] = this.swiperCardList[this.index].longVideoSrc;
					}
				}, 300)
			},
      changeImgIndx(timer=100) {
        setTimeout(() => {
          if (this.imgIndx < this.swiperCardList[this.index].len) {
            this.imgIndx++
          } else {
            this.imgIndx = 0
          }
          this.changeImgIndx()
        }, timer)
      }
		},
		mounted() {
		  this.$nextTick(function () {
        this.changeImgIndx()
        let swiperDOM = document.getElementsByClassName('swiper-img')[0];
        this.longVideoDOM = document.getElementsByClassName('big-video');
        this.canvasDOM.width = swiperDOM.getBoundingClientRect().width / 4;
        this.canvasDOM.height = swiperDOM.getBoundingClientRect().height;
        this.ctx = this.$refs.canvas.getContext('2d');
        this.dynamicSrc[0] = require('../assets/animation1.mp4');
      })
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
				.image,video {
					position: absolute;
					width: 58vw;
					left: 50%;
					object-fit: fill;
					transform: translateX(-50%);
				}
				.longTap {
					display: block;
					width: 160px;
					height: 68px;
					position: absolute;
					bottom: 3%;
          left: 50%;
          transform: translateX(-50%);
				}
			}

		}
		.big-video {
			display: none;
			position: fixed;
			top: 0;
			left: 0;
			object-fit: fill;
			width: 100vw;
			height: 100vh;
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
			width: 6.3vw;
			height: 1.6vh;
			left: 50%;
			bottom: 8.5%;
      transform: translateX(-50%);
		}
		canvas {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
		}
	}
</style>
