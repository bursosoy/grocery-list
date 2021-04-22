<template>
  <div>
    <v-app-bar app elevation="1" hide-on-scroll class="main-bar" style="background-color: orange">
      <v-toolbar-title class="v-toolbar__content flex-grow-1">
        <h4>Grocery List</h4>
      </v-toolbar-title>
      <v-btn icon v-if="$route.path === '/'">
        <v-icon @click="toggleIsAdding" color="grey darken-4">mdi-plus</v-icon>
      </v-btn>
      <v-app-bar-nav-icon @click="toggleDrawer" color="grey darken-4"></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
export default {
    methods: {
    toggleIsAdding() {
      this.$store.dispatch('toggleIsAdding')
    },
    toggleDrawer(){
        this.$store.dispatch('toggleDrawer')
    }
  },
}
</script>

<style></style>
