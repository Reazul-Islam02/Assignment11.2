import { createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null); // MongoDB user data (role, isPremium)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    // Fetch MongoDB User Data
    const fetchUserData = async (email) => {
        if (!email) return;
        try {
            const token = await auth.currentUser.getIdToken();
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${email}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Sync user to DB
                try {
                    await axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`, {
                        name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
                        email: currentUser.email,
                        photoURL: currentUser.photoURL
                    });
                    await fetchUserData(currentUser.email);
                } catch (error) {
                    console.error("Sync error:", error);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        userData,
        loading,
        createUser,
        loginUser,
        loginWithGoogle,
        logoutUser,
        updateUserProfile,
        refetchUser: () => fetchUserData(user?.email)
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
