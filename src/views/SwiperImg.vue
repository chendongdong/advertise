<template>
	<div class="swiper-img" :style="swiperStyle">
		<v-swiper-card v-for="(item,index) in swiperCardList" :width="item.width" :height="item.height" :index="index"
		               :border-width="item.borderWidth" :border-height="item.borderHeight"
		               :long-press-src="item.longPressSrc"
		               :img-src="item.imgSrc" :video-src="item.videoSrc" :bgUrl="item.bgUrl" :borderSrc="item.borderSrc"
		               :key="index" @touchResult="swiperCardTouchResult"></v-swiper-card>
		<img v-if="index !== 0" class="left btn" src="../assets/left_btn.png" alt="<" @click="clickSwiper(-1)">
		<img v-if="index !== 3" class="right btn" src="../assets/right_btn.png" alt=">" @click="clickSwiper(1)">
		<img class="click btn" src="../assets/click_btn.png" alt="v" @click="clickDown">
		<video ref="video" v-show="isVideoShow" :src="dynamicSrc" @touchend="touchEndResult"></video>
	</div>
</template>
<script>
	import SwiperCard from '../components/SwiperCard/SwiperCard'
	import {mapGetters} from 'vuex'
	import {XButton, XHeader} from 'vux'
	
	export default {
		components: {
			XButton, XHeader,
			'v-swiper-card': SwiperCard
		},
		
		data() {
			return {
				index: 0,
				isVideoShow: false,
				dynamicSrc: '',
				swiperCardList: [
					{
						width: 21,
						height: 32.4,
						borderWidth: 36,
						borderHeight: 48.8,
						bgUrl: require('../assets/bg13.png'),
						borderSrc: require('../assets/frame_border1.png'),
						imgSrc: require('../assets/frame1.png'),
						videoSrc: require('../assets/frame1.mp4'),
						longPressSrc: require('../assets/longPressBtn1.png')
					},
					{
						width: 21,
						height: 34.7,
						borderWidth: 36,
						borderHeight: 58.9,
						bgUrl: require('../assets/bg24.png'),
						borderSrc: require('../assets/frame_border2.png'),
						imgSrc: require('../assets/frame2.png'),
						videoSrc: require('../assets/frame2.mp4'),
						longPressSrc: require('../assets/longPressBtn2.png')
					},
					{
						width: 21,
						height: 24,
						borderWidth: 36,
						borderHeight: 52.7,
						bgUrl: require('../assets/bg13.png'),
						borderSrc: require('../assets/frame_border3.png'),
						imgSrc: require('../assets/frame3.png'),
						videoSrc: require('../assets/frame3.mp4'),
						longPressSrc: require('../assets/longPressBtn3.png')
					},
					{
						width: 21,
						height: 38.6,
						borderWidth: 36,
						borderHeight: 64.6,
						bgUrl: require('../assets/bg24.png'),
						borderSrc: require('../assets/frame_border4.png'),
						imgSrc: require('../assets/frame4.png'),
						videoSrc: require('../assets/frame4.mp4'),
						longPressSrc: require('../assets/longPressBtn4.png')
					}
				],
				timer: null,
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
			jumpAnimation() {
				this.$router.push({path: '/swiper-animation'})
			},
			clickSwiper(num) {
				this.index += num;
			},
			swiperCardTouchResult(index) {
				console.log(index);
				this.isVideoShow = true;
				this.$refs.video.play();
			},
			clickDown() {
				this.$router.push({path: '/swiper-next'})
			},
			touchEndResult() {
				//方式1:playbackRate不能为负数
				// this.isVideoShow = false;
				// this.$refs.video.playbackRate = -1;
				//方式2:currentTime不能及时相应
				// this.$refs.video.pause();
				// this.$refs.video.currentTime = 2;
				// let currentTime = this.$refs.video.currentTime;//.toFixed(1)
				// this.timer = setInterval(() => {
				// 	currentTime -= .033;
				// 	if(currentTime < 0.033){
				// 		clearInterval(this.timer);
				// 		this.timer=null;
				// 	}else{
				// 		this.$refs.video.currentTime = currentTime
				// 	}
				// }, 33.33)
				//方式3:顺序播放时直接获取到canvas上的图片,然后setinterval倒放
				
				//方式4:直接给倒放的视屏
				
				
			}
		},
		mounted() {
			setTimeout(() => {
				this.dynamicSrc = require('../assets/animation1.mp4');
			}, 0)
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
		video {
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
		.left {
			width: 4.4rem;
			height: 5.6rem;
			left: .6rem;
			top: 42.5%;
			transform: translateY(-50%);
		}
		.right {
			width: 4.4rem;
			height: 5.6rem;
			right: .6rem;
			top: 42.5%;
			transform: translateY(-50%);
		}
		.click {
			width: 2.3rem;
			height: 1rem;
			left: 50%;
			bottom: 8.5%;
		}
	}
</style>