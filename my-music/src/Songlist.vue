<template>
  <div class="list">
    <Header></Header>
    <Nav></Nav>
    <SuggestList></SuggestList>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Nav from "./components/Nav";
import SuggestList from "./components/SuggestList";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Nav,
    SuggestList,
    Footer,
  }
};
</script>

<style lang='less' scoped>
</style>