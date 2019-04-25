<template>
    <section>
        <!-- 城市详细信息 -->
        <div class="detailsHead">城市详细信息</div>
        <!-- 城市介绍 -->
        <div class="referral">
            城市名称:<p>{{ cityNasme }}</p>
            走访次数:<p>{{ visitNumber }}</p>
            所属省份:<p>{{ provenceOf }}</p>
            城市分级:<p>{{ cityGrading }}</p>
        </div> 
        <!-- 单位拉列表信息   -->
        <el-col :span="24" class="toolbar" style="margin-top: 60px;">
			<el-form :inline="true" :model="filters" ref="" >                 
				<div id="Search">
                    <span>单位列表</span>
                    <!-- 多选框 -->
                    <el-form-item>
					    <el-select v-model="value8" filterable placeholder="2019" class="Select">
                            <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
				    </el-form-item>
                    <el-checkbox-group v-model="checkList" class="select_more">
                        <el-checkbox label="签约单位"></el-checkbox>
                        <el-checkbox label="来校宣讲"></el-checkbox>
                        <el-checkbox label="走访单位"></el-checkbox>
                    </el-checkbox-group>
                    <el-form-item>
					    <el-button type="primary" v-on:click="find" class="search">检索</el-button>
				    </el-form-item>
                </div>
                <!-- 表格内容 -->
                
			</el-form>
        </el-col>
        
        <!-- 列表 -->
        <el-table class="Table" :data="intentionCityDetails" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="index" label="序号" width="160">
			</el-table-column>
            <el-table-column prop="name" label="单位名称" width="160">
            </el-table-column>
            <el-table-column prop="nature" label="单位性质" width="160">
            </el-table-column>
            <el-table-column prop="year" label="年份" width="160">
            </el-table-column>
            <el-table-column prop="number" label="签约总人数" width="160">
            </el-table-column>
            <el-table-column prop="undergraduate" label="签约本科" width="160">
            </el-table-column>
            <el-table-column prop="graduate" label="签约研究生" width="160">
            </el-table-column>
            <el-table-column prop="lectures" label="来校宣讲次数" width="160">
            </el-table-column>
            <el-table-column prop="boolean" label="走访情况" width="160">
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
    name:'intentionCityDetails',
    methods: {
    },
    data() { 
      return {
        //   多选框默认选择项
          checkList: ['签约单位'],
         // 表格部分
          intentionCityDetails: [{
            index: '',
            name:'',
            nature:'',
            year: '',
            number:'',
            undergraduate:'',
            graduate:'',
            lectures:'',
            boolean:''
          },{

          }],
        //select选择器中数据
        types:[{
            value: '',
            label: ''
        },{
            value: '',
            label: ''
        }]
      }
    }
  };
</script>

<style scoped>
/* 文字：城市详细信息 */
.detailsHead{
    background-color: aliceblue;
    border-radius: 8px;  
    height:20%;
    margin:2% 0;
    padding:1% 3%;
    text-align: left;
    font-weight: 700
}
/* 城市介绍 */
.referral{
    background-color: aliceblue;
    border-radius: 8px;  
    height:20%;
    padding:1% 3%;
    margin-top:-10px;
    margin-bottom: -30px;
    text-align: left;
    font-weight: 700;
    line-height: 90%;
}
.referral p{
    margin-left: 20%;
}
/* 工具检索栏 */
.toolbar {
    background-color: aliceblue;
    border-radius: 8px;
    margin-bottom: -40px;  
}
/* 下拉选择框 */
.Select{
    margin:0 30% 0 30%; 
}
/* 多选框 */
.select_more{
    display: inline-block;
    margin-top: 1%;
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
    margin-left: 480%;
}
/* 表格 */
.Table{
     border-radius: 8px;
     padding:1% 3%;
}
/* 分页 */
.paging{
    background-color: transparent;
    width:100%;
    margin:2% 0;
}
</style>