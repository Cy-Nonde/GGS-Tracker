/**
 * CSC4035 Final Project - Express Server
 *
 * TODO: Implement your API routes and data models below.
 */

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// =============================================================================
// MIDDLEWARE
// =============================================================================

// Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Request logging (development)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
});

// =============================================================================
// API ROUTES
// =============================================================================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// TODO: Implement your API routes here
// Example structure:
// const itemRoutes = require('./routes/items');
// app.use('/api/items', itemRoutes);
//
// Or implement routes directly below

// =============================================================================
// TODO: IMPLEMENT CRUD ROUTES FOR ITEMS
// =============================================================================

// TODO: Set up a data storage mechanism (in-memory array, database, etc.)

/**
 * GET /api/items
 * TODO: Return all items
 * Response: { success: true, count: N, data: [...] }
 */
app.get('/api/items', (req, res) => {
    // TODO: Implement GET all items
    res.json({
        success: false,
        error: 'Not implemented'
    });
});

/**
 * GET /api/items/:id
 * TODO: Return a single item by ID
 * Response: { success: true, data: {...} } or 404 error
 */
app.get('/api/items/:id', (req, res) => {
    // TODO: Implement GET single item
    res.json({
        success: false,
        error: 'Not implemented'
    });
});

/**
 * POST /api/items
 * TODO: Create a new item
 * Request body: { name: string, ... }
 * Response: { success: true, data: {...} } with 201 status or 400 for validation errors
 * Hints:
 *  - Validate that required fields are present and non-empty
 *  - Generate unique IDs (timestamp-based, UUID, etc.)
 *  - Include createdAt timestamp
 */
app.post('/api/items', (req, res) => {
    // TODO: Implement CREATE item
    res.json({
        success: false,
        error: 'Not implemented'
    });
});

/**
 * PUT /api/items/:id
 * TODO: Update an existing item
 * Request body: { name: string, ... }
 * Response: { success: true, data: {...} } or 404 error
 * Hints:
 *  - Find the item by ID
 *  - Merge updates with existing data
 *  - Include updatedAt timestamp
 */
app.put('/api/items/:id', (req, res) => {
    // TODO: Implement UPDATE item
    res.json({
        success: false,
        error: 'Not implemented'
    });
});

/**
 * DELETE /api/items/:id
 * TODO: Delete an item by ID
 * Response: 204 No Content on success or 404 error
 * Hints:
 *  - Find the item by ID
 *  - Remove from data store
 *  - Return 204 status (no content)
 */
app.delete('/api/items/:id', (req, res) => {
    // TODO: Implement DELETE item
    res.json({
        success: false,
        error: 'Not implemented'
    });
});

// =============================================================================
// ERROR HANDLING
// =============================================================================

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);

    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
    console.log(`
===========================================
  CSC4035 Final Project Server
  Running on http://localhost:${PORT}
===========================================
    `);
});

module.exports = app;
