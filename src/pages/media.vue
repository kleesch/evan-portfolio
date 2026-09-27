<template>
  <v-container class="d-flex justify-center flex-column align-center">
    <div class="mb-4 text-body-1">
      Enjoy a selection of media that I'm featured in!
    </div>

    <div v-if="embedBlocked" class="blocked-note mb-6">
      <v-icon class="mr-1" icon="mdi-shield-off-outline" size="small" />
      Posts not showing? An ad blocker may be hiding them. Pause it for this site, or open each post on Instagram.
    </div>

    <div class="media-grid">
      <div
        v-for="permalink in posts"
        :key="permalink"
        class="media-item"
      >
        <blockquote
          class="instagram-media"
          :data-instgrm-permalink="permalink"
          data-instgrm-version="14"
        >
          <!-- Shown until embed.js swaps in the post, or for good if it's blocked -->
          <a
            class="embed-fallback"
            :href="permalink"
            rel="noopener"
            target="_blank"
          >
            <v-icon class="mb-3" icon="mdi-instagram" size="40" />
            <span class="embed-fallback-label">View on Instagram</span>
          </a>
        </blockquote>
      </div>
      <!--      <v-img src="@/assets/MannesRecognitionCeremony2024.jpg" />-->
    </div>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, onActivated, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue'

  import { useAppStore } from '@/stores/app'

  // Matched by the <KeepAlive> in the default layout
  defineOptions({ name: 'MediaPage' })

  const appStore = useAppStore()

  const posts = [
    'https://www.instagram.com/p/DNTRvStgKZw/',
    'https://www.instagram.com/p/C9Lh5KGgM-q/',
    'https://www.instagram.com/p/C8vdB92sssQ/',
  ]

  // Open the curtain anyway if Instagram never reports back (post removed, embed blocked, hook renamed)
  const REVEAL_TIMEOUT_MS = 6000

  const loadedFrames = ref(new Set<string | number>())
  const timedOut = ref(false)
  // Set when embed.js fails to load (see the onerror in index.html)
  const embedBlocked = ref(Boolean((window as any).__igEmbedFailed))
  const allLoaded = computed(() => timedOut.value || embedBlocked.value || loadedFrames.value.size >= posts.length)
  let revealTimer: ReturnType<typeof setTimeout> | undefined

  // Undocumented hook: embed.js calls this once per embed after the iframe
  // reports its content has rendered (the MOUNTED message)
  ;(window as any).__igEmbedLoaded = ({ frameId }: { frameId: string | number }) => {
    loadedFrames.value = new Set(loadedFrames.value).add(frameId)
  }

  // Hold the curtain shut while this page is showing and the embeds are still loading.
  // onActivated also runs on first mount, since the page is kept alive.
  onActivated(() => {
    appStore.curtainHeld = !allLoaded.value
  })
  onDeactivated(() => {
    appStore.curtainHeld = false
  })
  watch(allLoaded, loaded => {
    if (loaded) {
      appStore.curtainHeld = false
    }
  })

  function onEmbedFailed () {
    embedBlocked.value = true
  }

  onMounted(() => {
    window.addEventListener('ig-embed-failed', onEmbedFailed)

    revealTimer = setTimeout(() => {
      timedOut.value = true
    }, REVEAL_TIMEOUT_MS)

    // Process Instagram embeds
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }
  })

  onUnmounted(() => {
    clearTimeout(revealTimer)
    window.removeEventListener('ig-embed-failed', onEmbedFailed)
    appStore.curtainHeld = false
    delete (window as any).__igEmbedLoaded
  })
</script>

<style scoped>
  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
    gap: 24px;
    width: 100%;
    max-width: 1200px; /* caps the grid at 3 columns */
    justify-items: center;
  }

  .media-item {
    width: 100%;
    max-width: 400px;
  }

  /* Applies to both the blockquote placeholder and the iframe Instagram swaps in */
  .media-grid :deep(.instagram-media) {
    border: 0;
    border-radius: 3px;
    padding: 0;
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important; /* override Instagram's 326px floor on very small phones */
  }

  /* Only the rendered post gets Instagram's white card; the placeholder stays dark */
  .media-grid :deep(iframe.instagram-media) {
    background: #fff;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15);
  }

  .blocked-note {
    max-width: 640px;
    text-align: center;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.55);
  }

  /* Placeholder link: shown while embed.js loads, and for good if it's blocked */
  .embed-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 4 / 5;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    transition: border-color 0.2s, background-color 0.2s, color 0.2s;
  }

  .embed-fallback:hover,
  .embed-fallback:focus-visible {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.07);
    color: #fff;
  }

  /* Matches the home page tagline */
  .embed-fallback-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
</style>
