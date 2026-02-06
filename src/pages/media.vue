<script setup lang="ts">
  import { onMounted } from 'vue'

  const instagramIds = [
    'DNTRvStgKZw',
    'C9Lh5KGgM-q',
    'C8vdB92sssQ',
  ]

  onMounted(() => {
    // Process Instagram embeds
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }
  })
</script>

<template>
  <div style="max-width: 75%">
    <div>
      Enjoy a selection of media that I am featured in.
    </div>

    <div class="instagram-slider-container">
      <v-slide-group
        center-active
        class="w-100"
        show-arrows
      >
        <v-slide-group-item
          v-for="id in instagramIds"
          :key="id"
        >
          <div class="instagram-item">
            <blockquote
              class="instagram-media"
              :data-instgrm-permalink="`https://www.instagram.com/p/${id}/`"
              data-instgrm-version="14"
              style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
            >
            </blockquote>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>

<style scoped>
  .instagram-slider-container {
    width: 100%;
    margin: 20px 0;
  }

  .instagram-item {
    margin: 0 10px;
    width: 350px;
    display: flex;
    justify-content: center;
  }

  /* Ensure the slide group container doesn't restrict height too much */
  :deep(.v-slide-group__content) {
    align-items: flex-start;
  }
</style>
