"use client";

import { motion } from "framer-motion";
import { Mail, Github, Send } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "raynelmadelo@gmail.com",
    link: "mailto:raynelmadelo@gmail.com",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "raynelM",
    link: "https://github.com/raynelM",
    color: "text-gray-500 dark:text-gray-300",
    bgColor: "bg-gray-500/10",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-4"
          >
            <Send className="w-16 h-16 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Let&apos;s connect and work together on amazing projects
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-card rounded-xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-8 h-8 ${item.color}`} />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.value}
                </p>
                <motion.div
                  className="mt-4 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
        </motion.div>
      </div>
    </div>
  );
}

