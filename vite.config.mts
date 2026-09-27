// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig, type Plugin } from 'vite'
import { copyFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

// GitHub Pages has no SPA fallback. It serves /about from about.html, so each
// top-level page gets a copy of index.html to load with a 200. Anything else
// falls back to 404.html, which still loads the app (with a 404 status).
function spaFallback (): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-fallback',
    apply: 'build',
    configResolved (config) {
      outDir = config.build.outDir
    },
    closeBundle () {
      const pages = readdirSync('src/pages')
        .filter(file => file.endsWith('.vue') && file !== 'index.vue')
        .map(file => file.slice(0, -'.vue'.length))
      for (const name of [...pages, '404']) {
        copyFileSync(`${outDir}/index.html`, `${outDir}/${name}.html`)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  // Served from https://mrzakch.github.io/evan-portfolio/ when built for GitHub Pages
  base: process.env.GITHUB_PAGES ? '/evan-portfolio/' : '/',
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
          {
            name: 'Cormorant Garamond',
            weights: [300, 400],
            styles: ['normal', 'italic'],
          },
        ],
      },
    }),
    spaFallback(),
  ],
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
