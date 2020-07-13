<template>
  <div class="top">
    <Header></Header>
    <Nav></Nav>
    <TopDetail></TopDetail>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Nav from "./components/Nav";
import TopDetail from "./components/TopDetail";
import Footer from "./components/Footer";
export default {
  components: {
    Header,
    Nav,
    Footer,
    TopDetail,
  },
  data(){
      return{
      }
  },
  mounted(){
  },
  methods:{
      
  }
};
</script>

<style lang="less" scoped>
</style>>
