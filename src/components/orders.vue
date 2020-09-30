<template>
  <div class="order_wrapper">
    <mescroll-vue
      class="mescroll"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <ul class="all_orders">
        <li
          @click="goToDetails(list)"
          v-for="(list, index) in listData"
          :key="index"
          class="order clearfix"
        >
          <div class="order_head">
            <span>{{ list.handleType }}</span>
            <span
              :class="{
                color_blue:
                  list.status == '请在59分钟内支付' ||
                  list.status == '待交车' ||
                  list.status == '待补交资料',
              }"
              >{{ list.status }}</span
            >
          </div>
          <p class="o_carnum order_info"><em>车牌号码:</em>粤B U123R</p>
          <p v-if="list.masterName" class="master_name order_info">
            <em>接车师傅:</em>
            {{ list.masterName }}
          </p>
          <p v-if="list.masterNum" class="master_num order_info">
            <em>师傅工号:</em>0987-7488
          </p>
          <p v-if="list.takeCarTime" class="take_cartime order_info">
            <em>接车时间:</em>2020-01-23 10:30-11:00
          </p>
          <p class="total_price order_info"><em>总价:</em>¥57.00</p>
          <div class="order_btns">
            <a v-if="list.href" class="order_call" @click.stop="" :href="list.href"
              >联系师傅</a
            >
            <a v-if="list.href1" class="order_call_station" @click.stop="" :href="list.href1"
              >联系检测站</a
            >
            <div
              v-if="list.status == '请在59分钟内支付'"
              @click.stop="
                $router.push({
                  path: '/pay',
                  name: 'pay',
                  query: { handleType: list.handleType },
                })
              "
              class="order_btn"
            >
              去支付
            </div>
            <div
              v-if="list.status == '待补交资料'"
              @click.stop="$router.push('/supplementInfo')"
              class="order_btn"
            >
              补交资料
            </div>
            <div v-if="list.returnCar" class="return_car">车辆已归还</div>
          </div>
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
      handleType: "",
      status: "",
      station: null,
      appointment: null,
      queryState: null,
      href: "",
      oBtn: "",
      masterName: "",
      masterNum: "",
      takeCarTime: "",
      returnCar: null,
      totalPage: 4,
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
  beforeRouteLeave(to, from, next) {
    if (to.name === "paySuccess") {
      next({ name: "index" });
    } else {
      next(); // 注意：这边next必须要写
    }
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
        .get("/json/orders.json", {
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

          for (
            let i = (page.num - 1) * page.size;
            i < page.num * page.size;
            i++
          ) {
            if (i == arr.length) break;
            this.listData.push(arr[i]);
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
    goToDetails(list) {
      switch (list.handleType) {
        case "六年免检":
          this.$router.push({
            path: "/exemptDetails",
            name: "exemptDetails",
            query: {
              state: list.queryState,
              status: list.status,
              handleType: list.handleType,
            },
          });
          break;
        case "上门接车代办":
          this.$router.push({
            path: "/visitDetails",
            name: "visitDetails",
            query: {
              state: list.queryState,
              status: list.status,
              handleType: list.handleType,
            },
          });
          break;
        case "站内师傅代办":
          this.$router.push({
            path: "/stationDetails",
            name: "stationDetails",
            query: {
              state: list.queryState,
              status: list.status,
              handleType: list.handleType,
            },
          });
          break;
      }
    },
  },
};
</script>

<style lang="stylus">
.order_wrapper
  background rgba(248, 251, 255, 1)
  .mescroll
    height 8.12rem
    .all_orders
      .order
        width 3.43rem
        background #FFFFFF
        border-radius 0.08rem
        margin 0.08rem 0.16rem
        .order_head
          width 2.95rem
          margin-left 0.12rem
          padding-left 0.24rem
          padding-right 0.12rem
          margin-bottom 0.12rem
          height 0.38rem
          border-bottom 1px solid rgba(223, 226, 230, 1)
          display flex
          align-items center
          justify-content space-between
          background url('../assets/img/order_icon_check@2x.png') no-repeat left center
          background-size 0.2rem 0.2rem
          span
            &:nth-child(1)
              font-size 0.16rem
              font-weight 500
              color #08101A
            &:nth-child(2)
              font-size 0.14rem
              font-weight 400
              color #9FA6AE
          .color_blue
            color #2782F4 !important
        p
          width 3.19rem
          padding 0 0.12rem 0.08rem
          font-size 0.14rem
          font-weight 400
          color #08101A
          em
            display inline-block
            width 0.7rem
            color #9FA6AE
        .order_btns
          text-align right
          width 3.19rem
          margin 0 0.12rem
          .order_btn
            display inline-block
            width 0.8rem
            height 0.3rem
            line-height 0.3rem
            text-align center
            border-radius 0.18rem
            margin 0.04rem 0 0.12rem
            font-size 0.14rem
            font-weight 400
            color #fff
            background #2782F4
          .return_car
            display inline-block
            width 0.92rem
            height 0.3rem
            line-height 0.3rem
            text-align center
            background #2782F4
            border-radius 0.18rem
            font-size 0.14rem
            font-weight 400
            color #fff
            margin-left 0.08rem
          .order_call
            display inline-block
            width 0.8rem
            height 0.3rem
            line-height 0.3rem
            text-align center
            border-radius 0.18rem
            border 1px solid #C6CDD5
            margin 0.04rem 0 0.12rem
            font-size 0.14rem
            font-weight 400
            color #08101A
          .order_call_station
            display inline-block
            width 0.92rem
            height 0.3rem
            line-height 0.3rem
            text-align center
            border-radius 0.18rem
            border 1px solid #C6CDD5
            margin 0.04rem 0.08rem 0.12rem 0
            font-size 0.14rem
            font-weight 400
            color #08101A
</style>