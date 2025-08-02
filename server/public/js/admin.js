async function loadVehicles() {
  const container = document.getElementById('vehicleList');
  container.innerHTML = 'Loading...';
  try {
    const res = await fetch('http://localhost:5000/api/vehicles');
    const vehicles = await res.json();

    container.innerHTML = '';
    vehicles.forEach(vehicle => {
      const div = document.createElement('div');
      div.style.border = '1px solid #ccc';
      div.style.margin = '10px';
      div.style.padding = '10px';
      div.innerHTML = `
        <p><strong>${vehicle.name}</strong> - ${vehicle.brand}</p>
        <p>Type: ${vehicle.type} | Price: ₹${vehicle.price}</p>
        <button onclick="deleteVehicle('${vehicle._id}')">Delete</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = 'Error loading vehicles.';
  }
}

async function deleteVehicle(id) {
  if (!confirm('Are you sure you want to delete this vehicle?')) return;
  await fetch(`http://localhost:5000/api/vehicles/${id}`, { method: 'DELETE' });
  loadVehicles();
}

async function loadBookings() {
  const container = document.getElementById('bookingList');
  container.innerHTML = 'Loading...';
  try {
    const res = await fetch('http://localhost:5000/api/bookings');
    const bookings = await res.json();

    container.innerHTML = '';
    bookings.forEach(booking => {
      const div = document.createElement('div');
      div.style.border = '1px solid #ccc';
      div.style.margin = '10px';
      div.style.padding = '10px';
      div.innerHTML = `
        <p><strong>User ID:</strong> ${booking.user}</p>
        <p><strong>Vehicle ID:</strong> ${booking.vehicle}</p>
        <p><strong>Date:</strong> ${booking.pickupDate} | <strong>Time:</strong> ${booking.pickupTime}</p>
        <p><strong>Pickup:</strong> ${booking.pickupLocation}</p>
        <button onclick="deleteBooking('${booking._id}')">Delete</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = 'Error loading bookings.';
  }
}

async function deleteBooking(id) {
  if (!confirm('Delete this booking?')) return;
  await fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' });
  loadBookings();
}

const token = localStorage.getItem('token');
const res = await fetch('/api/vehicles', {
  headers: { Authorization: token }
});

