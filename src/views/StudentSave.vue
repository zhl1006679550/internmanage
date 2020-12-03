<template>
    <el-form style="width:40%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!--prop属性表示元素名字，用来绑定规则-->
        <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="学号" prop="stunum">
            <el-input v-model="ruleForm.stunum"></el-input>
        </el-form-item>

      <el-form-item label="专业班级" prop="classnamess">
        <el-input v-model="ruleForm.classnamess"></el-input>
      </el-form-item>

      <el-form-item label="实习单位" prop="company">
        <el-input v-model="ruleForm.company"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    const axios = require("axios");
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    password: '',
                },
                //定义校验规则
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                  stunum: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                  ],
                  classnamess: [
                    { required: true, message: '请输入专业班级', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                  ],
                  company: [
                    { required: true, message: '请输入实习单位', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                  ],
                }
            };
        },
        methods: {
            //提交方法
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this;
                        //调用save接口传入对象参数ruleForm，并获取save接口返回的数据
                        axios.post("http://localhost:8181/Student/save",this.ruleForm).then(res=>{
                            if(res.data === "success"){
                                //添加成功弹窗
                                this.$alert(_this.ruleForm.name+'添加成功', '消息提示', {
                                    confirmButtonText: '确定',
                                    callback:()=> {
                                        //路由跳转到查询页面
                                        this.$router.push("/admin/studentinfo");
                                    }
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置方法
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>