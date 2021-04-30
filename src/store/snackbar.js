export default{
    namespaced: true,
    state(){
        return{
            snackbar: {
                isActive: false,
                message: 'This is default message.',
                timeout: 3000
              }
        }
    },
    getters:{
        snackbar(state){
            return state.snackbar
          }
    },
    mutations:{
        toggleSnackBar(state,payload){
            state.snackbar.isActive = payload.isActive
            state.snackbar.message = payload.message
            state.snackbar.timeout = (() => {
                return ((typeof payload.timeout) == 'undefined' ? 3000 : payload.timeout)
            })()
        }
    },
    actions:{
        toggleSnackBar(context, payload){
            context.commit('toggleSnackBar', payload)
        }
    }
}