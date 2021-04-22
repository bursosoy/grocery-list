<template>
  <v-text-field
    ref="add"
    v-model.trim="newItem"
    @click:append="addItem"
    @keydown.enter="addItem"
    v-if="isAdding || !groceryItems.length"
    class="ma-4"
    hide-details="true"
    color="grey darken-2"
    clearable
    outlined
    label="Add Item"
    append-icon="mdi-arrow-right"
  ></v-text-field>
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
  },
  methods: {
    addItem() {
      if (!this.newItem) {
        return
      }
      this.$store.dispatch('addItem', this.newItem)
      this.newItem = ''
      this.$store.dispatch('toggleIsAdding')
    },
  },
}
</script>

<style></style>
