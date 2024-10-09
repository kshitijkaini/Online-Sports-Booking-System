import React, { useState, useEffect } from "react";
import axios from "axios";
import Futsal from "../components/Futsal";
  
import { DatePicker } from "antd";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";             


function BadmintonScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [futsals, setFutsals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/futsals/getallbadminton");
        setFutsals(data.futsals);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(date, dateString) {
    setSelectedDate(date);
  }

  function disabledDate(current) {
    if (current && current < moment().endOf("day")) {
      return true;
    }

    const maxDate = moment().add(15, "days").endOf("day");
    if (current && current > maxDate) {
      return true;
    }

    return false;
  }

  return (
    <div className="futsal-container">
      <div>
        <div className="row2">
          <div className="col-md-3">
            <DatePicker
              format="DD-MM-YYYY"
              onChange={filterByDate}
              disabledDate={disabledDate}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : error ? (
          <h1>
            <Error />
          </h1>
        ) : (
          futsals
            .filter((futsal) =>
              selectedDate
                ? moment(futsal.Date).isSame(selectedDate, "day")
                : true
            )
            .map((futsal) => {
              return (
                <div className="col-md-9 mt-2" key={futsal._id}>
                  <Futsal futsal={futsal} selectedDate={selectedDate} />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default BadmintonScreen;