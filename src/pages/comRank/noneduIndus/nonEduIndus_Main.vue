<template>
    <el-container>
        <div id="nonHome">
            <!-- 搜索框部分 -->
            <el-card class="nonedu-boxCard">
                <div id="TopTitle">
                    <span>非教育行业 / 往年市场开发历史纪录</span>
                </div>
                <el-form :model="searchBox">
                    <!-- 使用栅格设置input框的大小 -->
                    <el-row>
                        <el-col :span="5">
                            <el-form-item prop="searchInput">
                                <el-input v-model="searchBox.searchInput" placeholder="关键字搜索" id="searchIn"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item prop="detailDigital">
                            <!-- el-checkbox的返回值为 true 或 false -->
                                <el-checkbox v-model="searchBox.detailDigital" label="详细数据" ></el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item prop="digitalClassification">
                                <el-checkbox v-model="searchBox.digitalClassification" label="数据分级" ></el-checkbox>
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
            <!-- 表格 -->
            <el-card class="nonedu-boxCard" id="noneduTable">
                <!-- data需要与后端传入的数据做操作 -->
                <!-- 
                    JavaScript的slice方法： 
                    语法：arrayObject.slice(start,end)
                    返回一个包含从start到end的arrayObject中的元素

                    tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) <=> 每页返回10个tableData数组的子元素
                    第一页从0开始到10结束，依次返回。因为currentPage是不断在变化的  
                -->
                <el-table v-loading="nonLoading" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" id="elTable">
                    <!-- 创建表格各列 -->
                    <el-table-column align="center" prop="year" label="年份"></el-table-column>
                    <el-table-column align="center" prop="id" label="序号"></el-table-column>
                    <el-table-column align="center" prop="city_name" label="城市"></el-table-column>
                    <el-table-column align="center" prop="province" label="省份"></el-table-column>
                    <el-table-column align="center" prop="city_exception" label="毕业期望"></el-table-column>
                    <el-table-column align="center" prop="city_sign" label="本届签约"></el-table-column>
                    <el-table-column align="center" prop="city_studentFrom" label="毕业生源"></el-table-column>
                    <el-table-column align="center" prop="city_visit" label="往届走访"></el-table-column>
                    <el-table-column align="center" prop="city_recency" label="回访率"></el-table-column>
                    <el-table-column align="center" prop="city_grading" label="城市级别"></el-table-column>
                    <el-table-column align="center" prop="city_score" label="综合评分"></el-table-column>
                </el-table>
                <!-- 分页 -->
                <div id="pagination">
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
                </div>
            </el-card>
        </div>
    </el-container>
</template>

<script>
// 引入表格

export default {
    data() {
        return{
            input: '',
            tableData: [],
            //当前页数
            currentPage: 1,
            //每页装的元组
            pagesize: 10,
            //元组总数目
            total: 0,

            //搜索部分
            searchBox: {
                //搜索输入框
                searchInput: '',
                //详细数据
                detailDigital: 0,
                //城市分级
                digitalClassification: 0,
            },
            //加载
            nonLoading: true,
        }
    },
    methods: {
        //传入分页的当前页，令定义的当前页=分页的当前页
        current_change(currentPage){
            this.currentPage = currentPage;
        },
        //进行搜索
        search(){
            console.log(this.searchBox.detailDigital);
            this.$ajax({
                method: "post",
                url: "http://localhost:8088/testBoot/selectEducationByKeyword",
                //keyword与后端代码中的局部变量相同
                data:{
                    keyword: this.searchBox.searchInput,
                },
                crossDomain: true,
                cache: false,
                // 加"transformRequest"属性对请求数据进行格式化
                transformRequest(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
            }).then(response => {
                this.tableData = response.data;
                this.total = response.data.length;
                this.nonLoading = false,
                console.log(response.data);
            },reject =>{
                this.nonLoading = true,
                console.log("失败"+reject);
            })
        },
    },
    created() {
        this.$ajax({
            method: "post",
            url: "http://localhost:8088/testBoot/listAll",
            dataType: "json",
            //跨域
            crossDomain: true,
            //保证每次请求得到的数据都是最新的而不是缓存的数据
            cache: false,
        }).then(resolve => {
            this.tableData = resolve.data;
            //将元组总数目设为数据的总数目
            this.total = resolve.data.length;
            this.nonLoading = false,
            console.log(resolve.data);
        }, reject => {
            this.nonLoading = true,
            console.log("失败",reject);
        })
    },
}
</script>
<style scoped>
    #nonHome {
        width: 100%;
        margin-top: 1%;
    }
    .nonedu-boxCard {
        border-radius: 10px;
        text-align: center;
    }
    .el-form-item {
        margin-bottom: 0;
    }
    #TopTitle {
        position: relative;
        text-align: left;
        /* border: 1px solid red; */
        font-size: 19px;
        margin-bottom: 1.7%;
    }
    /* 使用选择器设置input的高度 */
    #CheckBtn {
        display: inline-block;
        /* border: 1px solid red; */
        /* position: absolute; */
    }
    .dataIO {
        height: 30px;
    }
    #noneduTable{
        /* padding: 1%; */
        /* border: #cbcaca 1px solid; */
        color: #333;
        margin-top: 1%;
    }
    #pagination {
        text-align: center;
    }
</style>

