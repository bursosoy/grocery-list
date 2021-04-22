export default{
    namespaced: true,
    state(){
        return{
            dialog: {
                isActive: false,
                title: 'This is default title',
                message: 'This is default message.',
                cta: 'OK, GOT IT!'
              }
        }
    },
    getters:{
        dialog(state){
            return state.dialog
          }
    },
    mutations:{
        toggleDialog(state,payload){
            state.dialog = payload
        }
    },
    actions:{
        toggleDialog(context, payload){
            context.commit('toggleDialog', payload)
        }
    }
}