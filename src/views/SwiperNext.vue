<template>
  <div class="swiper-next">
    <div class="text">
      <transition-group name="fade">
        <div class="line" v-show="showIndex > -1" :key="0"></div>
        <p v-for="(item, index) in text" :key="index+1" v-show="showIndex > index" :style="{'margin-top': index==0?'25px':'0'}">{{item}}</p >
        <a  :key="text.length+1" v-show="showIndex > text.length" class="btn-more" @click.prevent="jump2Next">了解更多</a>
      </transition-group>
    </div>
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
        showIndex: -1,
        text: ['看似美好的事物背后都隐藏着风险', '我国是乳腺癌发病率',
          '增长最快的国家之一', '每10000人里面', '就有4人确诊患乳腺癌',
          '危险逼近', '但你也许还对乳腺癌一无所知', '…']
      }
    },
    methods: {
      jump2Next() {
        this.$router.push({path: '/popular-science'})
      },
      addText(timer=1000) {
        setTimeout(() => {
          if (this.showIndex <= this.text.length) {
            this.showIndex++
            this.addText(2000)
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
  .swiper-next{
    background: #000;
    width: 100vw;
    height: 100vh;
    position: relative;
    .btn-more{
      font-family: SourceHanSansCN-Medium;
      font-size: 40px;
      color: #000000;
      letter-spacing: 0;
      background: url("../assets/icon_jump.png") no-repeat center;
      background-size: 100%;
      font-size: 10px;
      text-align: center;
      margin-top: 30px;
      width: 95px;
      height: 33px;
      line-height: 33px;
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
    /*.line + p:first-child{*/
      /*margin-top: 50px;*/
    /*}*/
  }
</style>
