<template>
	<div>
		<audio controls ref="bcgAudio" hidden loop>
			<source src="../assets/audio/BGM_1.mp3" type="audio/mpeg">
			您的浏览器不支持
		</audio>
		<audio controls ref="myAudio" hidden>
			<source :src="getAudioPath()" type="audio/mpeg">
			您的浏览器不支持
		</audio>
		<!-- :style="{opacity: showSwiper?1:0}" -->
		<swiper-img :style="{opacity: showSwiper?1:0}" @play-audio="playAudio" @pause-audio="pauseAudio"
		            @change-bgm="changeBgm" @toggle-bgm-icon="toggleBgmIcon"></swiper-img>
		<transition name="light">
			<div class="loading" v-show="!showSwiper">
				<div class="text" v-show="showText">
					<transition-group name="fade">
						<p :key="1" v-show="showOne">你将看到一组特殊的影像作品</p>
						<p :key="2" v-show="showTwo">它们来自一群「特别」的作者</p>
					</transition-group>
				</div>
				<div class="gif-img" v-show="showText"></div>
			</div>
		</transition>
		<div :class="['play-contanier',{stop:!isMusicIconRotate}]" @click="turnPlay" v-show="showSwiper && showBgmIcon">
			<div v-show="isMusicIconRotate" class="play-gif"></div>
		</div>
	</div>
</template>
<script>
	// import SwiperImg from './SwiperImg.vue'
	export default {
		components: {
			// SwiperImg: () => import('./SwiperImg.vue')
			SwiperImg: r => require.ensure([], () => r(require('@/views/SwiperImg')), 'SwiperImg')
		},
		data() {
			return {
				showOne: false,
				showTwo: false,
				showSwiper: false,
				showBgmIcon: false,
				loadSwiper: false,
				showText: true,
				audioIdx: 0,
				isPlayAudio: false,
        isPlayBcg: false,
				isMusicIconRotate: false,
				audioList: ['Loading_end', 'BGM_1', 'BGM_2', 'X_ray']
			}
		},
		methods: {
			turnPlay() {
				if (this.isPlayBcg) {
					// 关闭
					this.closeBgm1();
					this.isMusicIconRotate = false;
				} else {
					// 打开
					this.playBcg();
					this.isMusicIconRotate = true;
				}
			},
			toggleBgmIcon(flag) {
				if (flag) {
					this.showBgmIcon = true;
					// if (this.isPlayBcg) {
					// 	this.playBcg()
					// } else {
					// 	this.isMusicIconRotate = false;
					// }
          console.log('toggleBgmIcon----')
					this.playBcg()
					if (!this.isMusicIconRotate) this.isMusicIconRotate = true
				} else {
					this.showBgmIcon = false;
					this.closeBgm1()
				}
			},
			getAudioPath() {
				return require('../assets/audio/' + this.audioList[this.audioIdx] + '.mp3')
			},
			// 播放短视频的音效
			playAudio(idx) {
				this.isPlayAudio = true
				this.audioIdx = idx
				if (idx == 0 || idx == -1) {
					this.$refs.myAudio.loop = false
				} else {
					this.$refs.myAudio.loop = true
				}
				if (idx == -1) {
					this.audioIdx = this.audioList.length - 1
				}
				console.log('idx=', idx)
				this.$refs.myAudio.src = this.getAudioPath()
				if (this.isIOS()) {
//					this.$refs.myAudio.load()
					this.$refs.myAudio.pause()
					this.$refs.myAudio.currentTime = 0
				}
				this.$refs.myAudio.play()
			},
			// 切换背景音乐
			changeBgm(idx) {
				if (this.isPlayBcg) {
					this.audioIdx = idx
					this.$refs.bcgAudio.src = this.getAudioPath()
					if (this.isIOS()) {
						this.$refs.bcgAudio.load()
						this.$refs.bcgAudio.pause()
						this.$refs.bcgAudio.currentTime = 0
					}
					this.$refs.bcgAudio.play()
				} else {
					this.audioIdx = idx
					this.$refs.bcgAudio.src = this.getAudioPath()
				}
			},
			pauseAudio() {
				this.isPlayAudio = false
				this.$refs.myAudio.pause()
			},
			jump2Next() {
				// this.playAudio(0);
				setTimeout(() => {
					this.playAudio(0);
					setTimeout(() => {
//						 this.playBcg();
						this.showText = false
						this.showSwiper = true
						this.toggleBgmIcon(true)
					}, 500)
				}, 2000)
			},
			addText(timer = 0) {
				this.loadSwiper = true
				setTimeout(() => {
					if (!this.showOne) {
						this.showOne = true
						this.addText(3000)
					} else if (!this.showTwo) {
						this.showTwo = true
						this.jump2Next()
					}
				}, timer)
			},
			//判断是否是安卓还是ios
			isIOS() {
				let u = navigator.userAgent, app = navigator.appVersion;
				let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				return isiOS
			},
			playBcg() {
				this.isPlayBcg = true
				if (this.isIOS()) {
					console.log('背景音效 ios')
//					this.$refs.bcgAudio.load()
					this.$refs.bcgAudio.pause()
					this.$refs.bcgAudio.currentTime = 0
				}
				this.$refs.bcgAudio.play()
			},
			closeBgm1() {
				this.isPlayBcg = false
				this.$refs.bcgAudio.pause()
			},
		},
		mounted() {
			this.$nextTick(function () {
				document.addEventListener('touchmove', function (e) {
					e.preventDefault();
				}, false);
				let _this = this
		// 		this.$refs.myAudio.addEventListener('canplay', function () {
        //   console.log('音频准备就绪')
		// 			if (_this.isPlayAudio) {
		// 				if (_this.isIOS()) {
		// 					this.pause()
		// 					this.currentTime = 0
		// 				}
		// 				this.play()
		// 			}
		// 		}, false)
		// 		 this.$refs.bcgAudio.addEventListener('canplay', function () {
		// 		   console.log('背景音效准备就绪')
        //    if (_this.isPlayBcg){
        //      if (_this.isIOS()) {
        //        this.pause()
        //        this.currentTime = 0
        //      }
        //      this.play()
        //    }
		// 		 }, false)
				this.$refs.myAudio.addEventListener('error', function (e) {
					console.log('音频出错了--e=')
				}, false)
				this.$refs.myAudio.addEventListener('onload', function (e) {
					console.log('音频 onload --e=')
				}, false)
				document.addEventListener("WeixinJSBridgeReady", function () {
					console.log('WeixinJSBridgeReady---')
					if (_this.isPlayAudio) {
						if (_this.isIOS()) {
							_this.$refs.myAudio.pause()
							_this.$refs.myAudio.currentTime = 0
						}
						_this.$refs.myAudio.play()
					} else {
						if (_this.isIOS()) {
							_this.$refs.myAudio.play()
							_this.$refs.myAudio.pause()
						}
					}
					// 背景音乐，直接播放
          if (_this.isPlayBcg) {
            if (_this.isIOS()) {
              _this.$refs.bcgAudio.pause()
              _this.$refs.bcgAudio.currentTime = 0
              _this.$refs.bcgAudio.play()
            } else {
              _this.$refs.bcgAudio.play()
            }
          } else {
            if (_this.isIOS()) {
              _this.$refs.bcgAudio.play()
              _this.$refs.bcgAudio.pause()
            }
          }
				}, false);
				document.addEventListener('YixinJSBridgeReady', function () {
//          console.log('YixinJSBridgeReady---')
					if (_this.isPlayAudio) {
						if (_this.isIOS()) {
							_this.$refs.myAudio.pause()
							_this.$refs.myAudio.currentTime = 0
						}
						_this.$refs.myAudio.play()
					} else {
            // 重点，否则不会播放
						if (_this.isIOS()) {
							_this.$refs.myAudio.play()
							_this.$refs.myAudio.pause()
						}
					}
					// 背景音乐，直接播放
          if (_this.isPlayBcg) {
            if (_this.isIOS()) {
              _this.$refs.bcgAudio.pause()
              _this.$refs.bcgAudio.currentTime = 0
              _this.$refs.bcgAudio.play()
            } else {
              _this.$refs.bcgAudio.play()
            }
          } else {
					  // 重点，否则不会播放
            if (_this.isIOS()) {
              _this.$refs.bcgAudio.play()
              _this.$refs.bcgAudio.pause()
            }
          }
				}, false);
			})
		},
		created() {
			window.onload = this.addText
		}
	}
</script>
<style lang="scss">
	@import "style/common";
	$designWidthRatio:12.42;
	.light-leave-active {
		transition: opacity .5s;
	}

	.light-enter {
		opacity: 1;
	}

	.light-leave-to {
		opacity: 0;
	}

	.loading {
		background: url("../assets/ic_loading_bg.jpg") no-repeat center;
		// background-color: rgb(4, 4, 4);
		background-size: cover;
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		.gif-img {
			position: absolute;
			bottom: 10vh;
			left: 50%;
			transform: translateX(-50%);
			background: url("../assets/Loading.gif") no-repeat center;
			background-size: 100%;
			width: 14vw;
			height: 3.2vh;
		}
		.text {
			top: 40%;
		}
	}

	.play-contanier {
		// background: rgba(0, 0, 0, 0.5);
		position: fixed;
		// top: (28vw / $designWidthRatio);
		// right: (28vw / $designWidthRatio);
		top: 0;
		right: 0;
		width: (200vw / $designWidthRatio);
		height: (200vw / $designWidthRatio);
		&.stop{
			background-image: url("../assets/sprite/Icon_sprite.png");
			background-size: (1632vw / $designWidthRatio) (1227vw / $designWidthRatio);
			background-position: (-606vw / $designWidthRatio) (-860vw / $designWidthRatio);
		}
	}
	.play-gif {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: url("../assets/music_play.gif") no-repeat center;
		background-size: 100%;
		// width: 15vw;
		// height: 4vh;
		width: (183vw / $designWidthRatio);
		height: (165vw / $designWidthRatio);
	}
</style>
