<template>
    <v-app-bar app elevation="1" hide-on-scroll class="main-bar" style="background-color: orange">
      <v-app-bar-nav-icon @click="toggleDrawer" color="grey darken-4"></v-app-bar-nav-icon>
      <v-toolbar-title class="v-toolbar__content flex-grow-1 pa-0">
        <h4>{{ title }}</h4>
      </v-toolbar-title>
      <v-btn icon v-if="$route.path === '/'">
        <v-icon @click="toggleIsSearching" color="grey darken-4">mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon v-if="$route.path === '/'">
        <v-icon @click="toggleIsAdding" color="grey darken-4">mdi-plus</v-icon>
      </v-btn>
      <overflow-menu></overflow-menu>
    </v-app-bar>
</template>

<script>
export default {
  computed:{
    title(){
      return this.$store.getters.appTitle
    }
  },
  components:{
    'overflow-menu': require('./overflowMenu').default
  },
    methods: {
    toggleIsAdding() {
      this.$store.dispatch('toggleIsAdding')
      this.$store.state.isSearching = false
      this.$store.state.searchText = ''
    },
    toggleIsSearching() {
      this.$store.dispatch('toggleIsSearching')
      this.$store.state.isAdding = false
    },
    toggleDrawer(){
        this.$store.dispatch('toggleDrawer')
    }
  },
}
</script>

<style></style>
