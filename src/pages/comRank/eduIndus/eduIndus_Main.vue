// 教育行业
<template>
    <el-container>
        <el-main>
            <!-- 搜索框部分 -->
            <div id="eduTop">
                <el-card id="edu-boxCard">
                    <div id="TopTitle">
                        <span>教育行业 / 往年市场开发历史纪录</span>
                    </div>
                    <!-- 使用栅格设置input框的大小 -->
                    <el-col :span="5">
                        <el-input v-model="input" placeholder="关键字搜索" id="searchIn"></el-input>
                    </el-col>
                    <span id="CheckBtn">
                        <el-checkbox label="详细数据"></el-checkbox>
                        <el-checkbox label="数据分级"></el-checkbox>
                        <el-button type="primary" icon="el-icon-search">检索</el-button>
                    </span>
                </el-card>
            </div>
            <!-- 表格 -->
            <div id="eduTable">
                <!-- data需要与后端传入的数据做操作，此处为静态data -->
                <el-table :data="tableData" id="elTable">
                    <!-- 创建表格各列 -->
                    <el-table-column align="center" prop="year" label="年份"></el-table-column>
                    <el-table-column align="center" prop="order" label="序号"></el-table-column>
                    <el-table-column align="center" prop="city" label="城市"></el-table-column>
                    <el-table-column align="center" prop="province" label="省份"></el-table-column>
                    <el-table-column align="center" prop="expectation" label="毕业期望"></el-table-column>
                    <el-table-column align="center" prop="current_contract" label="本届签约"></el-table-column>
                    <el-table-column align="center" prop="graduate_source" label="年毕业生源"></el-table-column>
                    <el-table-column align="center" prop="visited" label="往届走访"></el-table-column>
                    <el-table-column align="center" prop="return_rate" label="回访率"></el-table-column>
                    <el-table-column align="center" prop="city_level" label="城市级别"></el-table-column>
                    <el-table-column align="center" prop="comp_score" label="综合评分"></el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>

<script>
// 引入表格

export default {
    name: 'eduIndus_Main',
    data() {
        return{
            input: '',
            tableData: [{
                year: '2019',
                order: '1',
                city: '长春',
                province: '吉林',
                expectation: 'A',
                current_contract: 'A',
                graduate_source: 'B',
                visited: 'A',
                return_rate: 'A',
                city_level: 'A',
                comp_score: '4.87'
            },{
                year: '2019',
                order: '1',
                city: '长春',
                province: '吉林',
                expectation: 'A',
                current_contract: 'A',
                graduate_source: 'B',
                visited: 'A',
                return_rate: 'A',
                city_level: 'A',
                comp_score: '4.87'
            }]
        }
    }
}
</script>
<style>
    #eduTop {
        width: 99.5%;
        border: #cbcaca 1px solid;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 1%;
    }
    #edu-boxCard {
        position: relative;
        width: 99.8%;
        border-radius: 10px;
    }
    #TopTitle {
        position: relative;
        text-align: left;
        /* border: 1px solid red; */
        font-size: 19px;
        margin-bottom: 1.7%;
    }
    /* 使用选择器设置input的高度 */
    #searchIn {
        display: inline-block;
        height: 30px;
    }
    #CheckBtn {
        display: inline-block;
        /* border: 1px solid red; */
        /* position: absolute; */
    }
    .dataIO {
        height: 30px;
    }
    #eduTable{
        padding: 1%;
        border: #cbcaca 1px solid;
        color: #333;
        margin-top: 1%;
        border-radius: 10px;
    }
    #elTable {
        border-radius: 10px;
        width: 100%;
    }
</style>
