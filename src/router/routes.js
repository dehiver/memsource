import Home from '@/views/Home.vue'

// Lazy loaded View
const Project = () => import(/* webpackChunkName: "project" */ '@/views/Project.vue');

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home',
            sub_title: 'Projects overview',
        },
    },
    {
        path: '/project',
        name: 'project',
        component: Project,
        meta: {
            title: 'Project Detail',
        },
    }
]