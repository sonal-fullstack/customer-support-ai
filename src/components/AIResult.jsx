import { useEffect, useState } from "react";
import {
  FaTag,
  FaBolt,
  FaBook,
  FaQuestionCircle,
  FaComments,
  FaReply,
  FaTasks,
  FaLink,
} from "react-icons/fa";

import knowledgeBase from "../data/knowledgeBase";

function AIResult({ ticket }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [actionStatus, setActionStatus] = useState("");

  const article = ticket
    ? knowledgeBase.find(
        (item) => item.category === ticket.productArea
      )
    : null;

  useEffect(() => {
    if (ticket) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setResponse(article?.draftResponse || "");
        setResponseStatus("");
        setActionStatus("");
      }, 800);
    }
  }, [ticket]);

  if (!ticket) {
    return (
      <div className="ai-card">
        <h2>🤖 AI Analysis</h2>

        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#64748b",
          }}
        >
          <h3>No Ticket Selected</h3>

          <p>
            Create a ticket and click
            <br />
            <strong>🤖 Analyze with AI</strong>
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ai-card">
        <h2>🤖 AI Analysis</h2>

        <div
          style={{
            textAlign: "center",
            padding: "70px 20px",
          }}
        >
          <h3>⏳ AI is analyzing...</h3>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-card">
      <h2>🤖 AI Analysis</h2>

      {/* Category */}

      <div className="ai-item">
        <FaTag className="icon" />

        <div>
          <h4>Issue Category</h4>

          <p>{ticket.productArea}</p>
        </div>
      </div>

      {/* Urgency */}

      <div className="ai-item">
        <FaBolt className="icon" />

        <div>
          <h4>Suggested Urgency</h4>

          <p>{ticket.urgency}</p>
        </div>
      </div>

      {/* KB */}

      <div className="ai-item">
        <FaBook className="icon" />

        <div>
          <h4>Relevant Knowledge Base</h4>

          <p>{article?.content}</p>
        </div>
      </div>

      {/* Missing */}

      <div className="ai-item">
        <FaQuestionCircle className="icon" />

        <div>
          <h4>Missing Information</h4>

          <ul>
            {article?.missingInfo?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Questions */}

      <div className="ai-item">
        <FaComments className="icon" />

        <div>
          <h4>Follow-up Questions</h4>

          <ul>
            {article?.followUpQuestions?.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Response */}

      <div className="ai-item">
        <FaReply className="icon" />

        <div style={{ width: "100%" }}>
          <h4>Draft Customer Response</h4>

          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={6}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() =>
                setResponseStatus("✅ Response Approved")
              }
            >
              Approve
            </button>

            <button
              onClick={() =>
                setResponseStatus("❌ Response Rejected")
              }
            >
              Reject
            </button>
          </div>

          {responseStatus && (
            <p
              style={{
                marginTop: "12px",
                color: "green",
                fontWeight: "bold",
              }}
            >
              {responseStatus}
            </p>
          )}
        </div>
      </div>

      {/* Action */}

      <div className="ai-item">
        <FaTasks className="icon" />

        <div style={{ width: "100%" }}>
          <h4>Suggested Internal Action</h4>

          <p>{article?.internalAction}</p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() =>
                setActionStatus("✅ Action Approved")
              }
            >
              Approve
            </button>

            <button
              onClick={() =>
                setActionStatus("❌ Action Rejected")
              }
            >
              Reject
            </button>
          </div>

          {actionStatus && (
            <p
              style={{
                marginTop: "12px",
                color: "#2563eb",
                fontWeight: "bold",
              }}
            >
              {actionStatus}
            </p>
          )}
        </div>
      </div>

      {/* Source */}

      <div className="ai-item">
        <FaLink className="icon" />

        <div>
          <h4>Knowledge Source</h4>

          <p>{article?.title}</p>
        </div>
      </div>

      {/* History */}

      <hr style={{ margin: "30px 0" }} />

      <div>
        <h3>📜 Ticket History</h3>

        <div
          style={{
            background: "#f8fafc",
            padding: "15px",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        >
          {ticket.history && ticket.history.length > 0 ? (
            ticket.history.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <strong>{item.action}</strong>

                <br />

                <small>{item.time}</small>
              </div>
            ))
          ) : (
            <p>No History Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIResult;