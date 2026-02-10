/**
 * CSC4035 Final Project - API Communication Module
 *
 * This module handles all HTTP requests to your backend API.
 * TODO: Customize the base URL and add your API functions.
 */

const API = {
    // Base URL for API requests
    BASE_URL: '/api',

    /**
     * Generic fetch wrapper with error handling
     * @param {string} endpoint - API endpoint (e.g., '/items')
     * @param {object} options - Fetch options
     * @returns {Promise<object>} - Response data
     */
    async request(endpoint, options = {}) {
        const url = `${this.BASE_URL}${endpoint}`;

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const config = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            // Handle no content response
            if (response.status === 204) {
                return { success: true };
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP error ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error.message);
            throw error;
        }
    },

    /**
     * GET request
     */
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },

    /**
     * POST request
     */
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * PUT request
     */
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * DELETE request
     */
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    },

    // =========================================================================
    // TODO: Add your specific API functions below
    // =========================================================================

    // Example: Items API
    items: {
        /**
         * Get all items
         */
        async getAll() {
            return API.get('/items');
        },

        /**
         * Get single item by ID
         */
        async getById(id) {
            return API.get(`/items/${id}`);
        },

        /**
         * Create new item
         */
        async create(itemData) {
            return API.post('/items', itemData);
        },

        /**
         * Update item
         */
        async update(id, itemData) {
            return API.put(`/items/${id}`, itemData);
        },

        /**
         * Delete item
         */
        async delete(id) {
            return API.delete(`/items/${id}`);
        },

        /**
         * Search items
         */
        async search(query) {
            return API.get(`/items/search?q=${encodeURIComponent(query)}`);
        },
    },

    // TODO: Add more resource APIs as needed
    // Example:
    // users: { ... },
    // products: { ... },
    // orders: { ... },
};
