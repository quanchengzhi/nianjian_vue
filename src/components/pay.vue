<template>
  <div class="confirm_wrapper">
    <div class="con_order_info">
      <p>
        <span>{{ $route.query.handleType }}</span
        ><em>30元</em>
      </p>
      <p @click="show = true" class="seecoupons_info">
        <span>优惠券</span><em class="userUsed">{{ coupon }}</em>
      </p>
      <p style="border: none">
        <span>订单总价</span><em class="shouldPay">¥ {{ totalPrice }}.00</em>
      </p>
    </div>
    <div class="con_payways">
      <h2>选择支付方式</h2>
      <p @click="payType = 0" class="clearfix">
        <span>微信支付</span
        ><span :class="{ con_pay_check: true, con_checked: !payType }"></span>
      </p>
      <p @click="payType = 1" class="clearfix">
        <span>支付宝</span
        ><span :class="{ con_pay_check: true, con_checked: payType }"></span>
      </p>
    </div>
    <router-link to="/paySuccess" class="con_pay_btn">立即支付</router-link>
    <van-popup v-model="show" closeable position="bottom">
      <h2>优惠券</h2>
      <ul class="all_usecoupons">
        <li
          @click="
            thisIndex = index;
            show = false;
            coupon = `-¥ ${price}.00`;
            totalPrice = 30 - price;
          "
          v-for="(price, index) in prices"
          :key="index"
          class="use_coupon clearfix"
        >
          <span><em>¥</em>{{ price }}</span
          ><span>
            <p>洗车优惠券</p>
            <p>仅限洗车可用，新人大礼包优惠券</p>
            <p>2019.06.05-2019.07.06</p> </span
          ><span
            ><em
              :class="{
                pay_type_check: true,
                pay_type_checked: thisIndex == index,
              }"
            ></em
          ></span>
        </li>
        <li
          @click="
            thisIndex = null;
            show = false;
            coupon = '4张可用';
            totalPrice = 30;
          "
          class="no_use clearfix"
        >
          <span>不使用优惠券</span
          ><span
            :class="{ no_used: true, pay_type_checked: thisIndex == null }"
          ></span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {    
      thisIndex: null,    
      payType: 0,    
      show: false,    
      prices: [5, 5, 10, 15],    
      coupon: "4张可用",    
      totalPrice: 30,    
    };    
  },    
};    
</script>    
    
<style lang="stylus">
.confirm_wrapper
  width 100%
  height 100%
  background #F8FBFF
  &::before
    display table
    content ''
  .con_order_info
    width 3.43rem
    height 1.5rem
    margin 0.08rem 0.16rem
    background #FFFFFF
    border-radius 0.08rem
    p
      width 3.19rem
      margin-left 0.12rem
      padding-right 0.12rem
      height 0.49rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      display flex
      justify-content space-between
      align-items center
      font-size 0.16rem
      span
        color #9FA6AE
      .userUsed
        padding-right 0.16rem
        color #FF5800
      .shouldPay
        color #FF5800
    .seecoupons_info
      background url('../assets/img/icon_on@2x.png') no-repeat 3.04rem center
      background-size 0.16rem 0.16rem
  .con_payways
    width 3.43rem
    height 1.5rem
    margin 0 0.16rem
    background #FFFFFF
    border-radius 0.08rem
    h2
      width 3.19rem
      padding 0 0.12rem
      height 0.46rem
      line-height 0.46rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      font-size 0.16rem
      font-weight 500
      color #08101A
    p
      width 2.89rem
      height 0.5rem
      line-height 0.5rem
      margin-left 0.12rem
      padding-right 0.12rem
      padding-left 0.3rem
      font-size 0.14rem
      font-weight 400
      position relative
      &:nth-of-type(1)
        border-bottom 1px solid rgba(223, 226, 230, 1)
        background url('../assets/img/pay_icon_wechat@2x.png') no-repeat left center
        background-size 0.22rem 0.22rem
      &:nth-of-type(2)
        background url('../assets/img/pay_icon_alipay@2x.png') no-repeat left center
        background-size 0.22rem 0.22rem
      .con_pay_check
        position absolute
        right 0.16rem
        top 0.16rem
        display inline-block
        width 0.2rem
        height 0.2rem
        background url('../assets/img/icon_box_nor@2x.png') no-repeat left center
        background-size 0.2rem 0.2rem
      .con_checked
        background url('../assets/img/icon_box_sel@2x.png') no-repeat left center
        background-size 0.2rem 0.2rem
  .con_pay_btn
    display inline-block
    width 3.43rem
    height 0.45rem
    line-height 0.45rem
    text-align center
    margin 0.4rem 0.16rem 0
    background #2782F4
    border-radius 0.25rem
    font-size 0.18rem
    font-weight 500
    color #FFFFFF
  .van-popup
    height 4.8rem
    border-radius 0.16rem 0.16rem 0 0
    h2
      width 3.43rem
      margin-left 0.16rem
      padding-right 0.16rem
      height 0.44rem
      line-height 0.44rem
      font-size 0.16rem
      font-weight 500
      color #08101A
      border-bottom 1px solid rgba(223, 226, 230, 1)
    .all_usecoupons
      width 100%
      height 4.35rem
      overflow auto
      .use_coupon
        height 1.08rem
        margin 0.12rem 0.16rem 0.08rem
        width 3.43rem
        background url('../assets/img/img_bg_coupons@2x.png') no-repeat
        background-size 100% 100%
        display flex
        position relative
        span
          &:nth-of-type(1)
            display inline-block
            width 1.12rem
            height 1.12rem
            font-size 0.48rem
            font-weight 500
            color #FFFFFF
            text-align center
            line-height 1.12rem
            em
              font-size 0.24rem
              padding-right 0.04rem
          &:nth-of-type(2)
            padding-left 0.12rem
            p
              &:nth-of-type(1)
                font-size 0.15rem
                font-weight 500
                color #08101A
                padding-top 0.12rem
              &:nth-of-type(2)
                font-size 0.12rem
                font-weight 400
                color #08101A
                padding-top 0.08rem
              &:nth-of-type(3)
                font-size 0.12rem
                font-weight 400
                color #9FA6AE
                padding-top 0.2rem
          .pay_type_check
            position absolute
            top 0.44rem
            right 0.12rem
            display inline-block
            width 0.2rem
            height 0.2rem
            background url('../assets/img/icon_box_nor@2x.png') no-repeat left center
            background-size 0.2rem 0.2rem
          .pay_type_checked
            background url('../assets/img/icon_box_sel@2x.png') no-repeat left center
            background-size 0.2rem 0.2rem
      .no_use
        position relative
        width 3.19rem
        padding 0 0.12rem
        height 0.5rem
        background #F8FBFF
        border-radius 0.04rem
        display flex
        align-items center
        font-size 0.16rem
        font-weight 400
        color #08101A
        margin 0 0.16rem 0.12rem
        .no_used
          display inline-block
          position absolute
          right 0.12rem
          width 0.2rem
          height 0.2rem
          background url('../assets/img/icon_box_nor@2x.png') no-repeat left center
          background-size 0.2rem 0.2rem
        .pay_type_checked
          background url('../assets/img/icon_box_sel@2x.png') no-repeat left center
          background-size 0.2rem 0.2rem
</style>