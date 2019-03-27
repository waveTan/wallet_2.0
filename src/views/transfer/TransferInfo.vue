<template>
  <div class="transfer_info bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <p class="bread  clicks font14"><i class="el-icon-arrow-left"></i>钱包</p>
        <h3 class="title">00202c4576a2126b5e96963a391a342d8f1430a088122cbb7f6164a844becc1b5561<i
                class="iconfont icon-fuzhi clicks"></i></h3>
      </div>
    </div>

    <div class="card_long mt_20 w1200">
      <h5 class="card-title font18">基础信息</h5>
      <ul>
        <li>时间 <label>2019-03-27 14:00:20</label></li>
        <li>金额 <label>12345678.12345678<span class="fCN">NULS</span></label></li>
        <li>高度 <label class="click"><u class="td">888888</u></label></li>
        <li>余额 <label>12345678.12345678<span class="fCN">NULS</span></label></li>
        <li>类型 <label>转账交易</label></li>
        <li>手续费 <label>0.01<span class="fCN">NULS</span></label></li>
        <li>状态 <label>已确认</label></li>
        <li>备注 <label>转账交易测试开始</label></li>
        <p class="cb"></p>
      </ul>
    </div>
    <div class="cb"></div>

    <div class="card w1200">
      <div class="card-info left fl">
        <h5 class="card-title font18">Input</h5>
        <ul>
          <li><font class="click td">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</font><label>123456.123456<span
                  class="fCN">NULS</span></label></li>
          <li><font class="click td">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</font><label>123456.123456<span
                  class="fCN">NULS</span></label></li>
          <li><font class="click td">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</font><label>123456.123456<span
                  class="fCN">NULS</span></label></li>
          <li><font class="click td">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</font><label>123456.123456<span
                  class="fCN">NULS</span></label></li>
        </ul>
      </div>
      <div class="card-info right fr">
        <h5 class="card-title font18">Output</h5>
        <ul>
          <li><font class="click td">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</font><label>123456.123456<span
                  class="fCN">NULS</span></label></li>
          <li><font class="click td">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</font><label>123456.123456<span
                  class="fCN">NULS</span></label></li>
          <li><font class="click td">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</font><label>123456.123456<span
                  class="fCN">NULS</span></label></li>
          <li><font class="click td">TTaqFxuD1xc6gpixUiMVQsjMZ5fdYJ2o</font><label>123456.123456<span
                  class="fCN">NULS</span></label></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "transfer-info"
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .transfer_info {
    .title {
      text-align: left;
    }
    .card {
      margin: 40px auto 0;
      height: 200px;
      .left, .right {
        width: 590px;
        ul {
          li {
            border: 0;
            line-height: 30px;
            height: 30px;
          }
        }
      }
    }

  }

</style>
