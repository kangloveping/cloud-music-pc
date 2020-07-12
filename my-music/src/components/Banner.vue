<template>
  <div>
    <div class="banner">
      <div class="ban-left">
        <div class="block">
          <el-carousel height="285px">
            <!-- 利用v-if+index实现控制item的个数 -->
            <el-carousel-item v-for="(item, index) in banPic" :key="index" v-if="index<8">
              <a href="#">
                <img :src="item.pic" alt />
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="download" @click="sendMsg">
        <a href="#"></a>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../assets/event.js";
export default {
  data() {
    return {
      banPic: []
    };
  },
  //钩子函数，相当于jquery里的ready函数，当文档加载完时自动执行
  mounted() {
    this.lunBo();
  },
  methods: {
    lunBo() {
      this.$http.get("/banner?type=1").then(
        res => {
          this.banPic = res.data.banners;
          console.log(this.banPic);
        },
        err => {}
      );
    }
  }
};
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
// .warp {
//   width: 100%;
//   height: 285px;
//   background-color: #000;
//   background: no-repeat;
//   background-size: 30000px;
//   background-position: center center;
//   z-index: -9999;
//   position: absolute;
//   left: 0;
//   top: 0;
// }

.banner {
  width: 980px;
  height: 285px;
  margin: 0 auto;

  .ban-left {
    width: 720px;
    float: left;
    .block {
      height: 285px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .download {
    float: left;
    // font-family: serif;
    width: 260px;
    height: 285px;
    background-color: #fff;
    background: url("https://s2.music.126.net/style/web2/img/index/download.png?c18bed3ab9dde516fd9d73915fc2f394")
      no-repeat;
    background-size: 260px;
    a {
      display: block;
      width: 215px;
      height: 56px;
      margin: 186px 0 0 19px;
    }
    p {
      margin: 12px auto;
      text-align: center;
      color: #9d9d9d;
      font-size: 12px;
    }
  }
}
</style>>

