<template>
  <div class="d-flex align-center flex-column" :class="{ 'w-33': !mobile, 'w-66': mobile }">
    <div class="d-flex ga-2 flex-wrap align-center justify-center mb-2">
      <v-chip
        class="mb-2"
        href="https://www.instagram.com/evan_chilcote/"
        prepend-icon="mdi-instagram"
        size="x-large"
        text="evan_chilcote"
      />
      <v-chip class="mb-2" prepend-icon="mdi-email" size="x-large" text="evan@gmail.com" />
      <!--      <v-chip class="mb-2" prepend-icon="mdi-phone" size="x-large" text="(000)-000-0000" href="tel:000-000-0000" />-->
    </div>
    <div class="w-100 d-flex align-center mb-3">
      <v-divider thickness="4" />
      <div class="px-4 text-body-2 text-grey">OR</div>
      <v-divider thickness="4" />
    </div>
    <v-form v-model="state.valid" class="d-flex ga-2 flex-column w-100" @submit.prevent>
      <div class="d-flex align-center ga-4 w-100">
        <v-text-field v-model="state.firstName" class="w-50" label="First Name" :rules="[rules.required()]" />
        <v-text-field v-model="state.lastName" class="w-50" label="Last Name" :rules="[rules.required()]" />
      </div>
      <v-text-field v-model="state.email" autocomplete="email" label="Email" :rules="[rules.required(), rules.email()]" />
      <v-textarea v-model="state.message" label="Message" :rules="[rules.required(), rules.minLength(10, 'Message must be at least 10 characters long')]" />
      <div class="w-100 d-flex justify-center">
        <v-btn
          class="w-33"
          color="primary"
          rounded="pill"
          text="Submit"
          type="submit"
        />
      </div>
    </v-form>
  </div>

</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { useDisplay } from 'vuetify/framework'
  import { useRules } from 'vuetify/labs/rules'

  interface State {
    valid: boolean
    firstName: string
    lastName: string
    email: string
    message: string
  }

  const state = reactive<State>({
    valid: false,
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  const { mobile } = useDisplay()
  const rules = useRules()
</script>

<style scoped>

</style>
