<template>
  <div id="app">
     <!--<router-view></router-view> -->
    <loading/>
    <!-- <SwiperImg/> -->
    <!-- <popular-science/> -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
      loading: () => import('@/views/Loading.vue'),
      // SwiperImg: () => import('@/views/SwiperImg.vue')
      // popularScience: () => import('@/views/PopularScience.vue')
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
</style>
