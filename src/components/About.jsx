import profileImage from "../assets/profileImage.jpg";
import cvFile from "../assets/Miskatul Masabi.pdf";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center mx-auto py-12 px-6 bg-white rounded-lg shadow-sm"
    >
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-wide">
        About Me
      </h2>

      <div className="w-full flex flex-col md:flex-row items-center  md:items-start justify-around gap-10">
        {/* Left side - Profile Image */}
        <div className="flex flex-shrink-0  justify-center">
          <img
            className="rounded-full shadow-2xl w-80 h-80 object-cover border-4 border-indigo-500"
            src={profileImage}
            alt="Profile"
          />
        </div>

        {/* Right side - Info */}
        <div className="flex flex-col gap-4 text-gray-700 max-w-lg">
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Name:</span> Miskatul
            Masabi
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Date of Birth:</span>{" "}
            April 3, 2003
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Address:</span> Dhaka,
            Bangladesh
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Zip Code:</span> 1216
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Email:</span>{" "}
            masabimiskat@gmail.com
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Phone:</span> +880
            1310694667
          </p>

          {/* Download Button */}
          <a
            href={cvFile}
            download="Miskatul Masabi.pdf"
            className="mt-8 inline-block bg-indigo-600 px-6 py-3 text-lg font-bold text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 active:scale-95"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
