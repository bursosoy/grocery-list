<template>
  <v-row justify="center">
    <v-dialog v-model="isActive" persistent max-width="290">
      <v-card color="grey darken-4 white--text" rounded="lg">
        <v-card-text class="grey--text text--lighten-2 pt-4">Edit grocery item:</v-card-text>
        <v-text-field dark class="mx-6 font-weight-bold rounded-lg" v-model="itemName" @keydown.enter="!invalidName && update()" @keydown.esc="dismiss" outlined></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" text @click="dismiss">
            Cancel
          </v-btn>
          <v-btn color="orange" dark text @click="update" :disabled="invalidName">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['currentItem', 'showEditDialog'],
  data() {
    return {
      isActive: false,
      itemName: '',
    }
  },
  computed:{
    invalidName(){
      return this.itemName === this.currentItem.name || this.itemName === ''
    }
  },
  watch: {
    showEditDialog() {
      this.isActive = this.showEditDialog
      this.itemName = this.currentItem.name
    },
  },
  methods: {
    dismiss() {
      this.$emit('close')
    },
    update() {
      let newItem = {
        name: this.itemName,
        id: this.currentItem.id,
      }
      if (newItem.name !== this.currentItem.name) {
        this.$store.dispatch('patchGroceryItem', {
          item: newItem,
          mode: 'edit',
        })
        this.$store.dispatch('snackbar/toggleSnackBar', {
        isActive: true,
        message: `'${this.currentItem.name}' has changed to '${newItem.name}'`,
      })
      }
      this.dismiss()
    },
  },
}
</script>

<style></style>
