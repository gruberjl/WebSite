import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDocs, query, deleteDoc as DeleteDoc, getDoc as GetDoc, setDoc } from 'firebase/firestore'
import { getAuth as GetAuth, onAuthStateChanged as OnAuthStateChanged, signInWithEmailAndPassword as SignInWithEmailAndPassword, createUserWithEmailAndPassword as CreateUserWithEmailAndPassword, signOut as SignOut  } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBAnWR_MHwMJtAGtisRow9dFPJQ3vUy_Vw",
  authDomain: "web-server-9d634.firebaseapp.com",
  databaseURL: "https://web-server-9d634.firebaseio.com",
  projectId: "web-server-9d634",
  storageBucket: "web-server-9d634.appspot.com",
  messagingSenderId: "54819552991",
  appId: "1:54819552991:web:bf1a4246ed6c35a98ab36a"
}

const app = initializeApp(firebaseConfig)
let db, auth

const getDb = () => {
  if (!db) {
    getAuth()
    db = getFirestore(app)
  }
 
  return db
}

const getAuth = () => {
  if (!auth)
    auth = GetAuth()

  return auth
}

const onAuthStateChanged = (callback) => {
  const auth = getAuth()

  return OnAuthStateChanged(auth, callback)
}

const signInWithEmailAndPassword = (email, password) => {
  return SignInWithEmailAndPassword(getAuth(), email, password)
}

const createUserWithEmailAndPassword = (email, password) => {
  return CreateUserWithEmailAndPassword(getAuth(), email, password)
}

const getDoc = (path, id) => {
  return GetDoc(doc(getDb(), path, id))
    .then(docSnapshot => docSnapshot.data())
}

const getAllDocs = (path) => {
  return getDocs(collection(getDb(), path)).then(snapshotToDocs)
}

const snapshotToDocs = (snapshot) => {
  const docs = []
  snapshot.forEach(doc => { docs.push(doc.data()) })
  return docs
}

const deleteDoc = (path, id) => {
  return DeleteDoc(doc(getDb(), path, id))
}

const saveDoc = (path, data) => {
  return setDoc(doc(getDb(), path, data.id), data, { merge: true })
}

const signOut = () => {
  const auth = getAuth()
  return SignOut(auth)
}

export {getDb, getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, getDoc, getAllDocs, collection, query, saveDoc, deleteDoc, signOut}
