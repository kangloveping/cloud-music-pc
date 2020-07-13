<template>
  <div class="search">
    <Header></Header>
    <div class="container">
      <div class="input">
        <input type="text" />
        <el-button type="primary" class="btn-search">
          <i class="el-icon-search"></i>
        </el-button>
      </div>
      <el-tabs type="border-card" class="list">
        <el-tab-pane label="单曲">
          <div class="list-c">
            <table>
              <tbody>
                <tr>
                  <td class="w1">
                    <div>
                      <i class="el-icon-video-play btn-play"></i>
                    </div>
                  </td>
                  <td class="w2">
                    <a href="#" class="song">{{'一生中最爱'}}</a>
                    <a href="#" class="mv"></a>
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
                    <a href="#">
                      <span>{{'张学友'}}</span>
                    </a>
                  </td>
                  <td class="w5">
                    <a href="#">
                      <span>{{'《遥远的她》'}}</span>
                    </a>
                  </td>
                  <td class="w6">
                      <span>{{'04:05'}}</span>
                  </td>
                </tr>
                <tr>
                  <td class="w1">
                    <div>
                      <i class="el-icon-video-play btn-play"></i>
                    </div>
                  </td>
                  <td class="w2">
                    <a href="#" class="song">{{'一生中最爱'}}</a>
                    <a href="#" class="mv"></a>
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
                    <a href="#">
                      <span>{{'张学友'}}</span>
                    </a>
                  </td>
                  <td class="w5">
                    <a href="#">
                      <span>{{'《遥远的她》'}}</span>
                    </a>
                  </td>
                  <td class="w6">
                    <a href="#">
                      <span>{{'04:05'}}</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane class="thead" label="歌手">
          <ul>
            <li>
              <a href>
                <img src alt />
              </a>
              <a href>张学友</a>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane class="thead" label="专辑">
          <li>
            <a href>
              <img src alt />
            </a>
            <a href>张学友</a>
            <a href>张学友</a>
          </li>
        </el-tab-pane>
        <el-tab-pane class="thead" label="视频">
          <li>
            <a href>
              <img src alt />
            </a>
            <a href>张学友</a>
            <a href>张学友</a>
          </li>
        </el-tab-pane>
        <el-tab-pane class="thead" label="歌词">
          <li>
            <a href>
              <img src alt />
            </a>
            <a href>张学友</a>
            <a href>张学友</a>
          </li>
        </el-tab-pane>
        <el-tab-pane class="thead" label="歌单">
          <li>
            <a href>
              <img src alt />
            </a>
            <a href>张学友</a>
            <a href>张学友</a>
          </li>
        </el-tab-pane>
        <el-tab-pane class="thead" label="主播电台">
          <li>
            <a href>
              <img src alt />
            </a>
            <a href>张学友</a>
            <a href>张学友</a>
          </li>
        </el-tab-pane>
        <el-tab-pane class="thead" label="用户">
          <li>
            <a href>
              <img src alt />
            </a>
            <a href>张学友</a>
            <a href>张学友</a>
          </li>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less" scoped>
a:hover{
    text-decoration: underline;
}
.container {
  width: 980px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  padding: 40px;
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
  .list {
    .list-c {
      width: 100%;
      height: 100%;
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
              display: block;
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
        }
      }
    }
  }
}
</style>>
