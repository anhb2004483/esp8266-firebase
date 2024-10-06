// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI8Dfptxa5q3G6_GB1KfJZjWgU0lWEiDI",
  authDomain: "espgas-d6120.firebaseapp.com",
  databaseURL: "https://espgas-d6120-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "espgas-d6120",
  storageBucket: "espgas-d6120.appspot.com",
  messagingSenderId: "577421708651",
  appId: "1:577421708651:web:cfc074f1ffb4761c45902e",
  measurementId: "G-ZRRBCE50GS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch and display data from Firebase
async function fetchData() {
  const sn1Ref = ref(database, 'SN1'); // Reference to SN1 object
  const csnRef = ref(database, 'csn'); // Reference to csn object
  try {
    // Fetch SN1 data
    const sn1Snapshot = await get(sn1Ref);
    if (sn1Snapshot.exists()) {
      const sn1Data = sn1Snapshot.val();

      // Display the SN1 data on the web page
      document.getElementById('sn1-object').innerText = JSON.stringify(sn1Data);
      document.getElementById('sn1-gas').innerText = sn1Data.gas;
      document.getElementById('sn1-sn').innerText = sn1Data.SN;
    } else {
      console.log("No SN1 data available");
    }

    // Fetch CSN data
    const csnSnapshot = await get(csnRef);
    if (csnSnapshot.exists()) {
      const csnData = csnSnapshot.val();

      // Display the CSN data on the web page
      document.getElementById('csn-object').innerText = JSON.stringify(csnData);
      document.getElementById('csn-gas').innerText = csnData.gas;
      document.getElementById('csn-sn').innerText = csnData.SN;
    } else {
      console.log("No CSN data available");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// Call the fetchData function when the page loads
window.onload = fetchData;
