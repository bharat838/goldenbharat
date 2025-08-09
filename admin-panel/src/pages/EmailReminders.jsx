import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";

export default function EmailReminders() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const token = localStorage.getItem("adminToken");
      await API.post(
        "/admin/send-email",
        { email, subject, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("✅ Email sent successfully!");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Email send error:", err);
      setSuccess("❌ Failed to send email!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">📧 Email Reminders</h2>

          {success && (
            <p
              className={`mb-3 text-lg font-medium ${
                success.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {success}
            </p>
          )}

          <form
            onSubmit={handleSend}
            className="bg-white p-6 rounded-lg shadow-md max-w-lg"
          >
            <div className="mb-4">
              <label className="block font-medium mb-1">Recipient Email</label>
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Subject</label>
              <input
                type="text"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Message</label>
              <textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full p-2 border rounded h-32"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg text-white font-semibold ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
