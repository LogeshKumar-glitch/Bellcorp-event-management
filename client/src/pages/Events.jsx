import { useEffect, useState } from "react";
import API from "../services/api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const registerEvent = async (id) => {
    try {
      await API.post(`/api/registrations/${id}`);
      alert("Registered successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page">
      <h2>Available Events</h2>

      <div className="grid">
        {events.map((e) => (
          <div className="card" key={e._id}>
            <h3>{e.name}</h3>
            <p>{e.location}</p>
            <p>{new Date(e.date).toDateString()}</p>
            <button onClick={() => registerEvent(e._id)}>
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
