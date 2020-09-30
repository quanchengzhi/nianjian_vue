<template>
  <div class="pro_wrapper">
    <div class="problems">
      <p class="questions">年检办理的条件是什么？</p>
      <p class="answers">
        1. 7座及以下普通小型车辆
        <br />2. 私家车、公司非营运小车
        <br />3. 车辆需购买交强险
        <br />4. 车辆没有违章情况
        <br />5. 免检期内未发生过致人伤亡事故的车辆
      </p>
    </div>
    <div class="problems">
      <p class="questions">能做哪种车辆、哪种情况的年检？</p>
      <p class="answers">
        1. 6座及以下小车可正常办理所需年检
        <br />2. 7座小车只可办理上线检测办理。
      </p>
    </div>
    <div class="problems">
      <p class="questions">大车能否代办年检？</p>
      <p class="answers">很抱歉，目前我司暂未提供大车的年检代办服务。</p>
    </div>
    <div class="problems">
      <p class="questions">历史违章未处理，能否帮我处理违章并年检？</p>
      <p class="answers">车多App有违章查缴功能，您可以先在车多App里将违章处理完毕，之后您再下单办理年检。</p>
    </div>
    <div class="problems">
      <p class="questions">年检需要提供什么资料？</p>
      <p class="answers">
        1. 6年内免上线年检需提供：行驶证正本正面,行驶证副本正面，保单交强险正本或副本；在确认订单处上传照片
        <br />2. 上线年检需提供：交强险保单(副本)、身份证(复印件)、行驶证(原件)
      </p>
    </div>
    <div class="problems">
      <p class="questions">交强险未生效可否办理盖章年检？</p>
      <p class="answers">可以，目前只要已购买交强险即可办理。</p>
    </div>
    <div class="problems">
      <p class="questions">代办年检周期多久？</p>
      <p class="answers">
        1. 6年内免上线年检代办周期一般为1-2个工作日，不含来回快递时间，具体办理周期以快递时限为准。
        <br />2. 上线年检代办周期为当天，预约成功后，师傅按时上门取车到年检站办理年检，完成后返回交接车辆及资料。
      </p>
    </div>
    <div class="problems">
      <p class="questions">下单后可否退款？退款什么时候到账？</p>
      <p class="answers">可以,退款于退单后的1-3个工作日按照原渠道退还至您账户,若是因客户原因导致代办不成功的话无法退还服务费。</p>
    </div>
    <div class="problems">
      <p class="questions">逾期年检有什么处罚？</p>
      <p class="answers">部分地区规定未年检是需要扣分罚款的。</p>
    </div>
    <div class="problems">
      <p class="questions">逾期未年检的车能代办吗？</p>
      <p class="answers">您可以输入需要年检的车牌，系统会提示您该车辆能否代办；由于每个地区年检规则不同，大部分的逾期也可代办。</p>
    </div>
    <div class="problems" style="border:none">
      <p class="questions">年检费用如何计算？</p>
      <p class="answers">不同的地区代办费有所差异，您可以输入需代办的年检车牌，下单时系统会提示具体的年检费用。</p>
    </div>
    <a href="tel:0755-2357-5629" class="tel_btn">拨打电话（0755）2357 5692</a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>


<style lang="stylus" scoped>
bgSize = 100% 100%
.pro_wrapper
  width 100%
  .problems
    width 3.43rem
    margin-left 0.16rem
    padding 0.08rem 0.16rem 0.11rem 0
    border-bottom 1px solid rgba(223, 226, 230, 1)
    font-size 0.14rem
      font-weight 400
    .questions
      background url('../assets/img/quession_img_q@2x.png') no-repeat left
      background-size 0.16rem 0.16rem
      padding-left 0.2rem
      color #08101A
    .answers
      background url('../assets/img/quession_img_a@2x.png') no-repeat left 0.03rem
      background-size 0.16rem 0.16rem
      padding-left 0.2rem
      margin-top 0.08rem
      color #9FA6AE
  .tel_btn
    display block
    width 3.43rem
    margin 0.16rem
    height 0.44rem
    line-height 0.44rem
    text-align center
    background #2782F4
    border-radius 0.22rem
    font-size 0.15rem
    font-weight 500
    color #FFFFFF
</style>