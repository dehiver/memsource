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
        },
    },
    {
        path: '/project/:id',
        name: 'project',
        component: Project,
        meta: {
            title: 'Project',
        },
    }
]