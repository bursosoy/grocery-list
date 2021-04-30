<template>
  <v-text-field
    ref="search"
    v-model.trim="searchItem"
    @input="updateSearchText(searchItem)"
    @keydown.esc="dismiss"
    @blur="dismiss"
    v-if="isSearching"
    class="ma-4"
    hide-details="true"
    color="grey darken-2"
    clearable
    outlined
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
  >
  <!-- <template v-slot:append>
    <v-icon>mdi-magnify</v-icon>
  </template> -->
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchItem: '',
    }
  },
  computed: {
    groceryItems() {
      return this.$store.getters.groceryItems
    },
    isSearching() {
      return this.$store.getters.isSearching
    },
    isInvalidInput(){
      return this.searchItem === ''
    }
  },
  watch:{
    isSearching(){
      this.isSearching === false && (() => this.searchItem = '')()
    }
  },
  methods: {
    updateSearchText(text){
      this.$store.dispatch('updateSearchText', text)
    },
    dismiss(){
      this.$store.dispatch('toggleIsSearching')
      this.$store.dispatch('toggleIsAdding')
      this.$store.dispatch('updateSearchText', '')
      this.searchItem = ''
    }
  },
  activated(){
    console.log('mounted search')
  }
}
</script>

<style></style>
