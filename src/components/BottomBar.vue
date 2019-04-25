<template>
  <div class="bottom">
    <div class="w1200 font14">
      <div class="left fl">
        <p class="fl">节点服务器: <u class="clicks" @click="toUrl('nodeService')">{{serviceUrls}}</u></p>
        <!--<p class="fr">高度:节点131000000/主网 {{heightInfo.height}}</p>-->
        <p class="fr">主网高度: {{heightInfo.height}}</p>
      </div>
      <div class="right fr">
        <label class="clicks">服务协议</label>
        <label class="clicks">隐私政策</label>
        <label>V1.6.1</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bottom-bar",
    data() {
      return {
        heightInfo: [],//最新高度
        serviceUrls: localStorage.hasOwnProperty("urls") ? JSON.parse(localStorage.getItem("urls")).urls : 'http://192.168.1.192:18003/'
      }
    },
    created() {
      this.getBestBlockHeader();
      this.serviceUrls = localStorage.hasOwnProperty("urls") ? JSON.parse(localStorage.getItem("urls")).urls : 'http://192.168.1.192:18003/';
      setInterval(() => {
        this.serviceUrls = localStorage.hasOwnProperty("urls") ? JSON.parse(localStorage.getItem("urls")).urls : 'http://192.168.1.192:18003/';
      }, 500);
    },
    mounted() {
      setInterval(() => {
        this.getBestBlockHeader();
      }, 10000);
    },
    watch: {
      serviceUrls(val, old) {
        if (val) {
          if (val !== old && old) {
            this.getBestBlockHeader();
          }
        }
      }
    },
    methods: {

      /**
       * 获取最新高度
       */
      getBestBlockHeader() {
        this.$post('/', 'getBestBlockHeader', [])
          .then((response) => {
            //console.log(response)
            if (response.hasOwnProperty("result")) {
              this.heightInfo = response.result;
            }
          })
          .catch((error) => {
            console.log("getBestBlockHeader:" + error)
          })
      },

      /**
       * 连接跳转
       * @param name
       */
      toUrl(name) {
        //console.log(name)
        this.$router.push({
          name: name
        })
      },
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .bottom {
    height: 60px;
    border-top: 1px solid @Dcolour;
    position: fixed;
    line-height: 60px;
    bottom: 0;
    background-color: @Bcolour;
    width: 100%;
    @media screen and (max-width: 1000px) {
      height: 4rem;
      font-size: 0.7rem;
      line-height: 1rem;
    }
    .w1200 {
      .left {
        width: 50%;
        line-height: 60px;
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
        line-height: 60px;
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
