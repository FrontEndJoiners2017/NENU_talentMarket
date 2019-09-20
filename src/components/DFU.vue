<template>
  <div>
    <el-card class="box-card">
      <h1>就业市场数据分析系统使用说明</h1>
    </el-card>
    <el-card class="box-card">
      <div class="textBox">
        <p>
          <b>一、综合数据分析依据：六角分析法</b>
        </p>
        <el-table :data="tableData" borderstyle="width: 100%">
          <el-table-column prop="itemize" label="分项"></el-table-column>
          <el-table-column prop="grade" label="等级"></el-table-column>
          <el-table-column prop="proportion" label="比重"></el-table-column>
        </el-table>
      </div>
      <div class="textBox">
        <p>
          <b>二、分类数据查询：城市分类排名板块</b>
        </p>
        <p>六角分析各项详细数据查询处，数据由外部Excel表格导入，也可导出Excel表格数据。</p>
      </div>
      <div class="textBox">
        <p>
          <b>三、本系统由卓音工作室开发，任何使用问题请与我们联系解决，感谢使用！</b>
        </p>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          itemize: "毕业生期望",
          grade: "分级A-E（5-1分）",
          proportion: "分值占比20%"
        },
        {
          itemize: "毕业生签约",
          grade: "分级A-E（5-1分）",
          proportion: "分值占比20%"
        },
        {
          itemize: "毕业生生源城市",
          grade: "分级A-E（5-1分）",
          proportion: "分值占比15%"
        },
        {
          itemize: "往年城市开发",
          grade: "分级A-E（5-1分）",
          proportion: "分值占比15%"
        },
        {
          itemize: "用人单位回访率",
          grade: "分级A-E（5-1分）",
          proportion: "分值占比15%"
        },
        {
          itemize: "城市分级",
          grade: "分级A-E（5-1分）",
          proportion: "分值占比15%"
        },
        {
          itemize: "总分值：5分"
        }
      ]
    };
  }
};
</script>

<style scoped>
div {
  width: 100%;
  text-align: left;
}
.textBox {
  margin: 30px 0;
}
p {
  line-height: 15px;
}
</style>

