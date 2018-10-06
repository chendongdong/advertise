<template>
  <div class="loading">
    <div class="text">
      <transition-group name="fade">
        <p :key="1" v-show="showOne">你将看到一组特殊的影视作品</p >
        <p :key="2" v-show="showTwo">它们来自一群「特别」的作者</p >
      </transition-group>
    </div>
    <div class="gif-img"></div>
    <!--<XButton text="查看" type="primary" @click.native="jump2Next"></XButton>-->
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {XButton} from 'vux'
  export default {
    components: {
      XButton
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
        showTwo: false
      }
    },
    methods: {
      jump2Next() {
        setTimeout(() => {
          this.$router.push({path: '/swiper-img'})
        }, 4000)
      },
      addText(timer=1000) {
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
        this.addText()
        document.addEventListener('touchmove', function(e) {
          e.preventDefault();
        }, false);
      })
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
    position: relative;
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
