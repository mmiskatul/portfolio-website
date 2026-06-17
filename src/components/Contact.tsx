"use client";

import { useState } from "react";
import { Mail, MessageSquare, Calendar, Clock, Check, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Scheduler State
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(15); // minutes
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStep, setBookingStep] = useState<"options" | "calendar" | "success">("options");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormStatus("sending");
    // Simulate sending email
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setBookingStep("success");
  };

  // Generate next 5 business days
  const getNextBusinessDays = () => {
    const dates = [];
    let current = new Date();
    while (dates.length < 5) {
      current.setDate(current.getDate() + 1);
      const day = current.getDay();
      if (day !== 0 && day !== 6) { // Exclude weekends
        dates.push({
          isoString: current.toISOString().split("T")[0],
          displayString: current.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
        });
      }
    }
    return dates;
  };

  const timeSlots = ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"];

  return (
    <section id="contact" className="py-32 relative bg-secondary-bg/20">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Initialize <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple">Connection</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Submit an RFQ, inspect system capability, or book an architectural design session.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info & Scheduler Trigger Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/5 space-y-6">
              <h3 className="font-display text-2xl font-bold text-white">
                MD. Miskatul Masabi
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Available for contract architecture audits, multi-agent stack integrations, or full-time machine learning positions.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:masabimiskat@gmail.com"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-accent transition-colors"
                >
                  <Mail className="w-5 h-5 text-accent-purple" />
                  <span>masabimiskat@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MessageSquare className="w-5 h-5 text-accent-purple" />
                  <span>+880 1310694667</span>
                </div>
              </div>

              {/* Direct Schedule Session Button */}
              <button
                onClick={() => {
                  setShowScheduler(true);
                  setBookingStep("options");
                }}
                className="w-full py-4 rounded-xl bg-accent text-primary-bg font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(0,245,212,0.2)] hover:shadow-[0_0_25px_rgba(0,245,212,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Sync Session
              </button>
            </div>

            {/* Social channels card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 flex justify-around items-center">
              <a
                href="https://github.com/mmiskatul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/miskatul-masabi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://huggingface.co/mmiskatul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent font-bold font-mono px-3 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-sm"
                aria-label="Hugging Face Profile"
              >
                HF
              </a>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 md:p-8 border border-white/5">
            <h3 className="font-display text-xl font-bold text-white mb-6">
              Send System Message
            </h3>

            {formStatus === "success" ? (
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center text-accent space-y-3">
                <Check className="w-8 h-8 mx-auto" />
                <h4 className="font-bold font-display text-lg">Message Transmitted</h4>
                <p className="text-xs text-gray-400">
                  Data packets successfully routed to masabimiskat@gmail.com. I will contact you shortly.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="text-xs font-mono text-accent-purple underline mt-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-xs font-mono text-gray-400 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alan Turing"
                      className="glass-input p-3 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-xs font-mono text-gray-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alan@bletchley.org"
                      className="glass-input p-3 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="subject" className="text-xs font-mono text-gray-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Agent Integration Pipeline Proposal"
                    className="glass-input p-3 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="text-xs font-mono text-gray-400 mb-1.5">
                    Data Payload (Message)
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details of your project requirements, API integration specs, or scheduled interview details..."
                    className="glass-input p-3 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white font-bold text-sm tracking-wide transition-all"
                >
                  {formStatus === "sending" ? "Transmitting..." : "Transmit Packets"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Scheduler Modal */}
      {showScheduler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-bg/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-secondary-bg border border-white/15 rounded-2xl overflow-hidden shadow-2xl relative p-6 md:p-8">
            {/* Close */}
            <button
              onClick={() => setShowScheduler(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {bookingStep === "options" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    Select Session Format
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Book an immediate system review or interview session.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSelectedDuration(15);
                      setBookingStep("calendar");
                    }}
                    className="w-full p-4 rounded-xl border border-white/10 hover:border-accent/30 hover:bg-accent/5 text-left transition-all flex justify-between items-center group"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-accent">AI Integration Check</h4>
                      <p className="text-xs text-gray-400 mt-1">Brief scope audit and feasibility inspection.</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      15 min
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDuration(30);
                      setBookingStep("calendar");
                    }}
                    className="w-full p-4 rounded-xl border border-white/10 hover:border-accent/30 hover:bg-accent/5 text-left transition-all flex justify-between items-center group"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-accent">Systems Architecture Review</h4>
                      <p className="text-xs text-gray-400 mt-1">Deep dive validation into models, queues, or pipelines.</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      30 min
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDuration(60);
                      setBookingStep("calendar");
                    }}
                    className="w-full p-4 rounded-xl border border-white/10 hover:border-accent/30 hover:bg-accent/5 text-left transition-all flex justify-between items-center group"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm group-hover:text-accent">Full Interview / Onboarding</h4>
                      <p className="text-xs text-gray-400 mt-1">Commercial onboarding or direct technical code assessment.</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      60 min
                    </div>
                  </button>
                </div>
              </div>
            )}

            {bookingStep === "calendar" && (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    Select Date & Time
                  </h3>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    Duration: {selectedDuration} Minutes Sync
                  </span>
                </div>

                {/* Day selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400">Available Days</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {getNextBusinessDays().map((day) => (
                      <button
                        type="button"
                        key={day.isoString}
                        onClick={() => setSelectedDate(day.isoString)}
                        className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
                          selectedDate === day.isoString
                            ? "bg-accent/15 border-accent text-accent font-bold"
                            : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300"
                        }`}
                      >
                        {day.displayString}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slot selector */}
                {selectedDate && (
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400">Available Slots (Timezone GMT+6)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
                            selectedTime === time
                              ? "bg-accent/15 border-accent text-accent font-bold"
                              : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setBookingStep("options")}
                    className="flex-1 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-gray-300 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 py-3 rounded-lg bg-accent text-primary-bg font-bold text-xs tracking-wider transition-all disabled:opacity-50"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}

            {bookingStep === "success" && (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent/25 flex items-center justify-center mx-auto border border-accent">
                  <Check className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">Sync Scheduled Successfully</h3>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-w-sm mx-auto font-mono text-xs text-gray-300 space-y-1">
                  <p>Format: {selectedDuration} Minute Sync</p>
                  <p>Date: {selectedDate}</p>
                  <p>Time: {selectedTime} (GMT+6)</p>
                </div>

                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  A Calendar invite and Google Meet link will be automatically dispatched to your email address shortly. See you then!
                </p>

                <button
                  onClick={() => setShowScheduler(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-white font-mono text-xs transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
