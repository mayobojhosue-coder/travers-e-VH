import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "TON_API_KEY",
    authDomain: "TON_PROJET.firebaseapp.com",
    projectId: "TON_PROJET",
    storageBucket: "TON_PROJET.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

// AUTH
window.register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value);
};

window.login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value);
};

// STATE
onAuthStateChanged(auth, user => {
    if (user) {
        auth.style.display = "none";
        appDiv.style.display = "block";
        loadPhotos();
    }
});

// UPLOAD
window.uploadPhoto = async () => {
    const file = photo.files[0];
    if (!file) return;

    const storageRef = ref(storage, `photos/${file.name}`);
    await uploadBytes(storageRef, file);
    loadPhotos();
};

// LOAD PHOTOS
async function loadPhotos() {
    gallery.innerHTML = "";
    const listRef = ref(storage, "photos");
    const res = await listAll(listRef);

    for (let item of res.items) {
        const url = await getDownloadURL(item);
        const img = document.createElement("img");
        img.src = url;
        gallery.appendChild(img);
    }
}
