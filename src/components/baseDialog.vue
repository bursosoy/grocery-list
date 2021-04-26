<template>
  <v-row justify="center">
    <v-dialog v-model="dialog.isActive" persistent max-width="290">
      <v-card color="grey darken-4 white--text" rounded="lg">
        <v-card-title class="headline">
          {{ dialog.title }}
        </v-card-title>
        <v-card-text class="grey--text text--lighten-2">{{ dialog.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" text @click="dismiss">
            {{ dialog.cta }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: {},
    }
  },
  computed: {
    storedialog() {
      return this.$store.getters['dialog/dialog']
    },
  },
  watch: {
    storedialog() {
      this.dialog = this.storedialog
    },
  },
  methods: {
    dismiss() {
      this.$store.dispatch('dialog/toggleDialog', {isActive: false})
    },
  },
  created() {
    this.dialog = this.storedialog // somehow makes dialog reactive to computed value
  },
}
</script>

<style></style>
