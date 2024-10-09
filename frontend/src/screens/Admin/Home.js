import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import Loader from "../../components/Loader";
import Error from "../../components/Error";


//for dashboard bootstrap
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"





const Home = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [futsals, setFutsals] = useState([]);
    let { ids } = useParams();

    useEffect(() => {
        async function fetchFutsals() { 
            try {
                setLoading(true);
                const response = await axios.get(`/api/futsals/dashboard/${ids}`);
                const data = response.data;
                const fuck = data.bookedUsers;
                setFutsals(fuck);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        };

        fetchFutsals();
    }, []);





    const handleDelete = async (id, name, email, userId, currentfutsalbookings) => {
        try {
          const data = {
            id,
            name,
            email,
            userId,
            currentfutsalbookings
          }; 
    
          await axios.delete(`/api/futsals/delete/${ids}/${name}/${email}`, { data });
          
          await axios.delete(`/api/futsals/delete/parti/${ids}/${name}/${email}`, { data });
          // Filter out the deleted row based on name and email
          setFutsals(prevFutsals => prevFutsals.map(futsal => {
            if (futsal._id === id) {
              const filteredBookedUsers = futsal.bookedUsers.filter(user => user.name !== name || user.email !== email);
              return { ...futsal, bookedUsers: filteredBookedUsers };
            }
            return futsal;
          }));
        } catch (error) {
          console.error(error);
          // Handle the error
        }
      };





    return (
        <>
            {console.log("suck", futsals)/*this line of code is not working ,i do not know why */}
            {
                loading ? (
                    <h1>
                        <Loader />
                    </h1 >
                ) : error ? (
                    <h1>
                        <Error />
                    </h1>
                ) : (
                    <div>
                        <div className="mt-5">
                            <div className="container">
                                <div className="add_btn mt-2 mb-2">
                                    <Link to={`/dashboard/adduser/${ids}`} >
                                        <button to="/register" className="btn btn-primary">
                                            + Add data
                                        </button>
                                    </Link>
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr className="table-dark">
                                            <th scope="col">sn</th>
                                            <th scope="col">userId</th>
                                            <th scope="col">name</th>
                                            <th scope="col">email</th>
                                            <th scope="col">date</th>
                                            <th scope="col">time</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {futsals?.map((futsal, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{futsal.userId}</td>
                                                <td>{futsal.name}</td>
                                                <td>{futsal.email}</td>
                                                <td>
                                                    {futsal.currentfutsalbookings?.map((booking, index) => (
                                                        <div key={index}>{booking.date}</div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {futsal.currentfutsalbookings?.map((booking, index) => (
                                                        <div key={index}>{booking.time}</div>
                                                    ))}
                                                </td>
                                                <td className='d-flex justify-content-between'>
                                                    {/* <button className='btn btn-success'>
                                                        <i className="fa-solid fa-eye"></i>
                                                    </button>
                                                    <button className='btn btn-primary'>
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </button> */}
                                                    <button className='btn btn-danger' onClick={() => handleDelete(ids, futsal.name, futsal.email, futsal.userId, futsal.currentfutsalbookings)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Home;
