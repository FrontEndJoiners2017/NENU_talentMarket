<template>
    <el-container id="leftBox">
      <!--侧边栏容器-->
      <el-aside>
        <!-- <Navigation/> -->
        <router-view name="nav"></router-view>
      </el-aside>
      <el-container>
        <!--上边栏容器-->
        <el-header>
          <!-- <Header/> -->
        <router-view name="header"></router-view>
        </el-header>
        <!--内容栏容器-->
        <el-main>
          <!-- <p>This is main area.</p><p>Loading<i class="el-icon-loading"></i></p><img src="./assets/logo.png"> -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
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
<style scoped>
a{
  text-decoration:none;
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
  background-color: #409EFF;
  color: #333;
  text-align: center;
}
.el-header {
  /* background-color: #B3C0D1; */
  color: #333;
  height: 200px;
  /* line-height: 60px; */
}
  
.el-main {
  /* background-color: #E9EEF3; */
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

.box-card{
  margin: 20px 0;
}
</style>


