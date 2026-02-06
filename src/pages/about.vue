<template>
  <v-container :class="{ 'w-75': !mobile }">
    <v-row>
      <v-col md="4" cols="12">
        <v-img alt="Evan's Headshot" class="w-100 rounded-lg" src="@/assets/EvanHeadshot.jpg" />
      </v-col>
      <v-col md="8" sm="12">
        Test
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/framework'

const { mobile } = useDisplay()
</script>
<style scoped>

</style>
