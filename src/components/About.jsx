import profileImage from "../assets/profileImage.jpg";
import cvFile from "../assets/Miskatul Masabi.pdf";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center mx-auto px-6 py-20 bg-white"
    >
      <div className="max-w-6xl w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About <span className="text-indigo-600">Me</span>
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="flex-shrink-0 relative group">
            <img
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-indigo-100 shadow-xl transition-all duration-300 group-hover:border-indigo-300"
              src={profileImage}
              alt="Miskatul Masabi"
            />
            <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-indigo-200 transition-all duration-300"></div>
          </div>

          {/* Personal Info */}
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Full Stack Developer & AI Enthusiast
            </h3>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Passionate web developer with expertise in modern JavaScript frameworks and 
              a strong interest in artificial intelligence. Dedicated to creating efficient, 
              scalable solutions with clean code and intuitive user experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 min-w-[120px]">Name:</span>
                <span className="text-gray-600">Md. Miskatul Masabi</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 min-w-[120px]">Birthday:</span>
                <span className="text-gray-600">April 3, 2003</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 min-w-[120px]">Location:</span>
                <span className="text-gray-600">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 min-w-[120px]">Email:</span>
                <span className="text-gray-600">masabimiskat@gmail.com</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 min-w-[120px]">Phone:</span>
                <span className="text-gray-600">+880 1310694667</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-gray-800 min-w-[120px]">Zip Code:</span>
                <span className="text-gray-600">1216</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={cvFile}
                download="Miskatul_Masabi_CV.pdf"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors text-center"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors text-center"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}