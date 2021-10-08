import React, { useState } from "react";
import searchIcon from "../assets/search.svg";
import { useHistory } from "react-router-dom";
const ShipmentTracking = ({ simplified }) => {
  const [shipmentNumber, setShipmentNumber] = useState("");
  const [inputError, setInputError] = useState(false);
  const history = useHistory();
  const numbersOnlyRE = /^[0-9\b]+$/; //regular expression to only allow numbers into textfield
  const handleShipmentNumberChange = (e) => {
    setInputError(false);
    if (e.target.value === "" || numbersOnlyRE.test(e.target.value))
      setShipmentNumber(e.target.value.trim());
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (shipmentNumber.length === 0) setInputError(true);
    else {
      //clear input for use in tracking shipment page
      setShipmentNumber("");
      history.push(`/tracking-shipment/${shipmentNumber}`);
    }
  };
  return (
    <div
      className={`shipment-search-container ${
        simplified ? "simplified-shipment-search" : "normal-shipment-search"
      }`}
    >
      <form
        className="shipment-tracking-form"
        onSubmit={handleFormSubmit}
        style={{ maxHeight: simplified ? "125px" : "" }}
      >
        <div className="card">
          <div className="card-body">
            <h2 className="track-shipment">
              {simplified
                ? "Track another shipment"
                : "Track your shipment now"}
            </h2>
            {!simplified && <h4>Enter your shipment number to get started!</h4>}
            <div
              className={`search-input-container ${
                inputError && "input-error"
              }`}
            >
              <input
                id="shipment-number"
                autoComplete="on"
                placeholder="Tracking Number"
                className="shipment-number-input"
                value={shipmentNumber}
                onChange={handleShipmentNumberChange}
              ></input>
              <button className="search-btn" type="submit">
                <img className="filter-white" src={searchIcon} alt="Go" />
              </button>
            </div>
            <p style={{ display: inputError ? "block" : "none", color: "red" }}>
              Please enter a tracking number!
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShipmentTracking;
