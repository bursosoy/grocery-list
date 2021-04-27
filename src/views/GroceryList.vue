<template>
  <section>
    <input-item></input-item>
    <search-item></search-item>
    <item-list></item-list>
  </section>
</template>

<script>
export default {
  components: {
    'input-item': require('../components/groceryList/inputItem').default,
    'search-item': require('../components/groceryList/searchItem').default,
    'item-list': require('../components/groceryList/itemList').default
  }
}
</script>

<style lang="scss" scoped>
.empty {
  background-color: #eee;
}
</style>
