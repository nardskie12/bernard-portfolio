"use client";

import { motion } from "framer-motion";
import { Mail, Github, Send, MapPin, Phone } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "biocobernard@gmail.com",
    link: "mailto:biocobernard@gmail.com",
    color: "text-red-400",
    gradient: "from-red-500/20 to-red-600/10",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "nardskie12",
    link: "https://github.com/nardskie12",
    color: "text-zinc-300",
    gradient: "from-zinc-500/20 to-zinc-600/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black pt-20 sm:pt-24 relative overflow-hidden" id="contact">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl backdrop-blur-sm">
              <Send className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Let&apos;s collaborate and bring your ideas to life. I&apos;m always open to discussing new projects and opportunities.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12"
        >
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : undefined}
                rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-br ${item.gradient} from-zinc-900/80 to-zinc-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-700/50 hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300 group backdrop-blur-sm`}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mb-4 border border-zinc-700/50`}
                >
                  <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${item.color}`} />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{item.label}</h3>
                <p className="text-sm sm:text-base text-zinc-300 group-hover:text-zinc-100 transition-colors break-all">
                  {item.value}
                </p>
                <motion.div
                  className="mt-4 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-700/50 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Let&apos;s Work Together</h3>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-4">
              Whether you have a project in mind, want to collaborate, or just want to say hello, I&apos;d love to hear from you. Feel free to reach out through any of the channels above.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Philippines</span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Available for Projects</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
