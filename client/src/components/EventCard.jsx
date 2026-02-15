export default function EventCard({ event, onRegister }) {
  return (
    <div className="card">
      <h3>{event.name}</h3>
      <p>{event.location}</p>
      <p>{new Date(event.date).toDateString()}</p>
      <button onClick={() => onRegister(event._id)}>Register</button>
    </div>
  );
}
