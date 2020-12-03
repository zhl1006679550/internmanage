<template>
    <div style="height: 100%">
        <el-table :data="tableData" height="93%" border style="width: 100%">

            <el-table-column prop="id" label="id" width="50">
            </el-table-column>

            <el-table-column prop="name" label="姓名" width="100">
            </el-table-column>

            <el-table-column prop="company" label="实习单位" width="230">
            </el-table-column>

            <el-table-column prop="address" label="实习单位地址" width="250">
            </el-table-column>

            <el-table-column prop="sign_address" label="签到地址" width="280">
            </el-table-column>

            <el-table-column prop="time" label="签到时间">
            </el-table-column>

<!--            <el-table-column fixed="right" label="操作" width="100">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>-->
<!--                    <el-button @click="delete1(scope.row)" type="text" size="small">删除</el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
        </el-table>

        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="11"
                :total="totle"
        @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    const axios = require ('axios');
    export default {
        data() {
            return {
                tableData: null,
                totle:null,
                path1:null,

            }
        },
        methods:{
          //修改方法
            handleClick(row) {
              this.$router.push({
                        path:this.path1+'/updata',
                        query:{
                            id:row.id
                        }
                    });
            },
          //删除方法
            delete1(row){
                const _this = this;
                axios.delete("http://localhost:8181/Student/deleteById/"+row.id).then(function () {
                    _this.$alert(row.name+'删除成功', '消息提示', {
                        confirmButtonText: '确定',
                        callback:()=> {
                            //路由跳转到查询页面
                            _this.$router.go(0);
                        }
                    });
                });
            },
          //页面跳转
            page:function (CurrentChange) {
                axios.get('http://localhost:8181/viewsign/findAll/'+CurrentChange+'/11',{
                  headers:{
                    'token':this.getToken()
                  }
                }).then(res=>{
                  this.tableData = res.data.content;
                })
            }
        },
        created() {
          //获取所有的签到记录
          axios.get('http://localhost:8181/viewsign/findAll/1/11',{
            headers:{
              'token':this.getToken()
            }
          }).then(res=>{
            this.tableData = res.data.content;
            this.totle = res.data.totalElements;
              }
          );
             this.path1 = this.$route.matched[0].path;
          // console.log(this.getToken());
        }
    }
</script>