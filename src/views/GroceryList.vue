<template>
  <section>
    <input-item></input-item>
    <item-list></item-list>
  </section>
</template>

<script>
import inputItem from '../components/groceryList/input-item.vue'
import itemList from '../components/groceryList/item-list.vue'
export default {
  components: {inputItem, itemList},
}
</script>

<style lang="scss" scoped>
.empty {
  background-color: #eee;
}
</style>
