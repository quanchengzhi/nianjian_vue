<template>
  <div class="con_wrapper clearfix">
    <div class="con_car_info">
      <p class="con_car_num">
        <span>粤A R23L1</span>
        <span>上线</span>
      </p>
      <p class="con_address">
        <em>代办地:</em>
        <span>深圳市 宝安区</span>
      </p>
    </div>
    <div class="con_exempt_info" v-if="state == 0">
      <h2>6年免检</h2>
      <p class="con_exempt_receive">
        <span>收件人</span>
        <input
          @input="exempChange"
          v-model="exempName"
          class="con_exempt_receive_val"
          type="text"
          placeholder="请输入收件人的姓名"
        />
      </p>
      <p class="con_exempt_phone">
        <span>手机号码</span>
        <input
          @input="exempChange"
          v-model="exempPhone"
          class="con_exempt_phone_val"
          type="tel"
          maxlength="11"
          placeholder="请输入收件人的手机号码"
        />
      </p>
      <p class="con_exempt_receive_address">
        <span>所在地区</span>
        <input
          @click="exempAddressShow = true"
          v-model="exempAddress"
          class="con_exempt_receive_address_val"
          readonly
          type="text"
          id="demo1"
          placeholder="请选择取地址"
        />
      </p>
      <p class="con_detailed_address" style="border: none">
        <span>详细地址</span>
        <input
          @input="exempChange"
          v-model="exempDetailAddress"
          class="con_detailed_address_val"
          type="text"
          placeholder="街道/门牌号"
        />
      </p>
    </div>
    <div
      @click="
        $router.push({
          path: '/supplementInfo',
          name: 'supplementInfo',
          query: { state: 1 },
        })
      "
      class="upload_info"
      v-if="state == 0"
    >
      <span>上传所需资料</span>
    </div>
    <div class="handle_type" v-if="state != 0">
      <div class="handl_type_head">
        <p class="handle_type_text">{{ handleType }}</p>
        <p @click="changeTypeShow = true" class="change_handle_type">
          更换办理方式
        </p>
      </div>
      <div class="handle_type_img">
        <img
          v-if="state == 1"
          src="../assets/img/img_process_2@2x.png"
          alt="接车代办流程"
        />
        <img
          v-if="state == 2"
          src="../assets/img/img_process_1@2x.png"
          alt="站内代办流程"
        />
      </div>
    </div>
    <div class="con_take_car_info" v-if="state == 1">
      <p class="conTakeCarTime">
        <span>接车时间</span>
        <input
          v-model="dateTime"
          @click="dateTimePickerShow = true"
          id="demoTwo"
          type="text"
          readonly
          placeholder="请选择接车时间"
        />
      </p>
      <p class="con_take_car_address">
        <span>取还车地址</span>
        <input
          @click="getCarAddressShow = true"
          v-model="getCarAddress"
          type="text"
          readonly
          placeholder="请选择取还车地址"
        />
      </p>
      <p class="con_take_car_detailed_address" style="border: none">
        <span>详细地址</span>
        <input
          v-model="getCarDetailAddress"
          @input="ownerInfoChange"
          type="text"
          placeholder="街道/门牌号"
        />
      </p>
    </div>
    <div class="con_station_info" v-if="state == 2">
      <p class="con_appointment">
        <span>预约时间</span>
        <input
          v-model="dateTime"
          @click="dateTimePickerShow = true"
          type="text"
          readonly
          placeholder="请选择预约检测时间"
        />
      </p>
      <p class="discover_station" style="border: none">
        <span>检测站</span>
        <input
          v-if="!changedStation"
          @click="$router.push('/station')"
          class="discover_station_val"
          type="text"
          readonly
          placeholder="请选择检测站"
        />
        <span
          @click="$router.push('/station')"
          class="choose_station_info_change"
          v-if="changedStation"
          >更换</span
        >
      </p>
      <div v-if="changedStation" class="choose_station_info">
        <div class="choose_station_info_name">
          深圳市北方第二汽车检测有限公司
        </div>
        <div class="choose_station_info_address">
          广东省深圳市宝安区广深公路展丰工业园北40米展丰商务大厦
        </div>
      </div>
    </div>
    <div class="car_owner_info" v-if="state != 0">
      <p>
        <span>车主姓名</span>
        <input
          @input="ownerInfoChange"
          v-model="ownerName"
          type="text"
          class="car_owner_info_name"
          placeholder="请输入您的姓名"
        />
      </p>
      <p>
        <span>联系电话</span>
        <input
          @input="ownerInfoChange"
          v-model="ownerPhone"
          type="text"
          class="car_owner_info_phone"
          placeholder="请输入您的手机号"
        />
      </p>
      <p class="con_remarks" style="border: none">
        <span>备注</span>
        <input
          @input="ownerInfoChange"
          v-model="ownerRemarks"
          class="car_owner_info_remarks ellipsis"
          type="text"
          placeholder="请输入备注信息（选填）"
        />
      </p>
    </div>
    <div class="con_bottom">
      <span class="con_bottom_change_text">
        <em>¥ 30.00</em>(不含检测费用)
      </span>
      <span
        @click="submitOrder"
        :class="{
          submit_order: true,
          cannot_submit: !btnHighlight,
          can_submit: btnHighlight,
        }"
        >提交订单</span
      >
    </div>
    <a class="call_to_kefu" href="tel:00000000"></a>
    <van-popup
      v-model="changeTypeShow"
      position="bottom"
      class="change_type_box"
    >
      <h2>
        <span>更换办理方式</span>
        <span>
          <em @click="changeTypeShow = false" class="t_box_cancel">取消</em>
          <i @click="changeType" class="t_box_confirm">确定</i>
        </span>
      </h2>
      <div class="t_box" @click="tBoxChecked = false">
        <p>接车代办</p>
        <p>专人上门接车，办理年检后送回，方便省心</p>
        <span
          :class="{ t_box_check: true, t_box_checked: !tBoxChecked }"
        ></span>
      </div>
      <div class="t_box" @click="tBoxChecked = true">
        <p>站内代办</p>
        <p>检测站安排师傅代您排队办理，提供VIP服务</p>
        <span :class="{ t_box_check: true, t_box_checked: tBoxChecked }"></span>
      </div>
    </van-popup>

    <van-popup v-model="exempAddressShow" class="choose_area" position="bottom">
      <van-area
        @cancel="exempAddressShow = false"
        @confirm="chooseExempAddress"
        title="请选择地址"
        :area-list="areaList"
        value="440306"
      />
    </van-popup>

    <van-popup
      v-model="getCarAddressShow"
      class="choose_area"
      position="bottom"
    >
      <van-area
        @cancel="getCarAddressShow = false"
        @confirm="chooseGetCarAddress"
        title="请选择取还车地址"
        :area-list="areaList"
        value="440306"
      />
    </van-popup>

    <van-popup
      v-model="dateTimePickerShow"
      class="datetime_picker"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="请选择接车时间"
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
import areaList from "../assets/js/areaList.js";
export default {
  data() {
    return {
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2100, 12, 31),
      currentDate: new Date(),
      state: 0,
      changeTypeShow: false,
      handleType: "上门接车代办",
      dateTimePickerShow: false,
      changedStation: 0,
      dateTime: "",
      exempName: "",
      exempPhone: "",
      exempAddress: "",
      exempDetailAddress: "",
      areaList,
      getCarAddressShow: false,
      getCarDetailAddress: "",
      exempAddressShow: false,
      getCarAddress: "",
      btnHighlight: false,
      ownerName: "",
      ownerPhone: "",
      ownerRemarks: "",
      inspectionStation: "",
      tBoxChecked: false,
    };
  },
  mounted() {
    this.getQuery();
  },
  methods: {
    getQuery() {
      this.state = this.$route.query.state;
      this.changedStation = this.$route.query.choosedStation;
      if (this.state == 2) {
        this.handleType = "站内师傅代办";
      } else if (this.state == 1) {
        this.handleType = "上门接车代办";
      }
    },
    chooseExempAddress(val) {
      this.exempAddress = "";
      for (let name of val) {
        this.exempAddress += " " + name.name;
      }
      this.exempChange();
      this.exempAddressShow = false;
    },
    chooseGetCarAddress(val) {
      this.getCarAddress = "";
      for (let name of val) {
        this.getCarAddress += " " + name.name;
      }
      this.ownerInfoChange();
      this.getCarAddressShow = false;
    },
    exempChange() {
      if (
        this.exempDetailAddress &&
        this.exempAddress &&
        this.exempPhone &&
        this.exempName
      ) {
        this.btnHighlight = true;
      } else {
        this.btnHighlight = false;
      }
    },
    ownerInfoChange() {
      if (this.$route.query.state == 1) {
        if (
          this.ownerPhone &&
          this.ownerName &&
          this.getCarAddress &&
          this.getCarDetailAddress &&
          this.dateTime
        ) {
          this.btnHighlight = true;
        } else {
          this.btnHighlight = false;
        }
      } else if (this.$route.query.state == 2) {
        if (
          this.ownerPhone &&
          this.ownerName &&
          this.changedStation &&
          this.dateTime
        ) {
          this.btnHighlight = true;
        } else {
          this.btnHighlight = false;
        }
      }
    },
    submitOrder() {
      if (this.btnHighlight) {
        this.$router.push({
          path: "/pay",
          name: "pay",
        });
      }
    },
    changeDateTime(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let minute = val.getMinutes();
      let hours = val.getHours();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hours >= 1 && day <= 9) {
        hours = `0${hours}`;
      }
      if (minute >= 1 && day <= 9) {
        minute = `0${minute}`;
      }
      this.dateTime = `${year}-${month}-${day} ${hours}:${minute}`;
      this.ownerInfoChange();
      this.dateTimePickerShow = false;
    },
    changeType() {
      if (!this.tBoxChecked) {
        this.state = 1;
      } else {
        this.state = 2;
      }
      if (this.state == 2) {
        this.handleType = "站内师傅代办";
      } else if (this.state == 1) {
        this.handleType = "上门接车代办";
      }
      this.tBoxCheckedShow = false;
      this.changeTypeShow = false;
    },
  },
};
</script>

<style lang="stylus">
.con_wrapper
  background #f8fbff
  width 100%
  height 100%
  position relative
  .con_car_info
    height 0.36rem
    width 3.43rem
    padding 0 0.16rem
    font-size 0.14rem
    font-weight 400
    color #08101A
    display flex
    align-items center
    justify-content space-between
    .con_car_num
      span:nth-child(1)
        display inline-block
        width 0.68rem
      span:nth-child(2)
        padding-left 0.12rem
    .con_address
      em
        color rgba(159, 166, 174, 1)
        padding-right 0.12rem
  .con_exempt_info
    width 3.43rem
    height 2.47rem
    margin 0 0.16rem
    background #fff
    border-radius 0.08rem
    font-size 0.16rem
    font-weight 400
    color #08101A
    h2
      width 3.19rem
      padding 0 0.12rem
      height 0.45rem
      line-height 0.45rem
      font-weight 500 !important
      border-bottom 1px solid rgba(223, 226, 230, 1)
    p
      width 3.19rem
      margin-left 0.12rem
      padding-right 0.12rem
      height 0.49rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      display flex
      align-items center
      span
        display inline-block
        width 0.88rem
      input
        font-size 0.16rem
        font-weight 400
        color #08101A
  .upload_info
    width 3.43rem
    height 0.5rem
    line-height 0.5rem
    margin 0.08rem 0.16rem
    background #FFFFFF
    border-radius 0.08rem
    font-size 0.16rem
    font-weight 500
    color #08101A
    span
      display inline-block
      width 3.19rem
      margin 0 0.12rem
      background url('../assets/img/editor_icon_next@2x.png') no-repeat right center
      background-size 0.16rem 0.16rem
  .handle_type
    width 3.43rem
    height 1.77rem
    margin 0 0.16rem
    background #fff
    border-radius 0.08rem
    .handl_type_head
      width 3.19rem
      padding 0 0.12rem
      border-bottom 1px solid rgba(223, 226, 230, 1)
      height 0.45rem
      display flex
      align-items center
      justify-content space-between
      font-size 0.16rem
      font-weight 500
      color #08101A
      .change_handle_type
        color rgba(39, 130, 244, 1)
    .handle_type_img
      margin 0.12rem
      img
        width 3.19rem
        height 1.06rem
  .con_take_car_info
    width 3.43rem
    height 1.5rem
    margin 0.08rem 0.16rem
    background #fff
    border-radius 0.08rem
    font-size 0.16rem
    font-weight 400
    color #08101A
    p
      width 3.19rem
      margin-left 0.12rem
      padding-right 0.12rem
      height 0.49rem
      display flex
      align-items center
      border-bottom 1px solid rgba(223, 226, 230, 1)
      span
        display inline-block
        width 0.88rem
      input
        font-size 0.16rem
        font-weight 400
        color #08101A
  .car_owner_info
    width 3.43rem
    height 1.5rem
    margin 0.08rem 0.16rem
    background #fff
    border-radius 0.08rem
    font-size 0.16rem
    font-weight 400
    color #08101A
    p
      width 3.19rem
      margin-left 0.12rem
      padding-right 0.12rem
      height 0.49rem
      display flex
      align-items center
      border-bottom 1px solid rgba(223, 226, 230, 1)
      span
        display inline-block
        width 0.88rem
      input
        font-size 0.16rem
        font-weight 400
        color #08101A
  .con_station_info
    width 3.43rem
    margin 0.08rem 0.16rem
    background #fff
    border-radius 0.08rem
    font-size 0.16rem
    font-weight 400
    color #08101A
    &::after
      display table
      content ''
    p
      width 3.19rem
      margin-left 0.12rem
      padding-right 0.12rem
      height 0.49rem
      display flex
      align-items center
      border-bottom 1px solid rgba(223, 226, 230, 1)
      background url('../assets/img/editor_icon_next@2x.png') no-repeat 3.04rem center
      background-size 0.16rem 0.16rem
      span
        display inline-block
        width 0.88rem
      input
        font-size 0.16rem
        font-weight 400
        color #08101A
    .discover_station
      position relative
      .choose_station_info_change
        position absolute
        right 0.24rem
        text-align right
        color rgba(39, 130, 244, 1)
    .choose_station_info
      width 3.19rem
      height 0.83rem
      margin 0 0.12rem 0.08rem
      background #F8FBFF
      border-radius 0.04rem
      border 1px solid rgba(223, 226, 230, 0.5)
      .choose_station_info_name
        font-size 0.14rem
        font-weight 500
        color #08101A
        padding 0.12rem 0.12rem 0
      .choose_station_info_address
        font-size 0.12rem
        width 2.83rem
        height 0.34rem
        padding 0.05rem 0.12rem 0
        margin-left 0.12rem
        color #9FA6AE
        background url('../assets/img/confirm_icon_adress@2x.png') no-repeat left 0.08rem
        background-size 0.1rem 0.12rem
  .con_bottom
    position fixed
    bottom 0
    width 100%
    height 0.5rem
    line-height 0.5rem
    background #fff
    box-shadow 0px 0px 0px 1px #DFE2E6
    font-size 0.18rem
    font-weight 500
    .con_bottom_change_text
      display inline-block
      width 2.15rem
      color rgba(159, 166, 174, 1)
      text-align center
      em
        color rgba(255, 88, 0, 1)
        padding-right 0.08rem
    .submit_order
      display inline-block
      width 1.6rem
      text-align center
      color rgba(255, 255, 255, 1)
    .cannot_submit
      background rgba(198, 205, 213, 1)
    .can_submit
      background rgba(39, 130, 244, 1)
  .choose_area, .datetime_picker
    width 100%
    border-radius 0.16rem 0.16rem 0 0
    z-index 1
    .van-picker__toolbar
      height 0.49rem
      border-bottom 1px solid rgba(238, 238, 238, 1)
      .van-picker__confirm
        color rgba(39, 130, 244, 1)
  .change_type_box
    width 3.75rem
    height 3.46rem
    background #FFFFFF
    border-radius 0.16rem 0.16rem 0px 0px
    position fixed
    bottom 0
    z-index 1
    h2
      width 3.43rem
      height 0.44rem
      display flex
      align-items center
      justify-content space-between
      margin-left 0.16rem
      padding-right 0.16rem
      border-bottom 1px solid rgba(238, 238, 238, 1)
      font-size 0.16rem
      font-weight 400
      margin-bottom 0.04rem
      span
        &:nth-child(1)
          color #08101A
          font-weight 500
        &:nth-child(2)
          em
            color #9FA6AE
            padding-right 0.24rem
          i
            color #2782F4
    .t_box
      width 3.43rem
      height 0.78rem
      margin 0.08rem 0.16rem
      background #F8FBFF
      border-radius 0.04rem
      border 1px solid #DFE2E6
      position relative
      p
        width 3.19rem
        padding 0 0.12rem
        &:nth-child(1)
          padding-top 0.16rem
          padding-bottom 0.04rem
          font-size 0.16rem
          font-weight 500
          color #08101A
        &:nth-child(2)
          font-size 0.14rem
          color #9FA6AE
      .t_box_check
        position absolute
        top 0.29rem
        right 0.12rem
        display inline-block
        width 0.2rem
        height 0.2rem
        background url('../assets/img/icon_box_nor@2x.png')
        background-size 100% 100%
      .t_box_checked
        background url('../assets/img/icon_box_sel@2x.png')
        background-size 100% 100%
  .gray_bg
    position fixed
    top 0
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.65)
    z-index 0
</style>