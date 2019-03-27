<template>
<div id="app">
    <el-container>
      <!--侧边栏容器-->
      <el-aside width="200px">
        <Navigation/>
      </el-aside>
      <el-container>
        <!--上边栏容器-->
        <el-header>
          <Header/>
        </el-header>
        <!--内容栏容器-->
        <el-main>
          <p>This is main area.</p>
          <p>
            Loading
            <i class="el-icon-loading"></i>
          </p>
          <img src="./assets/logo.png">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Header from '@/components/Header'

export default {
  name: 'App',
	components: {
    Navigation,
    Header
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-aside {
  /* background-color: #D3DCE6; */
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-header {
  /* background-color: #B3C0D1; */
  color: #333;
  /* line-height: 60px; */
}
  
.el-main {
  /* background-color: #E9EEF3; */
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
</style>
