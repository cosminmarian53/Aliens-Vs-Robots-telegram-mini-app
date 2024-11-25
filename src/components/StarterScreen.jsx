import {useState} from "react";
import alienPlayerStarter from "../assets/alien front(move+blink).gif";
import "../index.css";

// eslint-disable-next-line react/prop-types
function StarterScreen({setHasEntered, setHasPressedUpgrade, first_name}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="starter-screen">
            <h1>Welcome to Aliens vs. Robots, {first_name}❗</h1>
            <button
                className="instructions-btn bg-slate-300 text-white py-2 px-4 rounded hover:bg-slate-500 transition-colors"
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Instructions
            </button>
            {isModalOpen && (
                <div className="modal fixed inset-0 flex items-center justify-center">
                    <div
                        className="starter-modal-content bg-white p-4 rounded-lg shadow-lg w-full h-full overflow-y-auto">
                        <div className="starter-modal-wrapper h-full">
                            <h2 className="text-xl font-bold mb-4">Instructions:</h2>
                            <p className="mb-4">
                                Welcome to Aliens vs. Robots! <br/>
                                <span>
                        This is <b className="underline">you</b>:<br/>
                        <img
                            src={alienPlayerStarter}
                            className="w-16 h-16 mx-auto my-2"
                            alt="Alien Player"
                        />
                    </span>
                            </p>
                            <h2>How to play:</h2>
                            <p className="mb-2">I</p>
                            <p className="mb-4">
                                - You can only attack in the given timeframe window (3 seconds)
                            </p>
                            <p className="mb-4">- You can only parry when the remaining time is 0.3s and under.</p>
                            <p className="mb-4">
                                - Upon successfully parrying an enemy's attack you will <br/>
                                <b>recover</b> a small percentage of your health, <br/>
                                and deal a percentage of the enemy's health as damage
                            </p>
                            <button
                                className="close-modal-btn arcade-font"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <p className="text-3xl font-bold">Defeat the boss to win the game(and get amazing rewards!)</p>
            <p className="text-3xl font-bold">Upgrade your character to increase your chances of winning❗</p>
            <button
                className="bg-slate-300 upgrade-btn arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors"
                onClick={() => {
                    setHasPressedUpgrade(true);
                }}>
                Upgrades
            </button>
            <p className="text-3xl font-bold">
                Press the button bellow in order to start the game❗
            </p>
            <button
                className="bg-slate-300 start-btn arcade-font hover:bg-slate-400 transition-colors font-bold py-2 px-4 border-b-4 border-slate-400 hover:border-slate-600 rounded"
                onClick={() => {
                    setHasEntered(true);
                }}>

                START🔫
            </button>
            <br></br>
        </div>
    );
}

export default StarterScreen;