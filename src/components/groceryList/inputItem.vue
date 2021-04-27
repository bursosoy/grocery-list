<template>
  <v-text-field
    ref="add"
    v-model.trim="newItem"
    @keydown.enter="!isInvalidInput && addItem()"
    @keydown.esc="$store.dispatch('toggleIsAdding'),newItem=''"
    v-if="(isAdding || !groceryItems.length) && !isSearching"
    class="ma-4"
    hide-details="true"
    color="grey darken-2"
    clearable
    outlined
    label="Add Item"
  >
  <template v-slot:append>
    <v-icon @click="addItem" :disabled="isInvalidInput">mdi-arrow-right</v-icon>
  </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newItem: '',
    }
  },
  computed: {
    groceryItems() {
      return this.$store.getters.groceryItems
    },
    isAdding() {
      return this.$store.getters.isAdding
    },
    isSearching(){
      return this.$store.getters.isSearching
    },
    isInvalidInput(){
      return this.newItem === ''
    }
  },
  watch:{
    isAdding(){
      !this.isAdding && (() => this.newItem = '')()
    }
  },
  methods: {
    addItem() {
      if (!this.newItem) {
        return
      }
      this.$store.dispatch('addItem', this.newItem)
      this.newItem = ''
    },
  },
}
</script>

<style></style>
