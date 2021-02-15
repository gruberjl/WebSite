import React from "react"
import Heading from './heading'
import PageHeader from './page-header'
import "./page.css"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBAnWR_MHwMJtAGtisRow9dFPJQ3vUy_Vw",
  authDomain: "web-server-9d634.firebaseapp.com",
  databaseURL: "https://web-server-9d634.firebaseio.com",
  projectId: "web-server-9d634",
  storageBucket: "web-server-9d634.appspot.com",
  messagingSenderId: "54819552991",
  appId: "1:54819552991:web:bf1a4246ed6c35a98ab36a"
}

firebase.initializeApp(firebaseConfig)


export default function Page({ children }) {
  return (
    <div>
      <Heading />
      <PageHeader />
      {children}
    </div>
  )
}
