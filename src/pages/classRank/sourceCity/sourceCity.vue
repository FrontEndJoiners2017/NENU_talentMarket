<template>
  <div>
    <!-- 工具条 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="filters" ref>
        <!-- inline行内的表单域;model表单数据对象,ref数据来自的表格 -->
        <div id="Search">
          <h1>生源城市排名检索</h1>
          <el-button type="primary" class="search" icon="el-icon-search" plain v-on:click="find">检索</el-button>
        </div>
        <el-form-item>
          <!-- filterable属性即可启用搜索功能。默认情况下，Select 会找出所有label属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个filter-method来实现。 -->
          <el-select v-model="value8" filterable remote placeholder="教育类" class="Select">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value8" filterable placeholder="2019" class="Select">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value8" filterable placeholder="城市名称/省份" class="Select">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value8" filterable placeholder="生源人数" class="Select">
            <el-option
              v-for="item in numbers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value8" filterable placeholder="A" class="Select">
            <el-option
              v-for="item in weights"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 列表 -->
    <el-card class="box-card">
      <el-table
        class="Table"
        :data="sourceCity_users.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        highlight-current-row
        v-loading="listLoading"
        @selection-change="selsChange"
      >
        <el-table-column prop="year" label="年份"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="number" label="生源人数"></el-table-column>
        <el-table-column prop="rate" label="生源比率"></el-table-column>
        <el-table-column prop="weight" label="权重分析"></el-table-column>
        <!-- 查看详细信息 -->
        <el-table-column prop="details" label="详细信息">
          <router-link to="cityDetails">
            <el-button type="text" size="small">查看</el-button>
          </router-link>
        </el-table-column>
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
  name: "sourceCity",
  methods: {
    // 查看
    handleClick(row) {
      console.log(row);
    },
    //分页设置，保持传入分页的当前页，令定义的当前页=分页的当前页
    current_change(currentPage) {
      this.currentPage = currentPage;
    }
  },
  data() {
    return {
      //loading加载
      listLoading: false,
      //分页设置，当前页数为1，每页装的元组为10，元组总数目初始为0
      currentPage: 1,
      pagesize: 10,
      total: 0,

      // 表格部分
      sourceCity_users: [],
      //select选择器中数据
      types: [
        {
          value: "1",
          label: "教育类"
        },
        {
          value: "2",
          label: "非教育类"
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
/* h1标题，为了保证和检索按钮在一行 */
h1 {
  display: inline-block;
}
/* 搜索框 */
.search {
  display: inline-block;
  margin-left: 70%;
  vertical-align: middle;
}
/* card设置 */
.box-card {
  width: 100%;
}
</style>