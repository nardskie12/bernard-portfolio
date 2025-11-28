"use client";

import { motion } from "framer-motion";
import { Code, GraduationCap, Sparkles, Award, Target } from "lucide-react";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 75 },
  { name: "Next.js", level: 70 },
  { name: "Express.js", level: 65 },
  { name: "Figma", level: 75 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black pt-20 sm:pt-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl backdrop-blur-sm">
              <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Discover my journey, passion, and expertise in web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Who I Am Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-700/50 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex-shrink-0"
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">Who I Am</h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  I&apos;m <strong className="text-primary">Bernard Bioco</strong>, a dedicated <strong className="text-primary">BSIT 3rd Year Student</strong> with a passion for creating exceptional digital experiences. I combine technical expertise with creative design to build solutions that make a real impact.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Goals Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-700/50 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex-shrink-0"
              >
                <Target className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-white">My Goals</h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Continuously learning and growing in the ever-evolving tech landscape. My goal is to become a full-stack developer who creates meaningful, user-centered applications that solve real-world problems.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-700/50 backdrop-blur-sm mb-8 sm:mb-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex-shrink-0"
            >
              <Code className="w-6 h-6 text-primary" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white">Technical Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-zinc-200 text-sm sm:text-base">{skill.name}</span>
                      <span className="text-xs sm:text-sm text-zinc-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 sm:h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: index * 0.1 + 0.3,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full shadow-lg shadow-primary/50"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-700/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Technologies & Tools</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {["HTML", "CSS", "JavaScript", "React", "Next.js", "Express.js", "Figma"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    type: "spring" as const,
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-gradient-to-br from-primary/20 to-primary/10 text-primary rounded-lg font-medium border border-primary/30 hover:border-primary/50 transition-colors text-sm sm:text-base"
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
