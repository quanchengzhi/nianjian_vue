<template>
  <div class="pay_wrapper">
    <img src="../assets/img/img_over2@2x.png" class="img_over" />
    <router-link class="to_order" to="/orders">查看订单</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.pay_wrapper
  width 100%
  height 100%
  background #FFFFFF
  .img_over
    width 2.51rem
    height 1.38rem
    margin 0.8rem 0.62rem
  .to_order
    display block
    width 3.43rem
    margin 0 0.16rem
    height 0.45rem
    line-height 0.45rem
    text-align center
    background #2782F4
    border-radius 0.25rem
    font-size 0.18rem
    font-weight 500
    color #FFFFFF
</style>