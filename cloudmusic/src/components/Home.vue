<template>
  <div class="warp" id="player">
        <div class="play-container">
            <div class="top">
                <i></i>
                <input v-model="query" @keyup.enter="searchMusic" type="text" class="search">
            </div>
            <div class="center">
                <div class="m-list">
                    <ul>
                        <li v-for="songs in musicList" v-show="isActive" style="display: none;">
                            <a @click="playMusic(songs.id)" href="javascript:;"></a>
                            <b> {{ songs.name }} </b>
                            <span v-if="songs.mvid!=0" @click="playMv(songs.mvid)">
                                <i></i>
                            </span>
                        </li>
                    </ul>
                    <img src="../assets/images/line.png" alt="">
                </div>
                <div class="m-info" :class="{playing:isPlaying}">
                    <img class="bar" src="../assets/images/player_bar.png" alt="">
                    <img class="disc autoRotate" src="../assets/images/disc.png" alt="">
                    <!-- 若封面地址为空，则显示默认图片 -->
                    <img class="info autoRotate" :src=" musicInfo ==''?  '../assets/images/cover.png':musicInfo" alt="">
                    <div class="lyric" v-show="isLyric" style="display: none;">
                        <p> {{ lyric_up }} </p>
                        <p class="lyric-c">{{ lyric_c }}</p>
                        <p> {{ lyric_un }} </p> 
                    </div>
                </div>
                <div class="m-comments">
                    <h5 class='title'>热门留言</h5>
                    <div class="comment_list">
                        <dl v-for="item in hotComments" v-show="isActive" style="display: none;">
                            <dt><img :src="item.user.avatarUrl" alt=""></dt>
                            <dd class="c-name"> {{ item.user.nickname }} </dd>
                            <dd class="c-detail"> {{ item.content }} </dd>
                        </dl>
                    </div>
                    <img src="../assets/images/line.png" class="right_line">
                </div>
            </div>
            <div class="control">
                <div class="audio">
                    <audio :src="musicUrl" @play="play" @pause="pause" @timeupdate="updateTime" class="audio1" controls autoplay loop></audio>
                </div>
                <div class="video" v-show="isShow" style="display: none;">
                    <video :src="mvUrl" class="video1" controls="controls"></video>
                    <div class="mask" @click="hide"></div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        query: "",
        musicList: [],
        musicUrl: "",
        musicInfo: "",
        hotComments: [],
        mvUrl: "",
        isShow: false,
        isPlaying: false,
        isActive:false,
        lyric: [],
        lyric_up: "",
        lyric_c: "",
        lyric_un: "",
        isLyric: false,  
    }
  },
  methods: {
        // 在Vue中this始终指向Vue，
        // 但一些其他组件如axios中this为undefined
        // 因此需要定义变量that来代替this
        // 用箭头函数则可避免这种情况
        searchMusic: function () {
            // var that = this;
            this.$axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then((res) => {
                    // console.log(res);
                    this.musicList = res.data.result.songs;
                    this.isActive = true;
                },
                    (err) => { }
                );
        },
        // musicId参数为从musicList数据中拿到的音乐id
        playMusic: function (musicId) {
            this.lyric = [];    //先清空上一次获取到的歌词数据，避免混乱
            this.isActive = true;
            
            this.$axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then((res) => {
                    this.musicUrl = res.data.data[0].url;
                },
                    (err) => { }
                );
            this.$axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then((res) => {
                    this.musicInfo = res.data.songs[0].al.picUrl;
                },
                    (err) => { }
                );
            this.$axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then((res) => {
                    this.hotComments = res.data.hotComments;
                },
                    (err) => { }
                );
            this.$axios.get("https://autumnfish.cn/lyric?id=" + musicId)
                .then((res) => {
                    
                    let lyric_data = res.data.lrc.lyric; //拿到歌词， "[00:00]歌词文本\n[00:21]歌词文本..."
                    let arr = lyric_data.split("\n"); //通过换行符“\n”进行切割分行, [[00:00]歌词文本,[00:21]歌词文本,...]
                    for (let i = 0; i < arr.length; i++) {
                        let arr_text = arr[i].split("]");//将每一组的时间与歌词分离，通过"]"，[[00:00，歌词文本]
                        let lyric_text = arr_text.pop(); //获取歌词文本，用pop方法：删除最后一个元素并输出。"歌词文本"

                        //处理数组剩下时间点元素
                        arr_text.forEach(element => {
                            //substr(a,b)：a为开始截取的位置，b为截取字符数
                            let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
                            let s = parseInt(time_arr[0]) * 60 + Math.round(time_arr[1]); //把时间转换成秒s

                            let obj = {};//创建一个对象，赋给它2个属性
                            obj.time = s;
                            obj.text = lyric_text;
                            this.lyric.push(obj); //每一行歌词对象存到lyric数组中 [{time:'',text:''},{...}]
                            this.lyric.sort((a, b) => a.time - b.time);//按时间点大小排升序：sort方法
                        });
                    }
                },
                    (err) => { }
                );

        },
        //监听歌曲时间更新
        updateTime: function () {
            let currentTime = document.querySelector('.audio1').currentTime;//currentTime为h5中audio的时间属性
            this.isLyric = true; //显示歌词区域

            for (let i = 0; i < this.lyric.length; i++) {
                //判断当前时间对应哪句歌词
                if (currentTime > this.lyric[i].time && currentTime < this.lyric[i + 1].time) {
                    // 将歌词文本赋值给对应的p标签
                    this.lyric_up = this.lyric[i - 1].text;
                    this.lyric_c = this.lyric[i].text;
                    this.lyric_un = this.lyric[i + 1].text;
                }
            };
        },
        // 音乐暂停或播放对应的封面动画是否启动
        play: function () {
            this.isPlaying = true;
        },
        pause: function () {
            this.isPlaying = false;
        },
        playMv: function (mvid) {
            document.querySelector('.audio1').pause();  //先暂停音频的播放
            this.$axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then((res) => {
                    this.mvUrl = res.data.data.url;
                    this.isShow = true;
                },
                    (err) => { }
                );
        },
        // 点击MV外部，则关闭MV并继续音乐的播放
        hide: function () {
            this.isShow = false;
            document.querySelector('.audio1').play();
            this.mvUrl = '';
        },

    }
}
</script>

<style scoped>
    *{
    margin: 0;
    padding: 0;
}
ul{
    list-style-type: none;
}
a{
    text-decoration: none;
}
/* 添加网页背景 */
.warp{
    width: 100%;
    height: 100%;
    background: url("../assets/images/bg.jpg") no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    background-size: 100% 100%;

}
/* 播放器主体 */
.play-container{
    width: 800px;
    height: 544px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -272px;
}
/* 1播放器头部 */
.play-container .top{
    width: 100%;
    height: 60px;
    background-color: #1eacda;
    z-index: 11;
    position: relative;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
/* 1.1播放器图标 */
.top i{
    display: inline-block;
    width: 180px;
    height: 60px;
    background: url("../assets/images/logo.png")15px -5px no-repeat;
}
/* 1.2搜索区 */
.play-container .search{
    margin-right: 23px;
    margin-top: 15px;
    width: 250px;
    height: 34px;
    border-radius: 17px;
    border: 0px;
    float: right;
    background: url("../assets/images/zoom.png") 215px center no-repeat
    rgba(255, 255, 255, 0.45);
    /* 文字缩进 */
    text-indent: 15px;
    /* 隐藏输入框外轮廓 */
    outline: none;
}
/* 2播放器中部 */
.center{
    width: 100%;
    height: 435px;
    background-color: rgba(255, 255, 255, 0.5);
}
/* 2.1歌曲列表 */
.center .m-list{
    box-sizing: border-box;
    width: 200px;
    height: 435px;
    /* background-color: rgb(77, 170, 40); */
    padding: 10px;
}
.m-list ul{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.m-list ul::-webkit-scrollbar{
    display: none;
}
.m-list li{
    height: 40px;
    width: 580px;
    font-size: 12px;
    color: #333;
    display: flex;
    /* flex-wrap 属性规定flex弹性容器可以拆成多行 */
    flex-wrap: wrap;
    align-items: center;
    padding-left: 10px;

}
.m-list li:nth-child(odd) {
  background-color: rgba(240, 240, 240, 0.3);
}
/* 播放按钮图标 */
.m-list a{
    width: 17px;
    height: 17px;
    box-sizing: border-box;
    display: block;
    background: url("../assets/images/play.png")no-repeat;
    background-size: 100%;
    margin-right: 5px;
}
/* 歌曲名 */
.m-list b{
    width: 120px;
    font-weight: 550;
    overflow: hidden;
    /* 文字超出用省略号代替 */
    text-overflow: ellipsis;
    /* 文本不换行 */
    white-space: nowrap;
}
/* MV播放图标 */
.m-list li span {
  width: 23px;
  height: 17px;
  margin-right: 50px;
}
.m-list i{
    width: 100%;
    height: 100%;
    display: block;
    /* 光标修改 */
    cursor: pointer;
    background: url("../assets/images/table.png")0 -48px no-repeat;
}
/* 分割竖线 */
.m-list img{
    float: right;
    position: absolute;
    left: 199px;
    top: 60px;
}
/* 封面区域 */
.m-info{
    width: 400px;
    height: 435px;
    position: absolute;
    left: 200px;
    top: 60px;
    /* background-color: rgb(170, 161, 30); */
}
/* 设置封面动画 */
/* 先定义一个旋转动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
/* 动画的类名 */
.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
}
/* 监听是否播放音乐 */
.m-info.playing .disc,
.m-info.playing .info{
    /* 启动旋转动画 */
  animation-play-state: running;
}

.m-info .bar{
    position: absolute;
    left: 200px;
    top: -10px;
    z-index: 10;
    transform: rotate(-25deg);
    transform-origin: 12px 12px;
    transition: 1s;
}
/* 播放杆位置改变 */
.m-info.playing .bar{
    transform: rotate(0deg);
}
.m-info .disc{
    position: absolute;
    left: 73px;
    top: 60px;
    z-index: 9;
}
.m-info .info{
    position: absolute;
    left: 125px;
    top: 112px;
    width: 150px;
    height: 150px;
    border-radius: 75px;
    z-index: 8;
}
.lyric{
    position: absolute;
    width: 340px;
    height: 60px;
    /* background-color: #fff; */
    top: 330px;
    left: 30px;
    font-size: 15px;
    line-height: 25px;
    text-align: center;
    color: #777;
}
.lyric .lyric-c{
    color: #1eacda;
    font-size: 18px;
}

/* 2.2评论区 */
.m-comments{
    box-sizing: border-box;
    width: 200px;
    height: 435px;
    position: absolute;
    left: 600px;
    top: 60px;
    padding: 25px 10px;
    /* background-color: rgb(65, 93, 170); */
}
/* 标题 */
.m-comments .title {
    position: absolute;
    top: 10px;
}
/* 评论列表 */
.m-comments .comment_list {
  overflow: auto;
  height: 410px;
}
/* 隐藏滚动条 */
.comment_list::-webkit-scrollbar {
  display: none;
}
.comment_list dl {
  padding-top: 10px;
  padding-left: 55px;
  position: relative;
  margin-bottom: 20px;
}
.comment_list dt {
  position: absolute;
  left: 4px;
  top: 10px;
}
/* 头像 */
.comment_list img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
}
.comment_list dd{
    font-size: 12px;
}
.comment_list .c-name{
    font-weight: bold;
    color: #333;
    line-height: 18px;
}
.m-comments .right_line{
    position: absolute;
    top: 0;
    left: -1px;
}
/* 播放器控制条 */
.control{
    width: 100%;
    height: 50px;
    background-color: #f1f3f4;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.audio audio{
    width: 100%;
    height: 40px;
    margin-top: 5px;
    outline: none;
    background-color: #f1f3f4;
}
.video video {
  position: fixed;
  width: 800px;
  height: 546px;
  left: 50%;
  top: 50%;
  margin-top: -273px;
  transform: translateX(-50%);
  z-index: 990;
}
.video .mask{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 900;
    background-color: rgba(0,0,0,0.8);
}
</style>
