<template>
  <v-menu transition="slide-y-transition" bottom left>
    <template v-slot:activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="grey darken-4">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-title class="list-item" @click="item.action">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {title: 'Select all', action: this.doNothing, icon: 'mdi-select'},
        {title: 'Deselect all', action: this.doNothing, icon: 'mdi-select-off'},
        {title: 'Clear list', action: this.doNothing, icon: 'mdi-delete'},
        {title: 'Credits', action: this.displayCredits, icon: 'mdi-arm-flex'},
      ],
    }
  },
  methods: {
    displayCredits() {
      const payload = {
        isActive: true,
        title: 'The path to peace.',
        message: 'If you can endure, do not complain. -A',
        cta: 'Dismiss',
      }
      this.$store.dispatch('dialog/toggleDialog', payload)
    },
    doNothing() {},
  },
}
</script>

<style lang="scss" scoped>
.list-item {
  cursor: pointer;
}
</style>
