<template>
	<div class="end">
		<video class="top" src="" autoplay loop></video>
		<div class="bottom">
			<span v-for="item in wordList">{{item}}}</span>
			<div class="browse" @click.stop.prevent="browse">访问网页</div>
			<div class="iconList">
				<img v-for="item in iconList" :src="item" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	import {XButton, XHeader} from 'vux'

	export default {
		components: {
			XButton, XHeader
		},
		computed: {
			...mapGetters([
				'sidebar',
				'language'
			])
		},
		data() {
			return {
				iconList: [
					require('../assets/tencent.png'),
					require('../assets/liying.png'),
					require('../assets/CDC.png')
				],
				wordList: ['早筛，给生命以时光',
					'腾讯觅影将AI技术应用于医学影像',
					'助力医生进行癌症早筛',
					'科技向善，愿人生的每一支舞',
					'都不被打断'
				],
			}
		},
		methods: {
			browse(){
				 window.location.href = 'http://bcra.appclaw.com/';
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss">
	.end {
		width: 100vw;
		height: 100vh;
		.top {
			display: block;
			width: 100vw;
			height: 29.6vh;
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
				letter-spacing: 4px;
				text-align: center;
			}
			span:nth-child(1) {
				top: 7.6vh;
			}
			span:nth-child(2) {
				top: 12.6vh;
			}
			span:nth-child(3) {
				top: 17.7vh;
			}
			span:nth-child(4) {
				top: 22.8vh;
			}
			span:nth-child(5) {
				top: 27.9vh;
			}
			.browse {
				position: absolute;
				top: 38.5vh;
				left: 50%;
				transform: translateX(-50%);
				width: 24.5vw;
				height: 4.2vh;
				background: #FFFFFF;
				border: 1px solid #4A4A4A;
				border-radius: 2.1vh;
				line-height: 4.2vh;
				font-family: SourceHanSansCN-Medium;
				font-size: 1.7vh;
				color: #4A4A4A;
				letter-spacing: 0;
				text-align: center;
			}
			.iconList {
				position: absolute;
				bottom: 6.3vh;
				margin-left: 16.4vw;
				left: 0;
				width: 67.2vw;
				height: 2.3vh;
				display: flex;
				align-items: center;
				justify-content: space-between;
				img:nth-child(1) {
					width: 27.9vw;
					height: 1.9vh;
				}
				img:nth-child(2) {
					width: 14.5vw;
					height: 2.3vh;
				}
				img:nth-child(3) {
					width: 18.4vw;
					height: 2vh;
				}
			}
		}
	}
</style>
