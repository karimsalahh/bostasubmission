import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { groupTransitEventsByDay } from "../utils/groupTransitEvents";
const TrasitEvents = ({ transitEvents, mobileView }) => {
  //function for translation
  const { t } = useTranslation();
  const [showEvents, setShowEvents] = useState(false);
  let groupedTransitEvents = groupTransitEventsByDay(transitEvents);
  return (
    <div>
      {" "}
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
              className={`transit-events-container ${showEvents ? "show" : ""}`}
            >
              {transitEvents.map((event) => (
                <div key={event.timestamp}>
                  <h3 className="event-time">
                    {moment(event.timestamp).format("lll")}
                  </h3>
                  <p className="event capitalize">
                    {event.reason
                      ? event.reason
                      : t(event.state).concat(event.hub ? "-" + event.hub : "")}
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
                      <h3
                        key={event.timestamp}
                        className="events-timeline-time"
                      >
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
                              : t(event.state).concat(
                                  event.hub ? "-" + event.hub : ""
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
  );
};

export default TrasitEvents;
