import React, { useEffect, useState } from 'react';
import EventCard from './EventCard'; // Adjust the import based on your structure
import '../styles/EventsPage.css'; // Import your CSS file here

const Events = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://mysite-jr5y.onrender.com/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        // Assuming the data format matches the expected structure
        setEventList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {eventList.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
    </div>
  );
};

export default Events;
