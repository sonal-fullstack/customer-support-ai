const express = require("express");
const cors = require("cors");

const knowledgeBase = require("./data/knowledgeBase");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================
// Temporary In-Memory Database
// =====================================

let tickets = [];

// =====================================
// Home Route
// =====================================

app.get("/", (req, res) => {
  res.send("🚀 Customer Support AI Backend Running...");
});

// =====================================
// Get All Tickets
// =====================================

app.get("/api/tickets", (req, res) => {
  res.status(200).json(tickets);
});

// =====================================
// Get Single Ticket
// =====================================

app.get("/api/tickets/:id", (req, res) => {
  const id = Number(req.params.id);

  const ticket = tickets.find(
    (item) => item.id === id
  );

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  res.status(200).json(ticket);
});

// =====================================
// Create Ticket
// =====================================

app.post("/api/tickets", (req, res) => {
  const {
    customerType,
    productArea,
    issueDescription,
    previousCommunication,
    urgency,
  } = req.body;

  if (
    !customerType ||
    !productArea ||
    !issueDescription
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  const ticket = {
    id: Date.now(),

    customerType,

    productArea,

    issueDescription,

    previousCommunication:
      previousCommunication || "",

    urgency: urgency || "Low",

    status: "Open",

    createdAt: new Date().toLocaleString(),

    updatedAt: new Date().toLocaleString(),

    history: [
      {
        action: "Ticket Created",
        time: new Date().toLocaleString(),
      },
    ],

    aiAnalysis: null,
  };

  tickets.push(ticket);

  res.status(201).json(ticket);
});
// =====================================
// AI Analysis
// =====================================

app.post("/api/analyze/:id", (req, res) => {
  const id = Number(req.params.id);

  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  // Find matching knowledge base article
  let article = knowledgeBase.find(
    (item) => item.category === ticket.productArea
  );

  if (!article) {
    article = {
      category: "General",
      title: "General Support",

      content:
        "Our support team will investigate your issue.",

      missingInfo: [],

      followUpQuestions: [],

      draftResponse:
        "Thank you for contacting us. Our support team is reviewing your issue and will get back to you shortly.",

      internalAction:
        "Assign the ticket to the General Support Team.",
    };
  }

  ticket.aiAnalysis = {
    category: article.category,

    suggestedUrgency: ticket.urgency,

    relevantArticle: article.title,

    knowledgeContent: article.content,

    missingInformation: article.missingInfo,

    followUpQuestions: article.followUpQuestions,

    draftResponse: article.draftResponse,

    suggestedAction: article.internalAction,
  };

  ticket.history.push({
    action: "AI Analysis Generated",
    time: new Date().toLocaleString(),
  });

  ticket.updatedAt = new Date().toLocaleString();

  res.status(200).json(ticket.aiAnalysis);
});

// =====================================
// Update Ticket
// =====================================

app.put("/api/tickets/:id", (req, res) => {
  const id = Number(req.params.id);

  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  Object.assign(ticket, req.body);

  ticket.updatedAt = new Date().toLocaleString();

  ticket.history.push({
    action: "Ticket Updated",
    time: new Date().toLocaleString(),
  });

  res.status(200).json(ticket);
});

// =====================================
// Update Ticket Status
// =====================================

app.put("/api/status/:id", (req, res) => {
  const id = Number(req.params.id);

  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  ticket.status = req.body.status;

  ticket.updatedAt = new Date().toLocaleString();

  ticket.history.push({
    action: `Status changed to ${req.body.status}`,
    time: new Date().toLocaleString(),
  });

  res.status(200).json(ticket);
});
// =====================================
// Delete Ticket
// =====================================

app.delete("/api/tickets/:id", (req, res) => {
  const id = Number(req.params.id);

  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  tickets = tickets.filter((t) => t.id !== id);

  res.status(200).json({
    success: true,
    message: "Ticket Deleted Successfully",
  });
});

// =====================================
// Dashboard Statistics
// =====================================

app.get("/api/stats", (req, res) => {
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) =>
      ticket.status === "Open" ||
      ticket.status === "In Review" ||
      ticket.status === "Waiting for Customer"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  const highPriorityTickets = tickets.filter(
    (ticket) => ticket.urgency === "High"
  ).length;

  res.json({
    totalTickets,
    openTickets,
    resolvedTickets,
    closedTickets,
    highPriorityTickets,
  });
});

// =====================================
// Unknown Routes
// =====================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// =====================================
// Start Server
// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 Customer Support AI Backend");
  console.log(`🌐 Server Running: http://localhost:${PORT}`);
  console.log("====================================");
});