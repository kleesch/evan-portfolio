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
  height:60dvh;
  bottom:5vh;
  bottom:5dvh;
}

.player-mobile {
  position: absolute;
  bottom: 5vh;
  bottom: 5dvh;
  left: 50%;
  transform: translateX(-50%);
  width: 76vw;
  /* Cap height so the head clears the stacked nav on short screens */
  height: min(62vh, calc(95vh - 300px));
  height: min(62dvh, calc(95dvh - 300px));
}
</style>
