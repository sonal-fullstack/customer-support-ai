function SearchBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        display: "flex",
        gap: "15px",
        marginBottom: "25px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search by customer, product or issue..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 1,
          minWidth: "260px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          outline: "none",
          fontSize: "15px",
        }}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
          width: "220px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        <option value="All">All Status</option>
        <option value="Open">Open</option>
        <option value="In Review">In Review</option>
        <option value="Waiting for Customer">
          Waiting for Customer
        </option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>

      <button
        onClick={clearFilters}
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: "8px",
          background: "#ef4444",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
    </div>
  );
}

export default SearchBar;