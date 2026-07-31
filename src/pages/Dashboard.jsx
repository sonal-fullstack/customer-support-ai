import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import SearchBar from "../components/SearchBar";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import AIResult from "../components/AIResult";

function Dashboard() {
  const [ticket, setTicket] = useState({
    customerType: "",
    productArea: "",
    issueDescription: "",
    previousCommunication: "",
    urgency: "Low",
  });

  const [tickets, setTickets] = useState([]);
  const [analyzedTicket, setAnalyzedTicket] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ==========================
  // Load Tickets
  // ==========================

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tickets"
      );

      setTickets(response.data);

      // Refresh analyzed ticket if already selected
      if (analyzedTicket) {
        const latestTicket = response.data.find(
          (t) => t.id === analyzedTicket.id
        );

        if (latestTicket) {
          setAnalyzedTicket(latestTicket);
        }
      }
    } catch (error) {
      console.log("Error Loading Tickets", error);
    }
  };

  // ==========================
  // Search + Filter
  // ==========================

  const filteredTickets = tickets.filter((item) => {
    const matchesSearch =
      item.customerType
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.productArea
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        {/* Statistics */}

        <StatsCards tickets={tickets} />

        {/* Ticket Form */}

        <div className="top-section">
          <TicketForm
            ticket={ticket}
            setTicket={setTicket}
            tickets={tickets}
            setTickets={setTickets}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />
        </div>

        {/* Search */}

        <SearchBar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Main Layout */}

        <div className="bottom-section">

          {/* Ticket List */}

          <div className="left-panel">
            <TicketList
              tickets={filteredTickets}
              setTickets={setTickets}
              setTicket={setTicket}
              setEditIndex={setEditIndex}
              setAnalyzedTicket={setAnalyzedTicket}
            />
          </div>

          {/* AI Panel */}

          <div className="right-panel">
            <AIResult
              ticket={analyzedTicket}
            />
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;