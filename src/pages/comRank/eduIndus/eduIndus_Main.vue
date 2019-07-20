<template>
    <el-container>
        <div id="eduHome">
        <!-- 搜索框部分 -->
            <el-card class="edu-boxCard">
                <div id="TopTitle">
                    <span>教育行业 / 往年市场开发历史纪录</span>
                </div>
                <el-form :model="searchBox">
                    <!-- 使用栅格设置input框的大小 -->
                    <el-row>
                        <el-col :span="5">
                            <el-form-item prop="searchInput">
                                <el-input v-model="searchBox.searchInput" placeholder="关键字搜索" id="searchIn"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item prop="detailOrClassification">
                                <el-radio-group  @change="changeRadio" v-model="radio">
                                    <el-radio v-model="radio" :label="3" >详细数据</el-radio>
                                    <el-radio v-model="radio" :label="6" >数据分级</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="search()" plain>检索</el-button>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="9" id="dateIn">
                            <el-upload  
                            name="fileName" 
                            ref="upload" 
                            action="http://localhost:8080/fileUpload" 
                            :auto-upload="false"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :data="UploadData">
                                再传入一个年份
                                <el-col :span="5">
                                    <el-date-picker
                                        id="choiceYear"
                                        v-model="UploadData.YEAR"
                                        type="year"
                                        placeholder="请选择年份"
                                        format="yyyy 年"
                                        value-format="yyyy">
                                    </el-date-picker>
                                </el-col>
                                <el-button slot="trigger" type="primary" plain>选取文件</el-button>
                                <el-button type="success" @click="submitUpload()" plain>导入</el-button>
                            </el-upload>
                        </el-col> -->
                    </el-row>
                </el-form>
            </el-card>
            
            <!-- 表格 -->
            <el-card class="edu-boxCard" id="eduTable">
                <!-- data需要与后端传入的数据做操作 -->
                <!-- 
                    JavaScript的slice方法： 
                    语法：arrayObject.slice(start,end)
                    返回一个包含从start到end的arrayObject中的元素

                    tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) <=> 每页返回10个tableData数组的子元素
                    第一页从0开始到10结束，依次返回。因为currentPage是不断在变化的  
                -->
                <el-table v-loading="eduLoading" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" id="elTable">
                    <!-- 创建表格各列 -->
                    <el-table-column align="center" prop="city_year" label="年份"></el-table-column>
                    <el-table-column align="center" label="序号" type="index">
                        <template slot-scope="scope">
                            <span>{{(currentPage - 1) * pagesize + scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
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
            //详细数据/数据分级
            radio: '0',
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
                //详细数据/数据分级
                detailOrClassification: '',
            },
            //搜索单选变量
            radioSelected: 0,
            //加载
            eduLoading: true,
            //年份
            UploadData: {
                YEAR: '',
            },
        }
    },
    methods: {
        //传入分页的当前页，令定义的当前页=分页的当前页
        current_change(currentPage){
            this.currentPage = currentPage;
        },
        //单选选中
        changeRadio(change) {
            this.radioSelected = change;
            // console.log(this.radioSelected);
        },
        //进行搜索
        search(){
            //搜索要判断是需要检索详细数还是检索数据分级
            console.log(this.radioSelected);
            //必须详细数据 或者 数据分级
            if(this.radioSelected == 0) {
                this.$notify.error({
                    title: '错误',
                    message: '请完善检索条件！'
                });
            }
            else {
                //如果变量==3，那么选择详细数据
                if(this.radioSelected == 3) {
                    this.$ajax({
                        method: "post",
                        url: "http://47.103.10.220:8081/education/queryEducationByKeywordString?keyword="+this.searchBox.searchInput,
                        //keyword与后端代码中的局部变量相同
                        // data:{
                        //     keyword: this.searchBox.searchInput,
                        // },
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
                    }).then(resolve => {
                        console.log(resolve);
                        this.tableData = resolve.data;
                        this.total = resolve.data.length;
                        this.eduLoading = false;
                        console.log(resolve.data);
                    },reject =>{
                        this.eduLoading = true;
                        console.log("失败"+reject);
                    });
                }
                //变量==6.那么数据分级
                else if(this.radioSelected == 6) {
                    this.$ajax({
                        method: "post",
                        url: "http://47.103.10.220:8081/education/queryEducationByKeywordInt",
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
                    }).then(resolve => {
                        console.log(resolve);
                        this.tableData = resolve.data;
                        this.total = resolve.data.length;
                        this.eduLoading = false;
                        console.log(resolve.data);
                    },reject =>{
                        this.eduLoading = true;
                        console.log("失败"+reject);
                    });
                }
            }
        },
        //导入
        uploadSuccess(response, file, fileList){
            console.log(response);
        },
        uploadError(response, file, fileList){
            console.log("失败");
        },
        submitUpload(){
            // console.log(this.$refs.upload);
            this.$refs.upload.submit();
        },
        //详细数据/分级
        detailOrLevel(event) {
            console.log(event);
        }
    },
    created() {
        this.$ajax({
            method: "post",
            url: "http://47.103.10.220:8081/education/listAllEducation",
            dataType: "json",
            //跨域
            crossDomain: true,
            //保证每次请求得到的数据都是最新的而不是缓存的数据
            cache: false,
        }).then(resolve => {
            this.tableData = resolve.data;
            //将元组总数目设为数据的总数目
            this.total = resolve.data.length;
            this.eduLoading = false;        
            console.log(resolve.data);
        }, reject => {
            this.eduLoading = true;
            console.log("失败",reject);
        })
    },
}
</script>
<style scoped>
    #eduHome {
        width: 100%;
        margin-top: 1%;        
    }
    .edu-boxCard {
        /* position: relative; */
        text-align: center;
        border-radius: 10px;
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
    /* .dataIO {
        height: 30px;
    } */
    #eduTable{
        /* padding: 1%; */
        /* border: #cbcaca 1px solid; */
        color: #333;
        margin-top: 1%;
    }
    /* #elTable {
        border: 1px solid red;
    }
    .el-table-column {
        width: 75px;
    } */
    #pagination {
        text-align: center;
    }
    #dateIn {
        /* border: 1px solid red; */
        text-align: right;
    }
    /* 修改年份框的大小 */
    /* .el-date-editor.el-input {
        width: 154px;
    } */
</style>

