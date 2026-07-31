import axios from "axios";

function TicketForm({
  ticket,
  setTicket,
  tickets,
  setTickets,
  editIndex,
  setEditIndex,
}) {
  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setTicket({
      customerType: "",
      productArea: "",
      issueDescription: "",
      previousCommunication: "",
      urgency: "Low",
    });

    setEditIndex(null);
  };

  const handleSubmit = async () => {
    if (
      !ticket.customerType ||
      !ticket.productArea ||
      !ticket.issueDescription.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      // =============================
      // UPDATE
      // =============================
      if (editIndex !== null) {
        const currentTicket = tickets[editIndex];

        const response = await axios.put(
          `http://localhost:5000/api/tickets/${currentTicket.id}`,
          {
            ...currentTicket,
            ...ticket,
          }
        );

        const updatedTickets = [...tickets];
        updatedTickets[editIndex] = response.data;

        setTickets(updatedTickets);

        alert("✅ Ticket Updated Successfully");
      }

      // =============================
      // CREATE
      // =============================
      else {
        const response = await axios.post(
          "http://localhost:5000/api/tickets",
          {
            ...ticket,
            status: "Open",
          }
        );

        setTickets([...tickets, response.data]);

        alert("✅ Ticket Created Successfully");
      }

      resetForm();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Server Error");
      } else {
        alert("Unable to connect to backend.");
      }
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2
        style={{
          color: "#1e3a8a",
          marginBottom: "8px",
        }}
      >
        {editIndex !== null
          ? "✏ Edit Support Ticket"
          : "🎫 Create Support Ticket"}
      </h2>

      <p
        style={{
          color: "#64748b",
          marginBottom: "25px",
        }}
      >
        Enter customer issue details to generate AI-powered recommendations.
      </p>

      {/* Customer Type */}

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Customer Type</strong>
        </label>

        <select
          name="customerType"
          value={ticket.customerType}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="">Select Customer Type</option>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </div>

      {/* Product Area */}

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Product Area</strong>
        </label>

        <select
          name="productArea"
          value={ticket.productArea}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="">Select Product Area</option>
          <option value="Login">Login</option>
          <option value="Billing">Billing</option>
          <option value="Dashboard">Dashboard</option>
          <option value="API">API</option>
        </select>
      </div>

      {/* Issue */}

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Issue Description</strong>
        </label>

        <textarea
          name="issueDescription"
          value={ticket.issueDescription}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the customer's issue..."
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            resize: "vertical",
          }}
        />
      </div>

      {/* Previous */}

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Previous Communication</strong>
        </label>

        <textarea
          name="previousCommunication"
          value={ticket.previousCommunication}
          onChange={handleChange}
          rows={4}
          placeholder="Optional previous communication..."
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            resize: "vertical",
          }}
        />
      </div>

      {/* Urgency */}

      <div style={{ marginBottom: "25px" }}>
        <label>
          <strong>Urgency</strong>
        </label>

        <select
          name="urgency"
          value={ticket.urgency}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          background:
            editIndex !== null ? "#16a34a" : "#2563eb",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {editIndex !== null
          ? "💾 Update Ticket"
          : "🚀 Create Ticket"}
      </button>
    </div>
  );
}

export default TicketForm;