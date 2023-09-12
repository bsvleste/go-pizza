import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Alert } from 'react-native'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '@config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  isAdmin: boolean
}

type authContextData = {
  signIn: (email: string, password: string) => Promise<void>
  isLoading: boolean
  user: User | null
  signOut: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
}
type AuthProviderProps = {
  children: ReactNode;
}
const USER_COLLECTION = '@gopizza:users'
export const AuthContext = createContext({} as authContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null);


  async function signIn(email: string, password: string) {
    if (email === '' || password === '') {
      return Alert.alert("Loginr", "informe o email e a senha");
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(account => {
        const docRef = doc(firestore, 'users', account.user.uid)
        getDoc(docRef).then(async profile => {
          const { name, isAdmin } = profile.data() as User
          if (profile.exists()) {
            const userData = {
              id: account.user.uid,
              name,
              isAdmin,
            }
            await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user));
            setUser(userData)
          }
        })
      }).catch(error => {
        const { code } = error;
        if (code === "auth/user-not-found" || code === 'auth/wrong-password') {
          return Alert.alert('Login', "Email e ou senha invalidos")
        } else {

          return Alert.alert("Login", "Não foi possivel realizar o login , tenta novamente")
        }
      }).finally(() => setIsLoading(false));

  }
  async function loadUserStorageData() {
    setIsLoading(true)
    const storageUser = await AsyncStorage.getItem(USER_COLLECTION)
    if (storageUser) {
      const userData = JSON.parse(storageUser) as User
      console.log("user async", userData)
      setUser(userData)
    }
    setIsLoading(false)
  }

  async function signOut() {
    await auth.signOut();
    await AsyncStorage.removeItem(USER_COLLECTION)
    setUser(null);
  }
  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert("Redefinir senha", "infrome o email")
    }
    sendPasswordResetEmail(auth, email)
      .then(() => Alert.alert("Redefinir senha", "Enviamos um link para seu email"))
      .catch(() => Alert.alert("Redefinir senha", "Não foi possivel enviar o emial para redefinir a senha tente novamente"))
  }
  useEffect(() => {
    loadUserStorageData();
  }, [])
  return (
    <AuthContext.Provider value={{
      isLoading, signIn, user, signOut, forgotPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}


function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth }