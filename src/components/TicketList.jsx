import axios from "axios";

function TicketList({
  tickets,
  setTickets,
  setTicket,
  setEditIndex,
  setAnalyzedTicket,
}) {
  // ==========================
  // Update Ticket Status
  // ==========================
  const updateStatus = async (index, status) => {
    try {
      const ticket = tickets[index];

      const response = await axios.put(
        `http://localhost:5000/api/tickets/${ticket.id}`,
        {
          ...ticket,
          status,
        }
      );

      const updatedTickets = [...tickets];
      updatedTickets[index] = response.data;

      setTickets(updatedTickets);

      alert("✅ Status Updated");
    } catch (error) {
      console.log(error);
      alert("Error updating ticket");
    }
  };

  // ==========================
  // Delete Ticket
  // ==========================
  const deleteTicket = async (index) => {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/tickets/${tickets[index].id}`
      );

      const updatedTickets = tickets.filter(
        (_, i) => i !== index
      );

      setTickets(updatedTickets);

      alert("✅ Ticket Deleted");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // ==========================
  // Edit Ticket
  // ==========================
  const editTicket = (ticket, index) => {
    setTicket({
      customerType: ticket.customerType,
      productArea: ticket.productArea,
      issueDescription: ticket.issueDescription,
      previousCommunication:
        ticket.previousCommunication,
      urgency: ticket.urgency,
    });

    setEditIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // AI Analyze
  // ==========================
  const analyzeTicket = async (ticket) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/analyze/${ticket.id}`
      );

      setAnalyzedTicket({
        ...ticket,
        aiAnalysis: response.data,
      });

      alert("🤖 AI Analysis Generated Successfully");
    } catch (error) {
      console.log(error);
      alert("AI Analysis Failed");
    }
  };

  // ==========================
  // Status Color
  // ==========================
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "#16a34a";

      case "In Review":
        return "#2563eb";

      case "Waiting for Customer":
        return "#f59e0b";

      case "Resolved":
        return "#10b981";

      case "Closed":
        return "#6b7280";

      default:
        return "#16a34a";
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h2>Support Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets created yet.</p>
      ) : (
        tickets.map((item, index) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3>{item.productArea}</h3>

              <span
                style={{
                  background: getStatusColor(item.status),
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                }}
              >
                {item.status}
              </span>
            </div>

            <p>
              <strong>Customer:</strong>{" "}
              {item.customerType}
            </p>

            <p>
              <strong>Issue:</strong>{" "}
              {item.issueDescription}
            </p>

            <p>
              <strong>Urgency:</strong>{" "}
              {item.urgency}
            </p>

            <select
              value={item.status}
              onChange={(e) =>
                updateStatus(index, e.target.value)
              }
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              <option>Open</option>
              <option>In Review</option>
              <option>Waiting for Customer</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() => editTicket(item, index)}
                style={{
                  flex: 1,
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ✏ Edit
              </button>

              <button
                onClick={() => deleteTicket(index)}
                style={{
                  flex: 1,
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🗑 Delete
              </button>
            </div>

            <button
              onClick={() => analyzeTicket(item)}
              style={{
                width: "100%",
                marginTop: "12px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🤖 Analyze with AI
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TicketList;