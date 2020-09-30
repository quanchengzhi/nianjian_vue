<template>
  <div class="edit_wrapper clearfix">
    <van-popup
      class="choose_abbreviation box_selection"
      v-model="abbShow"
      position="bottom"
    >
      <h2>请选择地方简称</h2>
      <div class="abb_content">
        <span
          ref="abbreviation"
          :class="{
            noMarRight: (index + 1) % 7 == 0,
            abbChecked: thisAbbIndex == index,
          }"
          @click="changeAbbreviation(index)"
          v-for="(abbreviation, index) in abbreviations"
          :key="index"
          >{{ abbreviation }}</span
        >
      </div>
    </van-popup>

    <van-popup
      class="choose_car_type box_selection"
      v-model="chooseCarShow"
      position="bottom"
    >
      <div class="box_selection_head">
        <span>请选择车辆类型</span>
        <span class="box_selection_btn">
          <em class="box_selection_cancel" @click="chooseCarShow = false"
            >取消</em
          >
          <em
            class="box_selection_confirm"
            @click="
              cookieInfo.carType = $refs.carType[carTypeIndex].innerText;
              chooseCarShow = false;
            "
            >确定</em
          >
        </span>
      </div>
      <div class="car_type_content box_selection_content">
        <p
          ref="carType"
          v-for="(carType, index) in carTypes"
          :key="index"
          :class="{ box_selection_content_checked: carTypeIndex == index }"
          @click="carTypeIndex = index"
        >
          {{ carType }}
        </p>
      </div>
    </van-popup>

    <van-popup
      v-model="chooseSeatsShow"
      class="choose_seats_num box_selection"
      position="bottom"
    >
      <div class="box_selection_head">
        <span>请选择车辆座位数</span>
        <span class="box_selection_btn">
          <em class="box_selection_cancel" @click="chooseSeatsShow = false"
            >取消</em
          >
          <em
            class="box_selection_confirm"
            @click="
              cookieInfo.seatsType = $refs.seatsType[seatsTypeIndex].innerText;
              chooseSeatsShow = false;
            "
            >确定</em
          >
        </span>
      </div>
      <div class="seats_num_content box_selection_content">
        <p
          ref="seatsType"
          v-for="(seatsType, index) in seatsTypes"
          :key="index"
          :class="{ box_selection_content_checked: seatsTypeIndex == index }"
          @click="seatsTypeIndex = index"
        >
          {{ seatsType }}
        </p>
      </div>
    </van-popup>

    <van-popup v-model="carNumRemindShow" class="car_num_and_engine_Info">
      <div class="car_num_and_engine_Info_bg"></div>
      <p @click="carNumRemindShow = false">我知道了</p>
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

    <div class="car_info">
      <h2>车辆信息</h2>
      <p class="car_num">
        <span>车牌号码</span>
        <span class="local_abbreviation" @click="abbShow = true">{{
          cookieInfo.abbreviation
        }}</span>
        <input
          v-model="cookieInfo.carNum"
          class="car_num_cookie"
          type="text"
          maxlength="6"
          placeholder="请输入车牌号码"
        />
      </p>
      <p class="engine_num clearfix">
        <span>发动机号</span>
        <input
          class="engine_num_cookie"
          v-model="cookieInfo.engineNum"
          type="tel"
          maxlength="6"
          placeholder="请输入发动机号后6位"
        />
        <i class="user_choose_explain" @click="carNumRemindShow = true"></i>
      </p>
      <p class="frame_num clearfix">
        <span>车架号</span>
        <input
          v-model="cookieInfo.frameNum"
          class="frame_num_cookie"
          type="tel"
          maxlength="6"
          placeholder="请输入车架号后6位"
        />
        <i class="user_choose_explain" @click="carNumRemindShow = true"></i>
      </p>
      <p class="car_type user_choose_next">
        <span>车辆类型</span>
        <input
          v-model="cookieInfo.carType"
          class="car_type_cookie"
          type="text"
          readonly
          placeholder="请选择车辆类型"
          @click="chooseCarShow = true"
        />
      </p>
      <p class="seats_num user_choose_next">
        <span>座位数</span>
        <input
          v-model="cookieInfo.seatsType"
          @click="chooseSeatsShow = true"
          class="seats_num_cookie"
          type="text"
          readonly
          placeholder="请选择车辆座位数"
        />
      </p>
      <p class="car_registration_date user_choose_next" style="border: none">
        <span>注册日期</span>
        <input
          class="car_registration_date_cookie"
          type="text"
          readonly
          placeholder="请选择车辆注册日期"
          @click="dateTimePickerShow = true"
          v-model="cookieInfo.dateTime"
        />
      </p>
    </div>
    <div class="accident_casualties">
      <h2>是否造成事故伤亡</h2>
      <p
        :class="{
          acc_yes: true,
          acc_checks: accChecks,
          acc_checked: !accChecks,
        }"
        @click="
          remindShow = true;
          accChecks = accChecks;
        "
      >
        <span>是</span>
      </p>
      <p
        :class="{
          acc_yes: true,
          acc_checks: accChecks,
          acc_checked: accChecks,
        }"
        @click="accChecks = true"
        style="border: none"
      >
        <span>否</span>
      </p>
    </div>
    <div class="edit_btn">
      <div @click="saveToIndex()" class="save_btn">保存</div>
      <div @click="delToindex()" v-if="cancelBtnShow" class="remove_btn">
        删除车辆
      </div>
    </div>
    <div class="remove_remind thisHide">
      <div class="left_cancle_btn"></div>
      <div class="right_confirm_btn"></div>
    </div>
    <van-popup v-model="dateTimePickerShow" class="datetime_picker" position="bottom">
      <van-datetime-picker
        v-show="dateTimePickerShow"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        
        ref="datetimePicker"
        @confirm="changeDateTime"
        @cancel="dateTimePickerShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2100, 12, 31),
      currentDate: new Date(),
      abbShow: false,
      remindShow: false,
      accChecks: true,
      chooseCarShow: false,
      carNumRemindShow: false,
      cancelBtnShow: false,
      chooseSeatsShow: false,
      dateTimePickerShow: false,
      carTypeIndex: 0,
      seatsTypeIndex: 0,
      thisAbbIndex: 18,
      cookieInfo: {
        abbreviation: "粤",
        carNum: "",
        engineNum: "",
        frameNum: "",
        carType: "",
        seatsType: "",
        dateTime: "",
      },
      carTypes: ["私家车", "公司车"],
      seatsTypes: ["5座以下", "5座", "6座", "7座"],
      abbreviations: [
        "京",
        "津",
        "冀",
        "晋",
        "蒙",
        "辽",
        "吉",
        "黑",
        "沪",
        "苏",
        "浙",
        "皖",
        "闽",
        "赣",
        "鲁",
        "豫",
        "鄂",
        "湘",
        "粤",
        "桂",
        "琼",
        "蜀",
        "黔",
        "云",
        "渝",
        "藏",
        "陕",
        "甘",
        "青",
        "宁",
        "新",
      ],
    };
  },
  mounted() {
    this.getParams();
    this.setCookieInfo();
  },
  methods: {
    getParams() {
      if (this.$route.params.state == 1) {
        this.cancelBtnShow = true;
      } else {
        this.cancelBtnShow = false;
      }
    },
    saveToIndex() {
      for (let cookie in this.cookieInfo) {
        this.setCookie(cookie, this.cookieInfo[cookie], 1);
      }
      this.$router.push({
        path: "/index",
        name: "index",
        query: {
          state: 1,
        },
      });
    },
    setCookieInfo() {
      if (document.cookie.length > 0) {
        for (let cookie in this.cookieInfo) {
          this.cookieInfo[cookie] = this.getCookie(cookie);
        }
      } else {
        this.abbreviation = "粤";
      }
    },
    delToindex() {
      for (let cookie in this.cookieInfo) {
        this.delCookie(cookie);
      }
      this.$router.push({
        path: "/index",
        name: "index",
        query: {
          state: 0,
        },
      });
    },
    changeAbbreviation(index) {
      this.thisAbbIndex = index;
      this.abbShow = false;
      this.cookieInfo.abbreviation = this.$refs.abbreviation[index].innerText;
    },
    changeDateTime(val) {
      this.dateTimePickerShow = false;
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      this.cookieInfo.dateTime = `${year}-${month}-${day}`;
    },
  },
};
</script>

<style lang="stylus">
bgSize = 100% 100%
.edit_wrapper::before
  display table
  content ''
.edit_wrapper
  width 100%
  height 100%
  background #f8fbf7
  position relative
  .datetime_picker
    position fixed
    bottom 0
    width 100%
    z-index 2
  .bg_gray
    position fixed
    bottom 0
    background rgba(0, 0, 0, 0.6)
    width 100%
    height 100%
    z-index 1
  .box_selection
    position fixed
    bottom 0
    background #fff
    border-radius 0.08rem 0.08rem 0 0
    width 100%
    height 3.46rem
    z-index 2
    h2
      width 3.43rem
      margin-left 0.16rem
      padding-right 0.16rem
      margin-bottom 0.12rem
      height 0.45rem
      line-height 0.45rem
      font-size 0.16rem
      font-weight 600
      color #08101A
      border-bottom 1px solid rgba(223, 226, 230, 1)
    .box_selection_head
      height 0.49rem
      width 3.43rem
      padding 0 0.16rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      display flex
      align-items center
      justify-content space-between
      z-index 2
      span:nth-of-type(1)
        font-size 0.16rem
        font-weight 600
        color #08101A
      .box_selection_btn
        width 1rem
        font-size 0.15rem
        font-weight 500
        .box_selection_cancel
          color rgba(159, 166, 174, 1)
          padding-right 0.24rem
        .box_selection_confirm
          color rgba(39, 130, 244, 1)
    .box_selection_content
      p
        width 3.43rem
        margin-left 0.16rem
        padding-right 0.16rem
        height 0.49rem
        line-height 0.49rem
        border-bottom 1px solid rgba(223, 226, 230, 1)
      .box_selection_content_checked
        background url('../assets/img/editor_icon_true@2x.png') no-repeat 3.14rem center
        background-size 0.22rem 0.22rem
    .abb_content
      width 3.43rem
      margin 0 0.16rem
      span
        display inline-block
        width 0.4rem
        height 0.42rem
        line-height 0.42rem
        text-align center
        margin-right 0.08rem
        margin-bottom 0.08rem
        border 1px solid rgba(223, 226, 230, 1)
        border-radius 0.04rem
      .noMarRight
        margin-right 0
      .abbChecked
        color rgba(255, 255, 255, 1)
        background rgba(39, 130, 244, 1)
  .choose_car_type
    position fixed
    bottom 0
    z-index 2
  .car_num_and_engine_Info
    z-index 1
    width 2.9rem
    height 2.85rem
    background #fff
    border-radius 0.12rem
    .car_num_and_engine_Info_bg
      width 2.9rem
      height 2rem
      background url('../assets/img/editor_img_car@2x.png') no-repeat center
      background-size bgSize
    p
      width 2.58rem
      height 0.45rem
      line-height 0.45rem
      text-align center
      margin 0.2rem 0.16rem
      background rgba(39, 130, 244, 1)
      border-radius 0.23rem
      color #fff
      font-size 0.18rem
  .acc_remind
    width 2.9rem
    height 1.72rem
    background url('../assets/img/dangerRemind.png') no-repeat center
    background-size bgSize
    display flex
    z-index 2
    div
      width 1.25rem
      height 0.4rem
      margin-top 1.12rem
    .left
      margin-left 0.16rem
    .right
      margin-left 0.08rem
  .car_info
    width 3.43rem
    height 3.19rem
    margin 0.08rem 0.16rem
    background #fff
    border-radius 0.08rem
    h2, p
      width 3.19rem
      height 0.45rem
      margin-left 0.12rem
      padding-right 0.12rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      display flex
      align-items center
    h2
      font-size 0.14rem
      font-weight 500
      color #08101A
    p
      font-size 0.15rem
      font-weight 400
      color #08101A
      position relative
      span
        display inline-block
        width 0.84rem
      .local_abbreviation
        width 0.3rem
        height 0.24rem
        line-height 0.24rem
        padding-right 0
        padding-left 0.04rem
        margin-right 0.08rem
        color #fff
        background url('../assets/img/editor_img_arrow@2x.png') no-repeat center
        background-size bgSize
      .user_choose_explain
        display inline-block
        width 0.18rem
        height 0.18rem
        position absolute
        right 0.12rem
        background url('../assets/img/editor_icon_doubt@2x.png') no-repeat center
        background-size bgSize
    .user_choose_next
      background url('../assets/img/icon_on@2x.png') no-repeat 3.04rem center
      background-size 0.17rem 0.17rem
  .accident_casualties
    width 3.43rem
    margin 0 0.16rem
    height 1.4rem
    background #fff
    border-radius 0.08rem
    h2, p
      width 3.19rem
      height 0.45rem
      line-height 0.45rem
      margin-left 0.12rem
      padding-right 0.12rem
      color #08101A
      border-bottom 1px solid rgba(223, 226, 230, 1)
    h2
      font-size 0.14rem
      font-weight 500
    p
      font-size 0.15rem
      font-weight 400
    .acc_checks
      background url('../assets/img/icon_box_nor@2x.png') no-repeat 3rem center
      background-size 0.2rem 0.2rem
    .acc_checked
      background url('../assets/img/icon_box_sel@2x.png') no-repeat 3rem center
      background-size 0.2rem 0.2rem
  .edit_btn
    div
      width 3.43rem
      height 0.5rem
      line-height 0.5rem
      text-align center
      margin 0 0.16rem
      border-radius 0.25rem
      font-size 0.18rem
      font-weight 500
    .save_btn
      background rgba(39, 130, 244, 1)
      color #fff
      margin-top 0.4rem
    .remove_btn
      background #fff
      color #FF0000
      margin-top 0.2rem
</style>