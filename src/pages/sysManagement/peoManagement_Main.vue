<template>
    <el-container>
        <el-main>
            <!-- 搜索框部分 -->
           <div id="peoManage">
                <el-card id="peo-boxCard">
                    <!-- 使用栅格设置input框的大小 -->
                    <el-col :span="5">
                        <el-input v-model="input" placeholder="关键字搜索" id="searchIn"></el-input>
                    </el-col>
                    <!-- type=“primary”是指本按钮是主要按钮 -->
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </el-card>
            </div>
            
            <!-- 管理员列表 -->
            <div id="peoTable">
                <p id="ManaTitle">
                    <b>管理员列表</b>
                    <el-button type="primary" icon="el-icon-plus" id="addbutton" @click.native="addMananger=true">添加管理员</el-button>
                </p>
                <!-- 带边框的表格 -->
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" id="peoTable">
                    <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                    <el-table-column align="center" prop="email" label="注册邮箱"></el-table-column>
                    <el-table-column align="center" prop="phonenumber" label="联系方式"></el-table-column>
                    <el-table-column align="center" prop="identity" label="身份"></el-table-column>
                    <el-table-column align="center" prop="operation" label="操作">
                        <el-button type="primary" icon="el-icon-delete" @click="dele">删除</el-button>
                    </el-table-column>
                </el-table>
                <div id="pagination">
                    <el-pagination layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
                </div>
            </div>

            <!-- 新增管理员 -->
            <el-dialog title="新增管理员" v-model="addManagerModel" :visible.sync="addMananger" :close-on-click-modal="false" id="ManagerInfor">
                <!-- 设置middlediv来将form固定在中央 -->
                <div id="dialogMiddle">
                    <!-- <span>哈哈哈</span> -->
                <!-- 设定提示文字所在的位置的大小 -->
                    <el-form :model="addForm" label-width="100px">
                        <el-form-item label="姓名">
                            <!-- 在input框后（内后）添加edit图标 -->
                            <el-input v-model="addForm.name" placeholder="请输入管理员姓名" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="addForm.email" placeholder="请输入管理员邮箱" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="addForm.phoneNumber" placeholder="请输入管理员联系方式" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>
                        <el-form-item label="管理级别">
                            <el-select v-model="addForm.level" placeholder="请选择管理级别">
                                <!-- key作为 value 唯一标识的键名，绑定值为对象类型时必填 -->
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="账号">
                            <el-input v-model="addForm.account" placeholder="请输入管理员账号" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="addForm.pwd" placeholder="请输入管理员密码" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>
                        <el-form-item label="再次输入">
                            <el-input v-model="addForm.repws" placeholder="请再次输入管理员密码" suffix-icon="el-icon-edit"></el-input>
                        </el-form-item>
                    </el-form>
                    <!-- 使用slot属性定义dialog里的el-button -->
                    <div slot="footer">
                        <el-button type="primary" >确定</el-button>
                        <el-button @click.native="addMananger=false">取消</el-button>
                    </div>
                </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>

export default {
    name: 'peoManage_Main',
    data() {
        return{
            // 新增遮罩是否显示
            addMananger: false,
            addManagerModel: false,
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
                phonenumber: '',
                level: '',
                account: '',
                pwd: '',
                repwd: ''
            },
            options: [{
                value: '1',
                label: '主管理员'
            },{
                value: '2',
                label: '管理员'
            }]
        }
    },
    methods: {
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

<style>
    #peoManage {
        width: 99.5%;
        border: #cbcaca 1px solid;
        border-radius: 10px;
        margin: 0 auto;
        /* margin-top: 1%; */
    }
    #peo-boxCard {
        position: relative;
        width: 99.8%;
        border-radius: 10px;
    }
    #ManaTitle {
        position: relative;
        /* border: 1px solid blue; */
        text-align: left;
        font-size: 125%;
    }
    #addbutton {
        position: absolute;
        right: 0;
    }
    #peoTable {
        padding: 1% 2% 1% 2%;
        border: #cbcaca 1px solid;
        /* border: 1px solid red; */
        margin-top: 1%;
        border-radius: 10px;
    }
    /* 使用.el-input__inner来重写el-input的样式 */
    /* 前提：关闭style的scoped属性 */
    /* #ManagerInfor .el-input__inner{
        width: 300px;
    } */
    #dialogMiddle {
        width: 55%;
        margin: 0 auto;
    }
</style>

