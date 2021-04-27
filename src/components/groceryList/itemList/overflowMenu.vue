<template>
  <v-menu style="box-shadow: none" v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
    <v-list>
      <v-list-item class="list-item" @click="item.action" v-for="(item, index) in menuItems" :key="index">
        <v-list-item-title>{{ index !== 1 ? item.title : importanceLabel }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      menuItems: [
        {
          title: 'Select/Deselect',
          action: this.select
        },
        {
          title: '',
          action: this.setImportance
        },
        {
          title: 'Edit',
          action: this.editItem
        }
      ],
    }
  },
  props: ['x', 'y', 'showMenuProp','currentItem'],
  created() {
    this.showMenu = this.showMenuProp
  },
  watch: {
    showMenuProp() {
      this.showMenu = this.showMenuProp
    }
  },
  computed:{
    importanceLabel(){
      return !this.currentItem.isImportant ? 'Set Important' : 'Remove Importance'
    }
  },
  methods: {
    editItem() {
      this.$emit('edit')
      },
    select() {
        this.$emit('selected')
    },
    setImportance(){
      this.$emit('setImportance')
    }
  },
}
</script>

<style lang="scss" scoped>
.list-item {
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
}

.v-item--active, .v-list-item--active, .v-list-item--link:before{
    background-color: transparent;
}
</style>
