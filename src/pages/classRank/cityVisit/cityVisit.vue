<template>
    <div>
        <!-- 工具条 -->
        <el-card class="box-card">
        	<el-form :model="searchBox">
                <el-row>
                    <el-col :span="5">
                        <el-form-item>
                            <span id="TopTitle">回访城市排名检索</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                    		<el-button type="primary" id="btn">导入</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
							<el-button type="primary" id="btn1">导出</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                    		<el-button type="primary" class="search" icon="el-icon-search" plain v-on:click="find">检索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                	<el-col :span="5">
                		<el-form-item>
                			<el-select v-model="value8" filterable placeholder="教育类" class="Select">
                       			<el-option
		                            v-for="item in types"
		                            :key="item.value"
		                            :label="item.label"
		                            :value="item.value">
		                        </el-option>
		                    </el-select>
                        </el-form-item>
                	</el-col>
                	<el-col :span="5">
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
                	</el-col>
                	<el-col :span="5">
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
                	</el-col>
                	<el-col :span="5">
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
                	</el-col>
                	<el-col :span="4">
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
                	</el-col>
                </el-row>
            </el-form>
        </el-card>
    
        <!-- 签约城市列表 -->
        <el-card class="box-card">
            <el-table id="Table_visitcity" :data="visitCity" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                <el-table-column prop="year" label="年份" >
                </el-table-column>
                <el-table-column prop="index" label="序号">
                </el-table-column>
                <el-table-column prop="education_yon" label="类型" >
                </el-table-column>
                <el-table-column prop="city_name" label="城市" >
                </el-table-column>
                <el-table-column prop="province" label="省份" >
                </el-table-column>
                <el-table-column prop="returnCount" label="走访单位数" >
                </el-table-column>
                <el-table-column prop="visitCount" label="回访单位数" >
                </el-table-column>
                <el-table-column prop="rate" label="回访率" >
                </el-table-column>
                <el-table-column prop="weight" label="权重分析" >
                </el-table-column>
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
        <el-card class="box-card">
        	<el-row>
        		<el-col :span="9">
            		<span id="TopTitle1">回访率显著提升城市排名（对比于上一年）</span>
        		</el-col>
        	</el-row>
        </el-card>
        <!-- 签约率提升列表 -->
        <el-card class="box-card">
            <el-table id="Table_signrate" :data="visitCity" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                <el-table-column prop="index" label="序号">
                </el-table-column>
                <el-table-column prop="city" label="城市">
                </el-table-column>
                <el-table-column prop="province" label="省份">
                </el-table-column>
                <el-table-column prop="classify" label="城市分级">
                </el-table-column>
                <el-table-column prop="request" label="地区需求">
                </el-table-column>
                <el-table-column prop="thisRate" label="本年度回访率">
                </el-table-column>
                <el-table-column prop="lastRate" label="上年度回访率">
                </el-table-column>
                <el-table-column prop="grow" label="提升">
                </el-table-column>
            </el-table>
            <!-- 签约率提升分页 -->
            <el-pagination layout="prev, pager, next" background :total="1000" style="text-align:center;margin-top:20px">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'visitCity',
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
        visitCity_users: [],
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
    created(){
        this.$ajax({
            method:"get",
            url:"http://localhost:8080/returnCity/listAll",
            dataType:"json",
            // 跨域
            crossDomain:true,
            // 保证每次请求得到的数据都是最新的而不是缓存的数据
            cache:false,
        }).then(resolve => {
            // 收到数据后取消loading
            this.listLoading = false;
            this.visitCity = reslove.data;
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
    border-radius: 10px;
    margin-top: 10px;
}
#TopTitle {
        position: relative;
        text-align: left;
        /* border: 1px solid red; */
        font-size: 19px;
        margin-bottom: 1.7%;
    }
#TopTitle1 {
        position: relative;
        text-align: left;
        /* border: 1px solid red; */
        font-size: 19px;
        margin-bottom: 1.7%;
    }
</style>
