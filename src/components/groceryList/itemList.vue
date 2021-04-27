<template>
  <div>
    <v-list flat class="pa-0">
      <v-list-item-group multiple>
        <div v-for="(item, index) in groceryItems" :key="index" @contextmenu="show(item,$event)">
          <v-list-item @change="toggleSelected(item)" :class="{selected: item.isSelected}">
            <template v-slot:default="{active}">
              <v-list-item-action class="mr-0">
                <v-checkbox @change="toggleSelected(item)" v-model="item.isSelected" :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content class="ml-4">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action class="mr-4">
                <v-list-item-action-text>{{ timeSince(item.time) }}</v-list-item-action-text>
              </v-list-item-action>

              <v-list-item-action v-if="item.isImportant">
                <!-- @click.stop prevents the event underneath to run -->
                  <v-icon color="red darken-2">mdi-exclamation</v-icon>
              </v-list-item-action>
              <v-list-item-action>
                <!-- @click.stop prevents the event underneath to run -->
                <v-btn icon @click.stop="removeItem(item)">
                  <v-icon color="grey darken-2">mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list-item-group>
    </v-list>
    <overflow-menu :x="x" :y="y" :showMenuProp="showMenu" :currentItem="currentItem" @edit="edit" @selected="toggleSelected(currentItem)" @setImportance="setImportance(currentItem)"></overflow-menu>
    <blockquote class="empty pa-4" v-if="!groceryItems.length">Your list is empty!</blockquote>
    <dialog-edit :showEditDialog="showEditDialog" :currentItem="currentItem" @close="dismissEditDialog"></dialog-edit>
  </div>
</template>

<script>
export default {
  components: {
    'overflow-menu': require('./itemList/overflowMenu').default,
    'dialog-edit': require('./itemList/dialog-edit').default
  },
  data() {
    return {
      showMenu: false,
      showEditDialog: false,
      x: 0,
      y: 0,
      currentItem: {},
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
  watch: {
    groceryItems() {
      !this.groceryItems.length &&
        (() => {
          !this.isAdding && this.$store.dispatch('toggleIsAdding')
        })()
    },
  },
  methods: {
    show(item, e) {
      e.preventDefault()
      this.currentItem = item
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    edit(){
      this.showEditDialog = true
    },
    dismissEditDialog(){
      this.showEditDialog = false
    },
    removeItem(item) {
      this.$store.dispatch('removeItem', item)
    },
    toggleSelected(itemArg) {
      let item = itemArg
      item.isSelected = !item.isSelected
      this.$store.dispatch('patchGroceryItem', {item:item, mode:'selection'})
    },
    setImportance(itemArg){
      this.$store.dispatch('patchGroceryItem', {item:{isImportant:!itemArg.isImportant,id:itemArg.id}, mode:'importance'})
    },
    timeSince(date) {
        var seconds = Math.floor((new Date(new Date().toJSON()) - new Date(date)) / 1000);
        var divisors = [31536000, 2592000, 86400, 3600, 60, 1]
        var description = ["yrs", "mos", "days", "h", "m", "s"]
        var result = [];
      
        var interval = seconds;
      
        for (let i = 0; i < divisors.length; i++) {
          interval = Math.floor(seconds / divisors[i])
          if (interval > 1) {
            result.push(interval + "" + description[i])
          }
          seconds -= interval * divisors[i]
        }
        return result.join(" ")
      }
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
