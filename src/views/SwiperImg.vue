<template>
	<div class="swiper-img">
		<!-- :style="{opacity: showSwiperNext?1:0}" -->
		<transition name="slide">
			<swiper-next v-show="showSwiperNext" ref="next" @back="backThisPage" @change-bgm="changeBgm"
						@toggle-bgm-icon="toggleBgnIcon"></swiper-next>
		</transition>
		<transition name="fadefast">
			<div class="swiper-fixed" v-show="!showSwiperNext">
				<div class="swiper-container" :style="swiperStyle">
					<div class="swiper-card" v-for="(item,index) in swiperCardList"
						:style="{backgroundImage:`url(${item.bgUrl})`}">
						<div class="container"
							:style="{height: item.borderHeight + 'vw',top: item.borderTop + 'vw',backgroundImage: `url(${item.borderImgSrc})`,}">
						</div>
						<!-- <canvas class="shortCanvas" :width="pageSize.width * .58"
								:height="item.height * .01 * pageSize.height"
								:style="{top: item.videoTop+item.borderTop + 'vw',height:item.height + 'vw'}"></canvas> -->
						<img class="shortCanvas" :src="item.postSrc"
							:style="{top: item.videoTop+item.borderTop + 'vw',height:item.height + 'vw'}">
						<div class="long-press-icon icon-sprite"
							:style="{backgroundPosition:`-${item.longPressBGPosition.left/designWidthRatio}vw -${item.longPressBGPosition.top/designWidthRatio}vw`}"></div>
					</div>
				</div>
				<div v-show="index !== 0 && !isSwipering" class="left-icon icon-sprite"></div>
				<div v-show="index !== 3 && !isSwipering" class="right-icon icon-sprite"></div>
				<img v-show="!isSwipering && isSatisfied" class="down-icon"
					:style="{bottom:offsetY<0 ?(100/2364*pageSize.height-offsetY+'px'):(200/2364*pageSize.height+'px')}"
					src="~@/assets/BOTTON_btn_100_.gif" alt="查看详细">
				<canvas class="longCanvas" :style="{opacity:isCanvasShow?1:0}"
						:width="pageSize.width"
						:height="pageSize.height"
						v-finger:tap="tapArrow"
						v-finger:swipe="swiper"
						v-finger:long-tap="longTap"></canvas>
				<div v-show="longVideoCount >= 109" class="pic1 xray-sprite" :style="{
					top:offsetY<0 ? 90/designWidthRatio-offsetY/pageSize.width*100+'vw': 90/designWidthRatio+'vw',
					backgroundPosition:`-${931/designWidthRatio}vw -${swiperCardList[index].longVideoWordPicPositionList[0].top/designWidthRatio}vw`}"
					v-finger:tap='stopLongVideo'></div>
				<div v-show="longVideoCount >= 109" class="pic2 xray-sprite" :style="{
					top:offsetY<0 ? 90/designWidthRatio-offsetY/pageSize.width*100+'vw': 90/designWidthRatio+'vw',
					backgroundPosition:`-${931/designWidthRatio}vw -${swiperCardList[index].longVideoWordPicPositionList[1].top/designWidthRatio}vw`}" v-finger:tap='stopLongVideo'></div>
				<div v-show="longVideoCount >= 109" class="pic3 xray-sprite" :style="{top:offsetY<0?354/designWidthRatio-offsetY/pageSize.width*100+'vw':354/designWidthRatio+'vw',
					width:swiperCardList[index].longVideoWordPicPositionList[2].width/designWidthRatio+'vw',height:swiperCardList[index].longVideoWordPicPositionList[2].height/designWidthRatio+'vw',
					backgroundPosition:`-${swiperCardList[index].longVideoWordPicPositionList[2].left/designWidthRatio}vw -${swiperCardList[index].longVideoWordPicPositionList[2].top/designWidthRatio}vw`,
					opacity:longVideoCount >= 127 ? 1:(longVideoCount-109)/18,}" v-finger:tap='stopLongVideo'></div>
				<div v-show="longVideoCount >= 109" class="pic4 xray-sprite" :style="{
					opacity:longVideoCount >= 127 ? 1:(longVideoCount-109)/18,
					backgroundPosition:`-${80/designWidthRatio}vw -${2025/designWidthRatio}vw`,
					bottom:offsetY<0?280/designWidthRatio-offsetY/pageSize.width*100+'vw':12.88+'vw'
					}" v-finger:tap='stopLongVideo'></div>
			</div>
		</transition>
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
				designWidthRatio: 12.42,
				showSwiperNext: false,
				pageSize: {
					width: 0,
					height: 0,
				},
				longVideoArr0: [],
				longVideoArr1: [],
				longVideoArr2: [],
				longVideoArr3: [],
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
				frameNum: 25,//帧数 video中取图片保证每秒帧
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
						longPressBGPosition: {
							left: 100,
							top: 100
						},
						longVideoWordPicPositionList: [
							{
								top: 100
							},
							{
								top: 284
							},
							{
								left: 100,
								top: 100,
								width: 598,
								height: 277
							}
						],
					},
					{
						height: 83.9,
						videoTop: 18.52,
						borderTop: 20.61,
						borderHeight: 142.27,
						bgUrl: require('../assets/bg24.jpg'),
						postSrc: require('../assets/frame2.jpg'),
						borderImgSrc: require('../assets/frame_border2.png'),
						longPressBGPosition: {
							left: 820,
							top: 100
						},
						longVideoWordPicPositionList: [
							{
								top: 604
							},
							{
								top: 788
							},
							{
								left: 100,
								top: 604,
								width: 523,
								height: 227
							},
						],
					},
					{
						height: 57.97,
						videoTop: 16.91,
						borderTop: 35.43,
						borderHeight: 127.456,
						bgUrl: require('../assets/bg13.jpg'),
						postSrc: require('../assets/frame3.jpg'),
						borderImgSrc: require('../assets/frame_border3.png'),
						longPressBGPosition: {
							left: 100,
							top: 480
						},
						longVideoWordPicPositionList: [
							{
								top: 1030
							},
							{
								top: 1214
							},
							{
								left: 100,
								top: 1030,
								width: 500,
								height: 312
							},
						],
					},
					{
						height: 93.24,
						videoTop: 26.73,
						borderTop: 6.68,
						borderHeight: 156.12,
						bgUrl: require('../assets/bg24.jpg'),
						postSrc: require('../assets/frame4.jpg'),
						borderImgSrc: require('../assets/frame_border4.png'),
						longPressBGPosition: {
							left: 820,
							top: 480
						},
						longVideoWordPicPositionList: [
							{
								top: 1541
							},
							{
								top: 1725
							},
							{
								left: 100,
								top: 1541,
								width: 731,
								height: 227
							},
						],
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
				xray: ['xray1', 'xray2', 'xray3', 'xray4']
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
				// this.$emit('play-audio', val + 1)
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
							if (this.isSatisfied) {
								this.showNextPage()
							}
							break;
					}
				} else {
					this.stopLongVideo();
				}
			},
			stopLongVideo(){
				clearInterval(this.intervalTimer);
				if (this.longVideoCount > 10) {
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
					}
				}, 1000 / this.frameNum / this.upendSpeed);
			},
			showNextPage() {
				// this.$emit('pause-audio')
				this.$emit('toggle-bgm-icon', false);
				this.showSwiperNext = true;
				this.$refs.next.addText();
			},
			backThisPage() {
				this.$emit('toggle-bgm-icon', true);
				this.showSwiperNext = false;
				this.isSatisfied = true;
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
			// shortVideoPlay(index) {
			// 	if (this.intervalTimer) {
			// 		clearInterval(this.intervalTimer);
			// 	}
			// 	let i = 0;
			// 	this.intervalTimer = setInterval(() => {
			// 		this.shortCtx[index].drawImage(this['shortVideoArr' + index][i], 0, 0, this.pageSize.width * .58, this.swiperCardList[index].height * .01 * this.pageSize.height);
			// 		i++;
			// 		if (i >= this.shortVideoNumList[this.index]) {
			// 			i = 0;
			// 		}
			// 	}, 1000 / this.frameNum);
			// },
			// initCanvas(index) {
			// 	this.shortCtx[index].drawImage(this['shortVideoArr' + index][0], 0, 0, this.pageSize.width * .58, this.swiperCardList[index].height * .01 * this.pageSize.height);
			// },
			setIndex(num) {
				if (!this.loadImgFlag[num]) {
					this.loadImg(num);
					this.loadImgFlag[num] = true;
				}
				// this.initCanvas(num);
				this.index = num;
				this.isSwipering = true;
				if (this.timeoutTimer) {
					clearTimeout(this.timeoutTimer);
				}
				this.timeoutTimer = setTimeout(() => {
					this.isSwipering = false;
					clearTimeout(this.timeoutTimer);
				}, 500)
				this.$nextTick(() => {
					this.swiperStyle = {
						'-webkit-transform': `translate3d(-${this.index * 25}%,0,0)`
					}
				})
			},
			longTap() {
				if (this.isCanvasShow) {
					return
				}
				this.longVideoCount = 0;
				this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
				this.isCanvasShow = true;
				clearInterval(this.intervalTimer);
				this.intervalTimer = setInterval(() => {
					this.longVideoCount++;
					// 长按音效
					if (this.longVideoCount === 80) {
						this.$emit('play-audio', -1)
					}
					if (this.longVideoCount <= 138) {
						if (this.longVideoCount >= this.frameNum) {
							this.isSatisfied = true;
						}
						if (this.longVideoCount >= 94) {
							this.longCtx.drawImage(this['longVideoArr' + this.index][93], 0, 0, this.pageSize.width, this.pageSize.height);
						} else {
							this.longCtx.drawImage(this['longVideoArr' + this.index][this.longVideoCount], 0, 0, this.pageSize.width, this.pageSize.height);
						}
					} else {
						this.longVideoCount--;
						clearInterval(this.intervalTimer);
					}
				}, 1000 / this.frameNum);
			},
			loadImg(i) {
				for (let j = 0; j <= 93; j++) {
					this['longVideoArr' + i][j] = new Image();
					this['longVideoArr' + i][j].src = require(`../assets/longVideo/0${i + 1}/0${i + 1}_${this.picWordList[i] + j.toString().padStart(3, '0')}.jpg`);
				}
			},
			changeBgm(index) {
				this.$emit('change-bgm', index)
			},
			toggleBgnIcon(flag) {
				this.$emit('toggle-bgm-icon', flag)
			}
		},
		created() {
			//加载第一屏长帧图片
			this.loadImg(0)
		},
		mounted() {
			this.$nextTick(() => {
				// this.shortCanvasDOM = document.getElementsByClassName('shortCanvas');
				this.longCanvasDOM = document.getElementsByClassName('longCanvas')[0];
				let swiperDOM = document.getElementsByClassName('swiper-img')[0];
				this.pageSize.width = swiperDOM.getBoundingClientRect().width;
				this.pageSize.height = swiperDOM.getBoundingClientRect().height;
				this.offsetY = (this.pageSize.height - this.pageSize.width * 1.9034) / 2;
				this.downArrowRange.yRange[0] = this.offsetY < 0
					? (2226 / 2364 * this.pageSize.height - this.offsetY) / this.pageSize.width * 100
					: (2126 / 2364 * this.pageSize.width * 1.9) / this.pageSize.width * 100;
				console.log('this.downArrowRange.yRange[0]', this.downArrowRange.yRange[0]);
				this.longCtx = this.longCanvasDOM.getContext('2d');
				// for (let i = 0; i < 4; i++) {
				// 	this.shortCtx[i] = this.shortCanvasDOM[i].getContext('2d');
				// }
				//第一个短视频播放
				// this.shortVideoPlay(this.index);
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
	$designWidthRatio: 12.42;
	.icon-sprite {
		background-color: transparent;
		background-image: url("../assets/sprite/Icon_sprite.png");
		background-repeat: no-repeat;
		background-size: (1632vw / $designWidthRatio) (1227vw / $designWidthRatio);
	}
	
	.xray-sprite {
		position: absolute;
		z-index: 600;
		background-color: transparent;
		background-image: url("../assets/sprite/Xray_sprite.png");
		background-repeat: no-repeat;
		background-size: (1345vw / $designWidthRatio) (2403vw / $designWidthRatio);
	}
	
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
			height: 2364vw/$designWidthRatio;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			z-index: 10;
			.swiper-container {
				width: 400vw;
				height: 100%;
				display: flex;
				overflow: hidden;
				position: absolute;
				z-index: 11;
				top: 0;
				left: 0;
				// transition: transform .3s cubic-bezier(0.4, 0, 0.2, 1);
				transition: transform .8s ease;
				.swiper-card {
					width: 25%;
					height: 100%;
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
						width: 720vw / $designWidthRatio;
						left: 50%;
						transform: translateX(-50%);
					}
					.long-press-icon {
						display: block;
						width: 620vw / $designWidthRatio;
						height: 280vw / $designWidthRatio;
						position: absolute;
						top: 1692vw / $designWidthRatio;
						left: 50%;
						transform: translateX(-50%);
					}
				}
			}
			.left-icon {
				position: absolute;
				z-index: 20;
				width: 213vw / $designWidthRatio;
				height: 268vw / $designWidthRatio;
				left: 0;
				top: 853vw / $designWidthRatio;
				background-position: (-70vw / $designWidthRatio) (-830vw / $designWidthRatio);
			}
			.right-icon {
				position: absolute;
				z-index: 20;
				width: 213vw / $designWidthRatio;
				height: 268vw / $designWidthRatio;
				right: 0;
				top: 853vw / $designWidthRatio;
				background-position: (-323vw / $designWidthRatio) (-830vw / $designWidthRatio);
			}
			.down-icon {
				position: absolute;
				z-index: 20;
				width: 78vw / $designWidthRatio;
				height: 38vw / $designWidthRatio;
				left: 50%;
				bottom: 200vw / $designWidthRatio;
				opacity: .6;
				transform: translateX(-50%);
			}
			.longCanvas {
				position: absolute;
				top: 0;
				left: 0;
				width: 100vw;
				height: 2364vw/$designWidthRatio;
				z-index: 500;
			}
			.pic1 {
				width: 314vw/$designWidthRatio;
				height: 84vw/$designWidthRatio;
				left: 70vw/$designWidthRatio;
				/*opacity: .6;*/
			}
			.pic2 {
				width: 241vw/$designWidthRatio;
				height: 133vw/$designWidthRatio;
				left: 931vw/$designWidthRatio;
				/*opacity: .6;*/
			}
			.pic3 {
				left: 70vw/$designWidthRatio;
			}
			.pic4 {
				width: 240vw/$designWidthRatio;
				height: 278vw/$designWidthRatio;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
</style>
