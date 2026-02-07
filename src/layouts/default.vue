<template>
  <v-main>
    <div class="w-100 h-100">
      <div v-if="!mobile" class="copyright">Copyright © {{ new Date().getFullYear() }} Evan Chilcote</div>
      <div
        class="curtain left-curtain"
        :class="{ 'curtain-closed': appStore.curtainClosed }"
      >
        <div class="curtain-bottom box" />
      </div>
      <div
        class="curtain right-curtain"
        :class="{ 'curtain-closed': appStore.curtainClosed }"
      >
        <div class="curtain-bottom box" />
      </div>
      <div class="w-100 h-100 d-flex  justify-center overflow-y-auto main" :class="{ 'bg-home_': isHome, 'bg-other': true }" style="max-height:100vh;">
        <v-container style="max-width:80vw;">
          <v-row justify="center">
            <v-col class="d-flex align-center justify-center flex-column" :class="{ 'mt-12': !mobile }" cols="6">
              <!--v-img.white(src='@/assets/NameHeader.png' style='width:50vw;' cover)-->
              <div class="text-grey-lighten-4 shadow cursor-pointer text-no-wrap nav-header" :class="{ 'nav-header-mobile': mobile }" style="" @click="router.push('/')"> Evan Chilcote</div>
              <div class="w-100 d-flex align-center justify-center">
                <v-btn
                  class="text-capitalize mr-2"

                  prepend-icon="mdi-account-music"
                  :size="mobile ? 'small' : 'x-large'"
                  text="About"
                  to="/about"
                  variant="text"
                />
                <v-btn
                  class="text-capitalize mr-2"

                  prepend-icon="mdi-multimedia"
                  :size="mobile ? 'small' : 'x-large'"
                  text="Media"
                  to="/media"
                  variant="text"
                />
                <v-btn
                  class="text-capitalize"

                  prepend-icon="mdi-email"
                  :size="mobile ? 'small' : 'x-large'"
                  text="Contact"
                  to="/contact"
                  variant="text"
                />
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12">
              <router-view />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDisplay } from 'vuetify/framework'

  import { useAppStore } from '@/stores/app'

  const router = useRouter()
  const route = useRoute()
  const appStore = useAppStore()
  const { mobile } = useDisplay()

  const isHome = computed(() => route.path === '/')
</script>

<style scoped>
.main {
}

.bg-home {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.25) 80%,
    rgba(20, 20, 20, 1) 80%,
    rgba(20, 20, 20, 1) calc(80% + 10px),
    rgba(11, 11, 11, 1) calc(80% + 10px),
    rgba(11, 11, 11, 1) 100%
  ), url("@/assets/Background.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.bg-other {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.25) 80%,
    rgba(20, 20, 20, 1) 80%,
    rgba(20, 20, 20, 1) calc(80% + 10px),
    rgba(11, 11, 11, 1) calc(80% + 10px),
    rgba(11, 11, 11, 1) 100%
  ), url("@/assets/BlackBackground.webp");
  background-repeat: repeat;
  background-position: center;
}

.curtain {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 12vw; /* Each curtain covers one side of the screen */
  background: repeating-linear-gradient(
    to right,
    rgba(8, 8, 8) 0px,
    rgba(0, 0, 0) 30px,
    rgba(8, 8, 8) 60px
  );
  z-index: 100; /* Place the curtains in front of the content */
  transition: all .5s ease-in-out;
}

.left-curtain {
  left: 0; /* Left curtain */
}

.right-curtain {
  right: 0; /* Right curtain */
}

.curtain-bottom {
  position: absolute;
  bottom: 0;
  height: 7%;
  width:100%;
  background: rgb(11,11,11)
}

.nav-header {
  font-family:RolleteQaku;
  font-size:8vw;
  margin-bottom: -50px;
}

.nav-header-mobile {
  margin-bottom: -10px;
  font-size: 14vw
}

.curtain-closed {
  width: 50%;
}

.box {
  --mask:
    radial-gradient(33.54px at 50% 45.00px,#000 99%,#0000 101%) calc(50% - 30px) 0/60px 100%,
    radial-gradient(33.54px at 50% -30px,#0000 99%,#000 101%) 50% 15px/60px 100% repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}

.shadow {
  text-shadow: black 1px 0 10px;
}

.copyright {
  position: absolute;
  bottom: 0;
  right: 4px;
  color: rgb(30,30,30);
}
</style>
