<template>
  <v-container class="d-flex justify-center flex-column align-center" :class="{ 'w-66': !mobile }">
    <div class="mb-4 text-body-1">
      Enjoy a selection of media that I'm featured in!
    </div>

    <v-row>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <div class="instagram-item">
          <blockquote
            class="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/p/DNTRvStgKZw/"
            data-instgrm-version="14"
            style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
          />
        </div>
      </v-col>

      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <div class="instagram-item">
          <blockquote
            class="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/p/C9Lh5KGgM-q/"
            data-instgrm-version="14"
            style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
          />
        </div>
      </v-col>

      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <div class="instagram-item">
          <blockquote
            class="instagram-media"
            data-instgrm-permalink="https://www.instagram.com/p/C8vdB92sssQ/"
            data-instgrm-version="14"
            style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
          />
        </div>
      </v-col>
    </v-row>
    <v-row class="w-100">
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
<!--        <v-img src="@/assets/MannesRecognitionCeremony2024.jpg" />-->
      </v-col>

      <v-col
        cols="12"
        md="4"
        sm="6"
      />

      <v-col
        cols="12"
        md="4"
        sm="6"
      />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useDisplay } from 'vuetify/framework'

  const { mobile } = useDisplay()

  onMounted(() => {
    // Process Instagram embeds
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }
  })
</script>

<style scoped>
  .instagram-item {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
