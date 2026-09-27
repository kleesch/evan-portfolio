<template>
  <v-img class="spotlight-glow" :class="{ 'player-desktop': !mobile, 'player-mobile': mobile }" position="bottom" src="@/assets/EvanSitting.png" />
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
  left: 50%;
  transform: translateX(-50%);
  width: 76vw;
  /* Cap height so the head clears the stacked nav on short screens */
  height: min(62vh, calc(95vh - 300px));
}
</style>
