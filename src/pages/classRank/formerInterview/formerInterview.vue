<template>
    <div>
        <!-- 工具条 -->
        <el-card class="box-card">
        	<el-form :model="searchBox">
                <el-row>
                    <el-col :span="5">
                        <el-form-item>
                            <span id="TopTitle">走访城市排名检索</span>
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
                </el-row>
                <el-row>
                	<el-col :span="6">
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
                	<el-col :span="6">
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
                	<el-col :span="6">
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
                	<el-col :span="5">
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="search()" plain>检索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    
        <!-- 签约城市列表 -->
        <el-card class="box-card">
            <el-table id="Table_intercity" :data="interCity" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
                <el-table-column prop="index" label="序号">
                </el-table-column>
                <el-table-column prop="education_yon" label="类型" >
                </el-table-column>
                <el-table-column prop="city_name" label="城市" >
                </el-table-column>
                <el-table-column prop="province" label="省份" >
                </el-table-column>
                <el-table-column prop="city_visit" label="走访次数" >
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
        interCity_users: [],
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
//      loading:true,
      }
    },
    // 获取数据后渲染
    created(){
        this.$ajax({
            method:"get",
            url:"http://localhost:8081/testBoot/listAll",
            dataType:"json",
            // 跨域
            crossDomain:true,
            // 保证每次请求得到的数据都是最新的而不是缓存的数据
            cache:false,
        }).then(resolve => {
            for(let index=0;index<resolve.data;index++){
				this.tableData[i] = JSON.stringify(resolve.data[i]);
			}
			this.interCity = resolve.data;
				
//			this.tableData = JSON.stringify(resolve.data);
			console.log(resolve)
			//获取数组长度并赋值给total
			//this.total = resolve.data.report.length;
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
</style>
