<template>
  <div>
    <v-list flat class="pa-0">
      <v-list-item-group multiple>
        <div v-for="(item, index) in groceryItems" :key="index">
          <v-list-item @change="toggleSelected(item)" :class="{selected: item.isSelected}">
            <template v-slot:default="{active}">
              <v-list-item-action class="mr-0">
                <v-checkbox @change="toggleSelected(item)" v-model="item.isSelected" :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content class="ml-4">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <!-- @click.stop prevents the event underneath to run -->
                <v-btn icon @click.stop="removeItem(item.id)">
                  <v-icon color="grey darken-2">mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list-item-group>
    </v-list>
    <blockquote class="empty pa-4" v-if="!groceryItems.length">Your list is empty!</blockquote>
  </div>
</template>

<script>
export default {
  computed: {
    groceryItems() {
      return this.$store.getters.groceryItems
    },
    isAdding() {
      return this.$store.getters.isAdding
    },
  },
  watch: {
    groceryItems() {
      !this.groceryItems.length &&
        (() => {
          !this.isAdding && this.$store.dispatch('toggleIsAdding')
        })()
    },
  },
  methods: {
    removeItem(name, index) {
      this.$store.dispatch('removeItem', name)
    },
    toggleSelected(item) {
      this.$store.dispatch('patchGroceryItem', item)
    },
  },
  mounted() {
    this.$store.dispatch('getGroceryItems')
  },
}
</script>

<style lang="scss" scoped>
.selected {
  background-color: #eee;
}
</style>
