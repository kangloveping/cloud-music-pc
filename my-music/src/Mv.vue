<template>
  <div class="mv">
    <Header></Header>
    <Nav></Nav>
    <MvDetail></MvDetail>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Nav from "./components/Nav";
import MvDetail from "./components/MvDetail";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Nav,
    MvDetail,
    Footer
  }
};
</script>

<style lang='less' scoped>
.mv {
  background-color: #f5f5f5;
}
</style>