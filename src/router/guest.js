export default [
    {
        path: '/',
        component: () => import('../views/auth/login')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login' )
    }
]
