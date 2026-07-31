# Knowledge-Grounded Customer Support Assistant

An AI-assisted customer support workspace built using **React, Node.js, Express.js**, and a **Knowledge Base**. The application helps support agents analyze customer issues, retrieve relevant knowledge, draft customer responses, and manage support tickets while keeping the human agent in control.

---

## Overview

This project was developed as a **Technical Assessment** for a Knowledge-Grounded Customer Support Assistant.

The application allows support agents to:

- Create customer support tickets
- Analyze tickets using an internal knowledge base
- Generate AI-assisted customer responses
- Approve or reject AI suggestions
- Update ticket status
- Track complete ticket history

The AI never performs actions automatically. Every suggestion requires manual approval.

---

## Features

### Ticket Management

- Create Ticket
- Edit Ticket
- Delete Ticket
- Search Tickets
- Filter by Status
- Update Ticket Status
- View Ticket History

---

### AI Assistant

The AI performs the following tasks:

- Classifies customer issues
- Suggests urgency level
- Retrieves relevant knowledge base articles
- Identifies missing information
- Generates follow-up questions
- Drafts customer responses
- Suggests internal actions
- Displays knowledge source
- Maintains ticket history

---

### Human Approval Workflow

Support agents can:

- Approve drafted customer response
- Reject drafted customer response
- Approve suggested internal action
- Reject suggested internal action

No response or action is executed automatically.

---

## Tech Stack

### Frontend

- React
- Axios
- React Icons
- CSS

### Backend

- Node.js
- Express.js
- CORS

---

## Project Structure

```
customer-support-ai
│
├── backend
│   ├── data
│   │     knowledgeBase.js
│   ├── server.js
│   ├── package.json
│
├── src
│   ├── components
│   ├── data
│   ├── pages
│   ├── styles
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/sonal-fullstack/customer-support-ai.git
```

---

### Install Frontend

```bash
npm install
npm run dev
```

---

### Install Backend

```bash
cd backend
npm install
node server.js
```

---

## API Endpoints

### Tickets

```
GET /api/tickets
POST /api/tickets
PUT /api/tickets/:id
DELETE /api/tickets/:id
```

### AI

```
POST /api/analyze/:id
```

### Dashboard

```
GET /api/stats
```

---

## AI Workflow

The assistant performs the following workflow:

1. Customer ticket is created.
2. AI classifies the issue.
3. Retrieves relevant knowledge base article.
4. Detects missing information.
5. Generates follow-up questions.
6. Drafts customer response.
7. Suggests internal action.
8. Displays knowledge source.
9. Agent approves or rejects AI suggestions.
10. Ticket history is updated.

---

## Assessment Requirements Covered

- ✅ Ticket Creation
- ✅ Customer/User Type
- ✅ Product Area
- ✅ Issue Description
- ✅ Previous Communication
- ✅ Optional Urgency
- ✅ Issue Classification
- ✅ Suggested Urgency
- ✅ Knowledge Base Retrieval
- ✅ Missing Information Detection
- ✅ Follow-up Questions
- ✅ Draft Customer Response
- ✅ Suggested Internal Action
- ✅ Knowledge Source Citation
- ✅ Approve Draft Response
- ✅ Reject Draft Response
- ✅ Approve Internal Action
- ✅ Reject Internal Action
- ✅ Update Ticket Status
- ✅ Ticket Decision History

---

## GitHub Repository

https://github.com/sonal-fullstack/customer-support-ai

---

## Author

**Sonal Mishra**

Full Stack Developer

---

Developed as part of the Technical Assessment.