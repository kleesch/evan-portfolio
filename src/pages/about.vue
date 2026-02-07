<template>
  <v-container :class="{ 'w-66': !mobile }">
    <v-row>
      <v-col md="4" cols="12">
        <v-img alt="Evan's Headshot" class="w-100 rounded-lg" src="@/assets/EvanHeadshot.jpg" />
      </v-col>
      <v-col md="8" sm="12" class="text-body-1">
        lorem ipsum dolor sit amet consectetur adipiscing elit voluptua amet quod no illum accusam ullamcorper augue laboris nisl assum ipsum nobis minim veniam laborum cupiditat iusto diam elitr reprehenderit te officia iriure wisi sea elit enim at diam ad dignissim kasd magna velit nam obcaecat id consequat nonummy tempor id magna consequat id congue nonummy iure nonumy pariatur vel soluta nulla esse minim sint veniam luptatum praesent eleifend adipiscing id enim sanctus amet aliquip takimata hendrerit esse eiusmod zzril at option iure aliquid illum nostrud velit sint nibh hendrerit adipisici elit velit culpa gubergren nobis autem sit dolor nibh in deserunt option nostrud invidunt esse te voluptua vero hendrerit elitr eum iusto tincidunt diam eleifend adipiscing eiusmod culpa cupiditat consectetuer elitr assum eros lorem eros enim nonumy delenit eu nam enim exercitation option deserunt amet dignissim liber magna nihil volutpat id aliquid nobis delenit illum aliquyam iusto euismod sunt non at proident takimata laoreet excepteur eros lobortis invidunt odio eum pariatur tempor dolor nibh lobortis qui dignissim illum aliquid nonummy illum praesent mollit aliquid commodo sit minim wisi voluptate id placerat cupiditat gubergren commodo tation placerat qui amet dolores augue eros exercitation wisi iriure duis at enim id lorem luptatum
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
