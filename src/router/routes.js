import Home from '@/views/Home.vue'

// Lazy load
const Project = () => import(/* webpackChunkName: "project" */ '@/views/Project.vue');

export default [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/project',
        name: 'Project Detail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Project,
    }
]