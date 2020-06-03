import React from "react";

const styles = {
  backgroundColor: "rgb(52,58,64)",
  color: "white",
  width: "100%",
  position: "fixed",
  bottom: 0,
  left: 0,
 paddingTop:"10px"
};

export function Footer() {
  return (
    <footer style={styles}>
      <div className="footer">
        <p>Made by: Stoyanka Dancheva</p>
      </div>
    </footer>
  );
}
