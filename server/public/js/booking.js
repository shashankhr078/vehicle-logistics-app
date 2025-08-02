document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const statusDiv = document.getElementById('bookingStatus');

  const vehicleId = localStorage.getItem('vehicleId');
  const userId = localStorage.getItem('userId'); // Assuming you store this at login

  if (!vehicleId || !userId) {
    statusDiv.innerHTML = '<p style="color:red;">Missing vehicle or user information.</p>';
    form.style.display = 'none';
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      vehicle: vehicleId,
      user: userId,
      pickupLocation: form.pickupLocation.value,
      pickupDate: form.pickupDate.value,
      pickupTime: form.pickupTime.value
    };

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        statusDiv.innerHTML = `<p style="color:green;">Booking successful! Booking ID: ${result._id}</p>`;
        form.reset();
        localStorage.removeItem('vehicleId');
      } else {
        statusDiv.innerHTML = `<p style="color:red;">${result.message || 'Booking failed'}</p>`;
      }
    } catch (error) {
      console.error(error);
      statusDiv.innerHTML = `<p style="color:red;">Error while booking</p>`;
    }
  });
});

