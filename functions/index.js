/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// import * as axios from 'axios';
// const {onRequest} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const axios = require("axios");
const cors = require("cors")({origin: true});
const admin = require("firebase-admin");
admin.initializeApp();
// const db = admin.firestore();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.helloWorld2 = functions.https.onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebasasdassdsdse!");
});
exports.getOdata = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const odataUrl = "https://services.odata.org/V2/Northwind/Northwind.svc/Products?$format=json";
    try {
      // Make a GET request to the OData service
      const response = await axios.get(odataUrl);
      // Send the retrieved data as the response
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    }
  });
});
exports.getProdOrderConfirmation = functions.https.
    onRequest(async (req, res) => {
      try {
      // URL of the SAP OData service
        const url = "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_MAINTORDERCONFIRMATION/MaintOrderConfirmation";
        // Query parameters
        const params = {
          "$inlinecount": "allpages",
          "$top": 10,
        };

        // HTTP GET request to the SAP OData service with API Key
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "APIKey": "2TsJRAbwZelXAl0ivyYAGZA2xBNCaMhp",
            // Replace with your actual SAP API key
          },
          params: params,
        });

        // Send the response data back to the client
        res.status(200).json(response.data);
      } catch (error) {
        console.error("Error fetching data from SAP:", error)
        res.status(500).send("Internal Server Error");
      }
    });
/*
exports.syncWithSap=functions.firestore.document("users/{userId}")
    .onCreate(async (snap, context) => {
      try {
        // The document that was created
        // Prepare data to insert into another collection (e.g., 'userProfiles')
        // Update the 'stats' collection
        await db.collection("sapdata").doc("datasync")
            .set("syncUpdatednpm run serve", {merge: true});

        // eslint-disable-next-line max-len
        console.log(`Profile created and stats updated
         for user: ${context.params.userId}`);
      } catch (error) {
        console.error("Error creating profile or updating stats:", error);
      }
    });
*/
