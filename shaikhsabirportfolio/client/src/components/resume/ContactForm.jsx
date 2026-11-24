import { useState } from "react";
import api from "../../services/api";
import ApiStatusBadge from "../ApiStatusBadge";

export default function ContactForm({ darkMode, personalInfo }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: null, text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, text: "" });
    setSubmitting(true);

    try {
      const { data } = await api.post("/contact", form);
      setStatus({
        type: "success",
        text: data?.message || "Message sent successfully!",
      });

      setForm({ name: "", email: "", subject: "", message: "" });

    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        "Could not send your message. Please try again.";
      setStatus({ type: "error", text: errMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
        <>
        {/* <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" /> */}
        <div 
        
        // className={`flex flex-col md:flex-row justify-between items-center md:items-center gap-8 px-4 max-w-6xl mx-auto`}
        
        // className={`py-12 md:py-24 w-full md:w-1/2`}
        >
      <form onSubmit={handleSubmit} >
      <h2 className="text-2xl font-bold text-left w-full">Get in Touch<span><ApiStatusBadge /></span></h2>
        
      {status.text && (
          <div
          className={`p-3 rounded text-sm ${
              status.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-700"
            }`}
            >
          {status.text}
        </div>
      )}

      
      <div className="mt-4">
        <label htmlFor="name" className="block text-sm text-left font-medium mb-1">
            Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          maxLength={100}
          placeholder="Your Name"
          className="w-full border rounded px-3 py-2 text-blue-600 font-bold"
          />
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="block text-sm text-left font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          maxLength={150}
          placeholder="Your Email"
          className="w-full border rounded px-3 py-2 text-blue-600 font-bold"
          />
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className="block text-sm text-left font-medium mb-1">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          maxLength={150}
          placeholder="Subject"
          className="w-full border rounded px-3 py-2 text-blue-600 font-bold"
          />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block text-sm text-left font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          maxLength={2000}
          placeholder="Your Message"
          className="w-full border rounded px-3 py-2 text-blue-600 font-bold"
          />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-5 mt-2 py-2 rounded bg-blue-600 text-white disabled:opacity-50 w-full"
        >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
            </div>
  </>
  );
}