export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard'),
    },
    {
        path: '/product',
        name: 'product',
        component: () => import('../views/product/index'),
    },
    {
        path: '/product/:uuid/edit',
        name: 'product.edit',
        component: () => import('../views/product/edit')
    }
];
