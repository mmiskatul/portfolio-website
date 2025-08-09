export default function About() {
  return (
    <section
      id="about"
      className=" max-w-6xl mx-auto py-20 px-6 bg-gradient-to-b from-purple-700 to-gray-500 rounded-lg shadow-lg"
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
        About Me
      </h2>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
        {/* Card 1 */}
        <div className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 shadow-lg hover:scale-105 hover:shadow-blue-400 transform transition duration-300">
          <h3 className="text-2xl font-semibold mb-4">Skills</h3>
          <p>
            Experienced Full Stack Developer skilled in React.js, Node.js, and Tailwind CSS.
            Building elegant, efficient, and scalable web applications.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-gradient-to-r from-green-500 hover:shadow-blue-400 to-teal-600 text-white rounded-lg p-8 shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-2xl font-semibold mb-4">Focus</h3>
          <p>
            Passionate about creating smooth user experiences and scalable architecture,
            ensuring apps perform beautifully on all devices.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-blue-400 text-white rounded-lg p-8 shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-2xl font-semibold mb-4">Learning</h3>
          <p>
            Continuously expanding knowledge in AI, Machine Learning, and advanced data structures
            to stay ahead in the tech world.
          </p>
        </div>
      </div>
    </section>
  );
}
