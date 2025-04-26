import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuToGIyjxE4hBR7eFx4cXoKcoCAV_kIaU",
  authDomain: "va-tool.firebaseapp.com",
  projectId: "va-tool",
  storageBucket: "va-tool.appspot.com",
  messagingSenderId: "848303669290",
  appId: "1:848303669290:web:4b04817e991a50463d0353",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
