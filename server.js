const express = require('express');
const cors = require('cors');
const app = express();

// 1. Middleware
app.use(cors()); // Allows your GitHub website to talk to this Render server
app.use(express.json()); // Allows the server to read the data you send

// 2. Data Storage (Temporary - will reset if server restarts)
let inquiries = [];

// 3. The "Inquiry" Route (This matches your 'Inquire Now' button)
app.post('/api/inquire', (req, res) => {
    // We use carName and phoneNumber to match your script.js
    const { carName, phoneNumber } = req.body;

    if (!carName || !phoneNumber) {
        return res.status(400).json({ success: false, message: "Missing data" });
    }

    const newInquiry = {
        car: carName,
        phone: phoneNumber,
        time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    };

    inquiries.push(newInquiry);
    
    // This message shows up in your Render "Logs"
    console.log(`🚀 NEW INQUIRY: ${carName} | Contact: ${phoneNumber}`);

    res.status(200).json({
        success: true,
        message: "Inquiry received! Our Bathinda team will contact you soon."
    });
});

// 4. Test Route (To see if backend is alive)
app.get('/', (req, res) => {
    res.send("Carzone Backend is Live and Running!");
});

// 5. View Inquiries Route (Visit your-url.onrender.com/api/view)
app.get('/api/view', (req, res) => {
    res.json(inquiries);
});

// 6. Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
