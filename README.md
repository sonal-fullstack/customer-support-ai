# Knowledge-Grounded Customer Support Assistant

## Overview

This project is an AI-assisted internal customer support workspace built using React, Node.js, Express, and a knowledge base. It helps support agents analyze customer issues, retrieve relevant knowledge, generate AI-assisted responses, and manage support tickets efficiently.

---

## Features

- Create Support Tickets
- Edit & Delete Tickets
- Search Tickets
- Filter Tickets by Status
- AI-powered Ticket Analysis
- Knowledge Base Retrieval
- Issue Classification
- Suggested Urgency
- Missing Information Detection
- Follow-up Questions
- Draft Customer Response
- Approve / Reject Customer Response
- Suggested Internal Action
- Approve / Reject Internal Action
- Ticket Status Management
- Ticket History
- Knowledge Source Citation

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

## Folder Structure

frontend/
components/
pages/
styles/
data/

backend/
data/
server.js

---

## Installation

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

GET /api/tickets

POST /api/tickets

PUT /api/tickets/:id

DELETE /api/tickets/:id

POST /api/analyze/:id

GET /api/stats

---

## AI Workflow

The assistant performs the following tasks:

- Classifies customer issues
- Suggests urgency
- Retrieves relevant knowledge base articles
- Identifies missing information
- Generates follow-up questions
- Drafts customer responses
- Suggests internal support actions
- Displays knowledge source
- Allows manual approval or rejection

---

## Assessment Requirements Covered

✅ Ticket Creation

✅ Ticket Editing

✅ Ticket Status Update

✅ AI Classification

✅ Knowledge Grounding

✅ Missing Information

✅ Follow-up Questions

✅ Draft Response

✅ Internal Action

✅ Approval Workflow

✅ Ticket History

✅ Knowledge Source Citation

---

Developed for Technical Assessment.