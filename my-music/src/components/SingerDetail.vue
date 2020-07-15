<template>
  <div class="mv-detail">
    <div class="left">
      <div class="warp">
        <h2>{{singerDetail.name}}</h2>
        <img :src="singerDetail.picUrl+'?param=640y300'" alt />
      </div>
      <div class="headr">
        <ul>
          <li
            :class="[index == status? 'active':'']"
            v-for="(item,index) in headList"
            :key="index"
            @click="active(index)"
          >{{item}}</li>
        </ul>
      </div>
      <div class="list-c" v-show="isShow1">
        <table>
          <tbody>
            <tr v-for="(item,index) in songs">
              <td class="w1">
                <span>{{index+1}}</span>
                <i class="el-icon-video-play btn-play" @click="playMusic(item.id)"></i>
              </td>
              <td class="w2">
                <a href="#/song" class="song" @click="sendMusicId(item.id)">{{item.name}}</a>
                <a href="#/mv" class="mv" @click="sendMvId(item.mv)" v-show="item.mv"></a>
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
              <td class="w5">
                <a href="#/album" @click="sendAlbumId(item.al.id)">
                  <span>{{item.al.name}}</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="album" v-show="isShow2">
        <ul>
          <li v-for="item in album">
            <div class="cover">
              <a href="#/album" @click="sendAlbumId(item.id)">
                <img :src="item.picUrl" alt />
              </a>
            </div>

            <p>
              <a href="#/album" @click="sendAlbumId(item.id)">{{item.name}}</a>
            </p>
            <p>{{item.company}}</p>
          </li>
        </ul>
      </div>
      <div class="mv" v-show="isShow3">
        <ul>
          <li v-for="item in mvDetail">
            <div class="cover">
              <a href="#/mv" @click="sendMvId(item.id)">
                <img :src="item.imgurl" alt />
              </a>
            </div>
            <p>
              <a href="#/mv" @click="sendMvId(item.id)">{{item.name}}</a>
            </p>
          </li>
        </ul>
      </div>
      <div class="inroduction" v-show="isShow4">
        <span>
          <h4>{{singerDetail.name}}简介：</h4>
          <p>{{introduction.briefDesc}}</p>
        </span>
        <span v-for="item in introduction.introduction">
          <h4>{{item.ti}}：</h4>
          <p>{{item.txt}}</p>
        </span>
      </div>
    </div>
    <div class="right">
      <h3>热门歌手</h3>
      <div class="liker">
        <ul>
          <li v-for="item in hotSinger">
            <a href="javascript:location.reload();" @click="sendSingerId(item.id)">
              <img :src="item.picUrl" alt />
            </a>
            <a href="javascript:location.reload();" @click="sendSingerId(item.id)">{{item.name}}</a>
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
export default {
  data() {
    return {
      isShow: true,
      musicUrl: "",
      audioIsShow: false,
      status: 0,
      isShow1: true,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      headList: ["热门作品", "所有专辑", "相关MV", "艺人介绍"],
      songs: [],
      singerId: "",
      singerDetail: [],
      mvDetail: [],
      introduction: [],
      hotSinger: []
    };
  },
  watch: {
    status: "changeTab"
  },
  mounted() {
    this.getSinger();
    this.changeTab();
    this.getHotSinger();
  },
  methods: {
    active(index) {
      this.status = index;
    },
    sendMvId(mvid) {
      localStorage.setItem("mvid", mvid);
    },
    sendMusicId(musicid) {
      localStorage.setItem("music", musicid);
    },
    sendAlbumId(albumid) {
      localStorage.setItem("alb", albumid);
    },
    sendSingerId(singerid) {
      localStorage.setItem("singer", singerid);
    },
    getSinger() {
      this.singerId = localStorage.getItem("singer");
      this.$http.get("/artists?id=" + this.singerId).then(
        res => {
          this.songs = res.data.hotSongs;
          this.singerDetail = res.data.artist;
          // console.log(this.songs);
        },
        err => {}
      );
    },
    getHotSinger() {
      // console.log(this.singerId);
      this.$http.get("/top/artists?offset=0&limit=30").then(
        res => {
          this.hotSinger = res.data.artists;
          // console.log(this.hotSinger);
        },
        err => {}
      );
    },
    playMusic(musicid) {
          // console.log(musicid);

      this.audioIsShow = true;
      this.$http.get("/song/url?id=" + musicid).then(
        res => {
          this.musicUrl = res.data.data[0].url;
          // console.log(this.musicUrl);
        },
        err => {}
      );
    },

    isShow1() {
      this.isShow = !this.isShow;
    },
    changeTab() {
      switch (this.status) {
        case 3:
          this.$http.get("/artist/desc?id=" + this.singerId).then(
            res => {
              this.introduction = res.data;
              console.log(this.introduction);
              this.isShow1 = false;
              this.isShow2 = false;
              this.isShow3 = false;
              this.isShow4 = true;
            },
            err => {}
          );
          break;
        case 2:
          this.$http.get("/artist/mv?id=" + this.singerId).then(
            res => {
              this.mvDetail = res.data.mvs;
              // console.log(this.mvDetail);
              this.isShow1 = false;
              this.isShow2 = false;
              this.isShow3 = true;
              this.isShow4 = false;
            },
            err => {}
          );
          break;
        case 1:
          this.$http.get("/artist/album?id=" + this.singerId).then(
            res => {
              this.album = res.data.hotAlbums;
              // console.log(this.album);
              this.isShow1 = false;
              this.isShow2 = true;
              this.isShow3 = false;
              this.isShow4 = false;
            },
            err => {}
          );
          break;
        case 0:
          this.isShow1 = true;
          this.isShow2 = false;
          this.isShow3 = false;
          this.isShow4 = false;
          break;
        default:
          break;
      }
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
    min-height: 1050px;
    padding: 25px 30px 40px 40px;
    border-right: 1px solid #d3d3d3;
    border-width: 0 1px;
    .warp {
      width: 100%;
      height: 333px;
      h2 {
        font-weight: normal;
      }
      img {
        height: 299px;
        margin-top: 6px;
        border: 1px solid #999;
      }
    }
    .headr {
      width: 100%;
      margin-top: 4px;
      li {
        display: block;
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding: 0 52px;
        background-color: #f7f7f7;
        border-top: 2px solid #ccc;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        &:hover {
          border-top: 2px solid #d13030;
        }
        &:first-child {
          border-left: 1px solid #ccc;
        }
        &:last-child {
          border-right: 1px solid #ccc;
        }
      }
      .active {
        box-sizing: border-box;
        background-color: #fbfbfb;
        border-top: 2px solid #d13030;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: none;
        padding: 0 51px;
      }
    }
    .list-c {
      margin-top: 20px;
      width: 100%;
      height: 100%;
      // max-height: 1250px;
      background-color: #fff;
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;

        tbody {
          .w1 {
            width: 90px;
          }
          .w2 {
            width: 300px;
          }
          .w3 {
            width: 105px;
          }

          .w5 {
            width: 130px;
          }

          tr:nth-child(even) {
            background-color: #f4f4f4;
          }
          tr:hover {
            background-color: #d9d8d8;
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
              // display: block;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
              color: #333;
            }
          }
          .w1 {
            span {
              float: left;
            }
            .btn-play {
              display: block;
              float: right;
              margin-top: 5px;
              font-size: 20px;
              margin-right: 10px;
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
              background: url("https://s2.music.126.net/style/web2/img/table.png?699a66dbc82671fe3ded28aa660fa962")
                0 -150px no-repeat;
              margin-top: 10px;
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
            a {
              color: #0c73c2;
            }
          }
          .w5 {
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
        }
      }
    }
    .album {
      margin-top: 60px;
      ul {
        margin-left: -18px;
      }
      li {
        display: block;
        float: left;
        width: 145px;
        height: 208px;
        margin-left: 18px;
        .cover {
          width: 145px;
          height: 120px;
          padding: 1px;
          background: url("https://s2.music.126.net/style/web2/img/coverall.png?58c27f9de26f7809f13540a205eae847") -168px -845px;
          img {
            width: 120px;
            height: 120px;
          }
        }

        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #999;
          a {
            font-size: 14px;
            color: #000;
          }
        }
        a {
        }
      }
    }
    .mv {
      margin-top: 60px;
      ul {
        margin-left: -29px;
      }
      li {
        display: block;
        float: left;
        width: 137px;
        height: 140px;
        margin-left: 29px;
        margin-bottom: 20px;
        img {
          width: 137px;
          height: 103px;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            font-size: 14px;
            color: #000;
          }
        }
      }
    }
    .inroduction {
      margin-top: 80px;
      h4 {
        color: #333;
        font-size: 14px;
        margin: 28px 0 8px 0;
      }

      p {
        font-size: 12px;
        line-height: 25px;
        color: #666;
        text-indent: 2em;
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
      padding-bottom: 25px;
      margin-left: -27px;

      li {
        float: left;
        margin-left: 27px;
        margin-bottom: 15px;
        width: 50px;
        a {
          display: block;
          font-size: 12px;
          color: #000;
          text-align: center;
          margin-bottom: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          width: 50px;
          height: 50px;
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