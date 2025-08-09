

export default function Projects() {
  const projects = [
    {
      title: "B2B SaaS Landing Page",
      description:
        "High-conversion landing page with interactive pricing calculator built with React and Tailwind CSS.",
      link: "#",
    },
    {
      title: "Hotel Management System",
      description:
        "Robust inventory and booking management system for streamlined hotel operations.",
      link: "#",
    },
    {
      title: "Firefighting Robot",
      description:
        "Arduino-based autonomous robot that detects and extinguishes fires.",
      link: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-gray-50 py-20 px-6 max-w-6xl mx-auto rounded-lg"
    >
      <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
        Projects
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
            <a
              href={project.link}
              className="text-indigo-600 font-semibold hover:text-indigo-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

