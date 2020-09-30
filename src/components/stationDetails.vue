<template>
  <div class="details_wrapper clearfix">
    <div class="linear_gra"></div>
    <h2 class="details_text">{{ detailsText }}</h2>
    <h3 v-if="state == '0' || state == '9'" class="details_waitpay">
      {{ detailsWaitpay }}
    </h3>
    <div class="detail_head">
      <h4 class="handle_type">{{ handleType }}</h4>
      <p>
        <span>年检地区</span>
        <i>广东省深圳市</i>
      </p>
      <p class="carnum">
        <span>车牌号</span>
        <i>粤A B123F</i>
      </p>
      <p>
        <span>车主姓名</span>
        <i>王小姐</i>
      </p>
      <p>
        <span>备注</span>
        <i>备注信息只展示两行，距离左侧文字固定12，超过就换行显示</i>
      </p>
    </div>
    <div class="delivery_info">
      <h4>检测站信息</h4>
      <p>
        <span>预约时间</span>
        <i>2020-01-23 10:30-11:00</i>
      </p>
      <p>
        <span>检测站</span>
        <i>深圳市北方第二汽车检测有限公司</i>
      </p>
      <p>
        <span>检测站地址</span>
        <i>广东省深圳市宝安区广深公路展丰工业园北40米展丰商务大厦</i>
      </p>
    </div>
    <div class="detail_content">
      <h4>订单信息</h4>
      <p class="order_num">
        <span>订单编号</span>
        <i>126793404085757950</i>
      </p>
      <p class="order_time">
        <span>下单时间</span>
        <i>2010-12-23 15:45</i>
      </p>
      <p class="order_amount">
        <span>订单金额</span>
        <i>¥57.00</i>
      </p>
      <p class="order_discount">
        <span>优惠</span>
        <i>- ¥5.00</i>
      </p>
      <p class="pay_amount">
        <span>支付金额</span>
        <i>¥52.00</i>
      </p>
    </div>
    <div
      v-if="state == '0' || state == '4' || state == '5' || state == '7'"
      class="detail_btn"
    >
      <router-link to="/index" class="left_btn">取消订单</router-link>
      <router-link v-if="state == '0'" to="/pay" class="right_btn"
        >去支付</router-link
      >
      <a v-if="state != '0'" href="tel:00000000" class="right_btn">联系检测站</a>
    </div>
    <div v-if="state == '1'|| state == '2' || state == '3'" class="big_btn">申请退款</div>
    <a v-if="state == '6'" href="tel:00000000" class="big_btn1">联系检测站</a>
  </div>
</template>

<script>
export default {
  data() {
    return {

      detailsText: "",
      handleType: "",
      rightRouter: "/pay",
      leftBtn: "",
      rightBtn: "",
      state: null,
      detailsWaitpay: "请在50分钟内完成支付，超时将会自动取消",
    };
  },
  created() {
    this.getQuery();
  },
  mounted() {},
  methods: {
    getQuery() {
      this.state = this.$route.query.state;
      this.handleType = this.$route.query.handleType;
      if (this.$route.query.status == "请在59分钟内支付") {
        this.detailsText = "待支付";
      } else {
        this.detailsText = this.$route.query.status;
      }
      this.changeState();
    },
    changeState() {
      console.log(this.state);
      if (this.state == "9") {
        this.detailsWaitpay = "钱款将于3个工作日内返还至您的付款账户";
      }
    },
  },
};
</script>

<style lang="stylus">
.details_wrapper
  width 3.75rem
  height auto
  min-height 8.12rem
  background #F8FBFF
  position relative
  z-index 1
  &::before
    display table
    content ''
  .linear_gra
    position absolute
    top 0
    width 3.75rem
    height 3rem
    z-index -1
    background linear-gradient(180deg, #2782F4 0%, rgba(39, 130, 244, 0) 100%)
  .details_text
    font-size 0.2rem
    font-weight 500
    color #fff
    padding 0.24rem 0 0.04rem 0.16rem
  .details_waitpay
    font-size 0.14rem
    font-weight 400
    color #FFFFFF
    padding-left 0.16rem
  .detail_head
    width 3.43rem
    margin 0.16rem 0.16rem 0.08rem
    height 1.93rem
    background #FFFFFF
    border-radius 0.08rem
    .handle_type
      width 3.19rem
      margin-left 0.12rem
      margin-bottom 0.12rem
      padding-right 0.12rem
      height 0.44rem
      line-height 0.44rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      font-size 0.14rem
      font-weight 500
      color #08101A
    p
      width 3.19rem
      padding 0 0.12rem 0.08rem
      font-size 0.14rem
      font-weight 400
      display flex
      justify-content space-between
      span
        color #9FA6AE
      i
        display inline-block
        width 2.47rem
        color #08101A
        text-align right
      img
        width 0.8rem
        height 0.8rem
        padding-left 0.04rem
  .delivery_info
    width 3.43rem
    background #FFFFFF
    border-radius 0.08rem
    margin 0 0.16rem 0.08rem
    h4
      width 3.19rem
      margin-left 0.12rem
      margin-bottom 0.12rem
      padding-right 0.12rem
      height 0.44rem
      line-height 0.44rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      font-size 0.14rem
      font-weight 500
      color #08101A
    p
      width 3.19rem
      padding 0 0.12rem 0.08rem
      font-size 0.14rem
      font-weight 400
      display flex
      justify-content space-between
      span
        color #9FA6AE
      i
        display inline-block
        width 2.47rem
        color #08101A
        text-align right
      img
        width 0.8rem
        height 0.8rem
  .detail_content
    width 3.43rem
    height 2.01rem
    background #FFFFFF
    border-radius 0.08rem
    margin 0 0.16rem 0.08rem
    h4
      width 3.19rem
      margin-left 0.12rem
      margin-bottom 0.12rem
      padding-right 0.12rem
      height 0.44rem
      line-height 0.44rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      font-size 0.14rem
      font-weight 500
      color #08101A
    p
      width 3.19rem
      padding 0 0.12rem 0.08rem
      font-size 0.14rem
      font-weight 400
      display flex
      justify-content space-between
      span
        color #9FA6AE
      i
        display inline-block
        width 2.47rem
        color #08101A
        text-align right
  .big_btn
    width 3.43rem
    height 0.5rem
    line-height 0.5rem
    text-align center
    border-radius 0.25rem
    border 1px solid #C6CDD5
    margin 0.12rem 0.16rem
    color #9FA6AE
    font-size 0.18rem
    font-weight 500
  .big_btn1
    display block
    width 3.43rem
    height 0.5rem
    line-height 0.5rem
    text-align center
    border-radius 0.25rem
    margin 0.12rem 0.16rem
    color #fff
    font-size 0.18rem
    font-weight 500
    background #2782F4
  .detail_btn
    width 3.43rem
    margin 0.12rem 0.16rem
    font-size 0.18rem
    font-weight 500
    .left_btn
      display inline-block
      width 1.66rem
      height 0.5rem
      line-height 0.5rem
      text-align center
      border-radius 0.25rem
      border 1px solid #C6CDD5
      color #9FA6AE
      margin-right 0.08rem
    .right_btn
      display inline-block
      width 1.66rem
      height 0.5rem
      line-height 0.5rem
      text-align center
      background #2782F4
      border-radius 0.25rem
      color #FFFFFF
</style>