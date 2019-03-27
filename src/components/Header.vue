<template>
    <div class="bg">
      <p>
        Welcome, {{ UserName }}.This is header area.
        <el-button type="danger" icon="el-icon-close" circle></el-button>
      </p>
    </div>
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
<style>
.bg{
  border: #909399 1px solid;
  color: #333;
  border-radius: 30px;
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>


