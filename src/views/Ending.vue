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
      document.addEventListener('touchmove', function(e) {
        e.preventDefault();
      }, false);
		}
	}
</script>
<style lang="scss">
	.end {
		width: 100vw;
		height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
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
				width: 100px;
				height: 34px;
        background: url("../assets/icon_jump.png") no-repeat center;
        background-size: 100%;
				line-height: 34px;
				font-family: SourceHanSansCN-Medium;
				font-size: 12px;
				color: #4A4A4A;
				letter-spacing: 0;
				text-align: center;
			}
			.iconList {
				position: absolute;
				bottom: 6.3vh;
				left: 50%;
        transform: translateX(-50%);
				width: 67.2vw;
				height: 2.3vh;
				display: flex;
				align-items: center;
				justify-content: center;
				img:nth-child(1) {
					width: 110px;
					height: 14px;
				}
				img:nth-child(2) {
					width: 60px;
					height: 18px;
          margin: 0 10px;
				}
				img:nth-child(3) {
          width: 18.4vw;
          height: 2vh;
				}
			}
		}
	}
</style>
