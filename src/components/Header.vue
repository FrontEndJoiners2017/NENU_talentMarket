<template>
      <p>
        Welcome, {{ UserName }}.This is header area.
        <el-button type="danger" icon="el-icon-close" circle></el-button>
      </p>
</template>
<script>
export default {
  data(){
    return{
      UserName:"monkeys"
    }
  }
}
</script>
<style scoped>
body{
  background-color: #fff;
}
template{
  background-color: #fff;
}
</style>