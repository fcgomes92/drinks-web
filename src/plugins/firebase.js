import * as firebase from "firebase/app";
import "firebase/auth";
import { setToken } from "../utils/auth";

let firebaseApp = null;

export default ({ app, redirect, req }) => {
  const handleAuthStateChange = async user => {
    if (user) {
      const token = await user.getIdToken();
      setToken({
        user: {
          uid: user.uid,
          email: user.email,
          name: user.displayName
        },
        token
      });
      redirect("/servers");
    } else {
      if (req) {
        redirect(req.url);
      } else {
        redirect("/");
      }
    }
  };

  const startFirebase = () => {
    try {
      const firebaseConfig = {
        apiKey: "AIzaSyAS2rStpYd4V7iYNQsULQ_jkOu1C64-lio",
        authDomain: "drinks-e0b36.firebaseapp.com",
        databaseURL: "https://drinks-e0b36.firebaseio.com",
        projectId: "drinks-e0b36",
        storageBucket: "drinks-e0b36.appspot.com",
        messagingSenderId: "714959229889",
        appId: "1:714959229889:web:68fe347daafbc351705540"
      };

      firebaseApp = firebase.apps.length
        ? firebase.app()
        : firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(handleAuthStateChange);
    } catch (err) {
      console.log(err);
    }
  };

  app.$axios.interceptors.response.use(
    response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error && error.response && error.response.status === 401) {
        firebase.auth().signOut();
        app.router.push("/login");
      }
      return Promise.reject(error);
    }
  );

  startFirebase();
};
