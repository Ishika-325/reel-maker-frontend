// LandingPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactPlayer from "react-player";



const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-600 to-indigo-500 overflow-hidden">
        
        {/* Background animated shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="animate-ping absolute top-10 left-1/4 w-32 h-32 bg-white opacity-20 rounded-full"></div>
          <div className="animate-pulse absolute bottom-20 right-1/4 w-48 h-48 bg-white opacity-10 rounded-full"></div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white z-10 mb-4">
          🎬 ReelMaker
        </h1>

        <p className="text-xl md:text-2xl text-white mb-6 z-10">
          Create stunning short video reels from your photos and music in seconds!
        </p>

        <div className="flex gap-4 z-10">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Login
          </button>

          <a
            href="#demo"
            className="border border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white hover:text-purple-600 transition"
          >
            View Demo
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" data-aos="fade-up">
          Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "📸 Easy Photo Upload",
              desc: "Drag & drop your photos or upload from your device.",
            },
            {
              title: "🎵 Music Integration",
              desc: "Add your favorite tracks using the Audius API.",
            },
            {
              title: "🎬 Reel Generation",
              desc: "Powered by FFmpeg for fast, high-quality videos.",
            },
            {
              title: "🔒 Secure & Interactive",
              desc: "User accounts, authentication, and cloud storage.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" data-aos="fade-up">
          How It Works
        </h2>

        <div className="space-y-8">
          {[
            "Sign up or log in",
            "Upload photos & select a music track",
            "Click Generate Reel",
            "Download or share your reel instantly",
          ].map((step, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-4 text-lg md:text-xl"
              data-aos="fade-right"
              data-aos-delay={idx * 150}
            >
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 bg-gray-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8" data-aos="fade-up">
          Live Demo
        </h2>

        <p className="mb-6 text-gray-700" data-aos="fade-up" data-aos-delay={100}>
          See ReelMaker in action!
        </p>

        {/* Responsive Video Wrapper */}
        <div
          className="max-w-4xl mx-auto mb-6 rounded-xl overflow-hidden shadow-lg aspect-video"
          data-aos="fade-up"
          data-aos-delay={150}
        >
          {/* Responsive Video Wrapper */}

  <ReactPlayer
    url="https://player.vimeo.com/video/1162731898"
    width="100%"
    height="100%"
    controls={true}
    playing={true}   // ✅ AUTOPLAY ON
    muted={true}     // ✅ Required for autoplay
    loop={true}
    playsinline={true}
  />
</div>


        <a
          href="https://github.com/Ishika-325/reel-maker-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          View on GitHub
        </a>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 bg-gray-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" data-aos="fade-up">
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {[
            { name: "ReactJS", icon: "⚛️" },
            { name: "Node.js & Express", icon: "🟢" },
            { name: "MongoDB", icon: "🍃" },
            { name: "FFmpeg", icon: "🎬" },
            { name: "Audius API", icon: "🎵" },
          ].map((tech, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-purple-50"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h3 className="font-semibold text-lg text-black">
                {tech.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white text-center">
        <p>© 2026 Ishika | Built with React, Tailwind CSS & FFmpeg</p>

        <div className="mt-4 flex justify-center gap-6">
          <a
            href="https://linkedin.com/in/ishika-gupta-4ab26932a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/Ishika-325"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            GitHub
          </a>

          <a
            href="mailto:gishika325@gmail.com"
            className="hover:text-purple-400 transition"
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
