const express = require('express');
const cors = require('cors'); // Allows your frontend to talk to your backend
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Mock Database (In a real app, this would be MongoDB or SQL)
const carInventory = [
    { id: 1, name: "Maruti Swift", category: "hatchback", price: "5 Lakh" },
    { id: 2, name: "Mahindra Scorpio", category: "suv", price: "15 Lakh" },
    { id: 3, name: "Honda City", category: "sedan", price: "12 Lakh" }
];

// 2. Route to GET all cars
app.get('/api/cars', (req, res) => {
    res.json(carInventory);
});

// 3. Route to POST an inquiry
app.post('/api/inquire', (req, res) => {
    const { carModel, customerName, phone } = req.body;
    
    // Log the inquiry (In a real app, you'd save this to a database or send an email)
    console.log(`NEW INQUIRY: ${customerName} is interested in ${carModel}. Contact: ${phone}`);
    
    res.status(200).json({ 
        success: true, 
        message: "Inquiry received! Our Bathinda team will call you." 
    });
});

app.listen(PORT, () => {
    console.log(`Backend is running at http://localhost:${PORT}`);
});