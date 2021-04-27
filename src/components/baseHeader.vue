<template>
  <div>
    <drawer-menu></drawer-menu>
    <header-bar></header-bar>
  </div>
</template>

<script>
export default {
  components: {
    'drawer-menu': require('./baseHeader/drawerMenu.vue').default,
    'header-bar': require('./baseHeader/headerBar.vue').default,
  },
}
</script>

<style></style>
