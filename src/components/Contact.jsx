import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  const contactLinks = [
    {
      name: "GitHub",
      icon: <FaGithub className="w-6 h-6" />,
      url: "https://github.com/mmiskatul",
      color: "hover:text-gray-800",
      bgColor: "hover:bg-gray-100"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/mmiskatul-masabi/",
      color: "hover:text-blue-700",
      bgColor: "hover:bg-blue-50"
    },
    {
      name: "Twitter",
      icon: <SiX className="w-5 h-5" />,
      url: "https://x.com/md_masabi",
      color: "hover:text-black",
      bgColor: "hover:bg-gray-100"
    },
    {
      name: "Email",
      icon: <MdEmail className="w-6 h-6" />,
      url: "mailto:masabimiskat@gmail.com",
      color: "hover:text-red-600",
      bgColor: "hover:bg-red-50"
    },
  ];

  const contactInfo = [
    {
      icon: <MdEmail className="w-5 h-5 text-indigo-600" />,
      text: "masabimiskat@gmail.com",
      link: "mailto:masabimiskat@gmail.com"
    },
    {
      icon: <FaPhoneAlt className="w-5 h-5 text-indigo-600" />,
      text: "+880 1310694667",
      link: "tel:+8801310694667"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5 text-indigo-600" />,
      text: "Dhaka, Bangladesh",
      link: "https://maps.google.com/?q=Dhaka,Bangladesh"
    }
  ];

  return (
    <section id="contact" className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In <span className="text-indigo-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to connect? Feel free to reach out!
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Md. Miskatul Masabi</h3>
              <p className="text-gray-600">Full Stack Developer & AI Enthusiast</p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-4 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              {contactLinks.map((contact, i) => (
                <a
                  key={i}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center p-3 rounded-full transition-all ${contact.bgColor} ${contact.color}`}
                  aria-label={contact.name}
                >
                  {contact.icon}
                  <span className="sr-only">{contact.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 text-center">
            <p className="text-gray-500 text-sm">
              Open for collaborations and interesting opportunities. Let's build something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}