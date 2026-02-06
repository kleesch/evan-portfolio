<template>
  <v-img :class="{ 'player-desktop': !mobile, 'player-mobile': mobile }" src="@/assets/Gemini_Generated_Image_aawvebaawvebaawv (1).png" />
</template>

<script setup lang="ts">
  import { useDisplay } from 'vuetify/framework'

  const { mobile } = useDisplay()
</script>

<style scoped>
.player-desktop {
  position: absolute;
  width:75vw;
  height:60vh;
  bottom:5vh;
}

.player-mobile {
  position: absolute;
  bottom: 5vh;
  width: 100vw;
  height: 50vh;
}
</style>
