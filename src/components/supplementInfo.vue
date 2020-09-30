<template>
  <div class="supplement_wrapper">
    <div class="sup_head">
      <h2>行驶证照片</h2>
      <div class="sup_wrapper">
        <div class="supbg">
          <van-uploader
            class="sup_click"
            v-model="file1"
            multiple
            :max-count="1"
          >
            <van-image
              width="1.12rem"
              height="1.12rem"
              :src="require('../assets/img/img_add picture@2x.png')"
            />
          </van-uploader>
          <p>行驶证正本</p>
        </div>
        <div v-if="$route.query.state" class="supbg">
          <van-uploader
            class="sup_click"
            v-model="file2"
            multiple
            :max-count="1"
          >
            <van-image
              width="1.12rem"
              height="1.12rem"
              :src="require('../assets/img/img_add picture@2x.png')"
            />
          </van-uploader>
          <p>行驶证副本</p>
        </div>
      </div>
    </div>
    <div v-if="$route.query.state" class="sup_head">
      <h2>交强险照片</h2>
      <div class="sup_wrapper">
        <div class="supbg">
          <van-uploader
            class="sup_click"
            v-model="file3"
            multiple
            :max-count="1"
          >
            <van-image
              width="1.12rem"
              height="1.12rem"
              :src="require('../assets/img/img_add picture@2x.png')"
            />
          </van-uploader>
          <p>交强险副本</p>
        </div>
      </div>
    </div>
    <div :class="{sup_submit:true,sup_submit_top:!$route.query.state}">保存</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file1: [],
      file2: [],
      file3: [],
    };
  }
};
</script>

<style lang="stylus">
.supplement_wrapper
  width 100%
  height 100%
  background #F8FBFF
  .sup_head
    width 100%
    height 2.04rem
    margin-bottom 0.08rem
    background #FFF
    h2
      width 3.43rem
      height 0.44rem
      line-height 0.44rem
      margin-left 0.16rem
      padding-right 0.16rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
    .sup_wrapper
      display flex
      width 3.43rem
      padding 0 0.16rem
      .supbg
        padding-top 0.12rem
        padding-right 0.12rem
        .sup_click
          .van-uploader__preview
            margin 0
            .van-uploader__preview-image
              width 1.12rem !important
              height 1.12rem !important
        p
          text-align center
          font-size 0.12rem
          color #9FA6AE
  .sup_submit
    width 3.43rem
    height 0.5rem
    line-height 0.5rem
    text-align center
    margin 0.4rem 0.16rem 0
    background #2782F4
    border-radius 0.25rem
    font-size 0.18rem
    font-weight 500
    color #FFFFFF
  .sup_submit_top
    margin-top 1.2rem   
</style>