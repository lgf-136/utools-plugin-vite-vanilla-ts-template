const { defineConfig } = require('vite');
const path = require('path');

// import { createHtmlPlugin } from 'vite-plugin-html';
const { createHtmlPlugin } = require('vite-plugin-html');
// import { viteMockServe } from 'vite-plugin-mock';
const { viteMockServe } = require('vite-plugin-mock');

module.exports = defineConfig({
  base: './',
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          title: 'index',
        },
      },
    }),
    viteMockServe(),
  ],
  optimizeDeps: {
    exclude: [],
  },
  envPrefix: 'VITE_',
  css: {
    modules: {
      // css 默认类名为 dashesOnly 横杠式，但是在 react,vue 中不方便， 所以统一转为驼峰式
      localsConvention: 'camelCaseOnly',
      // 开启css 模块化， 方便协同开发
      scopeBehaviour: 'local',
      // 定义生产的类目格式
      generateScopedName: '[name]_[local]_[hash:6]',
      globalModulePaths: [],
    },
    preprocessorOptions: {
      less: {
        // less 预处理
        math: 'always',
        globalVars: {
          // less 全局变量
          primary: '#8ec2fd',
        },
      },
      sass: {
        // sass 预处理
      },
    },
    // 设置postcss的两种写法： 导入和致谢写配置都可以， 但是vite会自动帮我们读取 postcss.config.js 配置文件并按流程执行，所以这里可以不用设置postcss，
    // 这里配置的优先级要高于单独的 postcss配置文件
    // postcss: postcssConfig,
    // postcss: {
    //   // 不生成 sourcemaps
    //   map: false,

    //   plugins: [
    //     // 语法校验
    //     stylelint({
    //       fix: true, // 自动修复
    //     }),

    //     // 自动添加浏览器前缀
    //     autoprefixer,

    //     // 使用新语法
    //     postcssPresetEnv({
    //       stage: 0,
    //     }),

    //     // 单位转换：px->rem
    //     pxtorem,
    //   ],
    // },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true, // 每次构建之前先删除dist目录
    // assetsInlineLimit: 4096000, // 4000kb 以内的图片资源会转为 base64字符串格式
  },
});
