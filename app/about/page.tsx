"use client";

import { motion } from "framer-motion";
import { Code, GraduationCap, Sparkles } from "lucide-react";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 75 },
  { name: "Next.js", level: 70 },
  { name: "Express.js", level: 65 },
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <GraduationCap className="w-16 h-16 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground">
            Get to know more about my journey and skills
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
          >
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-primary/10 rounded-lg"
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3">Who I Am</h2>
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m a <strong>BSIT 3rd Year Student</strong> passionate about web
                  development and creating innovative digital solutions. I love
                  learning new technologies and applying them to build real-world
                  applications that make a difference.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
          >
            <div className="flex items-start gap-4 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-primary/10 rounded-lg"
              >
                <Code className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-6">My Skills</h2>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1,
                            delay: index * 0.1 + 0.3,
                            ease: "easeOut",
                          }}
                          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
          >
            <h2 className="text-2xl font-semibold mb-4">Technologies I Work With</h2>
            <div className="flex flex-wrap gap-3">
              {["HTML", "CSS", "JavaScript", "React", "Next.js", "Express.js"].map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      type: "spring",
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

