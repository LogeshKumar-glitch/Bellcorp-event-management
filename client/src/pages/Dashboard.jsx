import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/api/registrations/my")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>My Registered Events</h2>

      {events.length === 0 ? (
        <p>No registered events</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              {event.name} – {event.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
