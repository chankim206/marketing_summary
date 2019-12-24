import React, { useState, useEffect } from "react";
import "./App.css";
import CardContainer from "./components/CardContainer";

function App() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await httpData("/api/users");
      setUsers(response);
    };
    const fetchLogs = async () => {
      const response = await httpData("/api/logs");
      setLogs(response);
    };

    fetchUsers();
    fetchLogs();
  }, []);

  async function httpData(url = "") {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer"
    });

    return await response.json();
  }

  return (
    <div className="App">
      {logs.length > 0 && <CardContainer users={users} logs={logs} />}
    </div>
  );
}

export default App;
