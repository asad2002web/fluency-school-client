import React from "react";
const Bunner = () => {
  return (
    <div>
      <div
        className="hero "
        style={{
          backgroundImage:
            'url("https://i.ibb.co/R2XQf7Y/74b1474d06ffb6d1784c5a3c8d3b2de5.jpg")',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Language Learning in a Nutshell</h1>
            <p className="mb-5">
            Learning a new language involves developing vocabulary, grammar, and pronunciation skills through immersion, practice, and cultural understanding, leading to improved communication and cultural appreciation
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bunner;
