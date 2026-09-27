<template>
  <v-container class="d-flex justify-center flex-column align-center">
    <div class="mb-4 text-body-1">
      Enjoy a selection of media that I'm featured in!
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
        />
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
  const allLoaded = computed(() => timedOut.value || loadedFrames.value.size >= posts.length)
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

  onMounted(() => {
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
    background: #fff;
    border: 0;
    border-radius: 3px;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15);
    padding: 0;
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important; /* override Instagram's 326px floor on very small phones */
  }
</style>
