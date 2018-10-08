<template>
  <div>
    <audio loop src="../assets/turn_on_light.mp3" id="myAudio"></audio>
    <swiper-img :style="{opacity: showSwiper?1:0}" v-if="showSwiper"></swiper-img>
    <transition name="light">
      <div class="loading" v-show="!showSwiper">
        <div class="text" v-show="!showSwiper">
          <transition-group name="fade">
            <p :key="1" v-show="showOne">你将看到一组特殊的影视作品</p >
            <p :key="2" v-show="showTwo">它们来自一群「特别」的作者</p >
          </transition-group>
        </div>
        <div class="gif-img" v-show="!showSwiper"></div>
      </div>
    </transition>
  </div>
</template>
<script>
  import SwiperImg from './SwiperImg.vue'

  export default {
    components: {
      SwiperImg
    },
    data() {
      return {
        showOne: false,
        showTwo: false,
        showSwiper: false
      }
    },
    methods: {
      jump2Next() {
        let audio = document.getElementById('myAudio')
        setTimeout(() => {
          this.showSwiper = true
          audio.play()
          setTimeout(() =>{
            audio.pause()
          }, 3000)
//          this.$router.push({path: '/swiper-img'})
        }, 4000)
      },
      addText(timer=0) {
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
    },
    mounted() {
      this.$nextTick(function () {
//        this.addText()
        document.addEventListener('touchmove', function(e) {
          e.preventDefault();
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
  .light-leave-active {
    transition: opacity 3s;
  }
  .light-enter{
    opacity: 1;
  }
  .light-leave-to {
    opacity: 0;
  }
  .loading {
    background: url("../assets/ic_loading_bg.png") no-repeat center;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    .gif-img{
      position: absolute;
      bottom: 10vh;
      left: 50%;
      transform: translateX(-50%);
      background: url("../assets/Loading.gif") no-repeat center;
      background-size: 100%;
      width: 14vw;
      height: 3vh;
    }
    .text{
      top: 40%;
    }
	}
</style>
