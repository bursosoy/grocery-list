import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import snackbar from './snackbar'
import dialog from './dialog'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      isAdding: false,
      groceryItems: [],
      drawer: false
    }
  },
  getters: {
    groceryItems(state) {
      state.groceryItems.sort((a, b) => {
        return a.name < b.name ? -1 : 1
      })
      return state.groceryItems
    },
    isAdding(state) {
      return state.isAdding
    }
  },
  mutations: {
    toggleDrawer(state){
      state.drawer = !state.drawer
    },
    toggleIsAdding(state) {
      state.isAdding = !state.isAdding
    },
    addItem(state, newItem) {
      state.groceryItems.push(newItem)
    }
  },
  actions: {
    toggleIsAdding({ commit }) {
      commit('toggleIsAdding')
    },
    toggleDrawer({ commit }){
      commit('toggleDrawer')
    },
    async removeItem(context, id) {
      await axios.delete(`https://grocery-cart-4f82e-default-rtdb.firebaseio.com/grocery-items/${id}.json`)
        .then(res => res.statusText === 'OK' && (() => {
          context.dispatch('getGroceryItems')
          context.dispatch('snackbar/toggleSnackBar',{
            isActive: true,
            message: 'Item has been deleted.',
            timeout: 2000
          })
        })())
        .catch(error => alert(error.message))
    },
    async addItem(context, newItem) {
      const isDuplicate = context.state.groceryItems.some(item => item.name === newItem)
      if (isDuplicate) {
        context.dispatch('dialog/toggleDialog',{
          isActive: true,
          title: 'Duplicate Item',
          message: `Do you really really need to buy that thing? You already have ${newItem} in your list buddy.`,
          cta: 'OKAY :('
        })
      }
      else {
        const newGroceryItem = {
          name: newItem,
          isSelected: false
        }
        await axios.post('https://grocery-cart-4f82e-default-rtdb.firebaseio.com/grocery-items.json', newGroceryItem)
          .then(res => {
            context.dispatch('getGroceryItems')
            context.dispatch('snackbar/toggleSnackBar',{
              isActive: true,
              message: `${newItem} has been added.`
            })
          })
          .catch(error => alert(error.message))
      }

    },
    async patchGroceryItem(_,item) {
      item.isSelected = !item.isSelected
      await axios.patch(`https://grocery-cart-4f82e-default-rtdb.firebaseio.com/grocery-items/${item.id}.json`, {
        isSelected: item.isSelected
      })
      .then(res => res)
      .catch(error => alert(error.message))
    },
    async getGroceryItems(context) {
      await axios.get('https://grocery-cart-4f82e-default-rtdb.firebaseio.com/grocery-items.json')
        .then(res => (() => {
          context.state.groceryItems = []
          for (let item in res.data) {
            let itemToBeAdded = res.data[item]
            itemToBeAdded.id = item // cryptic added as id
            context.commit('addItem', itemToBeAdded)
          }
        })())
        .catch(error => alert(error.message))
    }
  },
  modules: {
    snackbar,
    dialog
  }
})
