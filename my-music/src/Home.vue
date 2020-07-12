<template>
  <div class="home">
    <Header></Header>
    <Nav @change="plus"></Nav>
    <Banner></Banner>
    <Discover></Discover>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Discover from "./components/Discover";
import Footer from "./components/Footer";
export default {
  components: {
    Header,
    Nav,
    Banner,
    Discover,
    Footer
  },
  data() {
    return {
      pram: ""
    };
  },
  methods: {
    plus: function(data) {
      this.pram = data;
      console.log(this.pram);
    }
  }
};
</script>

<style lang='less' scoped>
.home{
  background-color: #f5f5f5;
}
</style>