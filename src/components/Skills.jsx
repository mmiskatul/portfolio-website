// src/components/Skills.jsx
import React from "react";

export default function Skills() {
  const skills = [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Java",
    "C",
    "Python",
    "Tailwind CSS",
    "DSA",
  ];

  return (
    <section
      id="skills"
      className=" min-h-screen mx-auto py-20 px-6 bg-white "
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Skills</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-indigo-100 text-indigo-700 font-semibold px-5 py-3 rounded-full shadow-md cursor-default select-none text-lg"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
