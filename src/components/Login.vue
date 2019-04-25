<template>
<div id="loginBox">
    <div id="backTitle">
        <h1 id="NENU">NENU</h1>
        <h2>就业市场数据分析系统>>></h2>
    </div>
    <el-card class="box-card" v-loading="loading">
        <h1>欢迎登录</h1>
        <hr/>
        <el-form label-position="right"
                label-width="70px" 
                :model="userInfo" 
                :rules="rules2"
                ref="userInfo">
            <el-form-item label="用户名：">
                <el-input v-model="userInfo.ID" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input v-model="userInfo.Password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked" checked class="remember" style="float:left">记住账号</el-checkbox>
                <el-checkbox v-model="checked" checked class="remember" style="float:left">记住密码</el-checkbox>
                <el-button type="primary" style="float:right" @click="handleSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            userInfo:{
                ID:'monkey',
                Name:'Joiners',
                Password:'111111'
            },
            rules2: {
                ID: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    //{ validator: validaePass }
                ],
                Password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ]
            },
            checked: true,
            loading: false
        }
    },
    methods: {
        handleSubmit(event){
            this.$refs.userInfo.validate((valid) => {
                if(valid){
                    this.loading = true;
                    if(this.userInfo.ID === 'monkey' && this.userInfo.Password === '111111'){
                           this.loading = false;
                           sessionStorage.setItem('user', this.userInfo.ID);
                           global.isLogin = 1
                           this.$router.push({path: '/'});
                    }else{
                        this.loading = false;
                        this.$alert('请检查用户名或密码是否有误。', '登录失败', {
                            confirmButtonText: '确定'
                        })
                    }
                }else{
                    console.log('error submit!');
                    return false;
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
    background-color: rgb(255, 255, 255);
    width: 480px;
    position: absolute;
    top: 55%;
    left: 70%;
    transform: translate(-50%, -80%);
    text-align: left;
    padding: 1em;
}
hr{
    margin: -15px 0 30px 0;
}
#backTitle{
    margin: 0 auto;
    text-align: left;
}
#backTitle h1{
    color: #EFEFEF;
    font-size: 300px;
    text-shadow: #FFFFFF 10px 10px;
    margin: 0 0 0 50px;
}
#backTitle h2{
    color: #EFEFEF;
    font-size: 50px;
    text-shadow: #FFFFFF 2px 2px;
    margin: -50px 0 0 100px;
}
</style>
