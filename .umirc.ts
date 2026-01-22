import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    // 移动端配置
    mobile: true,
  },
  // 禁用 layout，H5 不需要
  layout: false,
  // H5 移动端配置
  hash: true,
  routes: [
    {
      path: '/',
      component: './index',
    },
  ],
  npmClient: 'pnpm',
  // 移动端优化配置（但我们要故意制造性能问题，所以先不优化）
  mfsu: false,
  // 禁用代码分割，让所有代码打包在一起（性能更差）
  codeSplitting: {
    jsStrategy: 'bigVendors',
  },
});
