import auth0 from "auth0-js";

/*
function useUserData() {
    const [hasError, setErrors] = useState(false);
    const [users, setUsers] = useState({});
  
    const networkCall = useCallback(async fetchData = () => {
      const res = await fetch(
        "https://swapi.co/api/planets/4/"
      );
      res
        .json()
        .then(res => setUsers(res))
        .catch(err => setErrors(err));
    } , [])
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return {users, hasError};
  }
*/

class Auth {
   constructor() {
      // console.log(process.env);

      this.auth0 = new auth0.WebAuth({
         domain: process.env.REACT_APP_AUTH0_DOMAIN,
         clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
         redirectUri: `${process.env.REACT_APP_DOMAIN}/callback`,
         audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
         responseType: "token id_token",
         scope: "openid email",
      });

      this.user = {};
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
   }

   login() {
      this.auth0.authorize();
   }

   getIdToken() {
      return this.idToken;
   }

   getUserInfo() {
      /*   return new Promise((resolve, reject) => {
         this.auth0.client.userInfo(this.accessToken, function (err, user) {
            console.log("err: ", err);
            if (err) return reject(err);
            console.log("user: ", user);
            resolve(user);
         });
      });*/
   }

   handleAuthentication() {
      return new Promise((resolve, reject) => {
         this.auth0.parseHash((err, authResult) => {
            if (err) return reject(err);
            if (!authResult || !authResult.idToken) {
               return reject(err);
            }
            this.auth0.client.userInfo(authResult.idToken, function (err, user) {
               console.log("err: ", err);
               console.log("user: ", user);
            });

            this.setSession(authResult);
            resolve();
         });
      });
   }

   setSession(authResult) {
      this.idToken = authResult.idToken;
      this.idToken = authResult.idToken;
      console.log(this.idToken);
      // set the time that the id token will expire at
      this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
   }

   logout() {
      this.auth0.logout({
         returnTo: process.env.REACT_APP_DOMAIN,
         clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      });
   }

   silentAuth() {
      return new Promise((resolve, reject) => {
         this.auth0.checkSession({}, (err, authResult) => {
            if (err) return reject(err);
            this.setSession(authResult);
            resolve();
         });
      });
   }

   isAuthenticated() {
      // Check whether the current time is past the token's expiry time
      return new Date().getTime() < this.expiresAt;
   }
}
/*
const auth = new Auth();
console.log(auth.getUserInfo());*/
//export default auth;
export default null;
