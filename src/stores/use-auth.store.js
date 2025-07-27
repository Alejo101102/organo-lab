import { create } from "zustand";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase.config";


const useAuthStore = create((set)=> {
    const observeAuthState = () => {
        onAuthStateChanged(auth,(user)=>{
            user ? set ({userLooged:user}): set({userLooged:null});
        });
    };
    observeAuthState();

    return{
        userLooged: null,
        loginWithPopup: async () => {
            try{
                return await signInWithPopup(auth, new GoogleAuthProvider());
            } catch (error){
                console.error(error);
            };
        },

        logout:async()=>{
            signOut(auth).
            then(()=> set ({userLooged:null}))
            .catch((error)=>console.error(error))
        }
    };
});

export default useAuthStore;