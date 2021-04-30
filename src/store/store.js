import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import snackbar from './snackbar'
import dialog from './dialog'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      appTitle: process.env.VUE_APP_TITLE,
      isAdding: false,
      isSearching: false,
      isAlphaSorted: true,
      searchText: '',
      groceryItems: [],
      drawer: false
    }
  },
  getters: {
    appTitle(state) {
      return state.appTitle
    },
    groceryItems(state) {
      if (state.isAlphaSorted) {
        let sortedArray = Array.from(state.groceryItems) // copies it but leaves the original instance unchanged
        sortedArray.sort((a, b) => {
          return a.name < b.name ? -1 : 1
        })
        return sortedArray.filter(item => item.name.toLowerCase().includes(state.searchText.toLowerCase()))
      } else {
        return state.groceryItems.filter(item => item.name.toLowerCase().includes(state.searchText.toLowerCase()))
      }
    },
    filteredGroceryItems(_, getters) {
      return getters.groceryItems
    },
    isAdding(state) {
      return state.isAdding
    },
    isAlphaSorted(state) {
      return state.isAlphaSorted
    },
    isSearching(state) {
      return state.isSearching
    }
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer
    },
    toggleIsAdding(state) {
      state.isAdding = !state.isAdding
    },
    toggleIsAlphaSorted(state) {
      state.isAlphaSorted = !state.isAlphaSorted
    },
    toggleIsSearching(state) {
      state.isSearching = !state.isSearching
      if (state.isSearching === true) { state.searchText = '' }
    },
    addItem(state, newItem) {
      state.groceryItems.push(newItem)
    },
    updateSearchText(state, text) {
      if (text == null) { text = '' }
      state.searchText = text
    }
  },
  actions: {
    toggleIsAdding({ commit }) {
      commit('toggleIsAdding')
    },
    toggleIsAlphaSorted({ commit }) {
      commit('toggleIsAlphaSorted')
    },
    toggleIsSearching({ commit }) {
      commit('toggleIsSearching')
    },
    toggleDrawer({ commit }) {
      commit('toggleDrawer')
    },
    updateSearchText({ commit }, text) {
      commit('updateSearchText', text)
    },
    async removeItem(context, item) {
      let sureness = true
      item.isImportant && (() => {
        sureness = confirm('Are you sure?')
      })()
      if (sureness === false) { return }
      await axios.delete(`https://grocery-cart-4f82e-default-rtdb.firebaseio.com/grocery-items/${item.id}.json`)
        .then(res => res.statusText === 'OK' && (() => {
          context.dispatch('getGroceryItems')
          context.dispatch('snackbar/toggleSnackBar', {
            isActive: true,
            message: `${item.name} has been deleted.`,
            timeout: 2000
          })
        })())
        .catch(error => alert(error.message))
    },
    async addItem(context, newItem) {
      const isDuplicate = context.state.groceryItems.some(item => item.name === newItem)
      if (isDuplicate) {
        context.dispatch('dialog/toggleDialog', {
          isActive: true,
          title: 'Duplicate Item',
          message: `Do you really really need to buy that thing? You already have ${newItem} in your list buddy.`,
          cta: 'OKAY :('
        })
      }
      else {
        const newGroceryItem = {
          name: newItem,
          isSelected: false,
          isImportant: false,
          time: new Date()
        }
        await axios.post('https://grocery-cart-4f82e-default-rtdb.firebaseio.com/grocery-items.json', newGroceryItem)
          .then(res => {
            context.dispatch('toggleIsAdding')
            context.dispatch('getGroceryItems')
            context.dispatch('snackbar/toggleSnackBar', {
              isActive: true,
              message: `${newItem} has been added.`
            })
          })
          .catch(error => alert(error.message))
      }
    },
    async patchGroceryItem(context, payload) {
      const isDuplicate = context.state.groceryItems.some(oldItem => oldItem.name === payload.item.name)
      if (isDuplicate && payload.mode === 'edit') {
        context.dispatch('dialog/toggleDialog', {
          isActive: true,
          title: 'Duplicate Item',
          message: `Do you really really need to buy that thing? You already have ${payload.item.name} in your list buddy.`,
          cta: 'OKAY :('
        })
      }
      else {
        await axios.patch(`https://grocery-cart-4f82e-default-rtdb.firebaseio.com/grocery-items/${payload.item.id}.json`, payload.item)
          .then(res => (() => {
            context.dispatch('getGroceryItems')
          })())
          .catch(error => alert(error.message))
      }
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
