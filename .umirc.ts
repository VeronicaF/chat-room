import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/api': {
      'target': 'http://localhost:3000',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
      // onProxyRes(proxyRes: any) {
      //   const cookies = proxyRes.headers['set-cookie'];
      //   console.dir(proxyRes.headers)
      // }
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/Login' },
  ],
  fastRefresh: {},
  define: { 'process.env.API_ENV': process.env.API_ENV },
});
