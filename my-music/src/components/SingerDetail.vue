<template>
  <div class="mv-detail">
    <div class="left">
      <div class="c-title">
        <h3>歌曲列表</h3>
        <span>共2313455条评论</span>
      </div>
      <div class="comment">
        <div class="intarea">
          <div class="head">
            <img
              src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
              alt
            />
          </div>
          <div class="inputs">
            <div class="input">
              <textarea class="area" placeholder="评论"></textarea>
              <div class="btn">
                <a href="#">评论</a>
                <span>140</span>
              </div>
            </div>
          </div>
        </div>
        <h5>最新评论</h5>
        <ul>
          <li v-for="item in sug1">
            <div class="head">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="warp">
              <div class="com">
                <span>
                  <a href="#">{{item.user.nickname}}</a>
                </span>
                <span>：{{item.content}}</span>
              </div>
              <div class="time">
                <span>48分钟前</span>
                <a class="answer" href="#">回复</a>
              </div>
            </div>
          </li>
          <li v-for="item in sug2">
            <div class="head">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="warp">
              <div class="com">
                <span>
                  <a href="#">{{item.user.nickname}}</a>
                </span>
                <span>： {{item.content}}</span>
              </div>
              <div class="time">
                <span>48分钟前</span>
                <a class="answer" href="#">回复</a>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination background layout="prev, pager, next" :total="1000" class="page"></el-pagination>
      </div>
    </div>
    <div class="right">
      <h3>MV简介</h3>
      <div class="liker">
        <ul>
          <li>
            <a href="#">
              <img src alt />
            </a>
          </li>
        </ul>
      </div>
      <h3>相关推荐</h3>
      <div class="relate">
        <ul>
          <li>
            <a href="#">
              <img src alt />
            </a>
            <a href="#">
              <h3>{{}}</h3>
            </a>
            <span>by</span>
            <span>
              <a href="#">{{}}</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="audio">
      <audio v-show="audioIsShow" :src="musicUrl" controls loop autoplay></audio>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";
import bus from "../assets/event.js";
export default {
  data() {
    return {
      mvId: "",
      isShow: true,
      musicUrl: "",
      audioIsShow: false,
      sugIds: "",
      sug1: [],
      sug2: []
    };
  },
  mounted() {
    this.getSug();
  },
  methods: {
    playMusic(musicid) {
      this.audioIsShow = true;
      this.$http.get("/song/url?id=" + musicid).then(
        res => {
          this.musicUrl = res.data.data[0].url;
          // console.log(this.musicUrl);
        },
        err => {}
      );
    },
    getMv() {
      this.mvId = localStorage.getItem("mvid");
      // console.log(this.sugId);
      this.$http.get("/playlist/detail?id=" + this.sugId).then(
        res => {
          this.sug = res.data;
          console.log(this.sug);
        },
        err => {}
      );
    },
    isShow1() {
      this.isShow = !this.isShow;
    },
    collect() {
      // console.log(this.sugId);
      this.$http.get("/playlist/subscribers?limit=8&id=" + this.sugId).then(
        res => {
          this.collects = res.data.subscribers;
        },
        err => {}
      );
    }
    // relative() {
    //   this.$http.get("/related/playlist?id=" + this.sugId).then(
    //     res => {
    //       this.relatives = res.data.playlists;
    //     },
    //     err => {}
    //   );
    // }
  },
  components: {
    Comment
  }
};
</script>

<style lang="less" scoped>
a:hover {
  text-decoration: underline;
}
.mv-detail {
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  overflow: hidden;
  .left {
    float: left;
    width: 710px;
    height: 100%;
    padding: 50px 30px 40px 40px;
    border-right: 1px solid #d3d3d3;
    border-width: 0 1px;
    .c-title {
      width: 100%;
      height: 35px;
      border-bottom: 2px solid #c20c0c;
      line-height: 25px;
      h3 {
        float: left;
        font-weight: normal;
      }
      span {
        margin-left: 20px;
        font-size: 12px;
      }
    }
    .comment {
      width: 100%;

      .intarea {
        width: 100%;
        height: 98px;
        margin-top: 20px;
        position: relative;
        .head {
          position: absolute;
          left: 0;
          width: 50px;
          img {
            width: 50px;
            height: 50px;
          }
        }
        .inputs {
          float: left;
          width: 100%;
          .input {
            margin-left: 60px;
            .area {
              outline: none;
              padding: 2px 5px;
              height: 63px;
              display: block;
              width: 100%;
              // margin-left: 10px;
              resize: none;
            }
            .btn {
              span {
                font-size: 12px;
                line-height: 35px;
                color: #666;
                float: right;
              }
              a {
                display: block;
                float: right;
                width: 46px;
                height: 25px;
                font-size: 12px;
                text-align: center;
                line-height: 25px;
                border-radius: 3px;
                color: #fff;
                margin-top: 5px;
                margin-left: 10px;
                background-color: #2c7cc9;
                &:hover {
                  background-color: #4794dc;
                }
              }
            }
          }
        }
      }
      h5 {
        border-bottom: 1px solid #d3d3d3;
        padding-bottom: 5px;
      }
      ul {
        li {
          padding: 15px 0;
          border-top: 1px dotted #ccc;
          &:first-child {
            border-top: none;
          }
          .head {
            float: left;
            width: 50px;
            height: 50px;
            img {
              width: 50px;
              height: 50px;
            }
          }
          .warp {
            font-size: 12px;
            margin-left: 60px;
            .com {
              width: 100%;
              overflow: hidden;
              line-height: 20px;
              span {
                line-height: 20px;
                a {
                  margin-right: 5px;
                  color: #0c73c2;
                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
            .time {
              margin-top: 15px;
              text-align: right;
              color: #999;
              span {
                float: left;
                margin: 0 !important;
              }
            }
            a {
              color: #666;
            }
          }
        }
      }
      .page {
        text-align: center;
        margin-top: 20px;
      }
    }
  }
  .right {
    // position: relative;
    float: right;
    width: 268px;
    // zoom: 1;
    padding: 20px 30px 40px 30px;
    h3 {
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: 12px;
    }
    .liker {
      height: 130px;
      margin-left: -13px;
      padding-bottom: 25px;
      li {
        padding: 0 0 13px 13px;
        float: left;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    .relate {
      height: 325px;
      li {
        height: 50px;
        margin-bottom: 10px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      a {
        display: block;
        float: left;
        h3 {
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
          width: 145px;
          border-bottom: none;
          margin-bottom: 0px;
        }
      }
      span {
        display: block;
        float: left;
        font-size: 12px;
        margin-left: 10px;
        a {
          margin-left: -5px;
          color: #666;
        }
      }
    }
  }
  .audio {
    width: 982px;
    height: 40px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    z-index: 999999;
    audio {
      width: 100%;
      height: 40px;
      // background-color: #666;
      outline: none;
      border: 1px solid #dddddd;
      border-radius: 20px;
    }
  }
}
</style>