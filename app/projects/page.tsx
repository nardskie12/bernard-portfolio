"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Cpu, Plus, Trash2, Code2 } from "lucide-react";

interface Process {
  id: number;
  name: string;
  arrivalTime: number;
  burstTime: number;
  startTime?: number;
  endTime?: number;
  waitingTime?: number;
  turnaroundTime?: number;
}

export default function ProjectsPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [executedProcesses, setExecutedProcesses] = useState<Process[]>([]);
  const [ganttChart, setGanttChart] = useState<Array<{ process: string; start: number; end: number }>>([]);
  const [nextId, setNextId] = useState(1);
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [animationInterval]);

  const calculateFCFS = () => {
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let time = 0;
    const executed: Process[] = [];
    const gantt: Array<{ process: string; start: number; end: number }> = [];

    sortedProcesses.forEach((process) => {
      const startTime = Math.max(time, process.arrivalTime);
      const endTime = startTime + process.burstTime;
      const waitingTime = startTime - process.arrivalTime;
      const turnaroundTime = endTime - process.arrivalTime;

      executed.push({
        ...process,
        startTime,
        endTime,
        waitingTime,
        turnaroundTime,
      });

      gantt.push({
        process: process.name,
        start: startTime,
        end: endTime,
      });

      time = endTime;
    });

    return { executed, gantt, totalTime: time };
  };

  const handleRun = () => {
    if (processes.length === 0) return;
    
    setIsRunning(true);
    setCurrentTime(0);
    const { executed, gantt, totalTime } = calculateFCFS();
    setExecutedProcesses(executed);
    setGanttChart(gantt);

    // Animate through the Gantt chart
    let time = 0;
    const interval = setInterval(() => {
      time += 0.5;
      setCurrentTime(time);
      if (time >= totalTime) {
        clearInterval(interval);
        setAnimationInterval(null);
        setIsRunning(false);
      }
    }, 500);
    setAnimationInterval(interval);
  };

  const handleReset = () => {
    // Clear any running animation interval
    if (animationInterval) {
      clearInterval(animationInterval);
      setAnimationInterval(null);
    }
    setIsRunning(false);
    setCurrentTime(0);
    setExecutedProcesses([]);
    setGanttChart([]);
  };

  const handleAddProcess = () => {
    const newProcess: Process = {
      id: nextId,
      name: `P${nextId}`,
      arrivalTime: 0,
      burstTime: 1,
    };
    setProcesses([...processes, newProcess]);
    setNextId(nextId + 1);
  };

  const handleRemoveProcess = (id: number) => {
    setProcesses(processes.filter((p) => p.id !== id));
  };

  const handleUpdateProcess = (id: number, field: "arrivalTime" | "burstTime", value: number) => {
    setProcesses(
      processes.map((p) =>
        p.id === id ? { ...p, [field]: Math.max(0, value) } : p
      )
    );
  };

  const avgWaitingTime =
    executedProcesses.length > 0
      ? executedProcesses.reduce((sum, p) => sum + (p.waitingTime || 0), 0) /
        executedProcesses.length
      : 0;
  const avgTurnaroundTime =
    executedProcesses.length > 0
      ? executedProcesses.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) /
        executedProcesses.length
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black pt-20 sm:pt-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl backdrop-blur-sm">
              <Cpu className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            FCFS CPU Scheduling
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Interactive visualization of First Come First Serve CPU scheduling algorithm
          </p>
        </motion.div>

        {/* Process Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-4 sm:p-6 shadow-2xl border border-zinc-700/50 mb-6 sm:mb-8 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl sm:text-2xl font-semibold text-white">Processes</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProcess}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-medium shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Process</span>
              <span className="sm:hidden">Add</span>
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-zinc-700/50">
                  <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Process</th>
                  <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Arrival</th>
                  <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Burst</th>
                  <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-zinc-400 text-sm sm:text-base">
                      No processes added. Click &quot;Add Process&quot; to get started.
                    </td>
                  </tr>
                ) : (
                  processes.map((process, index) => (
                    <motion.tr
                      key={process.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-zinc-700/30"
                    >
                      <td className="p-2 sm:p-3 font-medium text-zinc-200 text-sm sm:text-base">{process.name}</td>
                      <td className="p-2 sm:p-3">
                        <input
                          type="number"
                          min="0"
                          value={process.arrivalTime}
                          onChange={(e) =>
                            handleUpdateProcess(
                              process.id,
                              "arrivalTime",
                              parseInt(e.target.value) || 0
                            )
                          }
                          disabled={isRunning}
                          className="w-16 sm:w-20 px-2 py-1 border border-zinc-700/50 rounded-md bg-zinc-800/50 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="p-2 sm:p-3">
                        <input
                          type="number"
                          min="1"
                          value={process.burstTime}
                          onChange={(e) =>
                            handleUpdateProcess(
                              process.id,
                              "burstTime",
                              parseInt(e.target.value) || 1
                            )
                          }
                          disabled={isRunning}
                          className="w-16 sm:w-20 px-2 py-1 border border-zinc-700/50 rounded-md bg-zinc-800/50 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="p-2 sm:p-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveProcess(process.id)}
                          disabled={isRunning || processes.length === 1}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning || processes.length === 0}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-semibold shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <Play className="w-5 h-5" />
            Run Algorithm
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 text-zinc-200 rounded-lg font-semibold shadow-lg hover:shadow-xl border border-zinc-700/50 transition-all text-sm sm:text-base"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </motion.button>
        </motion.div>

        {/* Gantt Chart */}
        {ganttChart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-4 sm:p-6 shadow-2xl border border-zinc-700/50 mb-6 sm:mb-8 backdrop-blur-sm"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Gantt Chart</h2>
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max pb-4">
                {ganttChart.map((item, index) => {
                  const isActive = currentTime >= item.start && currentTime < item.end;
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`relative flex flex-col items-center ${
                        isActive ? "z-10" : ""
                      }`}
                    >
                      <motion.div
                        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                        className={`w-16 sm:w-20 h-14 sm:h-16 rounded-lg flex items-center justify-center font-semibold text-xs sm:text-sm border-2 ${
                          isActive
                            ? "bg-gradient-to-br from-primary to-primary/80 text-white border-primary shadow-lg shadow-primary/50"
                            : "bg-zinc-800/50 text-zinc-300 border-zinc-700/50"
                        }`}
                      >
                        {item.process}
                      </motion.div>
                      <div className="text-xs text-zinc-400 mt-1">
                        {item.start}
                      </div>
                      {index === ganttChart.length - 1 && (
                        <div className="text-xs text-zinc-400 mt-1 absolute -right-2">
                          {item.end}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Table */}
        {executedProcesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-4 sm:p-6 shadow-2xl border border-zinc-700/50 mb-8 backdrop-blur-sm"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">Results</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-zinc-700/50">
                    <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Process</th>
                    <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Arrival</th>
                    <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Burst</th>
                    <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Start</th>
                    <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">End</th>
                    <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Waiting</th>
                    <th className="text-left p-2 sm:p-3 text-zinc-300 text-xs sm:text-sm">Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {executedProcesses.map((process, index) => (
                    <motion.tr
                      key={process.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-zinc-700/30"
                    >
                      <td className="p-2 sm:p-3 font-medium text-zinc-200 text-sm sm:text-base">{process.name}</td>
                      <td className="p-2 sm:p-3 text-zinc-300 text-sm sm:text-base">{process.arrivalTime}</td>
                      <td className="p-2 sm:p-3 text-zinc-300 text-sm sm:text-base">{process.burstTime}</td>
                      <td className="p-2 sm:p-3 text-zinc-300 text-sm sm:text-base">{process.startTime}</td>
                      <td className="p-2 sm:p-3 text-zinc-300 text-sm sm:text-base">{process.endTime}</td>
                      <td className="p-2 sm:p-3 text-zinc-300 text-sm sm:text-base">{process.waitingTime}</td>
                      <td className="p-2 sm:p-3 text-zinc-300 text-sm sm:text-base">{process.turnaroundTime}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-4 border border-primary/30">
                <p className="text-xs sm:text-sm text-zinc-400 mb-1">Average Waiting Time</p>
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  {avgWaitingTime.toFixed(2)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-4 border border-primary/30">
                <p className="text-xs sm:text-sm text-zinc-400 mb-1">
                  Average Turnaround Time
                </p>
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  {avgTurnaroundTime.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
