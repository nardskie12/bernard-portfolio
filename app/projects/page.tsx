"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Cpu, Plus, Trash2 } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <Cpu className="w-16 h-16 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            FCFS CPU Scheduling Algorithm
          </h1>
          <p className="text-xl text-muted-foreground">
            First Come First Serve CPU Scheduling Visualization
          </p>
        </motion.div>

        {/* Process Input Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-xl p-6 shadow-lg border border-border mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Processes</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProcess}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add Process
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">Process</th>
                  <th className="text-left p-3">Arrival Time</th>
                  <th className="text-left p-3">Burst Time</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process, index) => (
                  <motion.tr
                    key={process.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-border/50"
                  >
                    <td className="p-3 font-medium">{process.name}</td>
                    <td className="p-3">
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
                        className="w-20 px-2 py-1 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="p-3">
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
                        className="w-20 px-2 py-1 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="p-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveProcess(process.id)}
                        disabled={isRunning || processes.length === 1}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex gap-4 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning || processes.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Run Algorithm
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
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
            className="bg-card rounded-xl p-6 shadow-lg border border-border mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Gantt Chart</h2>
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
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
                        className={`w-20 h-16 rounded-lg flex items-center justify-center font-semibold text-sm border-2 ${
                          isActive
                            ? "bg-primary text-primary-foreground border-primary shadow-lg"
                            : "bg-muted text-foreground border-border"
                        }`}
                      >
                        {item.process}
                      </motion.div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {item.start}
                      </div>
                      {index === ganttChart.length - 1 && (
                        <div className="text-xs text-muted-foreground mt-1 absolute -right-2">
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
            className="bg-card rounded-xl p-6 shadow-lg border border-border mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3">Process</th>
                    <th className="text-left p-3">Arrival Time</th>
                    <th className="text-left p-3">Burst Time</th>
                    <th className="text-left p-3">Start Time</th>
                    <th className="text-left p-3">End Time</th>
                    <th className="text-left p-3">Waiting Time</th>
                    <th className="text-left p-3">Turnaround Time</th>
                  </tr>
                </thead>
                <tbody>
                  {executedProcesses.map((process, index) => (
                    <motion.tr
                      key={process.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-border/50"
                    >
                      <td className="p-3 font-medium">{process.name}</td>
                      <td className="p-3">{process.arrivalTime}</td>
                      <td className="p-3">{process.burstTime}</td>
                      <td className="p-3">{process.startTime}</td>
                      <td className="p-3">{process.endTime}</td>
                      <td className="p-3">{process.waitingTime}</td>
                      <td className="p-3">{process.turnaroundTime}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Average Waiting Time</p>
                <p className="text-2xl font-bold text-primary">
                  {avgWaitingTime.toFixed(2)}
                </p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Average Turnaround Time
                </p>
                <p className="text-2xl font-bold text-primary">
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

