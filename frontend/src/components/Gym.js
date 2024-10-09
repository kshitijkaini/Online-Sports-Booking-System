import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Gym({ gym, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="futsal-row">
      <div className="col-md-4">
        <img src={gym.imageurls[0]} className="smallimg" />
      </div>
      <div className="futsal-text">
        <h1>{gym.name}</h1>
        <b>
          <p>Price per month: {gym.pricepermonth}</p>
          <p>Location: {gym.location}</p>
          <p>Phone: {gym.phone}</p>
        </b>
      </div>
      <div style={{ float: "right" }}>
        <Link to={`/book/gym/${gym._id}/${fromdate}/${todate}`}>
          <button className="newsletter-button">Subscribe</button>
        </Link>
        <button className="newsletter-button" onClick={handleShow}>
          {" "}
          View Details
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{gym.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {gym.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{gym.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Gym;
