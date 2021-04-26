<template>
  <v-navigation-drawer v-model="$store.state.drawer" app left>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Main Menu
        </v-list-item-title>
        <v-list-item-subtitle>
          Best List Ever!
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      {title: 'To buy', icon: 'mdi-format-list-checks', path: '/'}, // mdi means material design icons
      {title: 'About', icon: 'mdi-information-outline', path: '/about'},
    ],
  }),
}
</script>

<style></style>
