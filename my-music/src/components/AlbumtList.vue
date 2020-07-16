<template>
  <div class="list-album">
    <div class="left">
      <div class="wrap">
        <div class="pic">
          <img :src="alb.album.picUrl" alt />
        </div>
        <div class="info">
          <div class="title">
            <i></i>
            <div>
              <h3>{{alb.album.name}}</h3>
            </div>
          </div>
          <p>
            歌手：
            <a href="#" v-for="item in alb.album.artists">{{item.name}}</a>
          </p>
          <p>发行时间：2020-06-23</p>
          <p>发行公司： {{alb.album.company}}</p>

          <div class="operation">
            <a href="#" class="btn1" @click="playMusic(firstSongId)">
              <i class="el-icon-video-play"></i>
              <span>播放</span>
            </a>
            <a href="#" class="btn1">
              <i class="el-icon-plus"></i>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-folder-add"></i>
              <span>收藏</span>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-share"></i>
              <span>({{alb.album.info.commentThread.shareCount}})</span>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-download"></i>
              <span>下载</span>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-chat-line-square"></i>
              <span>({{alb.album.info.commentThread.commentCount}})</span>
            </a>
          </div>
        </div>
        <div class="intrad">
          <p class="intra" v-show="isShow">
            <b>专辑介绍：</b>
            <br />
            {{alb.album.description}}
          </p>
          <p class="intra1" v-show="!isShow">
            <b>专辑介绍：</b>
            <br />
            {{alb.album.description}}
          </p>
          <a href="javascript:void(0)" class="moreIntra" v-show="isShow" @click="isShow1">
            展开
            <i class="el-icon-arrow-down"></i>
          </a>
          <a href="javascript:void(0)" class="moreIntra1" v-show="!isShow" @click="isShow1">
            收起
            <i class="el-icon-arrow-down"></i>
          </a>
        </div>
      </div>
      <div class="list">
        <div class="head">
          <h3>包含歌曲列表</h3>
          <span>20首歌</span>
          <a href="#" class="out">
            <i class="el-icon-headset"></i>
            <span>生成外链播放器</span>
          </a>
        </div>
        <div class="list-c">
          <table>
            <thead>
              <tr>
                <th class="w1">
                  <div></div>
                </th>
                <th class="w2">
                  <div>歌曲标题</div>
                </th>
                <th class="w3">
                  <div>时长</div>
                </th>
                <th class="w4">
                  <div>歌手</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in alb.songs">
                <td class="w1">
                  <div>
                    <span>{{index+1}}</span>
                    <i class="el-icon-video-play btn-play" @click="playMusic(item.id)"></i>
                  </div>
                </td>
                <td class="w2">
                  <a href="#/song" class="song" @click="sendSongId(item.id)">{{item.name}}</a>
                  <a href="#/mv" class="mv" v-show="item.mv" @click="sendMvId(item.mv)"></a>
                </td>
                <td class="w3">
                  <span
                    class="time"
                    v-text="'0'+parseInt((item.dt % (1000 * 60 * 60)) / (1000 * 60))+':'+(parseInt((item.dt % (1000 * 60)) / 1000)<10? ('0'+parseInt((item.dt % (1000 * 60)) / 1000)) :parseInt((item.dt % (1000 * 60)) / 1000) )"
                  ></span>
                  <div class="more-menu">
                    <a href="#">
                      <i class="el-icon-plus"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-folder-add"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-share"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-download"></i>
                    </a>
                  </div>
                </td>
                <td class="w4">
                  <a href="#/singer">
                    <span v-for="items in item.ar" @click="sendSingerId(items.id)">{{items.name}}</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dol">
          <span>查看更多内容，请下载客户端</span>
          <a href="#" class="now-do">立即下载</a>
        </div>
      </div>
      <CommentAlb></CommentAlb>
    </div>
    <div class="right">
      <h3>喜欢这个专辑的人</h3>
      <div class="liker">
        <ul>
          <li>
            <a href="#">
              <img
                src="http://p1.music.126.net/hjViQJ8K5EpAn0EtKKFMQw==/109951164751942471.jpg?param=40y40"
                alt
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="http://p1.music.126.net/tbpO1fXhQkCzkDmf5Y6OiQ==/109951165133108012.jpg?param=40y40"
                alt
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="http://p1.music.126.net/L6gntQdgCqfq1hSfF8qz2Q==/1379887099423787.jpg?param=40y40"
                alt
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="http://p1.music.126.net/SrZVxzLv97yyFESHcWRNUg==/109951163268802045.jpg?param=40y40"
                alt
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="http://p1.music.126.net/x6uVjJAxtgdvhKcRavYUTQ==/109951163574547190.jpg?param=40y40"
                alt
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="http://p2.music.126.net/n1tcdHwbSInlBTnq3_lbzQ==/109951164548638785.jpg?param=40y40"
                alt
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="http://p2.music.126.net/CC93Vf1AeHBMKUHk9pJHMg==/109951165127100774.jpg?param=40y40"
                alt
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="http://p2.music.126.net/SkBLAcW89N5GmapuP1TR8A==/3265549540495909.jpg?param=40y40"
                alt
              />
            </a>
          </li>
        </ul>
      </div>
      <h3>
        Ta的其他热门专辑
        <a href="#">全部</a>
      </h3>
      <div class="relate">
        <ul>
          <li v-for="item in authAlb">
            <a href="javascript:location.reload();" @click="sendAlbumId(item.id)">
              <img :src="item.picUrl" alt />
            </a>
            <a href="javascript:location.reload();" @click="sendAlbumId(item.id)">
              <h3>{{item.name}}</h3>
            </a>
            <span>2020-07-12</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="audio">
      <transition name="fade">
        <audio v-show="audioIsShow" :src="musicUrl" controls loop autoplay></audio>
      </transition>
    </div>
  </div>
</template>

<script>
import CommentAlb from "./CommentAlb";
import bus from "../assets/event.js";
export default {
  data() {
    return {
      artId: "",
      albId: "",
      isShow: true,
      sug: [],
      alb: [],
      authAlb: [],
      collects: [],
      relatives: [],
      musicUrl: "",
      firstSongId: "",
      audioIsShow: false
    };
  },

  created() {
    this.getAlb();
    this.collect();
    this.relative();
    this.getAuthAlb();
  },
  //监听数据变化执行对应函数
  watch: {
    artId: "getAuthAlb" // 值为methods的方法名
  },
  methods: {
    sendMvId(mvid) {
      localStorage.setItem("mvid", mvid);
    },
    sendSongId(mvid) {
      localStorage.setItem("music", mvid);
    },
    sendAlbumId(albumid) {
      localStorage.setItem("alb", albumid);
    },
    sendSingerId(singerid) {
      localStorage.setItem("singer", singerid);
    },
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
    getAlb() {
      this.albId = localStorage.getItem("alb");
      this.$http.get("/album?id=" + this.albId).then(
        res => {
          this.alb = res.data;
          this.artId = res.data.songs[0].ar[0].id;
          this.firstSongId = res.data.songs[0].id;
          // console.log(this.firstSongId);
        },
        err => {}
      );
    },
    getAuthAlb() {
      if (this.artId != "") {
        this.$http.get("/artist/album?limit=5&id=" + this.artId).then(
          res => {
            this.authAlb = res.data.hotAlbums;
            // console.log(this.authAlb);
          },
          err => {}
        );
      } else {
        getAuthAlb();
      }
    },

    isShow1() {
      this.isShow = !this.isShow;
    },
    collect() {
      this.$http.get("/playlist/subscribers?limit=8&id=" + this.sugId).then(
        res => {
          this.collects = res.data.subscribers;
        },
        err => {}
      );
    },
    relative() {
      this.$http.get("/related/playlist?id=" + this.sugId).then(
        res => {
          this.relatives = res.data.playlists;
        },
        err => {}
      );
    }
  },
  components: {
    CommentAlb
  }
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  animation: bubbleup 2.5s ;
}
.fade-enter, .fade-leave-to {
  @keyframes bubbleup {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
}
body {
  background-color: #fff;
  box-sizing: border-box;
}
a:hover {
  text-decoration: underline;
}
.list-album {
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
    .wrap {
      width: 100%;
      height: 100%;
      background-color: #fff;
      margin-bottom: 50px;
      overflow: hidden;
      .pic {
        float: left;
        width: 200px;
        height: 200px;
        padding: 3px;
        border: 1px solid #ddd;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        float: right;
        width: 410px;
        p {
          font-size: 12px;
          line-height: 24px;
          a {
            color: #0c73c2;
          }
        }
        .title {
          width: 410px;
          line-height: 24px;
          // height: auto;
          margin-bottom: 12px;
          i {
            display: block;
            float: left;
            width: 54px;
            height: 24px;
            background: url("https://s2.music.126.net/style/web2/img/icon.png?913e541350023a580707df4a59791c25")
              0 -186px no-repeat;
          }
          div {
            margin-left: 64px;
            // float: left;
            h3 {
              line-height: 24px;
              font-size: 20px;
              font-weight: normal;
            }
          }
        }

        .operation {
          width: 100%;
          // height: 31px;
          margin-top: 20px;
          margin-bottom: 25px;
          a {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            padding: 0 5px;
            border-radius: 3px;
            background-color: #f2f2f2;
            box-shadow: 0 0 2px 0 #666;
            vertical-align: middle;
            i {
              color: #fff;
              font-size: 19px;
              float: left;
              height: 18px;
              margin-top: 6px;
              overflow: hidden;
            }
            span {
              margin-left: 5px;
            }
          }
          .btn1 {
            background-color: #3f8ed8;
            border: none;
            // margin-right: 1px;
            span {
              color: #fff;
            }
          }
          .btn2 {
            i {
              color: #333;
            }
            margin-left: 5px;
            color: #333;
          }
        }
      }
      .intrad {
        float: left;
        margin-top: 15px;

        .intra {
          b {
            color: #000;
          }
          color: #999;
          max-height: 140px;
          line-height: 20px;
          font-size: 12px;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
        .intra1 {
          color: #999;
          line-height: 20px;
          font-size: 12px;
          margin-top: 5px;
          overflow: hidden;
        }
        .moreIntra {
          margin-top: 5px;
          color: #0c73c2;
          font-size: 12px;
          float: right;
        }
        .moreIntra1 {
          // display: none;
          margin-top: 5px;
          color: #0c73c2;
          font-size: 12px;
          float: right;
        }
      }
    }
    .list {
      width: 640px;
      height: 100%;
      // background-color: #624216;
      margin-top: 30px;
      .head {
        width: 640px;
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
          b {
            color: #b00000;
          }
        }
        .out {
          margin-right: 15px;
          float: right;
          color: #4996d1;
          i {
            font-size: 12px;
          }
          span {
            margin-left: 5px;
          }
        }
      }
      .list-c {
        width: 640px;
        height: 100%;
        background-color: #fff;
        table {
          width: 100%;
          border: 1px solid #d3d3d3;
          border-collapse: collapse;
          border-spacing: 0;
          table-layout: fixed;
          .w2 {
            width: 330px;
          }
          .w3 {
            width: 110px;
          }
          .w4 {
            width: 128px;
          }

          thead {
            th {
              border-left: 1px solid #d3d3d3;
              background-color: #f4f4f4;
              text-align: left;
              font-weight: normal;
              color: #666;
              font-size: 12px;
              padding-left: 10px;
            }
            .w1 {
              width: 75px;
              border-left: none;
              height: 35px;
            }
          }
          tbody {
            tr:nth-child(even) {
              background-color: #f4f4f4;
            }
            tr:hover {
              .time {
                display: none;
              }
              .more-menu {
                display: block;
              }
            }
            td {
              padding-left: 10px;
              height: 30px;
              line-height: 30px;
              font-size: 12px;
              a {
                display: block;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
                color: #333;
              }
            }
            .w1 {
              span {
                display: block;
                float: left;
                color: #999;
              }
              .btn-play {
                display: block;
                float: right;
                font-size: 20px;
                margin-top: 5px;
                margin-right: 15px;
                color: #b2b2b2;
                cursor: pointer;

                &:hover {
                  color: #333;
                }
              }
            }
            .w2 {
              .song {
                display: block;
                float: left;
                max-width: 197px;
              }
              .mv {
                display: block;
                width: 22px;
                height: 20px;
                float: left;
                background: url("https://s2.music.126.net/style/web2/img/icon.png?913e541350023a580707df4a59791c25")
                  0 -18px no-repeat;
                margin-top: 7px;
                margin-left: 7px;
              }
            }
            .w3 {
              color: #777;
              .more-menu {
                display: none;
                a {
                  display: block;
                  float: left;
                  width: 24px;
                  i {
                    font-size: 15px;
                    color: #999;
                    &:hover {
                      color: #333;
                    }
                  }
                }
              }
            }
            .w4 {
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
          }
        }
      }
      .dol {
        width: 640px;
        height: 100%;
        margin-top: 30px;
        text-align: center;
        font-size: 15px;
        margin-bottom: 40px;
        .now-do {
          display: block;
          width: 120px;
          height: 30px;
          border-radius: 18px;
          line-height: 30px;
          font-size: 12px;
          background-color: #ff5a4c;
          color: #ffffff;
          text-align: center;
          position: relative;
          left: 50%;
          margin-top: 20px;
          transform: translateX(-50%);
        }
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
      a {
        float: right;
        font-weight: normal;
      }
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
        color: #666;
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