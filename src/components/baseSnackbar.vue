<template>
  <v-snackbar v-model="snackbar.isActive" :timeout="snackbar.timeout">
    {{ snackbar.message }}
    <template v-slot:action="{attrs}">
      <v-btn color="orange" text v-bind="attrs" @click="dismiss">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: {},
    }
  },
  computed: {
    storeSnackbar() {
      return this.$store.getters['snackbar/snackbar']
    },
  },
  methods:{
      dismiss(){
          this.$store.dispatch('snackbar/toggleSnackBar',{isActive: false})
      }
  },
  created() {
    this.snackbar = this.storeSnackbar // somehow makes snackbar reactive to computed value
  },
}
</script>

<style></style>
