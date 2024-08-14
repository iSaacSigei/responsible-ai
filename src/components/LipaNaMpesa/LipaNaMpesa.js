import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LipaNaMpesa.css"; // Adjust the path if necessary

const LipaNaMpesa = () => {
  const [accountNumber, setAccountNumber] = useState("");

  return (
    <div className="lipa-na-mpesa-form">
      <h4>Lipa na M-Pesa</h4>
      <form>
        <div className="form-row mb-3">
          <div className="col-md-12">
            <label htmlFor="businessNumber">Business Number</label>
            <input
              type="text"
              id="businessNumber"
              name="businessNumber"
              className="form-control"
              value="123456" // Fixed Business Number
              readOnly
            />
          </div>
        </div>

        <div className="form-row mb-3">
          <div className="col-md-12">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              className="form-control"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LipaNaMpesa;
