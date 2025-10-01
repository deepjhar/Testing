importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyC3KRKS9zXXHfVJnYdZSM_prdcxvfN0gL8",
    authDomain: "aimaster-7ffaf.firebaseapp.com",
    databaseURL: "https://aimaster-7ffaf-default-rtdb.firebaseio.com",
    projectId: "aimaster-7ffaf",
    storageBucket: "aimaster-7ffaf.firebasestorage.app",
    messagingSenderId: "963488826729",
    appId: "1:963488826729:web:0c690774cd50209d33a9f8",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[SW] Received background message: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFnLyOzDs8gngq68zI1_8u7SO4mfC9px6iu7PVw80j34_fn6nDMACws-JUTukEFycCzDtK8SX6re_Sm9glmmpSxHQTRFN-ErgTBRCpY-v1U77FgSv358Etg2sMa5wCyVRIpvAIpMisHyIm82ZWO8uNdOHyl6h41qz3QTirAA-aabErONcKxxUOvYDZRvE/s850/1000166545.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
