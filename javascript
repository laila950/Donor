// Sample donor data (loaded on first visit)
const sampleDonors = [
  { name: "Rahul Sharma", age: 28, bloodType: "O+", phone: "9876543210", email: "rahul@example.com", location: "Mumbai" },
  { name: "Priya Patel", age: 24, bloodType: "A+", phone: "9876543211", email: "priya@example.com", location: "Delhi" },
  { name: "Arjun Kumar", age: 32, bloodType: "B+", phone: "9876543212", email: "arjun@example.com", location: "Bangalore" },
  { name: "Sneha Reddy", age: 26, bloodType: "AB+", phone: "9876543213", email: "sneha@example.com", location: "Hyderabad" },
  { name: "Vikram Singh", age: 30, bloodType: "O-", phone: "9876543214", email: "vikram@example.com", location: "Chennai" },
  { name: "Anita Desai", age: 29, bloodType: "A-", phone: "9876543215", email: "anita@example.com", location: "Pune" }
];

// Initialize data from localStorage or use samples
let donors = JSON.parse(localStorage.getItem("donors")) || sampleDonors;
if (!localStorage.getItem("donors")) {
  localStorage.setItem("donors", JSON.stringify(sampleDonors));
}

// Update donor count
function updateStats() {
  document.getElementById("totalDonors").textContent = donors.length;
}

// Render all donors
function renderDonors(list) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = '<p class="no-result">No donors found. Try a different search.</p>';
    return;
  }

  list.forEach(d => {
    const card = document.createElement("div");
    card.className = "donor-card";
    card.innerHTML = `
      <h3>${d.name}</h3>
      <span class="blood-badge">${d.bloodType}</span>
      <p><strong>Age:</strong> ${d.age}</p>
      <p><strong>Location:</strong> ${d.location}</p>
      <p><strong>Phone:</strong> <a href="tel:${d.phone}">${d.phone}</a></p>
      <p><strong>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></p>
    `;
    container.appendChild(card);
  });
}

// Search donors
function searchDonors() {
  const bloodType = document.getElementById("bloodTypeFilter").value;
  const location = document.getElementById("locationFilter").value.toLowerCase().trim();

  const filtered = donors.filter(d => {
    const matchBlood = !bloodType || d.bloodType === bloodType;
    const matchLocation = !location || d.location.toLowerCase().includes(location);
    return matchBlood && matchLocation;
  });

  renderDonors(filtered);
}

// Register new donor
document.getElementById("donorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const newDonor = {
    name: document.getElementById("name").value,
    age: parseInt(document.getElementById("age").value),
    bloodType: document.getElementById("bloodType").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    location: document.getElementById("location").value
  };

  donors.push(newDonor);
  localStorage.setItem("donors", JSON.stringify(donors));

  alert("✅ Thank you! You have been registered as a blood donor.");
  this.reset();
  updateStats();
  searchDonors(); // refresh results
});

// Initial load
updateStats();
renderDonors(donors);
