import KhaltiCheckout from "khalti-checkout-web";
import React from 'react'
import axios from "axios"; 

let config = {
    // replace this key with yours
    "publicKey": "test_public_key_ed99a724e11a41d4bffa9998f4afc113",
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

// let checkout = new KhaltiCheckout(config);
// let btn = document.getElementById("payment-button");
// btn.onclick = function () {
//     // minimum transaction amount must be 10, i.e 1000 in paisa.
//     checkout.show({amount: 1000});
// }


export default function Khalti() {
    let checkout = new KhaltiCheckout(config);
  //......
 let selectedDate = '1';
 let selectedTime = '2';
  //.........
    let buttonStyles = {
      backgroundColor: "purple",
      padding: "10px",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
      border: "1px solid white",
    };
    return (
      <div>
        <button
          onClick={() => checkout.show({ amount: 10000,mobile:9846417182 })}
          style={buttonStyles}
        >
          Pay Via Khalti
        </button>
        {selectedDate !== '' && selectedTime !== '' && (
        <p>
         {checkout.show({ amount: 10000 , mobile: 9846417182})}
         {checkout.hide()}
        </p>

      )}
      </div>
    );
  }


