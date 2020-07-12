<template>
  <div class="comment">
    <div class="c-title">
      <h3>歌曲列表</h3>
      <span>共2313455条评论</span>
    </div>
    <div class="intarea">
      <div class="head">
        <img
          src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
          alt
        />
      </div>
      <div class="input">
        <textarea class="area" placeholder="评论"></textarea>
        <div class="btn">
          <a href="#">评论</a>
          <span>140</span>
        </div>
      </div>
    </div>
    <h5>精彩评论</h5>
    <ul>
      <li>
        <div class="head">
          <img
            src="https://p2.music.126.net/55l0dVu5yCxnsSdd2L-q8A==/109951164961388472.jpg?param=50y50"
            alt
          />
        </div>
        <div class="warp">
          <div class="com">
            <span>
              <a href="#">季糖九_</a>
            </span>
            <span>：说一说所谓［VIP专享］，打个比方：你去商场拿了东西，自然钱没了害；而我去商场逛了一圈，手没发痒，钱还在😀 —— 个人卓见 不服来辩😏</span>
          </div>
          <div class="time">
            <span>48分钟前</span>
            <a class="answer" href="#">回复</a>
          </div>
        </div>
      </li>
      <li>
        <div class="head">
          <img
            src="https://p2.music.126.net/55l0dVu5yCxnsSdd2L-q8A==/109951164961388472.jpg?param=50y50"
            alt
          />
        </div>
        <div class="warp">
          <div class="com">
            <span>
              <a href="#">季糖九_</a>
            </span>
            <span>： 圈，手没发痒，钱还在😀 —— 个人卓见 不服来辩😏</span>
          </div>
          <div class="time">
            <span>48分钟前</span>
            <a class="answer" href="#">回复</a>
          </div>
        </div>
      </li>
      <li>
        <div class="head">
          <img
            src="https://p2.music.126.net/55l0dVu5yCxnsSdd2L-q8A==/109951164961388472.jpg?param=50y50"
            alt
          />
        </div>
        <div class="warp">
          <div class="com">
            <span>
              <a href="#">季糖九_</a>
            </span>
            <span>：说一说所谓［VIP专享］，打个比方：你去商场拿了东西，自然钱没了害；而我去商场逛了一圈，手没发痒，钱还在😀 —— 个人卓见 不服来辩😏</span>
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
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.comment {
  width: 640px;
  .c-title {
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
    }
  }
  .intarea {
    width: 100%;
    height: 98px;
    margin-top: 20px;
    .head {
      float: left;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .input {
      float: left;
      .area {
        height: 63px;
        display: block;
        width: 579px;
        margin-left: 10px;
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
  .page{
      text-align: center;
      margin-top: 20px;
  }
}
</style>