<template>
  <div class="choose_station_wrapper">
    <div @click="addressShow = true" class="choose_station_wrapper_head">
      <p class="provinceText">{{ province }}</p>
      <p class="cityText">{{ city }}</p>
      <p class="countyText">{{ area }}</p>
    </div>
    <mescroll-vue
      class="mescroll"
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <ul class="all_stations" id="all_stations">
        <li
          @click="
            list.stationsCheck = 'stations_checked';
            $router.push({
              path: '/handle',
              name: 'handle',
              query: { state: 2, choosedStation: 1 },
            });
          "
          class="stations"
          v-for="(list, index) in listData"
          :key="index"
        >
          <div class="stations_bg"></div>
          <div class="statons_info">
            <p class="stations_name">中泰汽车美容护理中心</p>
            <p class="stations_time">营业时间 09:00-24:00</p>
            <p class="stations_position">
              <em class="stations_detail_position ellipsis"
                >深圳市宝安区西乡盐田盐</em
              >
              <em>2.4km</em>
            </p>
          </div>
          <div
            :class="{
              stations_check: true,
              stations_checked: list.stationsCheck,
            }"
          ></div>
        </li>
      </ul>
    </mescroll-vue>
    <van-popup v-model="addressShow" class="choose_area" position="bottom">
      <van-area
        @cancel="addressShow = false"
        @confirm="chooseAddress"
        title="请选择地址"
        :area-list="areaList"
        value="440306"
      />
    </van-popup>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import areaList from "../assets/js/areaList.js";
export default {
  components: {
    MescrollVue,
  },
  data() {
    return {
      addressShow: false,
      areaList,
      province: "广东省",
      city: "深圳市",
      area: "宝安区",
      totalPage: 2,
      mescroll: null,
      mescrollDown: { use: true },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 7,
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
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      // 联网请求
      let axios = this.axios;
      axios
        .get("/json/chooseStation.json", {
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
          console.log(this.listData);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endByPage(this.listData.length, this.totalPage);
          });
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    chooseAddress(val) {
      this.province = val[0].name;
      this.city = val[1].name;
      this.area = val[2].name;
      this.addressShow = false;
    },
  },
};
</script>

<style lang="stylus">
.choose_station_wrapper
  background #fff
  position relative
  .choose_station_wrapper_head
    width 100%
    height 0.43rem
    border-top 1px solid rgba(223, 226, 230, 1)
    border-bottom 1px solid rgba(223, 226, 230, 1)
    display flex
    align-items center
    justify-content space-around
    p
      width 0.7rem
      background url('../assets/img/city_icon_down@2x.png') no-repeat right center
      background-size 0.16rem 0.16rem
  .mescroll
    height 7.67rem
    .all_stations
      .stations
        width 3.43rem
        height 1.13rem
        margin-left 0.16rem
        padding-right 0.16rem
        border-bottom 1px solid rgba(223, 226, 230, 1)
        display flex
        position relative
        .stations_bg
          width 1.07rem
          height 0.89rem
          margin 0.12rem 0
          background url('../assets/img/bg5.jpg') no-repeat center
          background-size 100% 100%
        .statons_info
          padding-left 0.08rem
          .stations_name
            padding-top 0.12rem
            width 2rem
            height 0.4rem
            font-size 0.16rem
            font-weight 500
            color #08101A
          .stations_time
            font-size 0.14rem
            font-weight 400
            margin-top 0.06rem
            color rgba(159, 166, 174, 1)
          .stations_position
            font-size 0.14rem
            font-weight 400
            color rgba(159, 166, 174, 1)
            display flex
            align-items center
            justify-content space-between
            width 2.16rem
            margin-top 0.06rem
            padding-left 0.12rem
            background url('../assets/img/confirm_icon_adress@2x.png') no-repeat left center
            background-size 0.1rem 0.12rem
            .stations_detail_position
              display inline-block
              width 1.53rem
        .stations_check
          position absolute
          top 0.47rem
          right 0.16rem
          width 0.2rem
          height 0.2rem
          background url('../assets/img/icon_box_nor@2x.png') no-repeat
          background-size 100% 100%
        .stations_checked
          background url('../assets/img/icon_box_sel@2x.png') no-repeat
          background-size 100% 100%
</style>
