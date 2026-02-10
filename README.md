# CSC4035 Final Project: Full-Stack Web Application

**Course:** CSC4035 Web Programming and Technologies
**Weight:** 20% of final grade
**Due:** Week 13, Friday 11:59 PM

---

## Overview

Build a complete full-stack web application demonstrating mastery of all course concepts: HTML5, CSS3, JavaScript, Node.js/Express, and RESTful APIs.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Run tests
npm test
```

Server runs at `http://localhost:3000`

---

## Project Options

Choose ONE:

| Option | Description |
|--------|-------------|
| **E-Commerce Store** | Product catalog, cart, checkout, orders |
| **Social Platform** | Profiles, posts, comments, follows |
| **Project Manager** | Projects, tasks, collaboration, timeline |
| **Learning System** | Courses, quizzes, progress tracking |
| **Custom** | Must be approved by Week 10 |

---

## Required Structure

```
final-project/
├── server/
│   ├── server.js           # Main Express app
│   ├── routes/             # API route handlers
│   ├── controllers/        # Business logic
│   ├── models/             # Data models
│   ├── middleware/         # Custom middleware
│   └── data/               # JSON data storage
├── public/
│   ├── index.html          # Main HTML
│   ├── css/
│   │   └── styles.css      # Stylesheets
│   └── js/
│       ├── app.js          # Main app logic
│       ├── api.js          # API communication
│       └── ui.js           # UI rendering
├── docs/
│   ├── API.md              # API documentation
│   └── screenshots/        # App screenshots
├── tests/
│   └── visible/            # Test files
├── package.json
├── README.md               # This file (update it!)
└── .gitignore
```

---

## Minimum Requirements

### Frontend (HTML/CSS/JS)

- [ ] Responsive design (mobile + desktop)
- [ ] At least 2 forms with validation
- [ ] Dynamic content updates (no page reloads for data)
- [ ] Loading states during API calls
- [ ] Error messages for failed operations
- [ ] Clean, professional UI

### Backend (Node.js/Express)

- [ ] Minimum 8 API endpoints
- [ ] Full CRUD operations (Create, Read, Update, Delete)
- [ ] Input validation middleware
- [ ] Proper HTTP status codes
- [ ] Error handling middleware
- [ ] Security headers (Helmet.js)

### Integration

- [ ] All data flows through API
- [ ] Search functionality
- [ ] Filter or sort functionality
- [ ] Simulated authentication (login/logout UI)

---

## API Endpoint Template

Your API should follow REST conventions:

```
GET    /api/[resource]          # List all
GET    /api/[resource]/:id      # Get one
POST   /api/[resource]          # Create
PUT    /api/[resource]/:id      # Update
DELETE /api/[resource]/:id      # Delete
GET    /api/[resource]/search   # Search
```

**Example for E-Commerce:**
```
GET    /api/products            # List products
GET    /api/products/:id        # Get product
POST   /api/cart                # Add to cart
DELETE /api/cart/:id            # Remove from cart
POST   /api/orders              # Create order
GET    /api/orders              # Get user orders
```

---

## Grading Breakdown

| Component | Weight | Description |
|-----------|--------|-------------|
| Visible Tests | 30% | Automated tests (runs on push) |
| Hidden Tests | 30% | Edge cases, security, performance |
| Code Quality | 20% | Organization, style, documentation |
| Documentation | 20% | README, API docs, screenshots |

---

## Deliverables Checklist

- [ ] Complete project code
- [ ] Updated README.md with:
  - [ ] Project description
  - [ ] Features list
  - [ ] Installation instructions
  - [ ] Screenshots
- [ ] `docs/API.md` with all endpoints documented
- [ ] `docs/screenshots/` with 3-5 app screenshots
- [ ] Working `npm start` command
- [ ] All visible tests passing

---

## Getting Started

1. **Choose your project type** - Pick from options above
2. **Plan your data model** - What entities do you need?
3. **Design your API** - List all endpoints
4. **Build backend first** - Get API working
5. **Build frontend** - Connect to your API
6. **Test everything** - Run `npm test` frequently
7. **Document** - Update README and API.md

---

## Starter Files

### `server/server.js`
Basic Express setup - extend with your routes.

### `public/index.html`
HTML template - build your UI here.

### `public/css/styles.css`
Starter styles - customize for your design.

### `public/js/app.js`
Application entry point - add your logic.

---

## Testing

Run tests anytime:
```bash
npm test
```

Tests check:
- API endpoints respond correctly
- Required files exist
- Response formats are valid
- Basic functionality works

---

## Submission

1. Complete all code in this repository
2. Update README.md with your project details
3. Add screenshots to `docs/screenshots/`
4. Document API in `docs/API.md`
5. Commit and push:
   ```bash
   git add .
   git commit -m "Final Project Submission"
   git push
   ```

---

## Academic Integrity

- All code must be your own
- No CSS frameworks (Bootstrap, Tailwind, etc.)
- No frontend frameworks (React, Vue, etc.)
- No code generation or AI tools
- Third-party npm packages allowed (must document)

**Plagiarism detection runs on all submissions.**

---

## Resources

- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MDN Web Docs](https://developer.mozilla.org/)
- [REST API Design](https://restfulapi.net/)
- Course Labs 1-10 (use as reference)

---

## Questions?

- Check course Discord
- Attend office hours
- Email instructor

Good luck!
