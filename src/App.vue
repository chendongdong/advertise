<template>
  <div id="app">
    <loading/>
    <!-- <SwiperImg/> -->
    <!-- <popular-science/> -->
    <!-- <ending/> -->
    <!-- <SwiperNext/> -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      loading: () => import('@/views/Loading.vue'),
      // SwiperImg: () => import('@/views/SwiperImg.vue')
      // popularScience: () => import('@/views/PopularScience.vue')
      // ending: () => import('@/views/Ending.vue')
      // SwiperNext: () => import('@/views/SwiperNext.vue')
    },
    methods: {
      overscroll(el) {
        el.addEventListener('touchstart', function () {
          let top = el.scrollTop,
            totalScroll = el.scrollHeight,
            currentScroll = top + el.offsetHeight;
          if (top === 0) {
            el.scrollTop = 1
          } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1
          }
        });
        el.addEventListener('touchmove', function (evt) {
          if (el.offsetHeight < el.scrollHeight)
            evt._isScroller = true
        })
      }
    },
    created(){
      if (!String.prototype.padStart) {
        String.prototype.padStart = function(maxLength, fillString = ' '){
          let str = String(this);
          if (str.length >= maxLength) {
            return str;
          }
          fillString = String(fillString);
          if (fillString.length === 0) {
            fillString = ' ';
          }
          let fillLen = maxLength - str.length;
          let timesToRepeat = Math.ceil(fillLen / fillString.length);
          let truncatedStringFiller = fillString
            .repeat(timesToRepeat)
            .slice(0, fillLen);
          return truncatedStringFiller + str;
        };
      }
    },
    mounted() {
      this.overscroll(document.getElementById('app'));
      document.body.addEventListener('touchmove', function (evt) {
        if (!evt._isScroller) {
          evt.preventDefault()
        }
      });
      document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.call('hideToolbar');
      });

    }
  }
</script>
<style lang="scss">
  html, body {
    font-size: 10px;
  }

  #app {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  * {
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    margin: 0;
    padding: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.5s;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(0, 100%, 0);
  }
  .reslide-enter-active, .reslide-leave-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.5s;
  }
  .reslide-enter, .reslide-leave-to {
    transform: translate3d(0, -100%, 0);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
  .fadefast-enter-active, .fadefast-leave-active {
    transition: opacity .5s;
  }

  .fadefast-enter, .fadefast-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
