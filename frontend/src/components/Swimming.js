import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Swimming({ swimming, selectedDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="futsal-row">
      <div className="col-md-4">
        <img src={swimming.imageurls[0]} className="smallimg" />
      </div>
      <div className="futsal-text">
        <h1>{swimming.name}</h1>
        <b>
          <p>Price: {swimming.price}</p>
          <p>Location: {swimming.location}</p>
          <p>Phone: {swimming.phone}</p>
          <p>Capacity:{swimming.capacity}</p>
        </b>
      </div>
      <div style={{ float: "right" }}>
        {selectedDate && (
          <Link to={`/book/swimming/${swimming._id}/${selectedDate}`}>
            <button className="newsletter-button">Book Now</button>
          </Link>
        )}
        <button className="newsletter-button" onClick={handleShow}>
          {" "}
          View Details
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{swimming.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {swimming.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{swimming.description}</p>
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

export default Swimming;
