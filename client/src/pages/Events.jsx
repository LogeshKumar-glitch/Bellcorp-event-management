import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://bellcorp-backend-95w7.onrender.com";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const registerEvent = async (id) => {
    await axios.post(
      `${BASE_URL}/api/registrations/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Registered successfully");
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
