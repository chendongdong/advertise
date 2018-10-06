<template>
  <div>
    <swiper-img :style="{opacity: showSwiper?1:0}"></swiper-img>
    <div class="loading" v-show="!showSwiper">
      <div class="text">
        <transition-group name="fade">
          <p :key="1" v-show="showOne">你将看到一组特殊的影视作品</p >
          <p :key="2" v-show="showTwo">它们来自一群「特别」的作者</p >
        </transition-group>
      </div>
      <div class="gif-img"></div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {XButton} from 'vux'
  import SwiperImg from './SwiperImg.vue'

  export default {
    components: {
      XButton, SwiperImg
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'language'
      ])
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
        setTimeout(() => {
          this.showSwiper = true
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
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: url("../assets/Loading.gif") no-repeat center;
      background-size: 100%;
      width: 80px;
      height: 20px;
      opacity: 0.8;
    }
	}
</style>
