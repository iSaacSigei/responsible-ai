import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "../styles/Import.css"; // Adjust the path if necessary
import "../styles/creditCard.css"; // Adjust the path if necessary

const CreditCard = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  return (
    <>
      <div className="rccs__card rccs__card--unknown">
        <Cards
          number={number}
          name={name}
          expiry={date}
          cvc={cvc}
          focused={focus}
        />
      </div>

      <br />
      <form>
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label htmlFor="number">Card Number</label>
            <input
              type="text"
              id="number"
              name="number"
              className="form-control"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label htmlFor="name">Card Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </div>
        </div>
        <br />
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cvc">CVV</label>
            <input
              type="tel"
              id="cvc"
              name="cvc"
              className="form-control"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreditCard;
