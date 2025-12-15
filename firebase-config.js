// Firebase Configuration for Growtez Blog
// Replace the placeholder values with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > General > Your apps > Web app

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Firebase Configuration for Growtez Blog
const firebaseConfig = {
    apiKey: "AIzaSyCNb-IkMSZyKUTGKUm1o04LOVYUIwWpIPg",
    authDomain: "growtez-site.firebaseapp.com",
    projectId: "growtez-site",
    storageBucket: "growtez-site.firebasestorage.app",
    messagingSenderId: "850869009700",
    appId: "1:850869009700:web:5e2a87cbf44c3e8193c7b1",
    measurementId: "G-6K3K85SKYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Blog posts collection reference
const blogPostsCollection = collection(db, "blog_posts");

// Export functions for use in blog.js
export { db, blogPostsCollection, collection, getDocs, doc, getDoc, query, where, orderBy, limit };
