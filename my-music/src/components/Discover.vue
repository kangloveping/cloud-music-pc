<template>
  <div class="discover">
    <div class="left">
      <div class="left-hot">
        <div class="label">
          <div class="hot1">
            <i class="el-icon-cloudy"></i>
            <a href="javascript:void(0)">热门推荐</a>
          </div>
          <div class="hot2">
            <a href="javascript:void(0)">华语</a>
            <span>|</span>
            <a href="javascript:void(0)">流行</a>
            <span>|</span>
            <a href="javascript:void(0)">摇滚</a>
            <span>|</span>
            <a href="javascript:void(0)">民谣</a>
            <span>|</span>
            <a href="javascript:void(0)">电子</a>
            <span>|</span>
          </div>
          <span class="more">
            <a href="javascript:void(0)">更多</a>
            <i class="el-icon-right"></i>
          </span>
        </div>
        <div class="suggest">
          <ul>
            <li v-for="item in suggest">
              <div class="s-info">
                <a href="/list">
                  <img :src=" item.picUrl " @click="sendSug(item.id)" alt />
                </a>
                <div class="bottom">
                  <span class="el-icon-headset"></span>
                  <span class="paly-count">{{ item.playCount}}</span>
                  <a href="#" class="el-icon-video-play"></a>
                </div>
              </div>
              <p @click="sendSug(item.id)">
                <a href="/list">{{item.name}}</a>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="new">
        <div class="label">
          <div class="hot1">
            <i class="el-icon-cloudy"></i>
            <a href="javascript:void(0)">新碟上架</a>
          </div>
          <span class="more">
            <a href="javascript:void(0)">更多</a>
            <i class="el-icon-right"></i>
          </span>
        </div>
        <div class="disc">
          <ul>
            <li v-for="item in newDisc">
              <a href="/album" @click="sendAlb(item.id)">
                <img :src="item.picUrl" alt />
              </a>
              <p>
                <a href="/album" @click="sendAlb(item.id)">{{item.name}}</a>
              </p>
              <p class="disc-singer">
                <a href="#" @click="sendSingerId(item.artist.id)">{{item.artist.name}}</a>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="top">
        <div class="label">
          <div class="hot1">
            <i class="el-icon-cloudy"></i>
            <a href="javascript:void(0)">榜单</a>
          </div>
          <span class="more">
            <a href="javascript:void(0)">更多</a>
            <i class="el-icon-right"></i>
          </span>
        </div>
        <div class="top-list">
          <dl>
            <dt>
              <div class="top-pic">
                <a href="/top">
                  <img
                    @click="sendListIb('19723756')"
                    src="https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg"
                    alt
                  />
                </a>
              </div>
              <div class="top-title">
                <a href="/top" @click="sendListIb('19723756')">
                  <h3>云音乐飙升榜</h3>
                </a>
                <div>
                  <a href="#">
                    <i class="el-icon-video-play"></i>
                  </a>
                  <a href="#">
                    <i class="el-icon-folder-add"></i>
                  </a>
                </div>
              </div>
            </dt>
            <dd>
              <ul>
                <!-- 若要用数组中数组，需双层嵌套v-for -->
                <li v-for="(items,index) in top1s " :key="index" v-if="index < 10">
                  <span>{{index+1}}</span>
                  <a href="/song" @click="sendMusicIb(items.id)">{{items.name}}</a>
                  <div class="oper">
                    <a href="#">
                      <i class="el-icon-video-play"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-circle-plus-outline"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-folder-add"></i>
                    </a>
                  </div>
                </li>
              </ul>
              <div class="all">
                <a href="#" @click="sendListIb('19723756')">查看全部></a>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>
              <div class="top-pic">
                <a href="/top">
                  <img
                    @click="sendListIb('3779629')"
                    src="https://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg"
                    alt
                  />
                </a>
              </div>
              <div class="top-title">
                <a href="/top">
                  <h3 @click="sendListIb('3779629')">云音乐新歌榜</h3>
                </a>
                <div>
                  <a href="#">
                    <i class="el-icon-video-play"></i>
                  </a>
                  <a href="#">
                    <i class="el-icon-folder-add"></i>
                  </a>
                </div>
              </div>
            </dt>
            <dd>
              <ul>
                <!-- 若要用数组中数组，需双层嵌套v-for -->
                <li v-for="(items,index) in top2s " :key="index" v-if="index < 10">
                  <span>{{index+1}}</span>
                  <a href="/song">{{items.name}}</a>
                  <div class="oper">
                    <a href="#">
                      <i class="el-icon-video-play"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-circle-plus-outline"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-folder-add"></i>
                    </a>
                  </div>
                </li>
              </ul>
              <div class="all">
                <a href="#" @click="sendListIb('3779629')">查看全部></a>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>
              <div class="top-pic">
                <a href="/top">
                  <img
                    @click="sendListIb('2884035')"
                    src="https://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg"
                    alt
                  />
                </a>
              </div>
              <div class="top-title">
                <a href="/top">
                  <h3 @click="sendListIb('2884035')">网易原创歌曲榜</h3>
                </a>
                <div>
                  <a href="#">
                    <i class="el-icon-video-play"></i>
                  </a>
                  <a href="#">
                    <i class="el-icon-folder-add"></i>
                  </a>
                </div>
              </div>
            </dt>
            <dd>
              <ul>
                <!-- 若要用数组中数组，需双层嵌套v-for -->
                <li v-for="(items,index) in top3s " :key="index" v-if="index < 10">
                  <span>{{index+1}}</span>
                  <a href="/song">{{items.name}}</a>
                  <div class="oper">
                    <a href="#">
                      <i class="el-icon-video-play"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-circle-plus-outline"></i>
                    </a>
                    <a href="#">
                      <i class="el-icon-folder-add"></i>
                    </a>
                  </div>
                </li>
              </ul>
              <div class="all">
                <a href="#" @click="sendListIb('2884035')">查看全部></a>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="login">
        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
        <a href="javascript:void(0)">用户登录</a>
      </div>
      <div class="singer">
        <h3>
          入驻歌手
          <a href="#">查看全部></a>
        </h3>
        <ul>
          <li>
            <a href="#">
              <div class="head">
                <img
                  src="http://p1.music.126.net/p9U80ex1B1ciPFa125xV5A==/5931865232210340.jpg?param=62y62"
                  alt
                />
              </div>
              <div class="info">
                <h4>张惠妹aMEI</h4>
                <p>台湾歌手张惠妹</p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="head">
                <img
                  src="http://p2.music.126.net/1EN_iqQWU_E3DafzEOh3cA==/3302932937408956.jpg?param=62y62"
                  alt
                />
              </div>
              <div class="info">
                <h4>Fine乐团</h4>
                <p>独立音乐人</p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="head">
                <img
                  src="http://p2.music.126.net/ZuktZvjcxpYBjcWC3gmbPg==/19027048718765608.jpg?param=62y62"
                  alt
                />
              </div>
              <div class="info">
                <h4>萬曉利</h4>
                <p>民谣歌手、中国现代民谣的代表人物之一</p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="head">
                <img
                  src="http://p2.music.126.net/v_zYgE9kmAwVGWV2c8hFxA==/7943971513291094.jpg?param=62y62"
                  alt
                />
              </div>
              <div class="info">
                <h4>音乐人赵雷</h4>
                <p>民谣歌手</p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="head">
                <img
                  src="http://p2.music.126.net/6wPGl_ddgAbJTx5kOohcyw==/109951163892302996.jpg?param=62y62"
                  alt
                />
              </div>
              <div class="info">
                <h4>王三溥</h4>
                <p>音乐人</p>
              </div>
            </a>
          </li>
        </ul>
        <div class="apply">
          <span>
            <a href="javascript:void(0)">
              <h4>申请成为网易音乐人</h4>
            </a>
          </span>
        </div>
        <h3>热门主播</h3>
        <ul>
          <li class="dj">
            <a class="cover" href="javascript:void(0)">
              <img
                src="http://p1.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=40y40"
                alt
              />
            </a>
            <div class="dj2">
              <p>
                <a href="javascript:void(0)">陈立</a>
              </p>
              <p>心理学家、美食家陈立教授</p>
            </div>
          </li>
          <li class="dj">
            <a class="cover" href="javascript:void(0)">
              <img
                src="http://p2.music.126.net/y5-sM7tjnxnu_V9LWKgZlw==/7942872001461517.jpg?param=40y40"
                alt
              />
            </a>
            <div class="dj2">
              <p>
                <a href="javascript:void(0)">DJ艳秋</a>
              </p>
              <p>著名音乐节目主持人</p>
            </div>
          </li>
          <li class="dj">
            <a class="cover" href="javascript:void(0)">
              <img
                src="http://p2.music.126.net/6cc6lgOfQTo6ovNnTHPyJg==/3427177769086282.jpg?param=40y40"
                alt
              />
            </a>
            <div class="dj2">
              <p>
                <a href="javascript:void(0)">南京电台主持人王馨</a>
              </p>
              <p>国家大剧院古典音乐官方</p>
            </div>
          </li>
          <li class="dj">
            <a class="cover" href="javascript:void(0)">
              <img
                src="http://p2.music.126.net/xa1Uxrrn4J0pm_PJwkGYvw==/3130309604335651.jpg?param=40y40"
                alt
              />
            </a>
            <div class="dj2">
              <p>
                <a href="javascript:void(0)">谢谢收听</a>
              </p>
              <p>南京电台主持人王馨</p>
            </div>
          </li>
          <li class="dj">
            <a class="cover" href="javascript:void(0)">
              <img
                src="http://p2.music.126.net/slpd09Tf5Ju82Mv-h8MP4w==/3440371884651965.jpg?param=40y40"
                alt
              />
            </a>
            <div class="dj2">
              <p>
                <a href="javascript:void(0)">DJ晓苏</a>
              </p>
              <p>独立DJ，CRI环球旅游广播特邀DJ</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../assets/event.js";
export default {
  data() {
    return {
      suggest: [],
      newDisc: [],
      topLists: [],
      listName: [],
      top1s: [],
      top2s: [],
      top3s: []
    };
  },
  mounted() {
    this.suggestMusic();
    this.newDic();
    this.topList();
    this.top1();
    this.top2();
    this.top3();
  },
  methods: {
    suggestMusic: function() {
      this.$http.get("/personalized?limit=8").then(
        res => {
          this.suggest = res.data.result;
        },
        err => {}
      );
    },
    sendSug(sugid) {
      localStorage.setItem("sug", sugid);
    },
    sendAlb(albid) {
      localStorage.setItem("alb", albid);
    },
    sendListIb(listid) {
      localStorage.setItem("list", listid);
    },
    sendMusicIb(musicid) {
      localStorage.setItem("music", musicid);
    },
    sendSingerId(singerid) {
      localStorage.setItem("singer", singerid);
    },

    newDic() {
      this.$http.get("/top/album?limit=5").then(
        res => {
          this.newDisc = res.data.albums;
          console.log(this.newDisc);
        },
        err => {}
      );
    },
    topList() {
      this.$http.get("/toplist/detail").then(
        res => {
          this.topLists = res.data.list;
        },
        err => {}
      );
    },
    top1() {
      this.$http.get("/playlist/detail?id=19723756").then(
        res => {
          this.top1s = res.data.playlist.tracks;
          console.log(this.top1s);
        },
        err => {}
      );
    },
    top2() {
      this.$http.get("/playlist/detail?id=3779629").then(
        res => {
          this.top2s = res.data.playlist.tracks;
        },
        err => {}
      );
    },
    top3() {
      this.$http.get("/playlist/detail?id=2884035").then(
        res => {
          this.top3s = res.data.playlist.tracks;
        },
        err => {}
      );
    }
  }
};
</script>

<style lang="less" scoped>
.discover {
  width: 980px;
  height: 1376px;
  margin: 0 auto;
  background-color: #fff;
  .left {
    width: 720px;
    height: 100%;
    padding: 30px 20px;
    border-left: 1px solid #d3d3d3;
    float: left;
    overflow: hidden;
    a {
      color: #000;
    }
    a:hover {
      text-decoration: underline;
    }
    .left-hot {
      width: 680px;
      height: 523px;
      margin-bottom: 20px;
      .suggest {
        margin: 20px 0;

        ul {
          margin-left: -42px;
          li {
            float: left;
            width: 25%;
            height: 234px;
            padding-left: 42px;
            .s-info {
              position: relative;
              .bottom {
                position: absolute;
                bottom: 4px;
                left: 0px;
                width: 100%;
                height: 27px;
                color: rgb(204, 204, 204);
                background-color: rgba(0, 0, 0, 0.4);
                .paly-count {
                  font-size: 12px;
                  float: left;
                  margin: 7px 0px 0px;
                  color: rgb(204, 204, 204);
                  width: 56px;
                  height: 11px;
                }
                span {
                  float: left;
                  width: 14px;
                  height: 11px;
                  // background-position: 0px -24px;
                  margin: 7px 5px 9px 10px;
                }
                a {
                  position: absolute;
                  right: 10px;
                  bottom: 4px;
                  width: 16px;
                  height: 17px;
                  font-size: 17px;
                  color: #ddd;
                  &:hover {
                    text-decoration: none;
                  }
                }
              }
            }
            img {
              width: 140px;
              height: 140px;
            }
            p {
              a {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .label {
      height: 35px;
      line-height: 35px;
      border-bottom: 3px solid rgb(151, 22, 22);

      .hot1 {
        float: left;
        width: 110px;
        height: 28px;
        font-size: 20px;
        margin: 0 15px 0 10px;
        i {
          color: #c10d0c;
        }
        a {
          margin-left: 10px;
          text-decoration: none;
          color: #111;
        }
      }
      .hot2 {
        font-size: 12px;
        float: left;
        a {
          color: #666;
          padding: 0 10px;
        }
      }
      .more {
        font-size: 12px;
        float: right;
        margin-right: 10px;
        i {
          color: rgb(151, 22, 22);
        }
        a {
          padding: 0 5px;
          color: #666;
        }
      }
    }
    .new {
      width: 100%;
      height: 260px;
      margin-bottom: 20px;
      .disc {
        height: 188px;
        margin: 16px 0;
        border: 1px solid #ddd;
        background-color: #f5f5f5;
        p {
          overflow: hidden;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #666;
        }
        .el-carousel__item:nth-child(2n) {
          background-color: #f5f5f5;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #f5f5f5;
        }
        ul {
          height: 150px;
          margin: 25px 0;
          li {
            float: left;
            margin-left: 29px;
            width: 100px;
            .disc-singer {
              a {
                color: #666;
              }
            }
            img {
              width: 100px;
              height: 100px;
            }
          }
        }
      }
    }
    .top-list {
      width: 100%;
      height: 100%;
      margin-top: 20px;
      background-color: #f4f4f4;
      border: 1px solid #d3d3d3;
      overflow: hidden;
      dl {
        float: left;
        width: 225px;
        height: 100%;
        border-left: 1px solid #d3d3d3;
        box-shadow: 0px 6px 8px -10px #000;
        &:first-child {
          border-left: none;
        }

        dt {
          height: 100px;
          padding: 20px 0 0 12px;
          margin-bottom: 20px;
          .top-pic {
            width: 80px;
            height: 80px;
            background-color: green;
            float: left;
            img {
              width: 80px;
              height: 80px;
              cursor: pointer;
            }
          }
          .top-title {
            float: left;

            h3 {
              margin: 5px;
              font-size: 15px;
            }
            i {
              font-size: 25px;
              margin: 5px;
              color: #999;
              &:hover {
                color: #333;
              }
            }
          }
        }
        dd {
          ul {
            height: 100%;
            li {
              padding-left: 20px;
              height: 32px;
              line-height: 32px;
              width: 100%;
              &:nth-child(odd) {
                background-color: #e8e8e8;
              }
              &:nth-child(1) {
                color: #c10d0c;
              }
              &:nth-child(2) {
                color: #c10d0c;
              }
              &:nth-child(3) {
                color: #c10d0c;
              }
              &:hover {
                .oper {
                  display: block;
                }
                a {
                  width: 96px;
                }
              }
              span {
                float: left;
                margin-left: -14px;
                width: 35px;
                height: 32px;
                text-align: center;
                font-size: 14px;
              }
              a {
                display: block;
                float: left;
                width: 170px;
                font-size: 12px;
                height: 32px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow-wrap: normal;
                overflow: hidden;
              }
              .oper {
                display: none;
                float: right;
                height: 32px;
                width: 82px;
                line-height: 32px;

                a {
                  width: 19px;
                  i {
                    color: #999;
                    &:hover {
                      color: #333;
                    }
                  }
                  margin: 0 3px;
                  font-size: 20px;
                }
              }
            }
          }
          .all {
            height: 32px;
            background-color: #e8e8e8;
            line-height: 32px;
            a {
              float: right;
              margin-right: 10px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .right {
    width: 260px;
    height: 100%;
    float: left;
    border: 1px solid #d3d3d3;
    border-top: none;
    border-bottom: none;
    .login {
      font-size: 12px;
      padding: 16px 18px;
      height: 126px;
      box-shadow: 0px 1px 8px -3px #999;
      p {
        height: 25px;
        line-height: 25px;
      }
      a {
        display: block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        background-color: #c80c13;
        text-align: center;
        color: #fff;
        text-shadow: 0 1px 0 #8a060b;
        margin: 0 auto;
        margin-top: 35px;
        border-radius: 5px;
        &:hover {
          background-color: #e4242b;
        }
      }
    }
    .singer {
      width: 260px;
      height: 475px;
      padding: 20px;
      //   background-color: #ddd;
      h3 {
        height: 20px;
        font-size: 13px;
        border-bottom: 1px solid #999;
        line-height: 13px;
        a {
          margin-left: 100px;
          right: 0;
          color: #000;
          font-weight: normal;
        }
      }
      ul {
        margin-top: 20px;
        li {
          width: 220px;
          height: 62px;
          margin-bottom: 15px;
          box-shadow: 3px 4px 6px -3px #999;
          &:hover {
            background-color: #f4f4f4;
          }
          .head {
            float: left;
            margin-right: 15px;
          }
          .info {
            float: left;
            padding: 8px 0;
            color: #000;
            width: 133px;
            h4 {
              height: 30px;
            }
            p {
              color: #666;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .apply {
        width: 220px;
        height: 30px;
        line-height: 30px;
        margin: 0 auto;
        margin-bottom: 40px;
        background-color: #f6f6f6;
        border-radius: 5px;
        text-align: center;
        box-shadow: 3px 4px 6px -3px #999;
        &:hover {
          background-color: #fff;
        }
        h4 {
          color: #000;
          font-size: 13px;
        }
      }
      .dj {
        width: 220px;
        height: 50px;
        font-size: 12px;
        .cover {
          display: block;
          float: left;
        }
        .dj2 {
          line-height: 20px;
          float: left;
          width: 150px;
          margin-left: 10px;
          color: #000;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #666;
          }
          a {
            color: #000;
            font-weight: 700;
            &:hover {
            }
          }
        }
      }
    }
  }
}
</style>
