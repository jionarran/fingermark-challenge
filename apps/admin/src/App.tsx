import * as React from "react";
import "./App.css";
import { CounterButton, NewTabLink } from "ui";
import { connect } from "socket.io-client";

function App() {
  const socket = connect("http://localhost:3333");

  socket.on("refresh", (socket) => {
    console.log("socket", socket);
  });

  return (
    <div className="container">
      <h1 className="title">
        Admin <br />
        <span>Kitchen Sink</span>
      </h1>
      <CounterButton />
      <p className="description">
        Built With{" "}
        <NewTabLink href="https://turbo.build/repo">Turborepo</NewTabLink> +{" "}
        <NewTabLink href="https://vitejs.dev/">Vite</NewTabLink>
      </p>
    </div>
  );
}

export default App;
