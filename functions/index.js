
// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNewOrderNotification = functions.database.ref("/orders/{orderId}")
    .onCreate(async (snapshot, context) => {
      const newOrder = snapshot.val();
      const tokensSnapshot = await admin.database().ref("/admin_tokens").once("value");
      if (!tokensSnapshot.exists()) {
        console.log("No admin tokens to send notification.");
        return null;
      }
      
      const tokens = Object.values(tokensSnapshot.val());
      const payload = {
        notification: {
          title: `New Order: ${newOrder.productTitle}`,
          body: `From: ${newOrder.userEmail || "a user"} for ₹${newOrder.price}`,
          icon: newOrder.productCoverImage || "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFnLyOzDs8gngq68zI1_8u7SO4mfC9px6iu7PVw80j34_fn6nDMACws-JUTukEFycCzDtK8SX6re_Sm9glmmpSxHQTRFN-ErgTBRCpY-v1U77FgSv358Etg2sMa5wCyVRIpvAIpMisHyIm82ZWO8uNdOHyl6h41qz3QTirAA-aabErONcKxxUOvYDZRvE/s850/1000166545.png",
        },
      };

      console.log(`Sending notification to ${tokens.length} admin(s).`);
      return admin.messaging().sendToDevice(tokens, payload);
    });
