document.addEventListener('DOMContentLoaded', async () => {
  const bookingList = document.getElementById('bookingList');
  const userId = localStorage.getItem('userId');

  if (!userId) {
    bookingList.innerHTML = '<p style="color:red;">User not logged in.</p>';
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/bookings/user/${userId}`);
    const bookings = await res.json();

    if (!res.ok) {
      bookingList.innerHTML = `<p style="color:red;">${bookings.message || 'Error fetching bookings'}</p>`;
      return;
    }

    if (bookings.length === 0) {
      bookingList.innerHTML = '<p>No bookings found.</p>';
      return;
    }

    bookings.forEach(booking => {
      const div = document.createElement('div');
      div.style.border = '1px solid gray';
      div.style.padding = '10px';
      div.style.marginBottom = '10px';
      div.innerHTML = `
        <p><strong>Vehicle:</strong> ${booking.vehicle?.name || 'Unknown'}</p>
        <p><strong>Location:</strong> ${booking.pickupLocation}</p>
        <p><strong>Date:</strong> ${booking.pickupDate}</p>
        <p><strong>Time:</strong> ${booking.pickupTime}</p>
      `;
      bookingList.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    bookingList.innerHTML = '<p style="color:red;">Failed to load bookings</p>';
  }
});

