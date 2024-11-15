import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import "./MapBase.css";
import Typewriter from "./Typewritter";

const SafeArea = ({
                      player,
                      isUp,
                      isDown,
                      isLeft,
                      isRight,
                      isModalOpen,
                      talkCounter,
                      setTalkCounter,
                      showInteractButton,
                      setShowInteractButton
                  }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const dialogues = ["Welcome to the safe area, soldier! Thank you for saving me! I was able to run and hide from the robot invaders. This is my sanctuary, you can rest here and prepare for your next mission. Remember, the fate of the galaxy is in your hands!", "You can rest here and prepare for your next mission. Remember, the fate of the galaxy is in your hands!", "Also, don't forget to finish your quests in order to get rewards!", "There are more things to be done, refresh the page and continue your journey!"];

    const size = 10;
    const createMapMatrix = () => {
        const matrix = Array.from({length: size}, () => Array(size).fill(0));

        for (let i = 0; i < size; i++) {
            // First and last column
            matrix[i][0] = 1;
            matrix[i][size - 1] = 9;
        }
        for (let j = 0; j < size; j++) {
            // First and last row
            matrix[0][j] = 8;
            matrix[size - 1][j] = 7;
        }
        // define corners of border
        matrix[0][0] = 11;
        matrix[0][size - 1] = 12;
        matrix[size - 1][0] = 10;
        matrix[size - 1][size - 1] = 6;
        // Player
        matrix[player.y][player.x] = 2;

        // solid blocks-safe area-npc and tower
        const solidBlocks = [[1, 3, 4], [2, 3, 13], [2, 6, 13], [1, 6, 4], [1, 4, 14], [1, 5, 15], [6, 6, 13], [5, 6, 4], [6, 3, 13], [5, 3, 4]];
        solidBlocks.forEach(([x, y, value]) => matrix[x][y] = value);

        // water decoration-first column
        for (let i = 1; i <= 8; i++) matrix[i][1] = 16;

        // water decoration-last column
        for (let i = 1; i <= 8; i++) matrix[i][8] = 16;

        // water decoration-last row
        for (let i = 2; i <= 8; i++) matrix[8][i] = 16;

        return matrix;
    };

    const matrix = createMapMatrix();

    const renderTable = (matrix) => {
        const classNames = {
            1: "safe-zone-border-pipeline",
            2: (isUp ? "player-up" : "") || (isDown ? "player-down" : "") || (isLeft ? "player-left" : "") || (isRight ? "player-right" : "") || "player",
            11: "safe-zone-border-pipeline-left-up",
            7: "safe-zone-border-pipeline-bottom",
            8: "safe-zone-border-pipeline-top",
            9: "safe-zone-border-pipeline-right",
            12: "safe-zone-border-pipeline-right-up",
            10: "safe-zone-border-pipeline-left-bottom",
            6: "safe-zone-border-pipeline-right-bottom",
            4: "tower-upper",
            13: "tower-lower",
            14: "xeno-npc",
            15: "egg-decoration",
            16: "water-decoration"
        };

        return matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                    <div
                        key={colIndex}
                        className={`cell safe-zone-tile ${classNames[cell] || ""}`}
                    ></div>
                ))}
            </div>
        ));
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isModalOpen]);

    const handleInteraction = () => {
        if (player.x === 4 && player.y === 2) {
            setModalOpen(true);
            setTalkCounter((prevCounter) => prevCounter + 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === " " && player.x === 4 && player.y === 2) {
                handleInteraction();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [player]);

    useEffect(() => {
        if (player.x === 4 && player.y === 2) {
            setShowInteractButton(true);
        } else {
            setShowInteractButton(false);
        }
    }, [player]);

    return (<div className="map-base-container">
        <div className="map-base-table">{renderTable(matrix)}</div>
        {modalOpen && (<div className="modal-safe-area">
            <div className="modal-content-safe-area">
                <div className="alien-npc-box">
                    <div className="alien-npc-wrapper">
                        <h2 className="alien-npc-name">Alien General X.E.N.O</h2>
                        <div className="alien-npc-image"></div>
                        <div className="alien-npc-dialogue">
                            <Typewriter
                                text={talkCounter >= 3 ?
                                    dialogues[3] :
                                    talkCounter >= 2 ?
                                        dialogues[2] :
                                        talkCounter >= 1 ?
                                            dialogues[1] :
                                            dialogues[0]
                                }
                                speed={50}
                                wordsPerLine={20}
                            />
                        </div>
                    </div>
                    <button
                        className="close-modal-btn"
                        onClick={() => {
                            setModalOpen(!modalOpen);
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>)}
        {showInteractButton && (<button
            className="bg-slate-300 start-btn arcade-font hover:bg-slate-400 transition-colors font-bold py-2 px-4 border-b-4 border-slate-400 hover:border-slate-600 rounded"
            onClick={handleInteraction}
        >
            Talk to General X.E.N.O👾
        </button>)}
    </div>);
};

const mapStateToProps = (state) => ({
    player: state.player.player,
    safeAreaBlocks: state.player.safeAreaBlocks,
    isSafeArea: state.player.isSafeArea,
});

export default connect(mapStateToProps)(SafeArea);