<template>
  <div class="coupon_wrapper">
    <div class="type_choose">
      <div
        @click="thisIndex=index;mescroll.resetUpScroll()"
        :class="{type_menu:true,type_checked:thisIndex==index}"
        v-for="(type,index) in couponMenu"
        :key="index"
      >{{type}}</div>
    </div>
    <mescroll-vue
      id="mescroll"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <ul class="all_coupons" id="all_coupons">
        <li @click="$router.push('/111')" v-for="(list,index) in listData" :key="index" :class="{coupons:true,coupons2:list.used==1,coupons3:list.used==2}">
          <span class="coupons_price">
            <em>¥</em>{{list.price}}
          </span>
          <span class="coupons_context">
            <p class="coupons_context_name">年检优惠券</p>
            <p class="coupons_context_introduce">仅限年检可用，新人大礼包的优惠券</p>
            <p class="coupons_context_use">
              <span class="coupons_context_use_left">2019.06.05-2019.08.09</span>
              <span @click.stop="$router.push('/pay')" v-if="list.used==0" class="coupons_context_use_right">去使用</span>
            </p>
          </span>
        </li>
      </ul>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    MescrollVue,
  },
  data() {
    return {
      thisIndex: 0,
      couponMenu: ["全部", "已使用", "已过期"],
      totalPage: 3,
      mescroll: null,
      mescrollDown: { use: true },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 10,
        },
        toTop: {
          //配置回到顶部按钮
          src: require("../assets/img/mescroll-totop.png"), //默认滚动到1000px显示,可配置offset修改
          offset: 300,
        },
        isBounce: true,
      },
      listData: [], // 列表数据
      beforeRouteEnter(to, from, next) {
        // 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
        next((vm) => {
          // 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
          vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter();
        });
      },
      beforeRouteLeave(to, from, next) {
        // 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
        // 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
        this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave();
        next();
      },
    };
  },
  mounted() {},
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      // 联网请求
      let axios = this.axios;
      axios
        .get("/json/coupons.json", {
          params: {
            num: page.num, // 页码
            size: page.size, // 每页长度
          },
        })
        .then((response) => {
          // 请求的列表数据
          let arr = response.data;
          // 如果是第一页需手动置空列表
          if (page.num == 1) this.listData = [];
          // 把请求到的数据添加到列表
          if (this.thisIndex == 0) {
            for (
              let i = (page.num - 1) * page.size;
              i < page.num * page.size;
              i++
            ) {
              if (i == arr.length) break;
              if (this.thisIndex == 0) {
                this.listData.push(arr[i]);
              }
            }
          } else {
            for (let i = 0; i < arr.length; i++) {
              if (this.thisIndex == 1) {
                if (arr[i].used == 1) {
                  this.listData.push(arr[i]);
                }
              } else if (this.thisIndex == 2) {
                if (arr[i].used == 2) {
                  this.listData.push(arr[i]);
                }
              }
            }
          }


          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            this.showLi = true;
            mescroll.endByPage(this.listData.length, this.totalPage);
          });
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
  },
};
</script>

<style lang="stylus">
.coupon_wrapper
  width 100%
  height 100%
  background #F8FBFF
  .type_choose
    width 100%
    height 0.45rem
    background #fff
    display flex
    align-items center
    justify-content space-around
    .type_menu
      position relative
      width 0.6rem
      font-size 0.15rem
      text-align center
      color rgba(159, 166, 174, 1)
    .type_checked
      color rgba(39, 130, 244, 1)
    .type_checked::after
      content ''
      display block
      width 0.2rem
      height 2px
      background #2782F4
      border-radius 1px
      position absolute
      left 0.18rem
      bottom -0.03rem
  #mescroll
    height calc(100% - 0.45rem)
    .all_coupons
      width 3.43rem
      margin 0 0.16rem
      .coupons2
        background url('../assets/img/img_bg_coupons_used@2x.png') no-repeat center !important 
        background-size 100% 100% !important 
      .coupons3
        background url('../assets/img/img_bg_coupons_overdue@2x.png') no-repeat center !important 
        background-size 100% 100% !important 
      .coupons
        display flex
        height 1.12rem
        margin 0.08rem 0
        background url('../assets/img/coupons_img_bg@2x.png') no-repeat center
        background-size 100% 100%
        .coupons_price
          display inline-block
          width 1.12rem
          height 1.12rem
          line-height 1.12rem
          text-align center
          font-size 0.48rem
          font-weight 500
          color #FFFFFF
          em
            font-size 0.24rem
            padding-right 0.04rem
        .coupons_context
          display inline-block
          width 2.11rem
          padding-left 0.08rem
          .coupons_context_name
            font-size 0.15rem
            font-weight 500
            color #08101A
            height 0.2rem
            padding-top 0.12rem
          .coupons_context_introduce
            font-size 0.12rem
            font-weight 400
            color #08101A
            height 0.4rem
            padding-top 0.08rem
          .coupons_context_use
            display flex
            align-items center
            justify-content space-between
            font-size 0.12rem
            font-weight 400
            height 0.2rem
            .coupons_context_use_left
              color #9FA6AE
            .coupons_context_use_right
              display inline-block
              width 0.54rem
              height 0.18rem
              line-height 0.18rem
              border-radius 0.15rem
              border 1px solid #FF3B3B
              text-align center
              color #FF3B3B

</style>