import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseAuth = getAuth();

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return new Promise((solve, reject) => {
    console.log("loginWithGoogle");
    signInWithPopup(firebaseAuth, provider)
      .then((res) => {
        solve(res.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {};
