<template>
  <div class="nav">
    <ul>
      <li>
        <span>
          <a href="javascript:void(0)">推荐</a>
        </span>
      </li>
      <li>
        <span>
          <a href="javascript:void(0)">排行榜</a>
        </span>
      </li>
      <li>
        <span>
          <a href="javascript:void(0)">歌单</a>
        </span>
      </li>
      <li>
        <span>
          <a href="javascript:void(0)">主播电台</a>
        </span>
      </li>
      <li>
        <span>
          <a href="javascript:void(0)">歌手</a>
        </span>
      </li>
      <li>
        <span>
          <a href="javascript:void(0)">新碟上架</a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {};
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style-type: none;
  margin-left: 110px;
}
a {
  text-decoration: none;
}
.nav {
  height: 35px;
  width: 1280px;
  background-color: #c20c0c;
  padding: 0 150px;
  .active {
    background-color: #9b0909;
  }
  li {
    padding: 0 20px;
    // margin-left: 10px;
    line-height: 20px;
    float: left;
    span {
      display: inline-block;
      padding: 0 15px;
      height: 20px;
      line-height: 15px;
      border-radius: 10px;
      &:hover {
        background-color: #9b0909;
      }
      a {
        font-size: 12px;
        color: #fff;
      }
    }
  }
}
</style>