import React, { useState, useEffect } from "react";
import ShipmentTracking from "./ShipmentTracking";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useGetShipmentQuery } from "../services/shipmentApi";
import { groupTransitEventsByDay } from "../utils/groupTransitEvents";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
const ShipmentInfo = (props) => {
  const [showEvents, setShowEvents] = useState(false);
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
  let groupedTransitEvents = shipment
    ? groupTransitEventsByDay(transitEvents)
    : [];
  //creating enum to define different delivery status
  const deliveryStatus = {
    DELIVERED: "DELIVERED",
    RETURNED: "DELIVERED_TO_SENDER",
  };
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
  Object.freeze(deliveryStatus);

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
      <div className="shipment-info-container">
        <div className="shipment-info">
          <h3 className="shipment-number">Shipment No. {trackingNumber}</h3>
          <h1
            className={`${
              currentStatus.state === deliveryStatus.DELIVERED ? "green" : "red"
            }`}
          >
            {currentStatus.state === deliveryStatus.DELIVERED
              ? "delivered"
              : "returned"}
          </h1>
          <h3 className="latest-update">
            Latest Update: {moment(currentStatus.timestamp).format("LLLL")}
          </h3>
          <div className="shipment-events-container">
            {mobileView && (
              <div>
                <button
                  className="shipment-details-button"
                  onClick={() => setShowEvents(!showEvents)}
                >
                  Shipment Details
                  <ExpandMoreIcon
                    className="icon-rotate"
                    style={{
                      fontSize: "1.8rem",
                      color: "red",
                      transition: "500ms transform",
                      transform: showEvents ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
                <div
                  className={`transit-events-container ${
                    showEvents ? "show" : ""
                  }`}
                >
                  {transitEvents.map((event) => (
                    <div key={event.timestamp}>
                      <h3 className="event-time">
                        {moment(event.timestamp).format("lll")}
                      </h3>
                      <p className="event capitalize">
                        {event.reason
                          ? "Customer action: " + event.reason
                          : event.state
                              .toLowerCase()
                              .replaceAll("_", " ")
                              .concat(event.hub ? " at " + event.hub : "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!mobileView && (
              <div>
                <h2 className="shipment-details">Shipment Details</h2>
                {groupedTransitEvents.map((group) => (
                  <div style={{ marginTop: "1rem" }} key={group[0].timestamp}>
                    <h3 className="event-time smaller-event-time">
                      {moment(group[0].timestamp).format("L")}
                    </h3>
                    <div className="shipment-details-grid">
                      <div>
                        {group.map((event) => (
                          <h3 className="events-timeline-time">
                            {moment(event.timestamp).format("LT")}
                          </h3>
                        ))}
                      </div>
                      <ul className="events-timeline">
                        {group.map((event) => (
                          <li key={event.timestamp}>
                            {
                              <p className="event capitalize">
                                {event.reason
                                  ? event.reason
                                  : event.state
                                      .toLowerCase()
                                      .replaceAll("_", " ")
                                      .concat(
                                        event.hub ? " at " + event.hub : ""
                                      )}
                              </p>
                            }
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <ShipmentTracking simplified={true} />
      </div>
    );
};

export default ShipmentInfo;
