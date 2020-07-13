<template>
  <div class="song">
      <Header></Header>
    <Nav></Nav>
    <SongDetail></SongDetail>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Nav from "./components/Nav";
import SongDetail from "./components/SongDetail";
import Footer from "./components/Footer";

export default {
    components: {
    Header,
    Nav,
    Footer,
    SongDetail,
  },
}
</script>

<style>

</style>