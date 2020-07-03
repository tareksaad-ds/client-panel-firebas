import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import "firebase/auth";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

// Reducers

const firebaseConfig = {
  apiKey: "AIzaSyBU4V0hgpCVxwJ5m-1ik7qfOreGcKsbWAc",
  authDomain: "client-panel-rredux.firebaseapp.com",
  databaseURL: "https://client-panel-rredux.firebaseio.com",
  projectId: "client-panel-rredux",
  storageBucket: "client-panel-rredux.appspot.com",
  messagingSenderId: "668383113971",
  appId: "1:668383113971:web:e56425b8be7be9fde17d86",
  measurementId: "G-2GVV3PVM83",
};

// react-redux-firebase-config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for profile instead of Realtime DB
};

// init firebase instance
firebase.initializeApp(firebaseConfig);

// init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reduxReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Combine Reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
});

// Check for Settings and LocalStorage
if (localStorage.getItem("settings") === null) {
  const defaulSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegisteration: false,
  };

  localStorage.setItem("settings", JSON.stringify(defaulSettings));
}

// Create initial State
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

//Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
