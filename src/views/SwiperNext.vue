<template>
  <div>
    <popular-science :style="{opacity: showNextPage?1:0}"></popular-science>
    <div class="swiper-next" v-show="!showNextPage">
      <div class="text">
        <transition-group name="fade" class="group-text">
          <div class="line" v-show="showIndex > -1" :key="0"></div>
          <p v-for="(item, index) in text" :key="index+1" v-show="showIndex > index" :style="{'margin-top': index==0?'3vh':'0'}">{{item}}</p >
          <div  :key="text.length+1" v-show="showIndex > text.length" class="btn-more" @click="jump2Next">了解乳腺癌</div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
  import PopularScience from './PopularScience.vue'
  export default {
    components: {
      PopularScience
    },
    data() {
      return {
        showNextPage: false,
        showIndex: -1,
        text: ['看似美好的事物背后都隐藏着风险', '我国是乳腺癌发病率',
          '增长最快的国家之一', '每10000人里面', '就有4人确诊患乳腺癌',
          '危险逼近', '但你也许还对乳腺癌一无所知', '…']
      }
    },
    methods: {
      jump2Next() {
//        this.$router.push({path: '/popular-science'})
        this.showNextPage = true
      },
      addText(timer=0) {
        setTimeout(() => {
          if (this.showIndex <= this.text.length) {
            this.showIndex++
            this.addText(1000)
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
    }
  }
</script>
<style lang="scss">
  @import "style/common";
  .swiper-next{
    background: #000;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    .btn-more{
      font-family: SourceHanSansCN-Medium;
      color: #000000;
      letter-spacing: 0;
      background: url("../assets/icon_more.png") no-repeat center;
      background-size: 100%;
      /*background: #FFFFFF;*/
      /*box-shadow: 0 0 20px 0 rgba(255,255,255,0.50);*/
      /*border-radius: 50%;*/
      font-size: 2vh;
      text-align: center;
      margin-top: 1vh;
      width: 36.6vw;
      height: 6.5vh;
      line-height: 6.5vh;
      display: inline-block;
    }
    .text{
      line-height: 1.5;
      height: calc(12em + 10.5vh);
    }
    .line{
      margin: 0 auto;
      width: 13vw;
      height: 0.1vh;
      background: url("../assets/icon_topLine.png") no-repeat center;
      background-size: 100%;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity 1s;
    }
  }
</style>
