// src/stores/use-auth.store.js
import { create } from "zustand";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase.config";

// Configurar la URL base de tu API
const API_BASE_URL = 'http://localhost:8080/api';

const useAuthStore = create((set, get) => {
    const observeAuthState = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // PRIMERO establecer el usuario (para que aparezca el avatar)
                set({ userLooged: user });
                
                // DESPUÉS intentar sincronizar con MongoDB (sin bloquear el login)
                syncUserWithMongoDB(user);
            } else {
                set({ userLooged: null });
            }
        });
    };

    observeAuthState();

    // Función para sincronizar usuario con MongoDB (NO BLOQUEA EL LOGIN)
    const syncUserWithMongoDB = async (firebaseUser) => {
        try {
            const userData = {
                firebaseUID: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL
            };

            console.log('🔄 Attempting to sync user with MongoDB...', userData.email);

            const response = await fetch(`${API_BASE_URL}/users/sync`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                console.warn(`⚠️ MongoDB sync failed (${response.status}). User logged in anyway.`);
                return;
            }

            const result = await response.json();
            
            if (!result.success) {
                console.warn('⚠️ MongoDB sync warning:', result.message);
            } else {
                console.log('✅ User synced with MongoDB successfully!');
            }
        } catch (error) {
            console.warn('⚠️ MongoDB sync failed, but user is still logged in:', error.message);
            // El login funciona aunque MongoDB falle
        }
    };

    observeAuthState();

    return {
        userLooged: null,
        
        loginWithPopup: async () => {
            try {
                console.log('🔑 Attempting login...');
                const result = await signInWithPopup(auth, new GoogleAuthProvider());
                console.log('✅ Login successful:', result.user.email);
                // La sincronización se hará automáticamente en observeAuthState
                return result;
            } catch (error) {
                console.error('❌ Login error:', error);
                throw error;
            }
        },

        logout: async () => {
            try {
                console.log('👋 Logging out...');
                await signOut(auth);
                set({ userLooged: null });
                console.log('✅ Logout successful');
            } catch (error) {
                console.error('❌ Logout error:', error);
                // Fallback: forzar logout local aunque Firebase falle
                set({ userLooged: null });
            }
        },

        // Método para obtener datos del usuario desde MongoDB
        getUserFromMongoDB: async (firebaseUID) => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/${firebaseUID}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.success) {
                    return result.data;
                }
                return null;
            } catch (error) {
                console.error('❌ Error fetching user from MongoDB:', error);
                return null;
            }
        }
    };
});

export default useAuthStore;