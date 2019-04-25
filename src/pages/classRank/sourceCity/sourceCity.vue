<template>
    <section>
        <!-- 工具条 -->
        <el-col :span="24" class="toolbar" style="margin-top: 60px;">
			<el-form :inline="true" :model="filters" ref="">  <!-- inline行内的表单域;model表单数据对象,ref数据来自的表格 -->
				<div id="Search">
                    <span>生源城市排名检索</span>
                    <el-form-item>
					    <el-button type="primary" class="search" v-on:click="find">检索</el-button>
				    </el-form-item>
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
        </el-col>
        
        <!-- 列表 -->
        <el-table class="Table" :data="sourceCity_users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="year" label="年份" width="160">
            </el-table-column>
            <el-table-column type="index" label="序号" width="160">
			</el-table-column>
            <el-table-column prop="type" label="类型" width="160">
            </el-table-column>
            <el-table-column prop="city" label="城市" width="160">
            </el-table-column>
            <el-table-column prop="province" label="省份" width="160">
            </el-table-column>
            <el-table-column prop="number" label="生源人数" width="160">
            </el-table-column>
            <el-table-column prop="rate" label="生源比率" width="160">
            </el-table-column>
            <el-table-column prop="weight" label="权重分析" width="160">
            </el-table-column>
            <!-- 查看详细信息 -->
			<el-table-column prop="details" label="详细信息" width="160" >
				<template slot-scope="scope">
                    <router-link to="sourceCityDetails">
					    <el-button type="text" size="small">查看</el-button>
                    </router-link>
				</template>
			</el-table-column>
		</el-table>

        <!-- 分页 -->
        <el-col :span="24" class="paging">
			<el-pagination layout="prev, pager, next" :pager-count="11" :page-size="20" :total="1000" style="float:middle;">
			</el-pagination>
		</el-col>	

    </section>
</template>

<script>
  export default {
    name:'sourceCity',
    methods: {
        // 查看
        handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
         // 表格部分
          sourceCity_users: [{
            year: '',
            index: '',
            type: '',
            city:'',
            province:'',
            number:'',
            rate:'',
            weight:'',
            details:''
          },{

          }],
        //select选择器中数据
        types:[{
            value: '选项1',
            label: '教育类'
        },{
            value: '选项2',
            label: '非教育类'
        }]
      }
    }
  };
</script>

<style scoped>
/* 工具检索栏 */
.toolbar {
    margin:2% 0;
    padding: 1% 0;
    background-color: aliceblue;
    border-radius: 8px;  
}
/* 搜索框 */
#Search{
    padding:2% 3%;
    text-align: left;
    color:rgb(52, 66, 92);
    font-weight: 700;
}
/* 检索按钮 */
.search{
    margin-left: 1480%;
}
/* 表格 */
.Table{
     border-radius: 8px;
     padding: 1% 3%;
}
/* 分页 */
.paging{
    background-color: transparent;
    width:100%;
    margin:2% 0;
}
</style>