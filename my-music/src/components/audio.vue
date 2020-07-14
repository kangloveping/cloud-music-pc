<template>
  <div class="audio">
    <audio v-show="audioIsShow" :src="musicUrl" controls loop autoplay></audio>
  </div>
</template>
@click="playMusic(item.id)"
<script>
export default {
  data() {
    return {
      musicUrl: "",
      audioIsShow: false,
    };
  },
  methods: {
    playMusic(musicid) {
      this.audioIsShow = true;
      this.$http.get("/song/url?id=" + musicid).then(
        res => {
          this.musicUrl = res.data.data[0].url;
          // console.log(this.musicUrl);
        },
        err => {}
      );
    },
  }
};
</script>

<style>
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
</style>