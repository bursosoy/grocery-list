<template>
  <section>
    <input-item></input-item>
    <item-list></item-list>
  </section>
</template>

<script>
export default {
  components: {
    'input-item': require('../components/groceryList/inputItem').default,
    'item-list': require('../components/groceryList/itemList').default
  }
}
</script>

<style lang="scss" scoped>
.empty {
  background-color: #eee;
}
</style>
