import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiX, SiCodeforces } from "react-icons/si";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub className="w-5 h-5" />,
      url: "https://github.com/mmiskatul",
      color: "hover:text-gray-800"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/md-mishkatul-masabi-b55b76292/",
      color: "hover:text-blue-700"
    },
    {
      name: "Twitter",
      icon: <SiX className="w-4 h-4" />,
      url: "https://x.com/md_masabi",
      color: "hover:text-black"
    },
    {
      name: "Email",
      icon: <FaEnvelope className="w-5 h-5" />,
      url: "mailto:masabimiskat@gmail.com",
      color: "hover:text-red-600"
    },
    {
      name: "Codeforces",
      icon: <SiCodeforces className="w-5 h-5" />,
      url: "https://codeforces.com/profile/Miskatul_Masabi",
      color: "hover:text-orange-500"
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Md. Miskatul Masabi. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 transition-colors ${link.color}`}
                aria-label={link.name}
              >
                {link.icon}
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}