import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactUsPage() {
  return (
    <div className="container py-5">
      {/* Heading Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary display-5">Contact Us</h1>
        <p className="text-muted fs-5">
          Have a question or feedback? We're here to help!
        </p>
      </div>

      <div className="row g-4">
        {/* Contact Info Panel */}
        <div className="col-md-5">
          <div className="bg-light rounded shadow-sm p-4 h-100">
            <h4 className="fw-semibold text-dark mb-4">Get in Touch</h4>

            <div className="d-flex align-items-start mb-4">
              <FaPhoneAlt className="text-primary me-3 mt-1" size={20} />
              <div>
                <h6 className="mb-1">Phone</h6>
                <p className="text-muted mb-0">+1 (234) 567-8901</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <FaEnvelope className="text-primary me-3 mt-1" size={20} />
              <div>
                <h6 className="mb-1">Email</h6>
                <p className="text-muted mb-0">support@bookandstay.com</p>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <FaMapMarkerAlt className="text-primary me-3 mt-1" size={20} />
              <div>
                <h6 className="mb-1">Address</h6>
                <p className="text-muted mb-0">
                  123 Travel St, Wanderlust City, TX
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="col-md-7">
          <div className="bg-white rounded shadow-sm p-4">
            <h4 className="fw-semibold text-dark mb-4">Send Us a Message</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Message</label>
                <textarea
                  rows="4"
                  className="form-control form-control-lg"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">
                <FaPaperPlane className="me-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
