"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PersonaBuilder() {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const [confidence, setConfidence] = useState(50);
  const [creativity, setCreativity] = useState(50);
  const [discipline, setDiscipline] = useState(50);

  const addSkill = () => {
    if (skill.trim() !== "") {
      setSkills([...skills, skill]);
      setSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const getPersonaTitle = () => {
    if (creativity > 70) return "Creative Thinker 🎨";
    if (discipline > 70) return "Disciplined Builder ⚡";
    if (confidence > 70) return "Confident Leader 🔥";
    return "Balanced Mind 🧠";
  };

  const avatarUrl =
    "https://api.dicebear.com/7.x/bottts/svg?seed=" +
    (skills.join("") || "default");

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND BLOBS */}
      <div className="blob top-0 left-0"></div>
      <div className="blob blob2 bottom-0 right-0"></div>

      {/* HERO */}
      <div className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Create Your Digital Persona
        </motion.h1>

        <p className="mt-4 text-gray-300">
          Build a unique identity with skills, personality & AI avatar
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="flex justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl p-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
        >
          <div className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl">

            {/* INPUT */}
            <div className="flex gap-2">
              <input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Enter a skill..."
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
              />

              <button
                onClick={addSkill}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-110 transition animate-pulse"
              >
                Add
              </button>
            </div>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-3 mt-6">
              {skills.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center gap-2"
                >
                  {s}
                  <button onClick={() => removeSkill(i)}>✕</button>
                </motion.div>
              ))}
            </div>

            {/* SLIDERS */}
            <div className="mt-8 space-y-4">
              <div>
                <p>Confidence: {confidence}</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                />
              </div>

              <div>
                <p>Creativity: {creativity}</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={creativity}
                  onChange={(e) => setCreativity(Number(e.target.value))}
                />
              </div>

              <div>
                <p>Discipline: {discipline}</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={discipline}
                  onChange={(e) => setDiscipline(Number(e.target.value))}
                />
              </div>
            </div>

            {/* PERSONA CARD */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-10 p-6 rounded-xl glow-border bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                <motion.img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border border-cyan-400/50 shadow-lg shadow-cyan-500/30"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                  }}
                />
              </div>

              <h3 className="text-2xl font-bold text-center">
                {getPersonaTitle()}
              </h3>

              <div className="text-center mt-4">
                <p>Confidence: {confidence}</p>
                <p>Creativity: {creativity}</p>
                <p>Discipline: {discipline}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}