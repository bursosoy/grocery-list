// vue add vuetify

<template>
  <v-app id="inspire">
    <base-header></base-header>
    <v-main>
      <router-view></router-view>
    </v-main>
    <base-snackbar></base-snackbar>
    <base-dialog></base-dialog>
  </v-app>
</template>

<script>
export default {
  components: {
    'base-header': require('./components/baseHeader.vue').default,
    'base-snackbar': require('./components/baseSnackbar.vue').default,
    'base-dialog': require('./components/baseDialog.vue').default
  },
}
</script>

<style lang="scss" scoped>
</style>
