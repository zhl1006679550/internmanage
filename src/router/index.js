import Vue from 'vue'
import VueRouter from 'vue-router'
import PageOne from "../views/PageOne";
import StudentSave from "../views/StudentSave";
import Index from "../views/index";
import Updata from "../views/Updata";
import Index_teacher from "../views/index-teacher"
import Index_student from "../views/index-student"
import Teacher_updata from "@/views/Teacher_updata";
import Login from "../components/LoginShiro"
import Studentinfo from "@/views/Studentinfo";
import TeacherSave from "@/views/TeacherSave";
import StudentOnesign from "@/views/StudentOnesign";
import ZMap from "../views/map"

Vue.use(VueRouter)

const routes = [
    //教师页面导航
    {
        path: '/teacher',
        redirect: '/teacher/PageOne',
        name: "教师管理页面",
        component: Index_teacher,
        show: false,
        show_teacher: true,
        show_student: false,
        children: [
            {
                path: "/teacher/PageOne",
                component: PageOne,
                name: "签到记录",
                show_teacher: true,
            },
            {
                path: '/teacher/studentinfo',
                name: '学生信息',
                show_teacher: true,
                component: Studentinfo
            },
            {
                path: '/teacher/updata',
                name: '修改用户',
                show_teacher: false,
                component: Teacher_updata
            }
        ]
    },
    //管理员页面导航
    {
        path: '/admin',
        name: '用户管理',
        component: Index,
        redirect: '/admin/PageOne',
        show: true,
        show_teacher: false,
        show_student: false,
        children: [
            {
                path: '/admin/PageOne',
                name: '签到记录',
                show: true,
                component: PageOne
            },
            {
                path: '/admin/studentinfo',
                name: '学生信息',
                show: true,
                component: Studentinfo
            },
            {
                path: '/admin/studentsave',
                name: '添加学生用户',
                show: true,
                component: StudentSave
            },
            {
                path: '/admin/teachersave',
                name: '添加教师用户',
                show: true,
                component: TeacherSave
            },
            {
                path: '/admin/updata',
                name: '修改用户',
                show: false,
                component: Updata
            }
        ]
    },
    //登陆页面
    {
        path: '/login',
        name: '登录页面',
        component: Login
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/student',
        name: "签到管理",
        component: Index_student,
        show: false,
        show_teacher: false,
        show_student: true,
        children: [
            {
                path: '/student/sign',
                name: "签到",
                component: ZMap,
                show_student: true,
            },
            {
                path: '/student/signinfo',
                name: "签到历史记录查询",
                component: StudentOnesign,
                show_student: true,
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
