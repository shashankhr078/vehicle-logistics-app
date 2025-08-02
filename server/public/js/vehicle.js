document.addEventListener('DOMContentLoaded', async () => {
  const vehicleList = document.getElementById('vehicle-list');

  try {
    const res = await fetch('http://localhost:5000/api/vehicles');
    const vehicles = await res.json();

    if (!Array.isArray(vehicles) || vehicles.length === 0) {
      vehicleList.innerHTML = '<p>No vehicles available.</p>';
      return;
    }

    vehicles.forEach(vehicle => {
      const div = document.createElement('div');
      div.className = 'vehicle-card';
      div.innerHTML = `
        <h3>${vehicle.name}</h3>
        <p>Brand: ${vehicle.brand}</p>
        <p>Type: ${vehicle.type}</p>
        <p>Price: ₹${vehicle.price}</p>
        <button onclick="bookVehicle('${vehicle._id}')">Book Now</button>
      `;
      vehicleList.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    vehicleList.innerHTML = '<p>Error loading vehicles.</p>';
  }
});

function bookVehicle(vehicleId) {
  // Save vehicleId to localStorage or pass it via query string
  localStorage.setItem('vehicleId', vehicleId);
  window.location.href = 'book.html';
}

