<template>
<div id="app">
    <!-- <router-view/> -->
    <el-container>
      <!--侧边栏容器-->
      <el-aside id="leftBox">
        <router-view name="nav"></router-view>
      </el-aside>
      <el-container>
        <!--上边栏容器-->
        <el-header>
        <router-view name="header"></router-view>
        </el-header>
        <!--内容栏容器-->
        <el-main>
          <!-- <p>This is main area.</p><p>Loading<i class="el-icon-loading"></i></p><img src="./assets/logo.png"> -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</div>
</template>

<script>
export default {
  name: 'App',
	components: {
  }
}
</script>

<style>
body{
  /* background-color: #409EFF; */
  background-color: #E9E9E9;
  margin: 0;
  padding: 0;
}
#leftBox{
  background-color: rgb(255, 255, 255);
}
</style>

