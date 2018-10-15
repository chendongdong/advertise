<template>
	<div class="container">
		<transition name="slide">
			<popular-science v-if="showNextPage" @back="backThisPage" @toggle-bgm-icon="toggleBgnIcon"></popular-science>
		</transition>
		<transition name="reslide">
			<div v-show="!showNextPage" class="end" v-finger:swipe="swiper">
				<iframe v-if="!showNextPage" frameborder="0" class="vif" src="https://v.qq.com/iframe/player.html?vid=q07434otbls&tiny=0&auto=0" allowfullscreen></iframe>
				<div class="bottom">
					<span v-for="item in wordList">{{item}}</span>
					<div class="know">
						<div class="know-text">了解乳腺癌</div>
						<img class="browse" @click.stop.prevent="browse" src="~@/assets/botton_dark_btn.gif"/>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	export default {
		components: {
      popularScience: r => require.ensure([], () => r(require('@/views/PopularScience')), 'PopularScience')
    },
		data() {
			return {
				// iconList: [
				// 	require('../assets/liying.png'),
				// 	require('../assets/CDC.png')
				// ],
				wordList: [
					'每张“摄影”作品背后都有不同的故事',
					'都指向被我们忽略的问题',
					'给原本绚烂的生命带来阴霾',
					'早筛，帮助生命驱走阴霾',
					'腾讯觅影将AI技术应用于医学影像',
					'助力医生进行癌症早筛',
					'愿人生的每一支舞都不被打断',
					'世界爱乳日 了解乳腺癌',
					'分享给你爱的人',
					'让公益无处不在'
				],
				showNextPage: false
			}
		},
		methods: {
			changeBgm(index) {
				this.$emit('change-bgm', index)
			},
			browse(){
				//  window.location.href = 'http://bcra.appclaw.com/';
				 this.showNextPage = true;
				 this.$emit('change-bgm', 2)
				 this.$emit('toggle-bgm-icon', true)
			},
			backThisPage() {
				this.showNextPage = false;
				this.$emit('toggle-bgm-icon', false)
			},
			toggleBgnIcon(flag) {
				this.$emit('toggle-bgm-icon', flag)
			},
			// initVideo() {
			// 	let video = new tvp.VideoInfo();
			// 	video.setVid('j0740fnf1ei');
			// 	let player =new tvp.Player();
			// 	player.create({
			// 		width: '100%',       //播放器的宽度
			// 		height: '100%', //播放器的高度
			// 		video: video,       //默认的视频对象
			// 		modId: "mod_player",       //默认的 DOM 元素 ID
			// 		autoplay: false,
			// 		pic: require('../assets/icon_poster.jpg')
			// 	});
			// 	player.onplaying = function (vid){
			// 		console.log(vid)
			// 	}
			// 	player.onallended = function (vid){
			// 		console.log(vid)
			// 	};
			// },
			swiper(e) {
				switch (e.direction) {
					case 'Down':
						// this.$emit('change-bgm', 1)
						// this.$emit('toggle-bgm-icon', true)
						this.$emit('back')
						break;
					case 'Up':
						this.browse()
						break;
				}
			},
		},
		mounted() {
			this.$nextTick(function () {
				document.addEventListener('touchmove', function(e) {
				e.preventDefault();
						}, false);
						// this.initVideo();
			})
		}
	}
</script>
<style lang="scss">
	.container{
		width: 100vw;
		height: 100vh;
	}
	.vif {
		width: 100vw;
		height: 56vw;
	}
	.end {
	width: 100vw;
	height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #fff;
		#mod_player{
			width: 100%;
			height: 32vh;
		}
		.top {
			display: block;
			width: 100vw;
			/*height: 29.6vh;*/
			object-fit: fill;
		}
		.bottom {
			height: 70.4vh;
			position: relative;
			span {
				position: absolute;
				display: block;
				width: 100vw;
				height: 2vh;
				font-family: SourceHanSansCN-Medium;
				font-size: 2vh;
				line-height: 2vh;
				color: #9B9B9B;
        letter-spacing: 0.5vw;
				text-align: center;
			}
			@for $i from 1 through 10 {
				span:nth-child(#{$i}) {
					top: (10vw + ($i - 1) * 7vw);
				}
			}
      .ending{
        width: 50.9vw;
        /*height: 5vh;*/
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10.5vh;
      }
		}
		.know{
			position: fixed;
			bottom: 5vh;
			left: 0;
			right: 0;
			margin: 0 auto;
			text-align: center;
			.know-text{
				font-size: 12px;
			}
			.browse {
				display: inline-block;
				width: 6vw;
				margin-top: 10px;
				opacity: .6;
			}
		}
	}
</style>
