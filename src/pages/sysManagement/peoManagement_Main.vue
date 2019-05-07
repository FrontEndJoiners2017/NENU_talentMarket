<template>
    <el-container>
        <el-main>
            <!-- 搜索框部分 -->
           <el-card id="peoManage">
               <div id="ManaTitle">
                    <b>管理员列表</b>
                </div>
                <!-- 使用栅格设置input框的大小 -->
                <el-form :model="peoSearchBox">
                    <el-row>
                        <el-col :span="5">
                            <el-form-item prop="searchInput" class="searchFormItem">
                                <el-input v-model="peoSearchBox.searchInput" placeholder="关键字搜索" id="searchIn"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- type=“primary”是指本按钮是主要按钮 -->
                        <el-col :span="3">
                            <el-form-item class="searchFormItem">
                                <el-button type="primary" icon="el-icon-search" @click="search()" plain>搜索</el-button>
                            </el-form-item>                        
                        </el-col>
                        <el-col :span="15" id="addbutton">
                            <el-form-item class="searchFormItem">
                                <el-button type="primary" icon="el-icon-plus" @click.native="addMananger=true" plain>添加管理员</el-button>
                            </el-form-item>                        
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            
            <!-- 管理员列表 -->
            <el-card id="peoTable">
                <!-- 带边框的表格 -->
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" id="peoTable">
                    <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                    <el-table-column align="center" prop="email" label="注册邮箱"></el-table-column>
                    <el-table-column align="center" prop="phonenumber" label="联系方式"></el-table-column>
                    <el-table-column align="center" prop="identity" label="身份"></el-table-column>
                    <el-table-column align="center" prop="operation" label="操作">
                        <el-button type="danger" icon="el-icon-delete" title="删除" @click="dele" circle plain></el-button>
                        <!-- <el-button type="danger" icon="el-icon-delete" title="删除" @click="dele" plain>删除</el-button> -->
                    </el-table-column>
                </el-table>
                <div id="pagination">
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
                </div>
            </el-card>

            <!-- 新增管理员 -->
            <el-dialog title="新增管理员" v-model="addManagerModel" :visible.sync="addMananger" :close-on-click-modal="false" id="ManagerInfor">
                <!-- 设置middlediv来将form固定在中央 -->
                <div id="dialogMiddle">
                    <!-- <span>哈哈哈</span> -->
                <!-- 设定提示文字所在的位置的大小 -->
                    <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
                        <el-form-item prop="name" label="姓名">
                            <el-col :span="15">
                            <!-- 在input框后（内后）添加edit图标 -->
                                <el-input v-model="addForm.name" placeholder="管理员姓名" suffix-icon="el-icon-edit"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item prop="email" label="邮箱">
                            <el-col :span="18">
                                <el-input v-model="addForm.email" placeholder="管理员邮箱" suffix-icon="el-icon-edit"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item prop="phoneNumber" label="联系方式">
                            <el-col :span="15">
                                <el-input v-model="addForm.phoneNumber" placeholder="管理员联系方式" suffix-icon="el-icon-edit"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item prop="level" label="管理级别">
                            <el-col :span="10">
                                <el-select v-model="addForm.level" placeholder="管理级别">
                                    <!-- key作为 value 唯一标识的键名，绑定值为对象类型时必填 -->
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item prop="account" label="账号">
                            <el-col :span="18">
                                <el-input v-model="addForm.account" placeholder="管理员账号" suffix-icon="el-icon-edit"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item prop="pwd" label="密码">
                            <el-col :span="18">
                                <el-input v-model="addForm.pwd" placeholder="管理员密码" suffix-icon="el-icon-edit"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item prop="repwd" label="确认密码">
                            <el-col :span="18">
                                <el-input v-model="addForm.repwd" placeholder="请确认密码" suffix-icon="el-icon-edit"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item class="dialogBtn">
                            <el-button type="primary" plain>确定</el-button>
                            <el-button type="primary" plain>重置</el-button>
                            <el-button type="danger" @click.native="addMananger=false" plain>取消</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 使用slot属性定义dialog里的el-button -->
                </div>
                <!-- <div slot="footer" id="dialogbutton">
                    
                </div> -->
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>

export default {
    name: 'peoManage_Main',
    data() {
        //再次输入密码与输入密码的一致性判断
        var checkRePwd = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请确认密码'));
            }
            else if(value.length < 8){
                callback(new Error('两次输入密码不一致'));
            }
            else if(value !== this.addForm.pwd){
                callback(new Error('两次输入密码不一致'));
            }
            else{
                callback();
            }
        };
        return{
            //检索
            peoSearchBox: {
                searchInput: '',
            },
            // 新增遮罩是否显示
            addMananger: false,
            addManagerModel: false,
            // addMananger: true,
            // addManagerModel: true,
            // 搜索输入框
            input: '',
            //分页
            currentPage: 1,
            //pagesizes只能为10 20 30 40 50 100……
            pagesize: 10,
            total: 0,
            //表格数据
            tableData: [],
            addForm: {
                name: '',
                email: '',
                phoneNumber: '',
                level: '',
                account: '',
                pwd: '',
                repwd: ''
            },
            //管理员级别
            options: [{
                value: '1',
                label: '主管理员'
            },{
                value: '2',
                label: '管理员'
            }],
            //判空
            addRules: {
                name: [
                    { required: true, message: '请输入管理员姓名', trigger: 'blur'}
                ],
                email: [
                    { required: true, message: '请输入管理员邮箱', trigger: 'blur'},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                ],
                phoneNumber: [
                    { required: true, massage: '请输入管理员联系方式', trigger: 'blur'},
                    { type: 'number', message: '请输入正确的联系方式', trigger: 'blur'},
                    { length: 11, message: '请输入正确的联系方式', trigger: 'blur'}
                ],
                level: [
                    { required: true, message: '请选择管理员的管理级别', trigger: 'blur'}
                ],
                account: [
                    { required: true, message: '请输入管理员账号', trigger: 'blur'}
                ],
                pwd: [
                    { required: true, message: '请输入管理员密码', trigger: 'blur'},
                    { min: 8, message: '密码不能少于8个字符', trigger: 'blur'}
                ],
                repwd: [
                    { required: true, validator: checkRePwd, trigger: blur}
                ]
            }
        }
    },
    methods: {
        //搜索
        search(){
            console.log(this.peoSearchBox.searchInput);
            this.$http({
                method: "post",
                url: "http://localhost:8088/testBoot/selectEducationByKeyword",
                // keyword与后端代码中的局部变量相同
                data:{
                    keyword: this.peoSearchBox.searchInput,
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
                console.log(response.data);
            },reject =>{
                console.log("失败"+reject);
            })
        },
        // 删除
        dele() {
            this.$confirm('是否确认删除该管理员？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 显示新增遮罩
        add() {
            this.addManager=true;
        },
        current_change(currentPage){
            this.currentPage = currentPage;
        }
    },
    created() {
        this.$http({
            method: "get",
            url: "../../../static/peopleManager.json",
            dataType: "json",
            crossDomain: true,
            cache: false,
        }).then(resolve => {
            this.tableData = resolve.data.manager;
            //获取数组长度赋值给total
            this.total = resolve.data.manager.length;
            console.log(this.total);
            console.log(resolve.data);
        }, reject => {
            console.log(reject);
        })
    }
}
</script>

<style scoped>
    #peoManage {
        text-align: center;
        border-radius: 10px;
    }
    /* 删除“管理员列表”el-card中的el-form-item的margin-bottom 整体效果更好看 */
    .searchFormItem {
        margin-bottom: 0;
    }
    #peo-boxCard {
        position: relative;
        border-radius: 10px;
    }
    #ManaTitle {
        position: relative;
        /* border: 1px solid blue; */
        text-align: left;
        font-size: 125%;
        margin-bottom: 1.7%;
    }
    .dialogBtn {
        text-align: right;
    }
    #peoTable {
        margin-top: 1%;
        border-radius: 10px;
    }
    #pagination {
        text-align: center;
    }
    #ManagerInfor {
        width: 70%;
        margin: 0 auto;
    }
    #dialogMiddle {
        /* border: 1px solid red; */
        width: 85%;
        margin: 0 auto;
    }
    /* dialog label与input框之间的间隔增大 */
    .el-form-item__label {
        margin-right: 2%;
    }
</style>

