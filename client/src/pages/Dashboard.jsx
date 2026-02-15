import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://bellcorp-backend-95w7.onrender.com";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/registrations/my`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setEvents(res.data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>My Registered Events</h2>

      {events.map((e) => (
        <div key={e._id}>
          <h4>{e.name}</h4>
          <p>{e.location}</p>
        </div>
      ))}
    </div>
  );
}
