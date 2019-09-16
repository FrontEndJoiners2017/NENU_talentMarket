<template>
  <div>
    <!-- 工具条 -->
    <el-card class="box-card" v-if="!Detail">
      <el-form :inline="true" :model="form">
        <!-- inline行内的表单域;model表单数据对象 -->
        <el-row>
          <!-- <el-col class="Title"> -->
          <span class="TopTitle">生源城市排名检索</span>
          <!-- </el-col> -->
        </el-row>
        <el-row id="selectBoxs">
          <!-- 教育类别 -->
          <el-col :span="5">
            <el-form-item>
              <!-- v-model实现双向绑定，select选择框里面的数据绑定search数组里对应的对象 -->
              <el-select v-model="search.educationType" placeholder="教育类别" value-key="value">
                <el-option
                  v-for="item in form.educationType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4"></el-col>
          <!-- 年份 -->
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="search.year" placeholder="年份" value-key="value">
                <el-option
                  v-for="item in form.year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 城市分级,需要前端自己filterable搜索，Select 会找出所有label属性包含输入值的选项。 -->
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="search.exWeight" placeholder="城市分级" value-key="value" filterable>
                <el-option
                  v-for="item in form.exWeight"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button
              type="primary"
              class="search"
              icon="el-icon-search"
              plain
              v-on:click="find"
            >检索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 列表 -->
    <el-card class="box-card" v-if="!Detail">
      <el-table
        class="Table"
        :data="citySource.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        highlight-current-row
        v-loading="listLoading"
      >
        <el-table-column prop="city_year" label="年份"></el-table-column>
        <el-table-column type="index" label="序号" width="90px"></el-table-column>
        <el-table-column prop="education_yon" label="类型"></el-table-column>
        <el-table-column prop="city_name" label="城市"></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city_studentFrom" label="生源人数"></el-table-column>
        <el-table-column prop="student_rate" label="生源比率"></el-table-column>
        <el-table-column prop="student_rank" label="权重分析"></el-table-column>
        <!-- 查看详细信息 -->
        <el-table-column prop="details" label="详细信息">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detialInfor(scope); Detail=true">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total"
        @current-change="current_change"
        style="text-align:center;margin-top:20px"
      ></el-pagination>
    </el-card>

    <!-- 对话框/v-if实现查看单位详情功能 -->
    <el-card class="box-card" v-if="Detail">
      <span class="TopTitle">城市详细信息</span>
    </el-card>
    <el-card class="box-card" v-if="Detail">
      <el-row class="detailRow">
        <el-col :span="4">
          <span>城市名称：{{selectedName}}</span>
        </el-col>
        <el-col :span="4">
          <span>走访次数：{{DetailTable[0].cityVisit }}</span>
        </el-col>
      </el-row>
      <el-row class="detailRow">
        <span>所属省份:{{ DetailTable[0].province}}</span>
      </el-row>
      <el-row class="detailRow">
        <span>城市分级:{{ DetailTable[0].cityWeight}}</span>
      </el-row>
    </el-card>
    <!-- 详细页面单位列表 -->
    <el-card class="box-card" v-if="Detail">
      <el-form :inline="true" :model="companyList">
        <el-row>
          <el-col :span="3">
            <span class="TopTitle">单位列表</span>
          </el-col>
            <!-- 详细单位信息select选择器，因为后端数据库有问题，不能实现 -->
          <!-- <el-col :span="5">
            <el-form-item>
              <el-select v-model="selectCompany.year" placeholder="请选择年份">
                <el-option
                  v-for="item in companyList.year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-select v-model="selectCompany.companyKind" multiple placeholder="请选择单位类型">
                <el-option
                  v-for="item in companyList.companyKind"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-button
                type="primary"
                class="search"
                icon="el-icon-search"
                plain
                v-on:click="findCompany"
              >检索</el-button>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </el-card>
    <!-- 详细信息列表 -->
    <el-card class="box-card" v-if="Detail">
      <el-table
        class="Table"
        :data="DetailTable.slice((currentPage2-1)*pagesize,currentPage2*pagesize)"
        highlight-current-row
        v-loading="detailLoading"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="companyName" label="单位名称"></el-table-column>
        <el-table-column prop="companyNature" label="单位性质"></el-table-column>
        <el-table-column prop="cityYear" label="年份"></el-table-column>
        <el-table-column prop="citySign" label="签约总人数"></el-table-column>
        <el-table-column prop="basignNumber" label="签约本科"></el-table-column>
        <el-table-column prop="masignNumber" label="签约研究生"></el-table-column>
        <el-table-column prop="contactPeople" label="来校宣讲人"></el-table-column>
        <el-table-column prop="visitPeople" label="走访人"></el-table-column>
        <!-- 下面这俩XY没写好,prop字段名不对 -->
        <!-- <el-table-column prop="lectures" label="来校宣讲次数"></el-table-column>
        <el-table-column prop="boolean" label="走访情况"></el-table-column> -->
      </el-table>
      <!-- 详细信息分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total2"
        @current-change="current_change"
        style="text-align:center;margin-top:20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "sourceCity",
  // let cityName,
  methods: {
    find() {
      this.listLoading = true;
      let searchType = "education=" + this.search.educationType;
      let searchYear = "Syear=" + this.search.year;
      let searchName = "city_name=" + this.city_name;
      // 最多128个字符
      let searchUrl =
        "http://47.103.10.220:8081/studentFrom/select?" +
        searchType +
        "&" +
        searchYear +
        "&" +
        searchName;
      this.$ajax({
        method: "get",
        url: searchUrl,
        dataType: "json",
        // 跨域
        crossDomain: true,
        // 保证每次请求得到的数据都是最新的而不是缓存的数据
        cache: false
      }).then(
        resolve => {
          // 收到数据后取消loading
          this.listLoading = false;
          this.citySource = resolve.data;
          //分页设置，将元组总数目设为数据的总数目
          this.total = resolve.data.length;
          // console.log(resolve);
          console.log(resolve.data);
        },
        reject => {
          console.log("失败", reject);
          this.listLoading = true;
        }
      );
    },
    // 查看详细页面的检索
    // findCompany() {},
    // 查看
    detialInfor(scope) {
      // 使点击的那行的城市名出现在查看单位详情页上
      this.selectedName = scope.row.cityName;
      console.log(scope);
      // 查看详细单位页面
      this.listLoading = true;
      let self = this;
      this.$ajax({
        method: "post",
        url:
          "http://10.108.118.124:8080/city/cityDetails?cityName=" +
          self.selectedName,
        dataType: "json",
        // 跨域
        crossDomain: true,
        // 保证每次请求得到的数据都是最新的而不是缓存的数据
        cache: false
      }).then(
        resolve => {
          // 收到数据后取消loading
          this.detailLoading = false;
          this.DetailTable = resolve.data;
          //分页设置，将元组总数目设为数据的总数目
          this.total2 = resolve.data.length;
          console.log(resolve.data);
        },
        reject => {
          console.log("失败", reject);
          this.detailLoading = true;
        }
      );
    },
    //分页设置，保持传入分页的当前页，令定义的当前页=分页的当前页
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    //详情页面分页设置
    current_change2(currentPage) {
      this.currentPage2 = currentPage;
    }
  },
  data() {
    return {
      // 点击查看获取到该行的城市名
      selectedName: "",
      // 详细信息设置，初始不可见
      Detail: false,
      listLoading: true,
      //分页设置，当前页数为1，每页装的元组为10，元组总数目初始为0
      currentPage: 1,
      pagesize: 10,
      total: 0,

      // 签约城市表格部分
      citySource: [],

      // 搜索表单数据时option
      form: {
        educationType: [
          {
            value: "1",
            label: "教育类"
          },
          {
            value: "2",
            label: "非教育类"
          }
        ],
        year: [
          {
            value: "2018",
            label: "2018"
          },
          {
            value: "2019",
            label: "2019"
          }
        ],
        exWeight: [
          {
            value: "A",
            label: "A"
          },
          {
            value: "B",
            label: "B"
          },
          {
            value: "C",
            label: "C"
          },
          {
            value: "D",
            label: "D"
          },
          {
            value: "E",
            label: "E"
          }
        ]
      },
      // select双向绑定的数组对象
      search: {
        educationType: "",
        year: "",
        exWeight: ""
      },
      // -------------------------详细页面部分---------------------------------
      // 详细信息表格
      DetailTable: [],
      // 详细页面加载
      detailLoading: true,
      // 详情页面分页
      currentPage2: 1,
      total2: 0,
      // 详细页面的select双向绑定的数组对象
      selectCompany: {
        year: "",
        companyKind: ""
      },
      // 详细页面搜索表单数据时option
      companyList: {
        //单位类型
        companyKind: [
          {
            value: 1,
            label: "签约单位"
          },
          {
            value: 2,
            label: "来校宣讲"
          },
          {
            value: 3,
            label: "走访单位"
          }
        ],
        year: [
          {
            value: "2018",
            label: "2018"
          },
          {
            value: "2019",
            label: "2019"
          }
        ]
      }
    };
  },
  // 获取数据后渲染
  created() {
    this.listLoading = true;
    this.$ajax({
      method: "get",
      url: "http://47.103.10.220:8081/studentFrom/studentFromList",
      dataType: "json",
      // 跨域
      crossDomain: true,
      // 保证每次请求得到的数据都是最新的而不是缓存的数据
      cache: false
    }).then(
      resolve => {
        // 收到数据后取消loading
        this.listLoading = false;
        this.citySource = resolve.data;
        //分页设置，将元组总数目设为数据的总数目
        this.total = resolve.data.length;
        // console.log(resolve);
        console.log(resolve.data);
      },
      reject => {
        console.log("失败", reject);
        this.listLoading = true;
      }
    );
  }
};
</script>

<style scoped>
/* card设置 */
/* card设置 */
.box-card {
  width: 100%;
  border-radius: 10px;
  /* padding-left: 1%; */
}
/* 标题 */
.TopTitle {
  font-size: 19px;
}
/* 搜索部分上下间距 */
#selectBoxs {
  margin-top: 1.5%;
}

.detailRow {
  text-align: left;
  margin-top: 0.5%;
  margin-bottom: 0.5%;
}
</style>

