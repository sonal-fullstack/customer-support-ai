import {
  FaClipboardList,
  FaFolderOpen,
  FaExclamationTriangle,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

function StatsCards({ tickets }) {
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

  const highPriority = tickets.filter(
    (ticket) => ticket.urgency === "High"
  ).length;

  const resolutionRate =
    totalTickets === 0
      ? 0
      : Math.round(((resolvedTickets + closedTickets) / totalTickets) * 100);

  const cards = [
    {
      title: "Total Tickets",
      value: totalTickets,
      subtitle: "All Support Requests",
      icon: <FaClipboardList />,
      color: "#2563eb",
    },
    {
      title: "Open Tickets",
      value: openTickets,
      subtitle: "Need Attention",
      icon: <FaFolderOpen />,
      color: "#f59e0b",
    },
    {
      title: "High Priority",
      value: highPriority,
      subtitle: "Urgent Cases",
      icon: <FaExclamationTriangle />,
      color: "#ef4444",
    },
    {
      title: "Resolved",
      value: resolvedTickets,
      subtitle: "Successfully Solved",
      icon: <FaCheckCircle />,
      color: "#16a34a",
    },
    {
      title: "Closed",
      value: closedTickets,
      subtitle: "Completed Tickets",
      icon: <FaLock />,
      color: "#6b7280",
    },
  ];

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "22px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "15px",
                  marginBottom: "6px",
                }}
              >
                {card.title}
              </p>

              <h2
                style={{
                  fontSize: "34px",
                  color: "#0f172a",
                  margin: "0",
                }}
              >
                {card.value}
              </h2>

              <small
                style={{
                  color: "#94a3b8",
                }}
              >
                {card.subtitle}
              </small>
            </div>

            <div
              style={{
                width: "62px",
                height: "62px",
                borderRadius: "50%",
                background: card.color,
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "26px",
              }}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          padding: "18px",
          borderRadius: "14px",
          marginBottom: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Resolution Rate</strong>

          <strong>{resolutionRate}%</strong>
        </div>

        <div
          style={{
            width: "100%",
            height: "10px",
            background: "#e5e7eb",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${resolutionRate}%`,
              height: "100%",
              background: "#16a34a",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default StatsCards;