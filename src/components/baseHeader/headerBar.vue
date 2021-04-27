<template>
    <v-app-bar app elevation="1" hide-on-scroll class="main-bar" style="background-color: orange">
      <v-app-bar-nav-icon @click="toggleDrawer" color="grey darken-4"></v-app-bar-nav-icon>
      <v-toolbar-title class="v-toolbar__content flex-grow-1 pa-0">
        <h4>Grocery List</h4>
      </v-toolbar-title>
      <v-btn icon v-if="$route.path === '/'">
        <v-icon @click="toggleIsAdding" color="grey darken-4">mdi-plus</v-icon>
      </v-btn>
      <overflow-menu></overflow-menu>
    </v-app-bar>
</template>

<script>
export default {
  components:{
    'overflow-menu': require('./overflowMenu').default
  },
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
