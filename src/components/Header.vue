<template>
    <el-card class="box-card">
      <!-- <p> -->
        Welcome, {{ UserName }}.This is header area.
        <el-button type="danger" icon="el-icon-close" circle></el-button>
      <!-- </p> -->
    </el-card>
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

</style>