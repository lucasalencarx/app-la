importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCMo-vkwF-mdi-E6jLbERNPnFitQOXigAo",
  authDomain: "apps-lucasalencar.firebaseapp.com",
  projectId: "apps-lucasalencar",
  messagingSenderId: "382549257976",
  appId: "1:382549257976:web:65dfdf7b094ed4b1e4d50d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});