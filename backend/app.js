const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Define Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/amenity", require("./routes/amenityRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/facility", require("./routes/facilityRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/amenity", require("./routes/amenityRoutes"));
app.use("/api/facility", require("./routes/facilityRoutes"));
app.use("/api", require("./routes/uploadRoute"));
app.use("/api/organizations", require("./routes/organizationRoutes"));

// Error Handler
app.use(errorHandler);

module.exports = app;
