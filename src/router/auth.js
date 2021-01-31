export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard'),
        meta: {
            title: 'Dashboard',
            breadcrumb: [{
                html: '<i class="ti-home"></i> '+'Dashboard' ,
                href: '/dashboard',
            }]
        }
    }
];
