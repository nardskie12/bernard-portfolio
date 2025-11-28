"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import ResumeModal from "@/components/ResumeModal";

export default function HomePage() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary/20"
              >
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary rounded-full opacity-20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center md:items-start text-center md:text-left space-y-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >
                Hello, I&apos;m Raynel
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
              >
                BSIT 3rd Year Student | Web Developer
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-muted-foreground max-w-xl"
              >
                Passionate about creating beautiful and functional web
                applications using modern technologies.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open("/madelo_resume.pdf", "_blank")}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  <FileText className="w-5 h-5" />
                  View Resume
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}
