import React from "react";
import "../index.css";

const Footer = ({isModalOpen, playerHealth, playing, toggle, currentTheme}) => {
    return (
        <footer>
            <div>
                <p>
                    {playing ? `🔊Now playing: ${currentTheme}` : "🔇Music is paused"}
                </p>
                <button type="submit" className="sound-btn bg-slate-300 hover:bg-slate-400 transition-colors"
                        onClick={toggle}>
                    {playing ? "Pause" : "Play"}
                </button>
            </div>
            <p>
                Made with 💖
                <span>by cosminmarian53</span>
            </p>
        </footer>
    );
};

export default Footer;