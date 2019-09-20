<template>
  <div id="caseAnalysisHome">
    <!-- 搜索框 -->
    <el-card class="box-card">
      <div class="text item">
        <h1>单位详情列表</h1>
        <!-- 搜索 -->
        <el-input placeholder="请输入关键词" v-model="keyword" style="display:inline-block;width:200px"></el-input>
        <el-button @click="search" type="primary" icon="el-icon-search" plain>检索</el-button>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <div class="text item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="company_name" label="单位名称"></el-table-column>
          <el-table-column prop="company_nature" label="单位性质"></el-table-column>
          <el-table-column prop="company_city" label="所在城市"></el-table-column>
          <el-table-column prop="province" label="省份"></el-table-column>
          <el-table-column prop="total_visit" label="历年走访次数"></el-table-column>
          <el-table-column prop="total_return" label="来校宣讲次数"></el-table-column>
          <el-table-column prop="total_sign" label="历年签约人数"></el-table-column>
          <el-table-column label="详细信息">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="current_change"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      // 表格部分
      tableData: [],
      // 远程搜索部分
      keyword: "",
      //分页
      //当前页数
      currentPage: 1,
      //每页装的元组
      pagesize: 10,
      //元组总数目
      total: 0
    };
  },
  mounted() {
    Axios({
      method: "get",
      url: this.backendUrl+"/company/listCompany",
      crossDomain: true,
      cache: false
    })
      .then(response => {
        console.log(response);
        this.tableData = response.data;
        this.total = response.data.length;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    // 表格点击查看
    handleClick(row) {
      let params = {
        companyIdStr: row.id,
        companyName: row.company_name
      };
      this.$router.push({
        path: "/caseAnalysis/Details",
        name: "caseAnalysisDetails",
        params: params
      });
    },

    //分页
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    // 远程查询
    search() {
      Axios({
        mehtod: "post",
        url:
          this.backendUrl+"/company/selectCompany?keyword=" +
          this.keyword
      })
        .then(response => {
          console.log(response);
          this.tableData = response.data;
          this.total = response.data.length;
        })
        .catch(error => {
          console.log(error);
        });
    }
  } //methods结束
};
</script>


<style scoped>
/* 全局 */
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

/* 卡片 */
/* .text {
    font-size: 14px;
} */
.item {
  padding: 18px 0;
}
.box-card {
  width: 100%;
}
</style>

