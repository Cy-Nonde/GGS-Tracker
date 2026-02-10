/**
 * CSC4035 Final Project - UI Rendering Module
 *
 * This module handles all DOM manipulation and UI updates.
 * TODO: Add your rendering functions for different components.
 */

const UI = {
    // Cache DOM elements
    elements: {
        loading: document.getElementById('loading'),
        error: document.getElementById('error'),
        errorText: document.getElementById('error-text'),
        dismissError: document.getElementById('dismiss-error'),
        itemsList: document.getElementById('items-list'),
        itemForm: document.getElementById('item-form'),
        itemNameInput: document.getElementById('item-name'),
    },

    /**
     * Show loading indicator
     */
    showLoading() {
        if (this.elements.loading) {
            this.elements.loading.classList.remove('hidden');
        }
    },

    /**
     * Hide loading indicator
     */
    hideLoading() {
        if (this.elements.loading) {
            this.elements.loading.classList.add('hidden');
        }
    },

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        if (this.elements.error && this.elements.errorText) {
            this.elements.errorText.textContent = message;
            this.elements.error.classList.remove('hidden');
        }
    },

    /**
     * Hide error message
     */
    hideError() {
        if (this.elements.error) {
            this.elements.error.classList.add('hidden');
        }
    },

    /**
     * Clear form inputs
     * @param {HTMLFormElement} form - Form element to clear
     */
    clearForm(form) {
        if (form) {
            form.reset();
        }
    },

    // =========================================================================
    // Item Rendering
    // =========================================================================

    /**
     * Render a single item as a list element
     * @param {object} item - Item data
     * @returns {HTMLLIElement} - List item element
     */
    createItemElement(item) {
        const li = document.createElement('li');
        li.setAttribute('data-id', item.id);

        // Item content
        const content = document.createElement('div');
        content.className = 'item-content';

        const name = document.createElement('span');
        name.className = 'item-name';
        name.textContent = item.name;
        content.appendChild(name);

        // Actions
        const actions = document.createElement('div');
        actions.className = 'item-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-secondary btn-edit';
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('data-id', item.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('data-id', item.id);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(content);
        li.appendChild(actions);

        return li;
    },

    /**
     * Render all items to the list
     * @param {array} items - Array of item objects
     */
    renderItems(items) {
        const list = this.elements.itemsList;
        if (!list) return;

        // Clear existing items
        list.innerHTML = '';

        if (items.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No items yet. Add one above!';
            list.appendChild(emptyMessage);
            return;
        }

        // Render each item
        items.forEach(item => {
            const element = this.createItemElement(item);
            list.appendChild(element);
        });
    },

    /**
     * Add a single item to the list
     * @param {object} item - Item data
     */
    addItem(item) {
        const list = this.elements.itemsList;
        if (!list) return;

        // Remove empty message if present
        const emptyMessage = list.querySelector('.empty-message');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        const element = this.createItemElement(item);
        list.prepend(element);
    },

    /**
     * Remove an item from the list
     * @param {string} id - Item ID
     */
    removeItem(id) {
        const list = this.elements.itemsList;
        if (!list) return;

        const item = list.querySelector(`li[data-id="${id}"]`);
        if (item) {
            item.remove();
        }

        // Show empty message if no items left
        if (list.children.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No items yet. Add one above!';
            list.appendChild(emptyMessage);
        }
    },

    /**
     * Update an item in the list
     * @param {object} item - Updated item data
     */
    updateItem(item) {
        const list = this.elements.itemsList;
        if (!list) return;

        const existingItem = list.querySelector(`li[data-id="${item.id}"]`);
        if (existingItem) {
            const newElement = this.createItemElement(item);
            existingItem.replaceWith(newElement);
        }
    },

    // =========================================================================
    // Mobile Navigation
    // =========================================================================

    /**
     * Toggle mobile navigation
     */
    toggleMobileNav() {
        const nav = document.querySelector('.nav');
        const toggle = document.querySelector('.menu-toggle');

        if (nav && toggle) {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        }
    },

    // =========================================================================
    // TODO: Add more UI functions for your components
    // =========================================================================
};
