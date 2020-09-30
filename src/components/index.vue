<template>
  <div class="inspection_wrapper clearfix" id="demo">
    <div class="ins_head"></div>
    <router-link to="/commonQuestions" class="ins_questions">
      <span>?</span>常见问题
    </router-link>
    <div class="ins_second_wrapper clearfix">
      <div v-if="!state" class="add_car">
        <router-link
          :to="{ name: 'editCar', params: { state: 0 } }"
          class="add_carimg"
        ></router-link>
        <p class="add_carimgexplain">添加您的爱车</p>
        <p class="add_cartext">实时查看车辆状态，精准服务提醒办理</p>
      </div>
      <div v-if="state" class="already_addcar">
        <div class="already_head">
          <p class="head_carnum">
            {{ carNum }}
            <router-link
              :to="{ name: 'editCar', params: { state: 1 } }"
              tag="em"
              class="modify_carsinfo"
            ></router-link>
          </p>
          <p class="head_registrationdate">{{ registeredTime }}</p>
          <span @click="show = true" class="change_car"></span>
        </div>
        <div class="alredy_content">
          <div @click="addressShow = true" class="handle_city">
            办理城市：{{ address }}
          </div>
          <div class="free_online">免上线</div>
          <div class="date_title">{{ deadlineText }}</div>
          <div class="already_date">
            <span class="left_date">{{ deadlineOne }}</span>
            <span class="right_date">{{ deadlineTwo }}</span>
            <em>天</em>
          </div>
          <div
            @click="goToHandle()"
            :class="{
              immediately_handle: true,
              immediately_handle1: handleText == '已逾期',
            }"
          >
            {{ handleText }}
          </div>
          <span @click="remindShow = true" class="already_handle"
            >我已办理</span
          >
        </div>
      </div>
      <div class="ins_menu">
        <router-link to="/myCoupons" class="ins_menu_coupons"
          >我的优惠券</router-link
        >
        <router-link to="/orders" class="ins_menu_orders">我的订单</router-link>
      </div>
      <div class="ins_content">
        <div class="ins_type clearfix">
          <div
            :class="{ type_one: true, row: true, gray_font: typeIndex != 0 }"
            @click="typeIndex = 0"
          >
            <span>6年免检</span>
          </div>
          <div
            :class="{ type_two: true, row: true, gray_font: typeIndex != 1 }"
            @click="typeIndex = 1"
          >
            <span>接车代办</span>
          </div>
          <div
            :class="{ type_three: true, row: true, gray_font: typeIndex != 2 }"
            @click="typeIndex = 2"
          >
            <span>师傅代办</span>
          </div>
          <div
            :class="{
              cur: true,
              cur1: typeIndex == 0,
              cur2: typeIndex == 1,
              cur3: typeIndex == 2,
            }"
          ></div>
        </div>
        <div
          v-if="typeIndex == 0"
          :class="{
            explain_contentpic: true,
            explain_contentpic1: typeIndex == 0,
          }"
        ></div>
        <div
          v-if="typeIndex == 1"
          :class="{
            explain_contentpic: true,
            explain_contentpic2: typeIndex == 1,
          }"
        ></div>
        <div
          v-if="typeIndex == 2"
          :class="{
            explain_contentpic: true,
            explain_contentpic3: typeIndex == 2,
          }"
        ></div>
      </div>
    </div>
    <div class="alreadyhandle_remind remindHide thisHide">
      <div class="left_cancle_btn"></div>
      <div class="right_confirm_btn"></div>
    </div>
    <div class="grayBg remindHide chooseCarHide thisHide"></div>
    <van-popup v-model="show" position="bottom">
      <h2>
        请选择车辆<em @click="show = false" class="cancel_choose_car">取消</em>
      </h2>
      <ul class="all_cars">
        <li
          @click="chooseCar(index, carList)"
          v-for="(carList, index) in carLists"
          :key="index"
          class="car clearfix"
        >
          <p>
            <em>{{ carList.carNum }}</em
            >{{ carList.seatsNum }}
          </p>
          <p>{{ carList.registeredTime }}</p>
          <span :class="{ car_choosed: thisIndex == index }"></span>
        </li>
        <li @click="$router.push('/editCar')" class="new_car">新增车辆</li>
      </ul>
    </van-popup>

    <van-popup v-model="addressShow" class="choose_address" position="bottom">
      <van-area
        @cancel="addressShow = false"
        @confirm="chooseAddress"
        title="请选择地址"
        :area-list="areaList"
        :columns-num="2"
        value="440306"
      />
    </van-popup>

    <van-popup v-model="remindShow" class="acc_remind">
      <div
        class="left"
        @click="
          remindShow = false;
          accChecks = true;
        "
      ></div>
      <div
        class="right"
        @click="
          remindShow = false;
          accChecks = true;
        "
      ></div>
    </van-popup>
  </div>
</template>

<script>
import areaList from "../assets/js/areaList.js";
export default {
  name: "index",
  data() {
    return {
      thisIndex: 0,
      typeIndex: 0,
      state: 0,
      areaList,
      carNum: "粤B 0125E",
      registeredTime: "注册日期：2020-03-01",
      show: false,
      addressShow: false,
      remindShow: false,
      address: "深圳市",
      carLists: [
        {
          carNum: "粤B R238H",
          seatsNum: "5座",
          registeredTime: "注册日期：2020-03-01",
        },
        {
          carNum: "粤B 12345",
          seatsNum: "5座",
          registeredTime: "注册日期：2020-04-01",
        },
        {
          carNum: "粤B 13335",
          seatsNum: "5座",
          registeredTime: "注册日期：2020-05-01",
        },
      ],
      deadlineText: "距离2020年04月30日年检截止日期剩",
      handleText: "立即办理",
      deadlineOne: 3,
      deadlineTwo: 0,
    };
  },
  mounted() {
    this.getParams();
  },

  methods: {
    getParams() {
      if (this.$route.query.state == 0) {
        this.state = false;
      } else if (this.$route.query.state == 1) {
        this.state = true;
      }
      if (document.cookie.length) {
        this.carNum = `${this.getCookie("abbreviation")}${this.getCookie(
          "carNum"
        ).substr(0, 1)} ${this.getCookie("carNum").substr(1)}`;
      }
    },
    goToHandle() {
      if (this.handleText == "立即办理") {
        this.$router.push({
          path: "/handle",
          name: "handle",
          query: {
            state: this.typeIndex,
          },
        });
      }
    },
    chooseAddress(val) {
      this.address = "";
      this.address += " " + val[1].name;
      this.addressShow = false;
    },
    chooseCar(index, carList) {
      this.thisIndex = index;
      this.carNum = carList.carNum;
      this.registeredTime = carList.registeredTime;
      this.show = false;
      let month = this.registeredTime[11];
      let days = this.registeredTime.substring(13, 15);
      let deadline = (4 - month) * 30 + 30 - days;
      if (month <= 4 && days < 30) {
        this.deadlineText = "距离2020年04月30日年检截止日期剩";
        this.handleText = "立即办理";
        deadline = `${deadline}`;
      } else {
        this.deadlineText = "距离2020年04月30日年检已逾期";
        this.handleText = "已逾期";
        deadline = Math.abs(deadline);
        if (deadline < 10) {
          deadline = `0${deadline}`;
        }
      }
      this.deadlineOne = deadline[0];
      this.deadlineTwo = deadline[1];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
bgSize = 100% 100%
index = true
body
  if (index is defined)
    background #F7F7F7
  .inspection_wrapper
    width 100%
    position relative
    .ins_head
      width 3.75rem
      height 1.8rem
      background url('../assets/img/home_img_banner@2x.png') no-repeat center
      background-size bgSize
    .ins_questions
      position absolute
      top 0.08rem
      right 0
      display inline-block
      width 0.72rem
      height 0.22rem
      line-height 0.22rem
      text-align center
      background rgba(#FFFFFF 0.35)
      border-radius 1rem 0 0 1rem
      font-size 0.12rem
      color #fff
      span
        display inline-block
        width 0.12rem
        height 0.12rem
        line-height 0.12rem
        text-align center
        border 1px solid #FFFFFF
        border-radius 50%
        margin-right 2px
    .choose_address
      width 100%
      border-radius 0.16rem 0.16rem 0 0
      z-index 1
      .van-picker__toolbar
        height 0.49rem
        border-bottom 1px solid rgba(238, 238, 238, 1)
        .van-picker__confirm
          color rgba(39, 130, 244, 1)
    .acc_remind
      width 2.9rem
      height 1.96rem
      background url('../assets/img/accRemind.png') no-repeat center
      background-size bgSize
      display flex
      z-index 2
      div
        width 1.25rem
        height 0.4rem
        margin-top 1.36rem
      .left
        margin-left 0.16rem
      .right
        margin-left 0.08rem
    .ins_second_wrapper
      position absolute
      top 1.3rem
      width 3.43rem
      margin 0 0.16rem
      .add_car
        width 3.43rem
        height 1.55rem
        background #fff
        border-radius 0.08rem
        .add_carimg
          display inline-block
          width 0.8rem
          height 0.8rem
          background url('../assets/img/home_icon_add@2x.png')
          background-size bgSize
          margin 0.12rem 1.315rem 0
        p
          width 100%
        .add_carimgexplain
          height 0.22rem
          line-height 0.22rem
          text-align center
          font-size 0.16rem
          font-weight 500
          color #08101A
        .add_cartext
          height 0.17rem
          line-height 0.17rem
          text-align center
          font-size 0.12rem
          font-weight 400
          color #9FA6AE
          padding-top 0.04rem
      .already_addcar
        width 3.43rem
        height 3.65rem
        background #fff
        border-radius 0.08rem
        .already_head::before
          display table
          content ''
        .already_head
          width 3.43rem
          height 0.77rem
          background #F4F9FE
          position relative
          border-radius 0.08rem 0.08rem 0 0
          border-bottom 1px solid rgba(223, 226, 230, 1)
          p
            width 3.19rem
            height 0.2rem
            line-height 0.2rem
            padding 0 0.12rem
          .head_carnum
            font-size 0.18rem
            font-weight 500
            color #08101A
            margin-top 0.16rem
            .modify_carsinfo
              display inline-block
              width 0.16rem
              height 0.16rem
              margin-left 0.08rem
              background url('../assets/img/community_icon_release@2x.png') no-repeat center
              background-size bgSize
          .head_registrationdate
            font-size 0.12rem
            font-weight 400
            color #9FA6AE
            margin-top 0.04rem
          .change_car
            width 0.22rem
            height 0.22rem
            position absolute
            top 0.29rem
            right 0.12rem
            background url('../assets/img/home_icon_switch@2x.png') no-repeat center
            background-size bgSize
        .alredy_content::before
          display table
          content ''
        .alredy_content
          width 3.19rem
          height 2.87rem
          margin 0 0.12rem
          position relative
          .handle_city
            font-size 0.14rem
            font-weight 400
            color #08101A
            margin-top 0.09rem
            background url('../assets/img/home_icon_city_down@2x.png') no-repeat 1.16rem center
            background-size 0.16rem 0.16rem
          .free_online
            position absolute
            top 0.08rem
            right -0.12rem
            width 0.56rem
            height 0.22rem
            line-height 0.22rem
            text-align center
            background #2782F4
            border-radius 1rem 0 0 1rem
            font-size 0.12rem
            font-weight 400
            color #FFFFFF
          .date_title
            font-size 0.14rem
            padding-top 0.2rem
            text-align center
            font-weight 400
            color #9FA6AE
          .already_date::before
            display table
            content ''
          .already_date
            margin 0.08rem 0 0.2rem
            height 0.84rem
            display flex
            span
              display inline-block
              height 0.84rem
              line-height 0.84rem
              text-align center
              width 0.62rem
              background url('../assets/img/home_img_calendar@2x.png') no-repeat center
              background-size bgSize
              font-size 0.6rem
              font-weight bold
              color #08101A
            .left_date
              margin-left 0.96rem
              margin-right 0.04rem
            em
              display inline-block
              width 0.14rem
              height 0.2rem
              margin 0.64rem 0 0 0.04rem
              font-size 0.14rem
              font-weight 400
              color #9FA6AE
          .immediately_handle
            width 3.19rem
            height 0.45rem
            line-height 0.45rem
            text-align center
            background #2782F4
            border-radius 0.23rem
            font-size 0.16rem
            font-weight 500
            color #FFFFFF
          .immediately_handle1
            background #9FA6AE
          .already_handle
            display inline-block
            width 100%
            text-align center
            margin-top 0.2rem
            font-size 0.16rem
            font-weight 500
            color #2782F4
      .ins_menu
        width 3.43rem
        height 0.5rem
        line-height 0.5rem
        background #fff
        margin 0.08rem 0
        border-radius 0.08rem
        a
          display inline-block
          width 1.71rem
          height 0.2rem
          line-height 0.2rem
          text-align center
          font-size 0.16rem
          color #08101A
        .ins_menu_coupons
          border-right 1px solid rgba(223, 226, 230, 1)
          background url('../assets/img/home_icon_coupons@2x.png') no-repeat 0.24rem
          background-size 0.16rem 0.16rem
        .ins_menu_orders
          width 1.51rem
          margin-left 0.2rem
          background url('../assets/img/home_icon_order@2x.png') no-repeat 0.22rem
          background-size 0.16rem 0.16rem
      .ins_content
        width 3.43rem
        background #fff
        border-radius 0.08rem
        margin-bottom 0.12rem
      .ins_content::after
        display table
        content ''
      .ins_type
        position relative
        height 0.48rem
        background rgba(242, 242, 242, 1)
        display flex
        align-items center
        justify-content space-between
        overflow hidden
        border-radius 0.08rem 0.08rem 0 0
        .row
          width (3.43 / 3)rem
          text-align center
          font-size 0.16rem
          font-weight 600
          color #08101A
          z-index 1
        .gray_font
          color rgba(159, 166, 174, 1) !important
        .cur
          z-index 0
          position absolute
          left -0.13rem
          width 1.33rem
          height 0.48rem
          background url('../assets/img/bg_classification_middle_sel@2x.png')
          background-size bgSize
          overflow hidden
          transition all 0.3s
        .cur1
          left -0.13rem
        .cur2
          left 1.04rem
        .cur3
          left 2.18rem
      .explain_contentpic
        width 3.19rem
        height 10.9rem
        margin 0.16rem 0.12rem 0.12rem
      .explain_contentpic1
        background url('../assets/img/home_img_1@2x.png') no-repeat center
        background-size bgSize
      .explain_contentpic2
        background url('../assets/img/home_img_2@2x.png') no-repeat center
        background-size bgSize
      .explain_contentpic3
        background url('../assets/img/home_img_3@2x.png') no-repeat center
        background-size bgSize
  .van-popup
    width 100%
    height 3rem
    border-radius 0.16rem 0.16rem 0 0
    h2
      width 3.43rem
      margin-left 0.16rem
      padding-right 0.16rem
      height 0.44rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      font-size 0.16rem
      font-weight 500
      color #08101A
      display flex
      align-items center
      justify-content space-between
      em
        color #9FA6AE
    .all_cars
      overflow auto
      height 2.5rem
      .car
        width 3.43rem
        height 0.78rem
        background #F8FBFF
        border-radius 0.04rem
        border 1px solid #DFE2E6
        margin 0.08rem 0.16rem
        position relative
        p
          padding-left 0.12rem
          font-size 0.14rem
          font-weight 400
          color #9FA6AE
          &:nth-of-type(1)
            padding-top 0.16rem
            padding-bottom 0.04rem
            em
              font-size 0.16rem
              font-weight 500
              color #08101A
              padding-right 0.12rem
        span
          display inline-block
          position absolute
          top 0.29rem
          right 0.12rem
          width 0.2rem
          height 0.2rem
          background url('../assets/img/icon_box_nor@2x.png') no-repeat center
          background-size bgSize
        .car_choosed
          background url('../assets/img/icon_box_sel@2x.png') no-repeat center
          background-size bgSize
      .new_car
        width 3.43rem
        height 0.5rem
        line-height 0.5rem
        text-align center
        margin 0.16rem
        background #2782F4
        border-radius 0.25rem
        font-size 0.18rem
        font-weight 500
        color #FFFFFF
</style>
