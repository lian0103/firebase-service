import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
    {
        path: `/`,
        component: () => import('../views/Index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        redirect: '/',
    },
];

// console.log(routes);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const { path, query } = to;
    console.log(' path, query', path, query);
});

router.afterEach((to, from) => {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});

export default router;
