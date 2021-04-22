<template>
  <div>
    <drawer-menu></drawer-menu>
    <header-bar></header-bar>
  </div>
</template>

<script>
export default {
  components: {
    'drawer-menu': require('./baseHeader/drawer-menu.vue').default,
    'header-bar': require('./baseHeader/header-bar.vue').default,
  },
}
</script>

<style></style>
