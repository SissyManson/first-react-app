import React from "react";

const styles = {
  backgroundColor: "rgb(52,58,64)",
  color: "white",
  height: "3.5rem",
  width: "100%",
  position: "fixed",
  padding: "1rem",
  bottom: 0,
};

export function Footer() {
  return (
    <footer>
      <div className="footer" style={styles}>
        <p>Made by: Stoyanka Dancheva</p>
      </div>
    </footer>
  );
}
