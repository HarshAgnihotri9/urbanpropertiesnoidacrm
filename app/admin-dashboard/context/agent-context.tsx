"use client";
import { createContext, useContext, useState } from "react";

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface AgentContextType {
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <AgentContext.Provider value={{ agents, setAgents, selectedAgent, setSelectedAgent }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) throw new Error("useAgent must be used within AgentProvider");
  return context;
};
