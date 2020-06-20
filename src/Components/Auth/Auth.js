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
      // console.log(st.auth);
      return st.auth;
    }
  }
  
  export default new Auth();
  