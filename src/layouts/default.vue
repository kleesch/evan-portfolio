<template>
  <v-main>
    <div class="w-100 layout-root" :class="{ 'curtains-slim': mobile }">
      <div v-if="!mobile" class="copyright">Copyright © {{ new Date().getFullYear() }} Evan Chilcote</div>
      <div
        class="curtain left-curtain"
        :class="{ 'curtain-closed': appStore.curtainShut }"
      >
        <div class="curtain-bottom box" />
      </div>
      <div
        class="curtain right-curtain"
        :class="{ 'curtain-closed': appStore.curtainShut }"
      >
        <div class="curtain-bottom box" />
      </div>
      <div class="w-100 h-100 d-flex  justify-center overflow-y-auto main" :class="{ 'bg-home_': isHome, 'bg-other': true }">
        <v-container class="between-curtains">
          <v-row justify="center">
            <v-col class="d-flex align-center justify-center flex-column" :class="{ 'mt-12': !mobile }" :cols="mobile ? 12 : 6">
              <!--v-img.white(src='@/assets/NameHeader.png' style='width:50vw;' cover)-->
              <div class="text-grey-lighten-4 shadow cursor-pointer text-no-wrap nav-header" :class="{ 'nav-header-mobile': mobile }" style="" @click="router.push('/')"> Evan Chilcote</div>
<!--              <div v-if="stackNav" class="tagline shadow">Trumpeter</div>-->
              <div class="w-100 d-flex align-center justify-center" :class="{ 'flex-column ga-3 mt-4': stackNav }">
                <v-btn
                  class="text-capitalize"
                  :class="stackNav ? 'nav-btn-pill' : 'mr-2'"
                  prepend-icon="mdi-account-music"
                  :rounded="stackNav ? 'pill' : undefined"
                  :size="stackNav ? 'default' : (mobile ? 'small' : 'large')"
                  text="About"
                  to="/about"
                  :variant="stackNav ? 'outlined' : 'text'"
                />
                <v-btn
                  class="text-capitalize"
                  :class="stackNav ? 'nav-btn-pill' : 'mr-2'"
                  prepend-icon="mdi-multimedia"
                  :rounded="stackNav ? 'pill' : undefined"
                  :size="stackNav ? 'default' : (mobile ? 'small' : 'large')"
                  text="Media"
                  to="/media"
                  :variant="stackNav ? 'outlined' : 'text'"
                />
                <v-btn
                  class="text-capitalize"
                  :class="{ 'nav-btn-pill': stackNav }"
                  prepend-icon="mdi-email"
                  :rounded="stackNav ? 'pill' : undefined"
                  :size="stackNav ? 'default' : (mobile ? 'small' : 'large')"
                  text="Contact"
                  to="/contact"
                  :variant="stackNav ? 'outlined' : 'text'"
                />
              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12">
              <!-- Keep the media page alive so its Instagram iframes don't reload on every visit -->
              <router-view v-slot="{ Component }">
                <KeepAlive include="MediaPage">
                  <component :is="Component" />
                </KeepAlive>
              </router-view>
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
  // Stack nav vertically on the mobile homepage, where there's room above the performer
  const stackNav = computed(() => mobile.value && isHome.value)
</script>

<style scoped>
.main {
}

.layout-root {
  --curtain-w: 12vw;
  /* Size the stage to the *visible* viewport. On phones 100vh includes the area behind
     the browser toolbars, which pushed the floor/curtains off-screen and misaligned Evan. */
  position: relative;
  overflow: hidden;
  height: 100vh;
  height: 100dvh;
}

.curtains-slim {
  --curtain-w: 4vw;
}

/* Keep page content out from under the curtains */
.between-curtains {
  max-width: none;
  padding-inline: calc(var(--curtain-w) + 8px);
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
  height: 100%;
  width: var(--curtain-w); /* Each curtain covers one side of the screen */
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
  margin-bottom: -16px;
  font-size: 21vw
}

.tagline {
  margin-top: -3vw; /* tuck up under the script title's tall line box */
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: 5.5vw;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.nav-btn-pill {
  width: 60vw;
  border-color: rgba(255, 255, 255, 0.35);
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
