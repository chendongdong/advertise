<template>
	<div class="swiper-img">
		<swiper-next :style="{opacity: showSwiperNext?1:0}" ref="next" @close-bgm1="closeBgm1"></swiper-next>
		<div class="swiper-fixed" v-show="!showSwiperNext">
			<div class="swiper-container" :style="swiperStyle">
				<div class="swiper-card" v-for="(item,index) in swiperCardList"
				     :style="{backgroundImage:`url(${item.bgUrl})`}">
					<div class="container"
					     :style="{height: item.borderHeight + 'vw',top: item.borderTop + 'vw',backgroundImage: `url(${item.borderImgSrc})`,}">
					</div>
					<canvas class="shortCanvas" :width="pageSize.width * .58"
					        :height="item.height * .01 * pageSize.height"
					        :style="{top: item.videoTop+item.borderTop + 'vw',height:item.height + 'vw'}"></canvas>
					<img :src="item.longPressSrc" alt="长按查看">
				</div>
			</div>
			<img v-show="(index !== 0 && !isSwipering)" :class="['left','btn']" src="../assets/left_btn.png"
			     alt="右滑">
			<img v-show="(index !== 3 && !isSwipering)" :class="['right','btn']" src="../assets/right_btn.png"
			     alt="左滑">
			<img v-show="!isSwipering && isSatisfied"
				 class="click btn"
			     :style="{bottom:offsetY<0 ?(100/2364*pageSize.height-offsetY+'px'):(200/2364*pageSize.height+'px')}"
			     src="../assets/click_btn.png" alt="查看详细">
			<canvas class="longCanvas" :style="{opacity:isCanvasShow?1:0}"
			        :width="pageSize.width"
			        :height="pageSize.height"
			        v-finger:tap="tapArrow"
			        v-finger:swipe="swiper"
			        v-finger:long-tap="longTap"
			        v-finger:touch-end="touchend"></canvas>
			<img class="longVideoWordPic pic1" :src="swiperCardList[this.index].longVideoWordPicList[0]"
			     v-show="longVideoCount >= 88"
			     :style="{top:offsetY<0 ? 7.25-offsetY/pageSize.width*100+'vw': 7.25+'vw'}" alt="">
			<img class="longVideoWordPic pic2" :src="swiperCardList[this.index].longVideoWordPicList[1]"
			     v-show="longVideoCount >= 88"
			     :style="{top:offsetY<0 ? 7.25-offsetY/pageSize.width*100+'vw': 7.25+'vw'}" alt="">
			<img class="longVideoWordPic pic3" :src="swiperCardList[this.index].longVideoWordPicList[2]"
			     v-show="longVideoCount >= 109"
			     :style="{
			     opacity:longVideoCount >= 127 ? 1:(longVideoCount-109)/18,
				 top:offsetY<0?28.5-offsetY/pageSize.width*100+'vw':28.5+'vw',
				 width:swiperCardList[index].thirdPicSize.width+'vw',
				 height:swiperCardList[index].thirdPicSize.height+'vw'
				 }" alt="">
			<img class="longVideoWordPic pic4" :src="swiperCardList[this.index].longVideoWordPicList[3]"
			     v-show="longVideoCount >= 129"
			     :style="{
			     opacity:longVideoCount >= 139 ? 1:(longVideoCount-129)/10,
			     top:offsetY<0?swiperCardList[index].fourthPicSize.top-offsetY/pageSize.width*100+'vw':swiperCardList[index].fourthPicSize.top+'vw',
			     left:swiperCardList[index].fourthPicSize.left+'vw',
			     width:swiperCardList[index].fourthPicSize.width+'vw',
			     height:swiperCardList[index].fourthPicSize.height+'vw',
			     }" alt="">
			<img class="longVideoWordPic pic5" :src="swiperCardList[this.index].longVideoWordPicList[4]"
			     v-show="longVideoCount >= 69"
			     :style="{
			     opacity:longVideoCount >= 81 ? 1:(longVideoCount-69)/12,
			     bottom:offsetY<0?12.88-offsetY/pageSize.width*100+'vw':12.88+'vw'
			     }" alt="">
		</div>
	</div>
</template>
<script>
	// import SwiperNext from './SwiperNext.vue'

	export default {
		components: {
			// SwiperNext: () => import('./SwiperNext.vue')
			SwiperNext: r => require.ensure([], () => r(require('@/views/SwiperNext')), 'SwiperNext')
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
				shortVideoNumList: [29, 29, 29, 29],
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
				frameNum: 15,//帧数 video中取图片保证每秒帧
				upendSpeed: 3,//倒放倍数
				longVideoCount: 0,
				isSatisfied: false,
				picWordList: ['冰面', '星空', '海洋', '岩石'],
				swiperCardList: [
					{
						height: 96.46,
						videoTop: 15.3,
						borderTop: 17.63,
						borderHeight: 145.17,
						bgUrl: require('../assets/bg13.jpg'),
						postSrc: require('../assets/frame1.jpg'),
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
						bgUrl: require('../assets/bg24.jpg'),
						postSrc: require('../assets/frame2.jpg'),
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
						bgUrl: require('../assets/bg13.jpg'),
						postSrc: require('../assets/frame3.jpg'),
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
						bgUrl: require('../assets/bg24.jpg'),
						postSrc: require('../assets/frame4.jpg'),
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
					xRange: [46.86, 16.28],
					yRange: [171.18, 13.06]
				},
				swiperDownRange: {
					xRange: [0, 100],
					yRange: [129, 39, 60.95]
				},
				loadImgFlag: [true, false, false, false],
				swiperStyle: '',
			}
		},
		// computed: {
		// 	swiperStyle() {
		// 		return {
		// 			// left: `-${this.index}00%`
		// 			'-webkit-transform': `translate3d(-${this.index * 25}%,0,0)`
		// 		}
		// 	}
		// },
		watch: {
			index(val) {
			  // 去掉短视频音效
//				this.$emit('play-audio', val + 1)
			}
		},
		methods: {
      closeBgm1() {
        this.$emit('close-bgm1')
      },
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
							this.showNextPage()
							break;
					}
				}
			},
			showNextPage() {
				this.$emit('pause-audio')
				this.showSwiperNext = true;
				this.$refs.next.addText();
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
							// let client = {
							// 	x: e.changedTouches[0].clientX,
							// 	y: e.changedTouches[0].clientY
							// };
							// let rangeXMin = this.swiperDownRange.xRange[0],
							// 	rangeXMax = this.swiperDownRange.xRange[0] + this.swiperDownRange.xRange[1],
							// 	rangeYMin = this.swiperDownRange.yRange[0],
							// 	rangeYMax = this.swiperDownRange.yRange[0] + this.swiperDownRange.yRange[1];
							// if (this.validate(client.x, client.y, rangeXMin, rangeXMax, rangeYMin, rangeYMax)) {
							// 	this.showNextPage()
							// }
							this.showNextPage()
						}
				}
			},
			shortVideoPlay(index) {
				// if (this.intervalTimer) {
				// 	clearInterval(this.intervalTimer);
				// }
				let i = 0;
				this.intervalTimer = setInterval(() => {
					this.shortCtx[index].drawImage(this['shortVideoArr' + index][i], 0, 0, this.pageSize.width * .58, this.swiperCardList[index].height * .01 * this.pageSize.height);
					i++;
					if (i >= this.shortVideoNumList[this.index]) {
						i = 0;
					}
				}, 1000 / this.frameNum);
			},
			initCanvas(index) {
				this.shortCtx[index].drawImage(this['shortVideoArr' + index][0], 0, 0, this.pageSize.width * .58, this.swiperCardList[index].height * .01 * this.pageSize.height);
			},
			setIndex(num) {
				if (this.intervalTimer) {
					clearInterval(this.intervalTimer);
				}
				if (!this.loadImgFlag[num]) {
					this.loadImg(num);
					this.loadImgFlag[num] = true;
				}

				this.initCanvas(num);
				this.index = num;
				this.isSwipering = true;
				if (this.timeoutTimer) {
					clearTimeout(this.timeoutTimer);
				}
				this.timeoutTimer = setTimeout(() => {
					this.isSwipering = false;
					clearTimeout(this.timeoutTimer);
					// this.shortVideoPlay(this.index);
				}, 500)
				this.shortVideoPlay(this.index);
				this.$nextTick(() => {
					this.swiperStyle = {
						'-webkit-transform': `translate3d(-${this.index * 25}%,0,0)`
					}
					// this.isSwipering = false;
				})
			},
			longTap(e) {
//				this.$emit('pause-audio')
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
						// 长按音效
            if (this.longVideoCount == 79) {
              this.$emit('play-audio', -1)
            }
						if (this.longVideoCount <= 138) {
							if (this.longVideoCount >= this.frameNum) {
								this.isSatisfied = true;
							}
							if(this.longVideoCount >= 94){
								this.longCtx.drawImage(this['longVideoArr' + this.index][93], 0, 0, this.pageSize.width, this.pageSize.height);
							}else{
								this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
							}
						} else {
							this.longVideoCount--;
							clearInterval(this.intervalTimer);
							// this.intervalTimer = null;
						}
					}, 1000 / this.frameNum);
				}
			},
			touchend() {
				if (this.isCanvasShow) {
					clearInterval(this.intervalTimer);
					// this.intervalTimer = null;
					if(this.longVideoCount > 10){
						this.longVideoCount = 10;
					}
					this.intervalTimer = setInterval(() => {
						console.log(this.isCanvasShow);
						if (this.longVideoCount >= 0) {
							this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
							this.longVideoCount--;
						} else {
							this.isCanvasShow = false;
							this.longVideoCount = 0;
							clearInterval(this.intervalTimer);
							// this.intervalTimer = null;
							this.shortVideoPlay(this.index);
							// 去掉短视频音效
//							this.$emit('play-audio', this.index + 1)
						}
					}, 1000 / this.frameNum / this.upendSpeed);
				}
			},
			loadImg(i) {
				for (let j = 0; j <= this.shortVideoNumList[i]; j++) {
					this['shortVideoArr' + i][j] = new Image();
					this['shortVideoArr' + i][j].src = require(`../assets/shortVideo/0${i + 1}/0${i + 1}_微动${j.toString().padStart(2, '0')}.jpg`)

				}
				for (let j = 0; j <= 93; j++) {
					this['longVideoArr' + i][j] = new Image();
					this['longVideoArr' + i][j].src = require(`../assets/longVideo/0${i + 1}/0${i + 1}_${this.picWordList[i] + j.toString().padStart(3, '0')}.jpg`);
				}
				console.log(this['longVideoArr' + i])
			}
		},
		created() {
			//提前加载4个短视频和一个长视屏
			// for (let i = 0, len = 4; i < len; i++) {
			// 	for (let j = 0; j <= this.shortVideoNumList[i]; j++) {
			// 		this['shortVideoArr' + i][j] = new Image();
			// 		this['shortVideoArr' + i][j].src = require(`../assets/shortVideo/0${i + 1}/0${i + 1}_微动${j.toString().padStart(2, '0')}.jpg`)

			// 	}
			// 	console.log(this['shortVideoArr' + i]);
			// 	for (let j = 0; j <= 93; j++) {
			// 		this['longVideoArr' + i][j] = new Image();
			// 		this['longVideoArr' + i][j].src = require(`../assets/longVideo/0${i + 1}/0${i + 1}_${this.picWordList[i] + j.toString().padStart(3, '0')}.jpg`);
			// 	}
			// 	console.log(this['longVideoArr' + i]);
			// }
			// 先加载第一屏	个短视频和一个长视屏
			// for (let j = 0; j <= this.shortVideoNumList[0]; j++) {
			// 	this['shortVideoArr0'][j] = new Image();
			// 	this['shortVideoArr0'][j].src = require(`../assets/shortVideo/01/01_微动${j.toString().padStart(2, '0')}.jpg`)

			// }
			// // console.log(this['shortVideoArr' + i]);
			// for (let j = 0; j <= 93; j++) {
			// 	this['longVideoArr0'][j] = new Image();
			// 	this['longVideoArr0'][j].src = require(`../assets/longVideo/01/01_${this.picWordList[0] + j.toString().padStart(3, '0')}.jpg`);
			// }
			// // console.log(this['longVideoArr' + i]);
			this.loadImg(0)
		},
		mounted() {
			this.$nextTick(() => {
				this.shortCanvasDOM = document.getElementsByClassName('shortCanvas');
				this.longCanvasDOM = document.getElementsByClassName('longCanvas')[0];
				let swiperDOM = document.getElementsByClassName('swiper-img')[0];
				this.pageSize.width = swiperDOM.getBoundingClientRect().width;
				this.pageSize.height = swiperDOM.getBoundingClientRect().height;
				this.offsetY = (this.pageSize.height - this.pageSize.width * 1.9034) / 2;
				this.downArrowRange.yRange[0] =this.offsetY<0
					?(2226/2364*this.pageSize.height-this.offsetY)/this.pageSize.width*100
					:(2126/2364*this.pageSize.width*1.9)/this.pageSize.width*100;
				console.log('this.downArrowRange.yRange[0]',this.downArrowRange.yRange[0]);
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
			})
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
				transition: transform .3s cubic-bezier(0.4, 0, 0.2, 1);
				.swiper-card {
					width: 100vw;
					height: 190.338vw;
					background-repeat: no-repeat;
					background-size: cover;
					position: relative;
					.container {
						width: 100vw;
						position: absolute;
						z-index: 13;
						left: 0;
						background-repeat: no-repeat;
						background-size: cover;
					}
					.shortCanvas {
						position: absolute;
						display: block;
						z-index: 12;
						width: 57.97vw;
						left: 50%;
						transform: translateX(-50%);
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
				opacity: .6;
			}
			.pic2 {
				width: 19.4vw;
				height: 10.71vw;
				left: 70.96vw;
				opacity: .6;
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
