"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Download, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black pt-20 sm:pt-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring" as const, stiffness: 300 }}
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/30 bg-gradient-to-br from-primary/20 to-primary/10"
              >
                <Image
                  src="/profile1.jpg"
                  alt="Bernard Bioco"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full opacity-30 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left order-1 lg:order-2 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <p className="text-primary text-sm sm:text-base font-medium uppercase tracking-wider">
                Welcome to My Portfolio
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  I&apos;m Bernard
                </span>
                <br />
                <span className="text-white">Bioco</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-medium"
            >
              Full Stack Web Developer & UI/UX Designer
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Crafting digital experiences through code and design. Currently pursuing BSIT while building innovative web solutions with modern technologies.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("/madelo_resume.pdf", "_blank")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-semibold shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all"
              >
                <FileText className="w-5 h-5" />
                <span>View Resume</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800/50 text-zinc-200 rounded-lg font-semibold border border-zinc-700/50 hover:border-primary/50 hover:bg-zinc-800/70 transition-all"
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
