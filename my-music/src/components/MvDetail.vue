<template>
  <div class="mv-detail">
    <div class="left">
      <div class="mv-wrap">
        <div class="title">
          <h2>
            <i></i>
            {{mvDetail.name}}
          </h2>
          <span>
            <a href="#" v-for="item in mvDetail.artists">{{item.name+' '}}</a>
          </span>
        </div>
        <div class="video">
          <video :src="mvUrl" controls="controls" autoplay="autoplay"></video>
        </div>
        <div class="menu">
          <a href="#">
            <i></i>
            <span>{{mvLike}}</span>
          </a>
          <a href="#">
            <i class="m2"></i>
            <span>{{mvDetail.subCount}}</span>
          </a>
          <a href="#">
            <i class="m3"></i>
            <span>{{mvDetail.shareCount}}</span>
          </a>
        </div>
      </div>
      <div class="c-title">
        <h3>评论</h3>
        <span>共{{mvDetail.commentCount}}条评论</span>
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
          <li v-for="item in comments">
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
        </ul>
        <el-pagination background layout="prev, pager, next" :total="1000" class="page"></el-pagination>
      </div>
    </div>
    <div class="right">
      <h3>MV简介</h3>
      <div class="introduction">
        <span>
          <p>发布时间：{{mvDetail.publishTime}}</p>
          <p>播放次数：{{mvDetail.playCount}}次</p>
        </span>
        <p>{{mvDetail.desc}}</p>
      </div>
      <h3>相关推荐</h3>
      <div class="relate">
        <ul>
          <li v-for="item in simiMv">
            <a href="javascript:location.reload();" @click="sendMvId(item.id)">
              <img :src="item.cover" alt />
            </a>
            <div class="mes">
              <a href="javascript:location.reload();" @click="sendMvId(item.id)">
                <h3>{{item.name}}</h3>
              </a>
              <p
                v-text="'0'+parseInt((item.duration % (1000 * 60 * 60)) / (1000 * 60))+':'+(parseInt((item.duration % (1000 * 60)) / 1000)<10? ('0'+parseInt((item.duration % (1000 * 60)) / 1000)) :parseInt((item.duration % (1000 * 60)) / 1000) )"
              ></p>
              <span>by</span>
              <span>
                <a href="#/singer" @click="sendSingerId(item.artistId)">{{item.artistName}}</a>
              </span>
            </div>
          </li>
        </ul>
      </div>
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
      mvUrl: "",
      mvDetail: [],
      mvLike: [],
      simiMv: [],
      comments: []
    };
  },
  created() {
    this.getMv();
    this.playMV();
  },
  methods: {
    sendMvId(mvid) {
      localStorage.setItem("mvid", mvid);
    },
    sendSingerId(singerid) {
      console.log(singerid);
      localStorage.setItem("singer", singerid);
    },
    playMV() {
      //   this.audioIsShow = true;
      this.$http.get("/mv/url?id=" + this.mvId).then(
        res => {
          this.mvUrl = res.data.data.url;
          //   console.log(this.mvUrl);
        },
        err => {}
      );
    },
    getMv() {
      // console.log(this.sugId);
      this.mvId = localStorage.getItem("mvid");

      this.$http.get("/mv/detail?mvid=" + this.mvId).then(
        res => {
          this.mvDetail = res.data.data;
          //   console.log(this.mvDetail);
        },
        err => {}
      );
      this.$http.get("/mv/detail/info?mvid=" + this.mvId).then(
        res => {
          this.mvLike = res.data.likedCount;
        },
        err => {}
      );
      this.$http.get("/simi/mv?mvid=" + this.mvId).then(
        res => {
          this.simiMv = res.data.mvs;
          //   console.log(this.simiMv);
        },
        err => {}
      );
      this.$http.get("/comment/mv?id=" + this.mvId).then(
        res => {
          this.comments = res.data.comments;
          console.log(this.comments);
        },
        err => {}
      );
    }
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
    padding: 40px 30px 40px 40px;
    border-right: 1px solid #d3d3d3;
    border-width: 0 1px;
    .mv-wrap {
      width: 100%;
      height: 443px;
      margin-bottom: 50px;
      .title {
        height: 35px;
        h2 {
          float: left;
          max-width: 100%;
          margin-top: -10px;
          margin-right: 8px;
          font-size: 24px;
          line-height: 32px;
          font-weight: normal;
          i {
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            // margin: 7px 5px auto auto;
            width: 29px;
            height: 18px;
            background: url("https://s2.music.126.net/style/web2/img/icon2.png?3c647bf2e7aadce4958c1d7ac084e9d3") -230px -480px
              no-repeat;
          }
        }
        span {
          float: left;
          margin: 4px 0 0 0;
          line-height: 17px;
          font-size: 12px;
          a {
            word-break: break-word;
            font-family: Arial, Helvetica, sans-serif;
            color: #0c73c2;
          }
        }
      }
      video {
        width: 640px;
        height: 360px;
        background-color: #2e2e2e;
      }
      .menu {
        width: 100%;
        height: 32px;
        background-color: #fff;
        margin-top: 12px;
        a {
          display: inline-block;
          min-width: 60px;
          padding: 5px 15px;
          white-space: nowrap;
          margin-right: 10px;
          font-family: Arial, Helvetica, sans-serif;
          border: 1px solid #aaa;
          background-color: #f2f2f2;
          border-radius: 3px;
          i {
            display: block;
            float: left;
            width: 17px;
            margin-top: 2px;
            margin-right: 2px;
            height: 15px;
            background: url("https://s2.music.126.net/style/web2/img/icon2.png?3c647bf2e7aadce4958c1d7ac084e9d3")-150px -19px
              no-repeat;
            &.m2 {
              background: url("https://s2.music.126.net/style/web2/img/icon2.png?3c647bf2e7aadce4958c1d7ac084e9d3")-111px -19px
                no-repeat;
            }
            &.m3 {
              background: url("https://s2.music.126.net/style/web2/img/icon2.png?3c647bf2e7aadce4958c1d7ac084e9d3")-91px -19px
                no-repeat;
            }
          }
          span {
            font-size: 12px;
            color: #333;
          }
        }
      }
    }
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
    .introduction {
      margin-bottom: 20px;
      span {
        display: block;
        margin-bottom: 10px;
        &:first-child {
          p {
            color: #999;
          }
        }
      }
      p {
        font-size: 12px;
        line-height: 20px;
      }
    }
    .relate {
      height: 325px;
      li {
        height: 54px;
        margin-bottom: 10px;
        img {
          width: 96px;
          height: 54px;
        }
        .mes {
          width: 110px;
          height: 54px;
          float: left;

          p {
            font-size: 12px;
            margin-left: 10px;
            color: #999;
          }
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
          width: 110px;
          border-bottom: none;
          color: #666;
          margin-bottom: 0px;
        }
      }
      span {
        display: block;
        float: left;
        font-size: 12px;
        margin-left: 10px;
        color: #999;
        &:last-child {
        }
        a {
          display: block;
          width: 80px;
          margin-left: -5px;
          color: #999;
          // display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
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