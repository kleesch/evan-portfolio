/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { setupLayouts } from 'virtual:generated-layouts'
// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import headshot from '@/assets/EvanHeadshot.jpg'
import { useAppStore } from '@/stores/app'

// Images to start fetching while the curtain closes, so they're ready when the page mounts
const preloadImages: Record<string, string[]> = {
  '/about': [headshot],
}

// Hosts to open connections to while the curtain closes, for pages with third-party embeds
const preconnectHosts: Record<string, string[]> = {
  '/media': [
    'https://www.instagram.com',
    'https://static.cdninstagram.com',
    'https://scontent.cdninstagram.com',
  ],
}

function preconnect (href: string) {
  if (document.head.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
    return
  }
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = href
  document.head.append(link)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore()
  if (to.path !== from.path) {
    for (const src of preloadImages[to.path] ?? []) {
      new Image().src = src
    }
    for (const href of preconnectHosts[to.path] ?? []) {
      preconnect(href)
    }
    appStore.curtainClosed = true
    await new Promise(resolve => setTimeout(resolve, 525))
  }
  next()
})

router.afterEach(() => {
  const appStore = useAppStore()
  setTimeout(() => {
    appStore.curtainClosed = false
  }, 100)
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
