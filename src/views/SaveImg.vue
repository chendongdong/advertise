<template>
  <div  class="save-content">
    <XButton text="上一页" type="primary" @click.native="last"></XButton>
    <XButton text="下一页" type="primary" @click.native="next"></XButton>
    <img :src="getPath()" style="width: 55vw;height: 45vh;position: absolute;left:50%;top: 50%;transform: translate(-50%,-50%)">
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
        'userInfo'
      ])
    },
    data() {
      return {
        direct: ['01/01_微动', '02/02_微动', '03/03_微动', '04/04_微动'],
        imgIndx: 0,
        dirIdx: 0,
        len: [90, 100, 100, 100]
      }
    },
    methods: {
      last() {
        if (this.dirIdx > 0) {
          this.dirIdx--
          this.imgIndx = 0
        }
      },
      next() {
        if (this.dirIdx < 3) {
          this.dirIdx++
          this.imgIndx = 0
        }
      },
      geturl() {
        return require('../assets/image/01/01_微动00.jpg')
      },
      getPath() {
        let index = this.imgIndx
        if (this.dirIdx == 0) {
          if (index < 10) {
            index = '0' + index
          }
        } else {
          if (index < 10) {
            index = '00' + index
          } else if (index < 100) {
            index = '0' + index
          }
        }
        console.log('path=' + this.direct[this.dirIdx]+index+'.jpg')
        return require('../assets/image/' + this.direct[this.dirIdx] + index + '.jpg')
      },
      changeIndx(timer=50) {
        setTimeout(() => {
          if (this.imgIndx < this.len[this.dirIdx]) {
            this.imgIndx++
          } else {
            this.imgIndx = 0
          }
          this.changeIndx()
        }, timer)
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.changeIndx()
      })
    }
  }
</script>
<style lang="scss">

  .save-content{
    /*background: url("../assets/image/01/01_微动00.jpg") no-repeat center;*/
    width: 100vw;
    height: 100vh;
    /*background: red;*/
    top: 0;
    position: fixed;
    text-align: center;
    .img{
      background: url("../assets/icon_1.jpg") no-repeat center;
      background-size: cover;
      width: 260px;
      height: 370px;
      margin: 0 auto;
    }
    .name{
      font-size: 24px;
      margin: 20px 0;
    }
    .text0{
      margin-top: 8px;
      font-size: 16px;
    }
    .text1{
      font-family: Overpass-ExtraBold;
    }
    .text2{
      font-family: SourceHanSansCN-ExtraLight;
    }
    .text3{
      font-family: SourceHanSansCN-Light;
    }
    .text4{
      font-family: SourceHanSansCN-Medium;
    }
    .text5{
      font-family: SourceHanSansCN-Regular;
    }
  }
</style>
