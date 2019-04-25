<template>
	<div id="former">
		<el-container>
			<el-main>
				<div id="intercity">
					<el-card id="box-card">
  						<div slot="header" class="clearfix" id="cardtitle">
    						<span>走访城市排名检索</span>
    						<el-button size="small">导入</el-button>
    						<el-button size="small">导出</el-button>
  						</div>
  						<div  class="text item" id="searchbox">
  							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item label="" id="select1">
								    <el-select size="small" v-model="formInline.category" placeholder="教育类">
								        <el-option label="教育类" value="教育类"></el-option>
								      	<el-option label="非教育类" value="非教育类"></el-option>
								    </el-select>
								</el-form-item>
								<el-form-item>
									<el-input id="fillin" size="small" placeholder="城市名称/省份" v-model="input10" clearable></el-input>
								</el-form-item>
								<el-form-item label="">
								    <el-select size="small" v-model="formInline.rank" placeholder="A">
								        <el-option label="A" value="一等"></el-option>
								      	<el-option label="B" value="二等"></el-option>
								      	<el-option label="C" value="三等"></el-option>
								      	<el-option label="D" value="四等"></el-option>
								      	<el-option label="E" value="五等"></el-option>
								    </el-select>
								</el-form-item>
								<el-form-item>
								    <el-button size="small" @click="onSubmit">检索</el-button>
								</el-form-item>
							</el-form>
  						</div>
					</el-card>
				</div>
				
				<div id="for_inter_tab">
					<el-table :data="tableData" style="width: 100%" id="eltable">
      					<el-table-column prop="order" label="序号"></el-table-column>
      					<el-table-column prop="type" label="类型"></el-table-column>
      					<el-table-column prop="city" label="城市"></el-table-column>
      					<el-table-column prop="province" label="省份"></el-table-column>
      					<el-table-column prop="intercount" label="走访次数"></el-table-column>
      					<el-table-column prop="weightanalysis" label="权重分析"></el-table-column>
      					<el-table-column prop="detailedinfor" label="详细信息">
      						<template slot-scope="scope">
        						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						    </template>
      					</el-table-column>
    				</el-table>
				</div>
				
				<div class="block" id="page"><!--分页-->
				    <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
				</div>
				
			</el-main>
		</el-container>
    </div>
</template>

<script>
	export default {
	  methods: {
        handleClick(row) {
          console.log(row);
        },
        onSubmit() {
          console.log('submit!');
        }
      },
      
    
      data() {
        return {
          formInline: {
            category: '',
            rank: ''
          },
          input10: '',
          tableData: [{
            order: '1',
            type: '教育',
            city:'长春市',
            province:'吉林省',
            intercount:'12',
            weightanalysis:'A',
          }, {
            order: '2',
            type: '教育',
            city:'沈阳市',
            province:'辽宁省',
            intercount:'12',
            weightanalysis:'A',
          }],
          options: [{
	        value: '选项1',
	        label: '教育类'
	      }, {
	        value: '选项2',
	        label: '非教育类'
	      }, {
	        value1: '选项1',
	        label: 'A'
	      }, {
	        value1: '选项2',
	        label: 'B'
	      }, {
	        value1: '选项3',
	        label: 'C'
	      }, {
	        value1: '选项4',
	        label: 'D'
	      }, {
	        value1: '选项5',
	        label: 'E'
	      }],
	      value: '',
	      value1: ''
	      
        }
      }
    }
	
	
</script>

<style scoped>
	/*card部分*/	
	#box-card{
        padding: 0% 2%;
        border: #cbcaca 1px solid;
        border-radius: 10px;
        margin-top: 1%;
        margin-bottom: 25px;
        
	}
	#intercity{
		width: 100%;
        margin: 0 auto;
        margin-top: 1%;
	}
	#cardtitle{
		border: 0;
	}
	#cardtitle  span{float: left;}
	#select1{
		float: left;
	}
	#fillin{
		margin-top: 3px;
		float: left;
	}
	.el-card{
		box-shadow: 0;
	}
	.el-card__header{
		padding: 18px 0px;
		border-bottom: 0px;
	}
	.el-card__body {
    padding: 0px;
	}
	
	
	
	.text {
	    font-size: 14px;
	}
	
	.item {
	    margin-bottom: 18px;
	}
	.clearfix:before,
	.clearfix:after {
	    display: table;
	    content: "";
	}
	.clearfix:after {
	    clear: both;
	}
	
	.box-card {
	    width: 480px;
	}
	
	/*表格*/
	#eltable{
		border-radius: 10px;
        width: 100%;
        padding: 1% 2%;
        border: #cbcaca 1px solid;
        margin-top: 1%;
	}
	
	
	
	/*分页*/
	#page{
		margin-top: 20px;
		margin-bottom: 20px;
	}
</style>
