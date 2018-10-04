<template>
	<div class="swiper-card" :style="{backgroundImage:`url(${bgUrl})`}">
		<div class="top">
			<div class="container" :style="containerStyle">
				<!--<img :src="imgSrc" :style="imgStyle" alt="图片">-->
				<video :src="videoSrc" :style="videoStyle" autoplay loop></video>
			</div>
			<img :src="longPressSrc" alt="长按查看" @touchstart="touchStart">
		</div>
	</div>
</template>

<script>
	export default {
		name: "SwiperCard",
		props: {
			index:{
				type:Number,
			},
			width: {
				type: Number,
				default: 21,
			},
			height: {
				type: Number,
			},
			borderWidth: {
				type: Number,
				default: 41.2
			},
			borderHeight: {
				type: Number,
			},
			bgUrl: {
				type: String,
				require: true,
			},
			imgSrc: {
				type: String,
				require: true,
			},
			borderSrc: {
				type: String,
				require: true,
			},
			videoSrc: {
				type: String,
				require: true,
			},
			longPressSrc: {
				type: String,
				require: true,
			}
		},
		computed: {
			containerStyle() {
				return {
					width: this.borderWidth + 'rem',
					height: this.borderHeight + 'rem',
					backgroundImage: `url(${this.borderSrc})`,
				}
			},
			imgStyle() {
				return {
					width: this.width + 'rem',
					height: this.height + 'rem',
				}
			},
			videoStyle() {
				return {
					width: this.width + 'rem',
					height: this.height + 'rem',
				}
			}
		},
		methods: {
			touchStart() {
				this.$emit('touchResult',this.index)
			}
		},
	}
</script>

<style lang="scss">
	.swiper-card {
		width: 100vw;
		height: 100vh;
		background-size: 100% 100%;
		.top {
			width: 100%;
			height: 85vh;
			position: relative;
			.container {
				margin: 0 auto;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background-size: 100% 100%;
				img {
					top: 6rem;
					left: 50%;
					transform: translateX(-50%);
				}
				video {
					position: absolute;
					top: 6rem;
					left: 50%;
					object-fit: fill;
					transform: translateX(-50%);
				}
			}
			img {
				display: block;
				width: 24.3rem;
				height: 10.8rem;
				position: absolute;
				bottom: -1%;
				left: 50%;
				transform: translateX(-50%);
			}
		}

	}

</style>
