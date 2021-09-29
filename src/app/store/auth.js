
export default ({
      namespaced: true,
      state: {
            token: null,
            user: null 
      },
      getters: {
            authenticated() {
                  return  localStorage.getItem('token') && localStorage.getItem('user')? localStorage.getItem('token') && localStorage.getItem('user'): '';
            },
            user() {
                  return localStorage.getItem('user')
            },
            token() {
                  return localStorage.getItem('token')
            }
      },
      mutations: {
            //aqui el state es el valor actual y el token el valor que estamos pasando
            AsignarToken(state) {
                  state.token = localStorage.getItem('token');
            },
            AsignarUser(state) {
                  state.user = localStorage.getItem('user');
            }
      },
      actions: {
            async attempt({commit}, token) {

              await localStorage.setItem('user', JSON.stringify(token.usuario));
              await localStorage.setItem('token', JSON.stringify(token.token));
              
              await commit('AsignarToken')
              await commit('AsignarUser')
                 
             
              /*
                  try {
                        let token = getters.token
                        let response=  await fetch("api/tasks/Usuario", {
                              method: "GET",
                              headers: {
                                    Accept: "application/json",
                                    "Content-type": "application/json",
                                    "token": token
                              },
                        }).then((res) => res.json())
                          .then((res) => { return res })                       
                         commit('AsignarUser',response);
                  } catch (error) {
                       console.log('Failed')
                  }
            },
            async attuser({ commit }, data) {
                 
                  console.log('listo')*/
            },
            async LogOut(){
                  await localStorage.removeItem('user');
                  await localStorage.removeItem('token');
            }


      }

})