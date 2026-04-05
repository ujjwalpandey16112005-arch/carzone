// Function 1: Filter Logic
function filterCars(category) {
    const cars = document.querySelectorAll('.car-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // 1. Manage Button Styling
    buttons.forEach(btn => {
        // Remove 'active' class from all buttons
        btn.classList.remove('active');
        
        // Add 'active' class only to the clicked button
        // We use event.target logic here implicitly by adding onclick in HTML
        if(btn.innerText.toLowerCase().includes(category) || 
          (category === 'all' && btn.innerText === 'Show All')) {
            btn.classList.add('active');
        }
    });

    // 2. Manage Car Visibility
    cars.forEach(car => {
        if (category === 'all') {
            car.style.display = 'block';
            // Animation for smooth reappearance
            car.style.animation = 'fadeIn 0.5s ease';
        } else {
            if (car.classList.contains(category)) {
                car.style.display = 'block';
                car.style.animation = 'fadeIn 0.5s ease';
            } else {
                car.style.display = 'none';
            }
        }
    });
}

// Function 2: Inquiry Popup


function inquasync function inquire(carModel) {
    const customerPhone = prompt("Please enter your phone number for Bathinda CarZone:");

    if (!customerPhone) return;

    try {
        const response = await fetch('http://localhost:5000/api/inquire', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                carModel: carModel,
                customerName: "Guest User",
                phone: customerPhone
            })
        });

        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Backend is not running!");
    }
}

// Optional: Add simple fade animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// --- WHATSAPP & BACKEND INTEGRATION ---
const API_URL = "https://carzone-7fpo.onrender.com";
const MY_WHATSAPP = "918264561611";

async function handleInquiry(carName) {
    const userPhone = prompt(`Inquiry for: ${carName}\nPlease enter your WhatsApp number:`);

    if (!userPhone || userPhone.trim() === "") {
        alert("Number is required!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/inquire`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carName: carName, phoneNumber: userPhone })
        });

        if (response.ok) {
            const message = `Hello Carzone! I am interested in the *${carName}*. My contact number is ${userPhone}.`;
            const whatsappUrl = `https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(message)}`;
            
            alert("Opening WhatsApp...");
            window.open(whatsappUrl, '_blank');
        } else {
            alert("Backend is starting up. Try again in 30 seconds!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server connection error.");
    }
}

document.head.appendChild(styleSheet);
