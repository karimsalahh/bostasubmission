import React, { useState, useEffect, Suspense } from "react";

import PropagateLoader from "react-spinners/PropagateLoader";
import moment from "moment";
import { useGetShipmentQuery } from "../services/shipmentApi";

import TransitEvents from "./TransitEvents";
import ShipmentTracking from "./ShipmentTracking";

const ShipmentInfo = (props) => {
  //fetching shipment info
  const {
    data: shipment,
    isFetching,
    error,
  } = useGetShipmentQuery(props?.match?.params?.trackingnumber);

  //destructuring shipment info
  const currentStatus = shipment?.CurrentStatus;
  const trackingNumber = shipment?.TrackingNumber;
  const transitEvents = shipment?.TransitEvents;

  //creating enum to define different delivery status
  const deliveryStatus = {
    DELIVERED: "DELIVERED",
    RETURNED: "DELIVERED_TO_SENDER",
  };
  Object.freeze(deliveryStatus);
  //to conditionally render shipment tracking info
  const [screenSize, setScreenSize] = useState(undefined);
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 746) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [screenSize]);

  if (isFetching)
    return (
      <div className="loading-container">
        <PropagateLoader color={"#FF0000"} loading={isFetching} size={15} />
      </div>
    );
  else if (error)
    return (
      <div className="error-container">
        <div className="not-found">
          <div className="icon-container">
            <img
              className="no-results-icon"
              src="https://img.icons8.com/ios/50/000000/clear-search.png"
              alt="no results"
            />
          </div>
          <h3>No matching shipments</h3>
        </div>
        <ShipmentTracking simplified={true} />
      </div>
    );
  else
    return (
      <Suspense>
        <div className="shipment-info-container">
          <div className="shipment-info">
            <h3 className="shipment-number">Shipment No. {trackingNumber}</h3>
            <h1
              className={`${
                currentStatus.state === deliveryStatus.DELIVERED
                  ? "green"
                  : "red"
              }`}
            >
              {currentStatus.state === deliveryStatus.DELIVERED
                ? "delivered"
                : "returned"}
            </h1>
            <h3 className="latest-update">
              Latest Update: {moment(currentStatus.timestamp).format("LLLL")}
            </h3>
            <TransitEvents
              mobileView={mobileView}
              transitEvents={transitEvents}
            />
          </div>
          <ShipmentTracking simplified={true} />
        </div>
      </Suspense>
    );
};

export default ShipmentInfo;
