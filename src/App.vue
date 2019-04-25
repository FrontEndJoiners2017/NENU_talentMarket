<template>
<div id="app">
    <el-container v-if="1">
        <!--侧边栏容器-->
        <el-aside>
            <Navigation/>
        </el-aside>
        <el-container>
            <!--上边栏容器-->
            <el-header>
                <Header/>
            </el-header>
            <!--内容栏容器-->
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    <router-view v-else-if="0"></router-view>
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
  background-color: #E9E9E9;
  /* background-color: #D3DCE6; */
  margin: 0;
  padding: 0;
}
a{
  text-decoration:none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.el-aside {
  /* background-color: #D3DCE6; */
  background-color: #FFFFFF;
}

.box-card{
  margin: 20px 0;
}
</style>

