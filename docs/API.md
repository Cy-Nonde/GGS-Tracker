# API Documentation

## Base URL

```
http://localhost:3000/api
```

---

## Endpoints

### Health Check

Check if the server is running.

```http
GET /api/health
```

**Response:**
```json
{
    "success": true,
    "message": "Server is running",
    "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

### Items

#### Get All Items

```http
GET /api/items
```

**Response:**
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "id": "1",
            "name": "Sample Item",
            "createdAt": "2025-01-15T10:30:00.000Z"
        }
    ]
}
```

---

#### Get Single Item

```http
GET /api/items/:id
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| id | string | Item ID |

**Response (200):**
```json
{
    "success": true,
    "data": {
        "id": "1",
        "name": "Sample Item",
        "createdAt": "2025-01-15T10:30:00.000Z"
    }
}
```

**Response (404):**
```json
{
    "success": false,
    "error": "Item not found"
}
```

---

#### Create Item

```http
POST /api/items
```

**Body:**
```json
{
    "name": "New Item"
}
```

**Response (201):**
```json
{
    "success": true,
    "data": {
        "id": "3",
        "name": "New Item",
        "createdAt": "2025-01-15T10:30:00.000Z"
    }
}
```

**Response (400):**
```json
{
    "success": false,
    "error": "Name is required"
}
```

---

#### Update Item

```http
PUT /api/items/:id
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| id | string | Item ID |

**Body:**
```json
{
    "name": "Updated Name"
}
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "id": "1",
        "name": "Updated Name",
        "createdAt": "2025-01-15T10:30:00.000Z",
        "updatedAt": "2025-01-15T11:00:00.000Z"
    }
}
```

---

#### Delete Item

```http
DELETE /api/items/:id
```

**Response (204):** No content

**Response (404):**
```json
{
    "success": false,
    "error": "Item not found"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
    "success": false,
    "error": "Error message description"
}
```

### Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 204 | No Content - Resource deleted |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## TODO: Document Your Endpoints

Add documentation for all your custom endpoints following the format above.
