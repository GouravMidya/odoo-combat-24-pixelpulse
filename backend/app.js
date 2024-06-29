const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");
const stripe = require("stripe")("sk_test_51PWwrrRuh0l7mfz93ZwgUvmCPHSFvRh5K1J5nVeK0UMBKZ3sbIobsbIEyvQt9oZNKX7AcNI10nC75646GuBEDotP00ruRrOqzh");


const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Define Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/amenity', require('./routes/amenityRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/facility', require('./routes/facilityRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use("/api/organizations", require("./routes/organizationRoutes"));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/review', require('./routes/reviewRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/amenity", require("./routes/amenityRoutes"));
app.use("/api/facility", require("./routes/facilityRoutes"));
app.use("/api/upload", require("./routes/uploadRoute"));

// Stripe Checkout Route
app.post("/api/create-checkout-session", async (req, res) => {
    const { reservation,totalRate } = req.body;
    const lineItems = [
        {
            price_data: {
                currency: "inr",
                product_data: {
                    name: `Reservation for Facility ${reservation.facility}`,
                    description:` Amenity: ${reservation.amenity}`,
                    // Include additional details if needed
                },
                unit_amount: totalRate * 100, // Convert to the smallest currency unit
            },
            quantity: 1,
        }
    ];
    console.log("lineItems: " + lineItems)
    try {
        console.log("We are before session creation")
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
        console.log(session.id);
        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Error Handler
app.use(errorHandler);

module.exports = app;
