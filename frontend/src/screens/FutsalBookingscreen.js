import React from 'react'

const FutsalBookingscreen = () => {
  return (
    <div>
      <p>hi, cutie</p>
    </div>
  )
}

export default FutsalBookingscreen



// import React from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import Loader from "../components/Loader";
// import Error from "../components/Error";
// import KhaltiCheckout from "khalti-checkout-web";

// import moment from "moment";
// import myKey from "./khaltiKey";
// import config from "./khaltiConfig";

// function FutsalBookingscreen() {
//   const [loading, setloading] = useState(true);
//   const [error, seterror] = useState();
//   const [futsal, setfutsal] = useState();

//   let { id, selectedDate } = useParams();
//   /* khalti starts */
//   let config = {
//     // replace this key with yours
//     publicKey: myKey.publicTestKey,
//     productIdentity: "123766",
//     productName: "My Booking",
//     productUrl: "http://localhost:3000",
//     eventHandler: {
//       onSuccess(payload) {
//         // hit merchant api for initiating verfication
//         console.log(payload);
//         let data = {
//           token: payload.token,
//           amount: payload.amount,
//         };

//         axios
//           .get(
//             "https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${myKey.secretKey}"
//           )
//           .then((response) => {
//             console.log(response.data);
//             alert("Payment successful");
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       },
//       // onError handler is optional
//       onError(error) {
//         // handle errors
//         console.log(error);
//       },
//       onClose() {
//         console.log("widget is closing");
//       },
//     },
//     paymentPreference: [
//       "KHALTI",
//       "EBANKING",
//       "MOBILE_BANKING",
//       "CONNECT_IPS",
//       "SCT",
//     ],
//   };
//   /* khalti end */
//   let checkout = new KhaltiCheckout(config);
//   /*button for khalti*/
//   let buttonStyles = {
//     backgroundColor: "purple",
//     padding: "10px",
//     color: "white",
//     cursor: "pointer",
//     fontWeight: "bold",
//     border: "1px solid white",
//   };
//   /*end for khalti button */

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setloading(true);
//         const data = (
//           await axios.post("/api/futsals/getfutsalbyid", { futsalid: id })
//         ).data;

//         setfutsal(data);
//         setloading(false);
//         console.log(data);
//       } catch (error) {
//         seterror(true);
//         console.log(error);
//         setloading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   async function bookFutsal() {
//     const futsalbookingDetails = {
//       futsal,
//       user: JSON.parse(localStorage.getItem("currentUser")).name,
//       futsalid: futsal._id,
//       userid: JSON.parse(localStorage.getItem("currentUser"))._id,
//       Date: moment(new Date(selectedDate)).format("DD-MM-YYYY"),
//       priceperhour: futsal.priceperhour,
//     };

//     try {
//       const result = await axios.post(
//         "/api/futsalbookings/bookfutsal",
//         futsalbookingDetails
//       );
//     } catch (error) {}
//   }

//   return (
//     <div className="m-5">
//       {loading ? (
//         <h1>
//           <Loader />
//         </h1>
//       ) : error ? (
//         <h1>
//           <Error message={error} />
//         </h1>
//       ) : (
//         <div>
//           <div className="book-row">
//             <div>
//               <h1 style={{ color: "#00a65a" }}>{futsal.name}</h1>

//               <h1>Booking Details</h1>
//               <hr />
//               <b>
//                 <p>
//                   Name:{JSON.parse(localStorage.getItem("currentUser")).name}
//                 </p>
//                 <p>Date:{selectedDate}</p>

//                 <p>Gamemode:{futsal.gamemode}</p>
//               </b>

//               <div>
//                 <b>
//                   <h1>Amount</h1>
//                   <hr />

//                   <p>Price per hour:{futsal.priceperhour}</p>
//                 </b>

//                 <div>
//                   <button
//                     onClick={() => {
//                       checkout.show({ amount: 1000 });
//                       bookFutsal();
//                     }}
//                     style={buttonStyles}
//                   >
//                     Pay via Khalti
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FutsalBookingscreen;
