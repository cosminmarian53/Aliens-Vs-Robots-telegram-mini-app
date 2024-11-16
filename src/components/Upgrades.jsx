// Upgrades.jsx
import React from "react";

export const Upgrades = ({setHasPressedUpgrades}) => {
    return (
        <>
            <div className="container mx-auto flex flex-col upgrade items-center justify-around h-100 arcade-font">
                <h3 className="text-3xl text-center underline">Upgrades</h3>
                <p>Current tokens: 0 BITBLOPS</p>
                <p>👾Player</p>
                <div className="flex flex-col items-center">
                    <div className="player-img-wrapper">
                        <div className="player-img"></div>
                    </div>
                    <div className="upgrade-card">
                        <h3 className="text-2xl font-bold">❤️Health</h3>
                        <p className="text-lg">+10% Health</p>
                        <button
                            className="bg-slate-300 active:translate-y-[3px] arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors mt-4"
                        >Upgrade for 10 BITBLOPS
                        </button>
                    </div>

                    <div className="upgrade-card">
                        <h3 className="text-2xl font-bold">🗡️Damage</h3>
                        <p className="text-lg">+10% Damage</p>
                        <button
                            className="bg-slate-300 active:translate-y-[3px] arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors mt-4"
                        >Upgrade for 10 BITBLOPS
                        </button>
                    </div>
                </div>
                <button
                    className="bg-slate-300 arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors mt-4">BUY
                    BITBLOPS💰
                </button>
                <button
                    className="bg-slate-300 arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors mt-4"
                    onClick={() => setHasPressedUpgrades(false)}
                >
                    ← Exit
                </button>
            </div>
        </>
    );
};