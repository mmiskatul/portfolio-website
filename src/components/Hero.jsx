import {Link} from 'react-router-dom'

export default function Hero() {
  return (
    <section className="w-full  bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white min-h-screen flex flex-col justify-center items-center px-6 text-center">
      <h1 className="text-6xl font-extrabold  mb-6 ">
        Hi, I’m <span className="text-indigo-400">Md. Miskatul Masabi</span>
      </h1>
      <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mb-10 leading-relaxed">
        A passionate Full Stack Developer building scalable web applications and
        engaging user experiences. Dedicated to continuous learning in AI & DSA.
      </p>
      <Link
        to="/projects"
        className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg px-8 py-4 shadow-lg transition duration-300"
      >
        See My Work
      </Link>
    </section>
  );
}
