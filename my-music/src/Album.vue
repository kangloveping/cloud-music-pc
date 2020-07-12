<template>
  <div class="list">
    <Header></Header>
    <Nav></Nav>
    <AlbumtList></AlbumtList>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Nav from "./components/Nav";
import AlbumtList from "./components/AlbumtList";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Nav,
    AlbumtList,
    Footer,
  }
};
</script>

<style lang='less' scoped>
</style>