import store from '../../Redux/Store/Store';
class Auth {
    constructor() {
      
      this.authenticated = false;

      
    }
  
    login(cb) {
      

    cb();
    }

  
    logout(cb) {
      
      cb();
    }
  
    isAuthenticated() {
      let st = store.getState();
      console.log('status',st.auth.isLoggedIn);
      return st.auth.isLoggedIn;
    }
  }
  
  export default new Auth();
  