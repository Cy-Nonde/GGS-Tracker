/**
 * CSC4035 Final Project - Main Application
 *
 * Entry point for your frontend application.
 * TODO: Implement all application functionality below.
 */

// Application state
const App = {
    items: [],
    isLoading: false,

    /**
     * Initialize the application
     * TODO: Call setupEventListeners and loadItems
     */
    async init() {
        console.log('Initializing application...');

        // TODO: Implement initialization logic
        // - Set up event listeners
        // - Load initial data from API

        console.log('Application ready!');
    },

    /**
     * Set up all event listeners
     * TODO: Add event listeners for:
     *  - Form submission (item-form)
     *  - Error dismiss button (dismiss-error)
     *  - Mobile menu toggle (.menu-toggle)
     *  - Item actions via event delegation (items-list)
     *  - Get started button (get-started-btn)
     */
    setupEventListeners() {
        // TODO: Implement event listener setup
        // Use event delegation for item actions (edit/delete buttons)
        // Don't forget to handle form submission with e.preventDefault()
    },

    /**
     * Load all items from API
     * TODO: Call API.items.getAll() and render results using UI.renderItems()
     * Handle errors with UI.showError() and show/hide loading state
     */
    async loadItems() {
        // TODO: Implement loading items from API
        // Show loading state
        // Hide error state
        // Call API.items.getAll()
        // Update this.items and render UI
        // Handle errors appropriately
    },

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     * TODO: Extract form input, validate, call API.items.create(), update state and UI
     */
    async handleFormSubmit(e) {
        // TODO: Implement form submission
        // Prevent default form submission
        // Get item name from input
        // Validate that name is not empty
        // Show loading and hide error
        // Call API.items.create()
        // Add item to local state and UI
        // Clear the form on success
    },

    /**
     * Handle item action buttons (edit/delete)
     * @param {Event} e - Click event
     * TODO: Check for btn-delete and btn-edit classes, extract ID, call appropriate method
     */
    async handleItemAction(e) {
        // TODO: Implement item action handling
        // Check if target has btn-delete class → call deleteItem()
        // Check if target has btn-edit class → call editItem()
        // Extract the data-id attribute from the button
    },

    /**
     * Delete an item
     * @param {string} id - Item ID
     * TODO: Confirm with user, call API.items.delete(), remove from state and UI
     */
    async deleteItem(id) {
        // TODO: Implement delete functionality
        // Confirm deletion with user using confirm()
        // Call API.items.delete(id)
        // Remove from local state array
        // Remove from UI using UI.removeItem(id)
        // Handle errors appropriately
    },

    /**
     * Edit an item
     * @param {string} id - Item ID
     * TODO: Prompt for new name, call API.items.update(), update state and UI
     */
    async editItem(id) {
        // TODO: Implement edit functionality
        // Find the item in this.items array
        // Prompt user for new name
        // Validate that new name is provided and different from current
        // Call API.items.update(id, { name })
        // Update local state
        // Update UI using UI.updateItem()
        // Handle errors appropriately
    },
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
