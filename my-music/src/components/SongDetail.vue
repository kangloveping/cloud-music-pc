<template>
  <div class="song-detail">
    <div class="left">
      <div class="wrap">
        <div class="pic">
          <img :src="coverUrl" alt />
        </div>
        <div class="info">
          <div class="title">
            <i></i>
            <div>
              <h3>{{musicName}}</h3>
            </div>
          </div>
          <div class="user">
            <span>歌手：</span>
            <span>
              <a href="#">{{singer}}</a>
            </span>
          </div>
          <div class="user">
            <span>所属专辑：</span>
            <span>
              <a href="#">{{album}}</a>
            </span>
          </div>
          <div class="operation">
            <a href="#" class="btn1">
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
              <span>分享</span>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-download"></i>
              <span>下载</span>
            </a>
            <a href="#" class="btn2">
              <i class="el-icon-chat-line-square"></i>
              <span>({{total}})</span>
            </a>
          </div>
          <span class="intra" v-show="isShow">
            <span>歌词：</span>
            <p v-for="item in lyric">{{item}}</p>
          </span>
          <span class="intra1" v-show="!isShow">
            <span>歌词：</span>
            <p v-for="item in lyric">{{item}}</p>
          </span>
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

      <div class="c-title">
        <h3>评论</h3>
        <span>共{{total}}条评论</span>
      </div>
      <CommentSong></CommentSong>
    </div>
    <div class="right">
      <h3>Ta的专辑</h3>
      <div class="liker">
        <ul>
          <li v-for="(item,index) in authAlbum" v-if="index<5">
            <div class="head">
              <a href="#">
                <img :src="item.picUrl" alt />
              </a>
            </div>
            <div class="infos">
              <h3>{{item.name}}</h3>
              <p>
                by
                <span>{{item.company}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <h3>相似歌曲</h3>
      <div class="relate">
        <ul>
          <li v-for="item in alikeSongs">
            <div class="inf1">
              <div class="inf">
                <a href="#">
                  <h3>{{item.name}}</h3>
                </a>
              </div>
              <div class="inf">
                <span>
                  <a href="#" v-for="items in item.artists">{{ items.name+' ' }}</a>
                </span>
              </div>
            </div>

            <div class="menu">
              <i class="el-icon-caret-right"></i>
              <i class="el-icon-plus"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CommentSong from "./CommentSong.vue";
export default {
  components: {
    CommentSong
  },
  data() {
    return {
      musicid: "",
      musicName: "",
      singer: [],
      coverUrl: "",
      album: "",
      lyric: [],
      isShow: true,
      singerId: "",
      authAlbum: [],
      alikeSongs: [],
      total:'',
    };
  },
  mounted() {
    this.getMusicId();
    this.getMusicDetail();
    this.getMusicLyrci();
    this.getAuthAlbum();
    this.getCommentCount();
  },
  watch: {
    singerId: "getAuthAlbum"
  },
  methods: {
    getMusicId() {
      this.musicid = localStorage.getItem("music");
      //   console.log(this.musicid);
      this.$http.get("/simi/song?id=" + this.musicid).then(
        res => {
          //   console.log(res.data.songs);
          this.alikeSongs = res.data.songs;
        },
        err => {}
      );
    },
    getMusicDetail() {
      this.$http.get("/song/detail?ids=" + this.musicid).then(
        res => {
          this.musicName = res.data.songs[0].name;
          this.singer = res.data.songs[0].ar[0].name;
          this.singerId = res.data.songs[0].ar[0].id;
          this.album = res.data.songs[0].al.name;
          this.coverUrl = res.data.songs[0].al.picUrl;
          //   console.log(res.data.songs[0].ar);
          //   console.log(this.singerId);
        },
        err => {}
      );
    },
    getMusicLyrci() {
      this.$http.get("/lyric?id=" + this.musicid).then(
        res => {
          //   this.lyric = res.data.lrc.lyric;
          let arr = res.data.lrc.lyric.split("\n"); //通过换行符“\n”进行切割分行, [[00:00]歌词文本,[00:21]歌词文本,...]
          for (let i = 0; i < arr.length; i++) {
            let arr_text = arr[i].split("]"); //将每一组的时间与歌词分离，通过"]"，[[00:00，歌词文本]
            let lyric_text = arr_text.pop(); //获取歌词文本，用pop方法：删除最后一个元素并输出。"歌词文本"
            this.lyric.push(lyric_text);
          }
        },
        err => {}
      );
    },
    getAuthAlbum() {
      // console.log(this.singerId)
      this.$http.get("/artist/album?id=" + this.singerId).then(
        res => {
          this.authAlbum = res.data.hotAlbums;
        },
        err => {}
      );
    },
    getCommentCount(){
        this.$http.get("/comment/music?limit=50&id=" + this.musicid).then(
          res => {
            this.total = res.data.total;
          },
          err => {}
        );
    },
    isShow1() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style lang="less" scoped>
.song-detail {
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
    padding: 35px 30px 40px 40px;
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
        width: 210px;
        height: 210px;
        padding: 3px;
        background: url("https://s2.music.126.net/style/web2/img/coverall.png?58c27f9de26f7809f13540a205eae847")-140px -580px;
        img {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          margin: 35px;
        }
      }
      .info {
        float: right;
        width: 410px;
        // height: 230px;
        // background-color: #624216;
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
            background: url("https://s2.music.126.net/style/web2/img/icon.png?eeee471ebb979bb12ecdbb1c98108007")
              0 -463px no-repeat;
          }
          div {
            margin-left: 64px;
            // float: left;
            h3 {
              line-height: 24px;
              font-size: 24px;
              font-weight: normal;
            }
          }
        }
        .user {
          width: 100%;
          // height: 35px;
          line-height: 20px;
          //   margin-bottom: 20px;
          a {
            margin-right: 5px;
            font-size: 12px;
            color: #0c73c2;
          }
          span {
            line-height: 20px;
            font-size: 12px;
            color: #999;
          }
        }
        .operation {
          width: 100%;
          // height: 31px;
          margin: 10px 0 35px 0;
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

        .intra {
          // display: block;
          max-height: 160px;
          line-height: 20px;
          font-size: 12px;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          p {
            line-height: 20px;
          }
        }
        .intra1 {
          // display: none;
          line-height: 20px;
          font-size: 12px;
          margin-top: 5px;
          overflow: hidden;
          p {
            line-height: 20px;
          }
        }
        .moreIntra {
          margin-top: 5px;
          color: #0c73c2;
          font-size: 12px;
          float: left;
        }
        .moreIntra1 {
          // display: none;
          margin-top: 5px;
          color: #0c73c2;
          font-size: 12px;
          float: left;
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
  .right {
    // position: relative;
    float: right;
    width: 268px;
    // zoom: 1;
    padding: 20px 30px 40px 30px;
    h3 {
      float: left;
      width: 100%;
      height: 23px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: 12px;
    }
    .liker {
      //   height: 130px;
      margin-left: -13px;
      padding-bottom: 25px;
      float: left;
      height: 100%;
      li {
        padding: 0 0 13px 13px;
        float: left;
        .head {
          float: left;
        }
        .infos {
          float: left;
          margin-left: 5px;
          h3 {
            float: none;
            border: none;
            margin: 0;
          }
          p {
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
    .relate {
      height: 325px;
      li {
        width: 100%;
        display: block;
        height: 30px;
        float: left;
        margin-bottom: 10px;
      }
      .inf1 {
        float: left;
        width: 80%;
      }
      .inf {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
          font-size: 12px;
          color: #999;

          h3 {
            overflow: hidden;
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
            width: 100%;
            border-bottom: none;
            margin-bottom: 0px;
            height: 15px;
          }
        }
        span {
          line-height: 16px;
          a {
            display: inline;
          }
        }
      }
      .menu {
        float: left;
        width: 20%;
        height: 100%;
        i {
          display: block;
          float: left;
          margin: 5px 2px;
          cursor: pointer;
          color: #a3a3a3;
        }
      }
    }
  }
}
</style>>
