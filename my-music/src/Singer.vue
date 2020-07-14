<template>
  <div class="mv">
    <Header></Header>
    <Nav></Nav>
    <SingerDetail></SingerDetail>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Nav from "./components/Nav";
import SingerDetail from "./components/SingerDetail";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Nav,
    SingerDetail,
    Footer
  }
};
</script>

<style lang='less' scoped>
.mv {
  background-color: #f5f5f5;
}
</style>