<template>
  <div class="topdetail">
    <div class="left">
      <div class="toplist">
        <h3>云音乐特色榜</h3>
        <ul>
          <li v-for="(item,index) in allTop" v-if="index<4" @click="changeList(item.id)">
            <div class="coverpic">
              <img :src="item.coverImgUrl" alt />
            </div>
            <div class="infos">
              <h3>{{item.name}}</h3>
              <p>{{item.updateFrequency}}</p>
            </div>
          </li>
        </ul>
        <h3 class="media">全球媒体榜</h3>
        <ul>
          <li v-for="(item,index) in allTop" v-if="index>4" @click="changeList(item.id)">
            <div class="coverpic">
              <img :src="item.coverImgUrl" alt />
            </div>
            <div class="infos">
              <h3>{{item.name}}</h3>
              <p>{{item.updateFrequency}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="wrap">
        <div class="pic">
          <img :src="detail.coverImgUrl" alt />
        </div>
        <div class="info">
          <div class="title">
            <div>
              <h3>{{detail.name}}</h3>
            </div>
          </div>
          <p>最近更新： 07月13日 （每天更新）</p>

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
              <span>({{detail.subscribedCount}})</span>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-share"></i>
              <span>({{detail.shareCount}})</span>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-download"></i>
              <span>下载</span>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-chat-line-square"></i>
              <span>({{detail.commentCount}})</span>
            </a>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="head">
          <h3>歌曲列表</h3>
          <span>100首歌</span>
          <span class="out">
            播放：
            <b>{{detail.playCount}}</b>次
          </span>
        </div>
        <div class="list-c">
          <table>
            <thead>
              <tr>
                <th class="w1">
                  <div></div>
                </th>
                <th class="w2">
                  <div>标题</div>
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
              <tr v-for="(item,index) in detail.tracks">
                <td class="w1">
                  <div>
                    <span>{{index+1}}</span>
                    <i class="el-icon-video-play btn-play" @click="playMusic(item.id)"></i>
                  </div>
                </td>
                <td class="w2">
                  <a href="/song" class="song" @click="sendMusicId(item.id)">{{item.name}}</a>
                  <a href="/mv" class="mv" v-show="item.mv" @click="sendMvId(item.mv)"></a>
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
                  <a href="#">
                    <span v-for="items in item.ar">{{items.name}}</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="c-title">
        <h3>评论</h3>
        <span>共{{detail.commentCount}}条评论</span>
      </div>
      <Comment :Ids="listId" v-if="flag"></Comment>
    </div>
    <div class="audio">
      <audio v-show="audioIsShow" :src="musicUrl" controls loop autoplay></audio>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";

export default {
  data() {
    return {
      detail: [],
      allTop: [],
      listId: "",
      musicUrl: "",
      audioIsShow: false,
      firstSongId: ""
    };
  },
  mounted() {
    this.getDetail();
    // this.getListId();
    this.allTops();
  },
  methods: {
    sendMusicId(musicid) {
      localStorage.setItem("music", musicid);
    },
    sendMvId(mvid) {
      localStorage.setItem("mvid", mvid);
    },
    playMusic(musicid) {
      this.audioIsShow = true;
          console.log(musicid);

      this.$http.get("/song/url?id=" + musicid).then(
        res => {
          this.musicUrl = res.data.data[0].url;
          // console.log(this.musicUrl);
        },
        err => {}
      );
    },
    //获取榜单详情json
    getDetail() {
      //获取通过a链接缓存在localStorage的list ID数据
      this.listId = localStorage.getItem("list");
      this.$http.get("/playlist/detail?id=" + this.listId).then(
        res => {
          this.detail = res.data.playlist;

          this.firstSongId = res.data.playlist.tracks[0].id;
          // console.log(this.firstSongId);
        },
        err => {}
      );
    },
    //获取所有榜单json
    allTops() {
      this.$http.get("/toplist/detail").then(
        res => {
          this.allTop = res.data.list;
        },
        err => {}
      );
    },
    //监听榜单的点击，切换对应的榜单id
    changeList(changeId) {
      //先销毁评论子组件，避免传值不进行改变
      this.flag = false;
      this.$http.get("/playlist/detail?id=" + changeId).then(
        res => {
          this.detail = res.data.playlist;
          //改变榜单id
          this.listId = changeId;
          //重启子组件进行传值
          this.flag = true;
        },
        err => {}
      );
    }
  },
  components: {
    Comment
  }
};
</script>

<style lang="less" scoped>
.topdetail {
  width: 982px;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  min-height: 700px;
  .left {
    width: 240px;
    height: 100%;
    border-right: 1px solid #d3d3d3;
    border-width: 0 1px;
    float: left;
    // height: 700px;
    background-color: #f9f9f9;
    .toplist {
      margin-top: 40px;
      height: 100%;
      h3 {
        font-size: 14px;
        padding: 0 10px 12px 15px;
        font-family: simsun, \5b8b\4f53;
        &.media {
          margin-top: 20px;
        }
      }
      ul {
        cursor: pointer;
        // vertical-align: middle;
        li {
          padding: 10px 0 10px 20px;
          position: relative;
          zoom: 1;
          height: 60px;
          overflow: hidden;
          &:hover {
            background-color: #e6e6e6;
          }
          .coverpic {
            width: 40px;
            height: 40px;
            background-color: #fff;
            float: left;
            img {
              width: 40px;
              height: 40px;
            }
          }
          .infos {
            float: left;
            font-size: 12px;
            margin-left: 8px;
            h3 {
              font-size: 13px;
              padding: 0;
              margin-bottom: 8px;
            }
            p {
              color: #999;
            }
          }
        }
      }
    }
  }
  .right {
    float: right;
    width: 740px;
    height: 100%;
    padding: 40px 30px 30px 40px;
    .wrap {
      width: 100%;
      height: 100%;
      background-color: #fff;
      margin-bottom: 35px;
      overflow: hidden;
      .pic {
        float: left;
        width: 156px;
        height: 156px;
        padding: 3px;
        border: 1px solid #ddd;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        float: left;
        margin-left: 30px;
        padding-top: 20px;
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
            background: url("../assets/img/icon.png") 0 -186px no-repeat;
          }
          div {
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
            font-family: simsun, \5b8b\4f53;
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
      margin: 30px 0 50px 0;
      .head {
        width: 670px;
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
          float: right;
          color: #999;
        }
      }
      .list-c {
        width: 670px;
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
                background: url("../assets/img/icon.png") 0 -18px no-repeat;
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
</style>>
