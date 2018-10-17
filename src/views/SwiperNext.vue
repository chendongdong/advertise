<template>
	<div class="container">
		<!-- :style="{opacity: showNextPage?1:0}" -->
		<transition name="slide">
			<ending v-if="showNextPage" @back="backThisPage" @toggle-bgm-icon="toggleBgnIcon"
			        @change-bgm="changeBgm"></ending>
		</transition>
		<transition name="reslide">
			<div class="swiper-next" v-show="!showNextPage" v-finger:swipe="swiper">
				<div class="text">
					<transition name="fade" class="group-text">
						<div v-show="showIndex">
							<p class="text-lh" v-for="(item, index) in text" :key="index+1">{{item}}</p>
							<div class="btn-more" @click="jump2Next">查看真实故事</div>
							<!-- <img class="bottom-btn" src="~@/assets/BOTTON_btn_100_.gif"> -->
						</div>
					</transition>
				</div>
				<div class="tips" v-show="showIndex">数据来源：中国乳腺现状综述</div>
			</div>
		</transition>
	</div>
</template>
<script>
	export default {
		components: {
			// PopularScience: r => require.ensure([], () => r(require('@/views/PopularScience')), 'PopularScience')
			ending: r => require.ensure([], () => r(require('@/views/Ending')), 'Ending')
		},
		data() {
			return {
				showNextPage: false,
				showIndex: false,
				text: ['看似美好的事物背后都隐藏着风险', '我国是乳腺癌发病率',
					'增长最快的国家之一', '每10000人里面', '就有4人确诊患乳腺癌',
					'危险逼近', '但你也许还对乳腺癌一无所知']
			}
		},
		methods: {
			jump2Next() {
				this.toggleBgnIcon(false)
				this.showNextPage = true;
			},
			swiper(e) {
				switch (e.direction) {
					case 'Up':
						this.jump2Next();
						// this.$emit('change-bgm', 2)
						break;
					case 'Down':
						this.$emit('back')
						break;
				}
			},
			backThisPage() {
				this.showNextPage = false;
				this.$emit('change-bgm', 1)
			},
			addText(timer = 1000) {
				setTimeout(() => {
					this.showIndex = true;
				}, timer)
			},
			changeBgm(index) {
				this.$emit('change-bgm', index)
			},
			toggleBgnIcon(flag) {
				this.$emit('toggle-bgm-icon', flag)
			}
		},
		mounted() {
			this.$nextTick(function () {
				// this.addText()
				document.addEventListener('touchmove', function (e) {
					e.preventDefault();
				}, false);
			})
		}
	}
</script>
<style lang="scss">
	@import "style/common";
	
	.container {
		width: 100vw;
		height: 100vh;
	}
	
	.swiper-next {
		background: #000;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100vw;
		.btn-more {
			font-family: SourceHanSansCN-Medium;
			color: #000000;
			letter-spacing: 0;
			background: url("../assets/icon_more.png") no-repeat center;
			background-size: 100%;
			/*background: #FFFFFF;*/
			/*box-shadow: 0 0 20px 0 rgba(255,255,255,0.50);*/
			/*border-radius: 50%;*/
			text-align: center;
			margin: 6vh auto;
			margin-bottom: 0;
			width: 36.6vw;
			/*font-size: 2vh;*/
			/*height: 6.5vh;*/
			/*line-height: 6.5vh;*/
			font-size: 12px;
			height: 40px;
			line-height: 40px;
			display: inline-block;
		}
		
		.bottom-btn {
			display: block;
			width: 6.28vw;
			height: 3.06vw;
			margin: 5vh auto 0;
			opacity: .6;
		}
		.text {
			top: 40%;
			line-height: 1.5;
			height: calc(12em + 10.5vh);
		}
		.text-lh {
			line-height: 2.3;
		}
		.fade-enter-active, .fade-leave-active {
			transition: opacity 1s;
		}
		.tips {
			font-family: SourceHanSansCN-Medium;
			color: #9B9B9B;
			letter-spacing: 0;
			font-size: 10px;
			text-align: center;
			position: fixed;
			bottom: 10vh;
			left: 0;
			right: 0;
			margin: 0 auto;
		}
	}
</style>
