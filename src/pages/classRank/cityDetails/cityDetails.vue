<template>
  <div>
    <!-- 页面文字：城市详细信息 -->
    <el-card class="box-card">
      <h1>城市详细信息</h1>
    </el-card>
    <!-- 城市详细介绍 -->
    <el-card class="box-card">
      <!-- 撤销下面的注释，table不可用，还未解决 -->
      <div class="referral">
        <h3>城市名称:{{ cName }}</h3>
        <h3>走访次数:{{ visit }}</h3>
        <h3>所属省份:{{ cProvence}}</h3>
        <h3>城市分级:{{ cityGrading }}</h3>
      </div>
    </el-card>

    <!-- 单位拉列表信息   -->
    <el-card class="box-card">
      <el-form :inline="true" :model="filters" ref>
        <div id="Search">
          <h1>单位列表</h1>
          <!-- select选择器 -->
          <el-form-item>
            <el-select v-model="value8" filterable placeholder="2019" class="select">
              <el-option
                v-for="item in years"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 复选框 -->
          <el-checkbox-group v-model="checkList" class="select_more">
            <el-checkbox label="签约单位"></el-checkbox>
            <el-checkbox label="来校宣讲"></el-checkbox>
            <el-checkbox label="走访单位"></el-checkbox>
          </el-checkbox-group>
          <!-- 检索按钮 -->
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              plain
              v-on:click="find"
              class="search"
            >检索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <!-- 列表 -->
    <el-card class="box-card">
      <el-table
        class="Table"
        :data="Details"
        highlight-current-row
        v-loading="listLoading"
        @selection-change="selsChange"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="单位名称"></el-table-column>
        <el-table-column prop="nature" label="单位性质"></el-table-column>
        <el-table-column prop="year" label="年份"></el-table-column>
        <el-table-column prop="number" label="签约总人数"></el-table-column>
        <el-table-column prop="undergraduate" label="签约本科"></el-table-column>
        <el-table-column prop="graduate" label="签约研究生"></el-table-column>
        <el-table-column prop="lectures" label="来校宣讲次数"></el-table-column>
        <el-table-column prop="boolean" label="走访情况"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total"
        style="text-align:center;margin-top:20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "cityDetails",
  methods: {
    //分页设置，保持传入分页的当前页，令定义的当前页=分页的当前页
    current_change(currentPage) {
      this.currentPage = currentPage;
    }
  },
  data() {
    return {
      //分页设置，当前页数为1，每页装的元组为10，元组总数目初始为0
      currentPage: 1,
      pagesize: 10,
      total: 0,

      //多选框默认选择项
      checkList: ["签约单位"],

      // 表格部分
      intentionCityDetails: [],

      //select选择器中数据
      years: [
        {
          value: "",
          label: ""
        },
        {
          value: "",
          label: ""
        }
      ]
    };
  },
  // 获取数据后渲染
  created() {
    this.listLoading = true;
    this.$ajax({
      method: "get",
      url: "",
      dataType: "json",
      // 跨域
      crossDomain: true,
      // 保证每次请求得到的数据都是最新的而不是缓存的数据
      cache: false
    }).then(
      resolve => {
        // 收到数据后取消loading
        this.listLoading = false;
        this.signCity = reslove.data;
        console.log(resolve);
        //分页设置，将元组总数目设为数据的总数目
        this.total = resolve.data.report.length;
        console.log(resolve.data);
      },
      reject => {
        console.log("失败", reject);
      }
    );
  }
};
</script>

<style scoped>
/* h1标题，为了保证和检索按钮等在一行 */
h1 {
  display: inline-block;
  /* vertical-align: top; */
}
/* select选择器 */
.select {
  display: inline-block;
  vertical-align: top;
  margin-left: 30px;
}
/* 复选框 */
.select_more {
  display: inline-block;
  vertical-align: middle;
  margin-left: 30px;
}
/* 搜索按钮 */
.search {
  display: inline-block;
  margin-left: 70%;
  vertical-align: top;
}
/* card设置 */
.box-card {
  width: 100%;
}
</style>