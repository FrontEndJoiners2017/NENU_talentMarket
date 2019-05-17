<template>
    <div>
        <!-- 工具条 -->
        <el-card class="box-card">
			<el-form :inline="true" :model="filters" ref="">  <!-- inline行内的表单域;model表单数据对象,ref数据来自的表格 -->
				<div id="Search">
                    <span id="TopTitle">签约城市排名检索</span>
                    <el-button type="primary" class="search" icon="el-icon-search" plain v-on:click="find">检索</el-button>
				</div>
				<el-form-item>
					<!-- filterable属性即可启用搜索功能。默认情况下，Select 会找出所有label属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个filter-method来实现。 -->
                    <el-select v-model="value8" filterable placeholder="教育类" class="Select">
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
					<el-select v-model="value8" filterable placeholder="2019" class="Select">
                        <el-option
                            v-for="item in years"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
					<el-select v-model="value8" filterable placeholder="城市名称/省份" class="Select">
                        <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
					<el-select v-model="value8" filterable placeholder="签约人数" class="Select">
                        <el-option
                            v-for="item in numbers"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
				</el-form-item>
                <el-form-item>
                    <el-select v-model="value8" filterable placeholder="A" class="Select">
                        <el-option
                            v-for="item in weights"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
			</el-form>
        </el-card>
    
        <!-- 签约城市列表 -->
        <el-card class="box-card">
            <el-table id="Table_signcity" :data="citySign" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                <el-table-column prop="year" label="年份" >
                </el-table-column>
                <el-table-column prop="index" label="序号">
                </el-table-column>
                <el-table-column prop="type" label="类型" >
                </el-table-column>
                <el-table-column prop="name" label="城市" >
                </el-table-column>
                <el-table-column prop="cProvince" label="省份" >
                </el-table-column>
                <!-- <el-table-column prop="unit" label="签约单位" > -->
                <!-- </el-table-column> -->
                <el-table-column prop="sign" label="签约人数" >
                </el-table-column>
                <el-table-column prop="recency" label="签约率" >
                </el-table-column>
                <!-- <el-table-column prop="weight" label="权重分析" > -->
                <!-- </el-table-column> -->
                <el-table-column prop="expect" label="五年签约数（本）" >
                </el-table-column>
                <!-- <el-table-column prop="graduater" label="五年签约数（研）" >
                </el-table-column> -->
                <!-- 查看详细信息 -->
                <el-table-column prop="details" label="详细信息">
                    <router-link to="cityDetails">
                        <el-button type="text" size="small">查看</el-button>
                    </router-link>
                </el-table-column>
            </el-table>
            <!-- 签约城市列表分页 -->
            <el-pagination layout="prev, pager, next" background :total="total" style="margin-top:20px;text-align:center">
            </el-pagination>
        </el-card>


        <!-- 签约率提升表头 -->
        <!-- <el-card class="box-card">
            <span id="TopTitle1">签约率显著提升城市排名（对比于上一年）</span>
        </el-card> -->
        <!-- 签约率提升列表 -->
        <!-- <el-card class="box-card">
            <el-table id="Table_signrate" :data="signCityRate" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                <el-table-column prop="index" label="序号">
                </el-table-column>
                <el-table-column prop="city" label="城市">
                </el-table-column>
                <el-table-column prop="province" label="省份">
                </el-table-column>
                <el-table-column prop="classify" label="城市分类">
                </el-table-column>
                <el-table-column prop="request" label="地区要求">
                </el-table-column>
                <el-table-column prop="thisRate" label="本年度签约率">
                </el-table-column>
                <el-table-column prop="lastRate" label="上年度签约率">
                </el-table-column>
                <el-table-column prop="grow" label="提升">
                </el-table-column>
            </el-table> -->
            <!-- 签约率提升分页 -->
            <!-- <el-pagination layout="prev, pager, next" background :total="1000" style="text-align:center;margin-top:20px">
            </el-pagination>
        </el-card> -->
    </div>
</template>

<script>
export default {
    name:'signCity',
    methods: {
        // 查看
        handleClick(row) {
        console.log(row);
      },
      //分页设置，保持传入分页的当前页，令定义的当前页=分页的当前页
        // current_change(currentPage){
        // this.currentPage = currentPage;
        // },
        // find(){

        // }
    },
    data() {
        return {
    //loading加载
        listLoading: false,
    //分页设置，当前页数为1，每页装的元组为10，元组总数目初始为0
        currentPage: 1,
        pagesize: 10,
        total: 0,

    // 签约城市表格部分
        signCity_users: [],
        //   签约率表格部分
        growRate: [],

    //   select选择器中数据
        types:[{
            value: '1',
            label: '教育类'
        },{
            value: '2',
            label: '非教育类'
        }]
      }
    },
    // 获取数据后渲染
    created(){;
        this.$ajax({
            method:"get",
            url:"http://localhost:8080/city/citySign",
            dataType:"json",
            // 跨域
            crossDomain:true,
            // 保证每次请求得到的数据都是最新的而不是缓存的数据
            cache:false,
        }).then(resolve => {
            // 收到数据后取消loading
            this.listLoading = false;
            this.citySign =  resolve.data;
            console.log(resolve)
            console.log(resolve.data);
        },reject => {
            console.log("失败",reject);
        })
    },
  };
</script>

<style scoped>
/* h1标题，为了保证和检索按钮在一行 */
h1{
    display: inline-block;
}
/* 搜索框 */
.search{
    display:inline-block;
    margin-left: 70%;
    vertical-align:middle;
}
/* card设置 */
.box-card{
    width:100%;
}

/* 标题 */

#TopTitle {
        position: relative;
        text-align: left;
        font-size: 19px;
        margin-bottom: 1.7%;
    }
#TopTitle1 {
        position: relative;
        text-align: left;
        font-size: 19px;
        margin-bottom: 1.7%;
    }
</style>
