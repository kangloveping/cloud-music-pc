<template>
  <div>
    <div class="header">
      <div>
        <a href="javascript:void(0)" class="logo"></a>
      </div>
      <div>
        <ul class="nav">
          <li :class="isActive">
            <span>
              <a href="javascript:void(0)">发现音乐</a>
            </span>
            <i class="el-icon-caret-top"></i>
          </li>
          <li>
            <span>
              <a href="javascript:void(0)">我的音乐</a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:void(0)">朋友</a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:void(0)">商场</a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:void(0)">音乐人</a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:void(0)">下载客户端</a>
            </span>
          </li>
          <i class="hot-icon"></i>
        </ul>
      </div>
      <div class="login">
        <a href="#">登录</a>
      </div>
      <button class="author">创作者中心</button>
      <div class="search">
        <i class="el-icon-search"></i>
        <input
          id="search"
          v-model="query"
          @keyup.enter="searchMusic"
          type="text"
          placeholder="音乐/视频/电台/用户"
          style
        />
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      isActive:'active'
    };
  },
  methods: {
    searchMusic() {
      this.isActive='';
      localStorage.setItem("key", this.query);
      window.location.href="http://localhost:8080/search";
    }
  }
};
</script>

<style scroped lang='less'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style-type: none;
}
a {
  text-decoration: none;
  color: rgb(202, 193, 193);
}
.line {
  float: left;
  width: 1280px;
  height: 5px;
  background-color: #c20c0c;
  //   margin-top: 70px;
}
.header {
  height: 70px;
  // width: 100%;
  width: 1280px;
  background-color: #242424;
  padding: 0 80px;

  .logo {
    width: 176px;
    height: 70px;
    float: left;
    background: url("../assets/img/logo.png") 0 0 no-repeat;
  }
  .nav {
    li {
      float: left;
      height: 70px;
      font-size: 14px;
      padding: 0 20px;
      line-height: 70px;
      &:hover {
        background-color: #000;
        a {
          color: #fff;
        }
      }
    }
    .active {
      position: relative;
      background-color: #000;
      i {
        position: absolute;
        font-size: 20px;
        color: #c20c0c;
        left: 50%;
        bottom: -8px;
        transform: translateX(-50%);
      }
      a {
        color: #fff;
      }
    }
    .hot-icon {
      position: relative;
      float: left;
      display: block;
      width: 28px;
      height: 20px;
      background: url("../assets/img/logo.png") -192px 0 no-repeat;
      top: 25px;
      left: -10px;
    }
  }
  .login {
    float: right;
    height: 70px;
    line-height: 70px;
    margin-right: 25px;
    a {
      font-size: 12px;
    }
  }
  .author {
    float: right;
    width: 90px;
    height: 32px;
    margin: 19px 20px 0 12px;
    box-sizing: border-box;
    border: 1px solid #4f4f4f;
    background-color: #242424;
    line-height: 32px;
    color: #ccc;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      border: 1px solid #fff;
    }
  }
  .search {
    float: right;
    margin-top: 19px;
    height: 30px;
    width: 155px;
    border-radius: 30px;
    background-color: #fff;
    i {
      float: left;
      margin: 8px 5px;
    }
    input {
      margin-top: 7px;
      height: 16px;
      line-height: 16px;
      width: 120px;
      font-size: 12px;
      border: none;
      outline: medium;
    }
  }
}
</style>