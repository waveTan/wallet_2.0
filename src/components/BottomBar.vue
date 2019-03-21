<template>
  <div class="bottom">
    <div class="w1200 font14">
      <div class="left fl">
        <p class="fl">节点服务器:http://apiserver.nuls.io</p>
        <p class="fr">高度:节点131000000/主网 13112323</p>
      </div>
      <div class="right fr">
        <label>服务协议</label>
        <label>隐私政策</label>
        <label>V1.6.1</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bottom-bar"
  }
</script>

<style lang="less">
  @import "./../assets/css/style";
  .bottom {
    height: 60px;
    border-top: 1px solid @Acolor;
    position: fixed;
    line-height: 60px;
    bottom: 0;
    background-color: @Mcolour;
    width: 100%;
    @media screen and (max-width: 1000px) {
      height: 4rem;
      font-size: 0.7rem;
      line-height: 1rem;
    }
    .w1200 {
      .left {
        width: 50%;
        @media screen and (max-width: 1000px) {
          width: 100%;
          margin: 0.5rem 0 0 0.5rem;
          p {
            margin: 0;
            float: none;
            display: block;
          }
        }
      }
      .right {
        width: 40%;
        text-align: right;
        @media screen and (max-width: 1000px) {
          width: 100%;
          float: none;
        }
        label {
          padding: 0 10px;
          @media screen and (max-width: 1000px) {
            padding: 0 0.5rem;
            font-size: 0.7rem;
            line-height: 1rem;
          }
        }
      }
    }
  }
</style>
