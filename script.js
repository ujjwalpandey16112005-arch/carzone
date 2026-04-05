/**
 * CARZONE - Professional Script
 * Handles: 1. WhatsApp Redirection 
 * 2. Backend Logging (Render)
 * 3. Car Filtering Logic
 */

// 1. Configuration
const API_URL = "https://carzone-7fpo.onrender.com";
const MY_NUMBER = "918264561611";

// 2. Main Inquiry Function
async function handleInquiry(btn) {
    try {
        // Find the specific car card where the button was clicked
        const carCard = btn.closest('.car-card');
        let carName = "Premium Car";
        
        if (carCard) {
            // Find the <h3> tag inside that card
            const titleElement = carCard.querySelector('h3');
            if (titleElement) {
                carName = titleElement.innerText;
            }
        }

        // Ask user for their phone number
        const userPhone = prompt(`Inquiring for: ${carName}\nPlease enter your WhatsApp number:`);

        // Validation: If user cancels or leaves it empty
        if (!userPhone || userPhone.trim() === "") {
            alert("Valid phone number is required to proceed!");
            return;
        }

        // --- STEP A: OPEN WHATSAPP IMMEDIATELY ---
        // (Doing this first prevents the browser from blocking the popup)
        const message = `Hello Carzone! I am interested in the *${carName}*. My contact number is ${userPhone}. Please share more details.`;
        const whatsappUrl = `https://wa.me/${MY_NUMBER}?text=${encodeURIComponent(message)}`;
        
        console.log("Redirecting to WhatsApp...");
        window.open(whatsappUrl, '_blank');

        // --- STEP B: SEND DATA TO RENDER BACKEND ---
        // We do this in the background so the user doesn't have to wait
        fetch(`${API_URL}/api/inquire`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                carName: carName, 
                phoneNumber: userPhone 
            })
        })
        .then(() => console.log("Data successfully logged to Render backend."))
        .catch(() => console.log("Backend is currently waking up, but WhatsApp opened fine!"));

    } catch (error) {
        console.error("Critical JS Error:", error);
        alert("Something went wrong. Please try again.");
    }
}

// 3. Filter Logic for Sedan, SUV, etc.
function filterCars(category) {
    const cards = document.querySelectorAll('.car-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button styling
    buttons.forEach(btn => btn.classList.remove('active'));
    // Highlight the clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Show/Hide cards based on category class
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// 4. Console Welcome Message
console.log("Carzone Script Loaded Successfully. Ready for Inquiries!");
