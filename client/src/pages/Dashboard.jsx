import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/registrations/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="page">
      <h2>My Registered Events</h2>

      {events.length === 0 && <p>No registrations yet</p>}

      {events.map((e) => (
        <div key={e._id} className="card">
          <h3>{e.name}</h3>
          <p>{e.location}</p>
        </div>
      ))}
    </div>
  );
}
