<template>
  <v-menu transition="slide-y-transition" bottom left>
    <template v-slot:activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on" class="mr-0">
        <v-icon color="grey darken-4">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list class="pr-2">
      <div v-for="(item, i) in items" :key="i">
        <v-list-item :disabled="!item.isEnabled">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title class="list-item" @click="item.action">{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider v-if="item.divide"></v-divider>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {isEnabled: true, title: 'Select all', action: this.doNothing, icon: 'mdi-select'},
        {isEnabled: true, title: 'Deselect all', action: this.doNothing, icon: 'mdi-select-off'},
        {isEnabled: true, title: 'Clear list', action: this.doNothing, icon: 'mdi-delete', divide: true},
        {isEnabled: true, title: 'Sort Alpha', action: this.toggleIsAlphaSorted, icon: 'mdi-sort-alphabetical-ascending'},
        {isEnabled: false, title: 'Sort Manual', action: this.sortManual, icon: 'mdi-drag', divide: true},
        {isEnabled: true, title: 'Credits', action: this.displayCredits, icon: 'mdi-arm-flex'},
      ],
    }
  },
  computed:{
    isAlphaSorted(){
      return this.$store.getters.isAlphaSorted
    }
  },
  watch:{
    isAlphaSorted(){
      let index = this.items.findIndex(item => item.title === 'Sort Alpha')
      this.items[index].isEnabled = !this.isAlphaSorted
      this.items[index+1].isEnabled = this.isAlphaSorted
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
    toggleIsAlphaSorted(){
      this.$store.dispatch('toggleIsAlphaSorted')
    },
    sortManual(){
      this.toggleIsAlphaSorted()
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
