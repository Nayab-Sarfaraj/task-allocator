import React, { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [agents, setAgents] = useState([]); // State to store agents and their tasks

  // Function to fetch agent data from the backend
  const fetchAgents = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/get-all-agent",
        { withCredentials: true } // Ensures cookies are sent with request if needed
      );
      setAgents(data.agents); // Update state with fetched agents
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  // Fetch agents when the component mounts
  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      \<h1 className="text-2xl font-bold mb-4">Task Allocation</h1>
      {/* Show loading message while fetching agents */}
      {agents.length === 0 ? (
        <p>Loading agents...</p>
      ) : (
        <div className="space-y-4">
          {/* Loop through agents and display their details */}
          {agents.map((agent) => (
            <div key={agent.id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-lg font-semibold capitalize">{agent.name}</h2>

              <p className="text-gray-600">
                {agent.email} {"     "} {agent.phone}
              </p>

              {/* Assigned Tasks Section */}
              <h3 className="mt-2 font-medium">Assigned Tasks:</h3>
              <ul className="list-disc pl-5">
                {agent.tasks.length > 0 ? (
                  // Loop through assigned tasks
                  agent.tasks.map((task, index) => (
                    <li key={index}>
                      {task.FirstName} - {task.Phone} - {task.Notes}
                    </li>
                  ))
                ) : (
                  // Show message if no tasks are assigned
                  <p className="text-gray-500">No tasks assigned</p>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;
