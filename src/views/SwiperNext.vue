<template>
  <div>
    <popular-science :style="{opacity: showNextPage?1:0}"></popular-science>
    <div class="swiper-next" v-show="!showNextPage">
      <div class="text">
        <transition-group name="fade">
          <div class="line" v-show="showIndex > -1" :key="0"></div>
          <p v-for="(item, index) in text" :key="index+1" v-show="showIndex > index" :style="{'margin-top': index==0?'25px':'0'}">{{item}}</p >
          <a  :key="text.length+1" v-show="showIndex > text.length" class="btn-more" @click.prevent="jump2Next">了解乳腺癌</a>
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
            this.addText(600)
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
      font-size: 40px;
      color: #000000;
      letter-spacing: 0;
      background: url("../assets/icon_more.png") no-repeat center;
      background-size: 100%;
      font-size: 12px;
      text-align: center;
      margin-top: 20px;
      width: 100px;
      height: 34px;
      line-height: 35px;
      display: inline-block;
    }
    .text{
      letter-spacing: 4px;
      line-height: 2.5;
      height: calc(20em + 97px);
    }
    .line{
      margin: 0 auto;
      width: 60px;
      height: 1px;
      background: url("../assets/icon_topLine.png") no-repeat center;
      background-size: 100%;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .8s;
    }
  }
</style>
