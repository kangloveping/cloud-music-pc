<template>
  <div class="search">
    <Header></Header>
    <div class="container">
      <div class="input">
        <input type="text" v-model="query" @keyup.enter="searchMusic" />
        <el-button type="primary" class="btn-search" @click="searchMusic">
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <div class="head">
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
            <tr v-for="item in songs">
              <td class="w1">
                <div>
                  <i class="el-icon-video-play btn-play" @click="playMusic(item.id)"></i>
                </div>
              </td>
              <td class="w2">
                <a href="#/song" class="song" @click="sendMusicId(item.id)">{{item.name}}</a>
                <a href="#/mv" class="mv" @click="sendMvId(item.mvid)" v-show="item.mvid"></a>
              </td>
              <td class="w3">
                <span class="time"></span>
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
                <a href="#/singer" v-for="items in item.artists">
                  <span @click="sendSingerId(items.id)">{{items.name+' '}}</span>
                </a>
              </td>
              <td class="w5">
                <a href="#/album" @click="sendAlbumId(item.album.id)">
                  <span>《{{item.album.name}}》</span>
                </a>
              </td>
              <td class="w6">
                <span
                  v-text="'0'+parseInt((item.duration % (1000 * 60 * 60)) / (1000 * 60))+':'+(parseInt((item.duration % (1000 * 60)) / 1000)<10? ('0'+parseInt((item.duration % (1000 * 60)) / 1000)) :parseInt((item.duration % (1000 * 60)) / 1000) )"
                ></span>
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
            <a href>{{item.artist.name}}</a>
          </li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
    <div class="audio">
      <audio v-show="audioIsShow" :src="musicUrl" controls loop autoplay></audio>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      key: "",
      songs: [],
      query: "",
      singerId: "",
      album: [],
      status: 0,
      isShow1: true,
      isShow2: false,
      musicUrl: "",
      audioIsShow: false,
      headList: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌词",
        "歌单",
        "主播电台",
        "用户"
      ]
    };
  },
  watch: {
    key: "getSearch",
    status: "changeTab"

    // singerId
  },
  mounted() {
    this.getKey();
    this.getSearch();
    this.searchMusic();
    this.changeTab();
  },
  methods: {
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
    playMusic(musicid) {
      // console.log('musicid')
      this.audioIsShow = true;
      this.$http.get("/song/url?id=" + musicid).then(
        res => {
          this.musicUrl = res.data.data[0].url;
          // console.log(this.musicUrl);
        },
        err => {}
      );
    },
    active(index) {
      this.status = index;
    },
    getKey() {
      this.key = localStorage.getItem("key");
    },
    getSearch() {
      this.$http.get("/search?keywords=" + this.key).then(
        res => {
          this.songs = res.data.result.songs;
          this.singerId = res.data.result.songs[0].artists[0].id;
          // console.log(this.songs);
        },
        err => {}
      );
    },
    searchMusic() {
      this.key = this.query;
      this.isShow1 = true;
      this.isShow2 = false;
      this.status = 0;
      // localStorage.setItem("key", this.query);
      // window.location.href="http://localhost:8080/search";
    },
    changeTab() {
      switch (this.status) {
        case 2:
          this.$http.get("/artist/album?id=" + this.singerId).then(
            res => {
              this.album = res.data.hotAlbums;
              console.log(this.album);
              this.isShow1 = false;
              this.isShow2 = true;
            },
            err => {}
          );
          break;
        case 0:
          this.isShow1 = true;
          this.isShow2 = false;
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
.container {
  width: 982px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  padding: 40px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  .input {
    width: 420px;
    height: 20px;
    margin: 0 auto;
    margin-bottom: 50px;
    input {
      float: left;
      width: 370px;
      height: 40px;
      padding: 0;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #c2bbbb;
      padding: 0 20px;
      box-shadow: inset 0px 10px 7px -13px #000;
      outline: none;
    }
    .btn-search {
      width: 50px;
      height: 40px;
      padding: 0;
      background-color: #77a8db;
      i {
        font-size: 20px;
      }
    }
  }
  .head {
    width: 100%;
    height: 40px;
    li {
      display: block;
      float: left;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      padding: 0 40px;
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
        width: 113px;
      }
    }
    .active {
      box-sizing: border-box;
      background-color: #fbfbfb;
      border-top: 2px solid #d13030;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: none;
    }
  }
  .list-c {
    margin-top: 20px;
    width: 100%;
    max-height: 1250px;
    background-color: #fff;
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      table-layout: fixed;
      .w2 {
        width: 300px;
      }
      .w3 {
        width: 110px;
      }
      .w4 {
        width: 148px;
      }
      .w5 {
        width: 190px;
      }
      .w6 {
        width: 80px;
      }

      tbody {
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
          height: 40px;
          line-height: 40px;
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
          .btn-play {
            display: block;
            float: right;
            font-size: 20px;
            margin-right: 10px;
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
    margin-top: 20px;
    ul {
      margin-left: -33px;
    }
    li {
      display: block;
      float: left;
      width: 153px;
      height: 208px;
      margin-left: 33px;
      .cover {
        width: 153px;
        height: 130px;
        padding: 1px;
        background: url("https://s2.music.126.net/style/web2/img/coverall.png?58c27f9de26f7809f13540a205eae847")
          0px -845px;
        img {
          width: 128px;
          height: 128px;
        }
      }

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
          font-size: 14px;
        }
        a {
          color: #000;
        }
      }
      a {
        color: #0c73c2;
        font-size: 12px;
      }
    }
  }
  .list {
    display: none;

    .page {
      text-align: center;
      margin-top: 20px;
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
</style>>
