import React from "react";

export default function ContactUsPage() {
  return (
    <div className="container py-5">
      {/* Page Heading */}
      <div className="row mb-5">
        <div className="col text-center">
          <h1 className="display-4 fw-bold text-primary">Contact Us</h1>
          <p className="text-muted fs-5">
            We'd love to hear from you. Reach out with your queries or feedback!
          </p>
        </div>
      </div>

      {/* Left (Contact Info) and Right (Form) Side-by-Side */}
      <div className="row">
        {/* Left Column - Contact Info */}
        <div className="col-md-5 mb-4">
          <div className="bg-light p-4 rounded shadow-sm h-100">
            <h3 className="mb-4 text-dark">Get in Touch</h3>
            <div className="mb-3">
              <h5>📞 Phone</h5>
              <p className="text-muted fs-5">+1 (234) 567-8901</p>
            </div>
            <div className="mb-3">
              <h5>📧 Email</h5>
              <p className="text-muted fs-5">support@bookandstay.com</p>
            </div>
            <div className="mb-3">
              <h5>📍 Address</h5>
              <p className="text-muted fs-5">
                123 Travel St, Wanderlust City, TX
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="col-md-7">
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="mb-4 text-dark">Send Us a Message</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control form-control-lg"
                  rows="4"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
