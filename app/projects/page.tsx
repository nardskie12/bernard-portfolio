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

  const avgWaitingTime = executedProcesses.length
    ? executedProcesses.reduce((sum, p) => sum + (p.waitingTime || 0), 0) /
      executedProcesses.length
    : 0;

  const avgTurnaroundTime = executedProcesses.length
    ? executedProcesses.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) /
      executedProcesses.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black pt-20 sm:pt-24 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">

        {/* Header */}
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

        {/* Process Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-2xl p-4 sm:p-6 border border-zinc-700/50 mb-6 sm:mb-8 backdrop-blur-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-white">Processes</h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProcess}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Add Process
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-zinc-700/50">
                  <th className="p-2 text-left text-zinc-300">Process</th>
                  <th className="p-2 text-left text-zinc-300">Arrival</th>
                  <th className="p-2 text-left text-zinc-300">Burst</th>
                  <th className="p-2 text-left text-zinc-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process) => (
                  <tr key={process.id} className="border-b border-zinc-800">
                    <td className="p-2 text-zinc-200">{process.name}</td>
                    <td className="p-2">
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
                        className="w-20 px-2 py-1 bg-zinc-800 text-zinc-200 rounded-md"
                      />
                    </td>
                    <td className="p-2">
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
                        className="w-20 px-2 py-1 bg-zinc-800 text-zinc-200 rounded-md"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleRemoveProcess(process.id)}
                        disabled={isRunning}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-md disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={handleRun}
            disabled={isRunning || processes.length === 0}
            className="px-6 py-3 bg-primary text-white rounded-lg disabled:opacity-50"
          >
            <Play className="inline-block mr-2" /> Run Algorithm
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3 bg-zinc-800 text-white rounded-lg"
          >
            <RotateCcw className="inline-block mr-2" /> Reset
          </button>
        </div>

        {/* Gantt Chart */}
        {ganttChart.length > 0 && (
          <div className="bg-zinc-900/80 p-6 rounded-2xl border border-zinc-700/50 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Gantt Chart</h2>

            <div className="overflow-x-auto">
              <div className="flex items-center gap-4 min-w-max pb-4">

                {ganttChart.map((item, index) => {
                  const isActive = currentTime >= item.start && currentTime < item.end;

                  return (
                    <div key={index} className="relative flex flex-col items-center">
                      <motion.div
                        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                        className={`w-20 h-16 flex items-center justify-center rounded-lg border-2 font-semibold ${
                          isActive
                            ? "bg-primary text-white border-primary"
                            : "bg-zinc-800 text-zinc-300 border-zinc-700"
                        }`}
                      >
                        {item.process}
                      </motion.div>

                      {/* start time */}
                      <div className="text-xs text-zinc-400 mt-1">{item.start}</div>

                      {/* FIX: removed item.end number that appeared at the end */}
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {executedProcesses.length > 0 && (
          <div className="bg-zinc-900/80 p-6 rounded-2xl border border-zinc-700/50">
            <h2 className="text-2xl font-semibold mb-4 text-white">Results</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-zinc-700/50">
                    <th className="p-2 text-left text-zinc-300">Process</th>
                    <th className="p-2 text-left text-zinc-300">Arrival</th>
                    <th className="p-2 text-left text-zinc-300">Burst</th>
                    <th className="p-2 text-left text-zinc-300">Start</th>
                    <th className="p-2 text-left text-zinc-300">End</th>
                    <th className="p-2 text-left text-zinc-300">Waiting</th>
                    <th className="p-2 text-left text-zinc-300">Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {executedProcesses.map((p) => (
                    <tr key={p.id} className="border-b border-zinc-800">
                      <td className="p-2 text-zinc-200">{p.name}</td>
                      <td className="p-2 text-zinc-300">{p.arrivalTime}</td>
                      <td className="p-2 text-zinc-300">{p.burstTime}</td>
                      <td className="p-2 text-zinc-300">{p.startTime}</td>
                      <td className="p-2 text-zinc-300">{p.endTime}</td>
                      <td className="p-2 text-zinc-300">{p.waitingTime}</td>
                      <td className="p-2 text-zinc-300">{p.turnaroundTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/20 rounded-lg p-4">
                <p className="text-sm text-zinc-400 mb-1">Average Waiting Time</p>
                <p className="text-2xl font-bold text-primary">{avgWaitingTime.toFixed(2)}</p>
              </div>

              <div className="bg-primary/20 rounded-lg p-4">
                <p className="text-sm text-zinc-400 mb-1">Average Turnaround Time</p>
                <p className="text-2xl font-bold text-primary">{avgTurnaroundTime.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
