// Upgrades.jsx
export const Upgrades = ({setHasPressedUpgrades}) => {
    return (
        <>
            <div className="container mx-auto">
                <h2 className="text-3xl text-center font-bold">Upgrades</h2>
                <div className="flex flex-wrap justify-center items-center">
                    <div className="upgrade-card">
                        <h3 className="text-2xl font-bold">Health</h3>
                        <p className="text-lg">+10% Health</p>
                        <button className="upgrade-btn">Upgrade</button>
                    </div>
                    <div className="upgrade-card">
                        <h3 className="text-2xl font-bold">Damage</h3>
                        <p className="text-lg">+10% Damage</p>
                        <button className="upgrade-btn">Upgrade</button>
                    </div>
                    <div className="upgrade-card">
                        <h3 className="text-2xl font-bold">Speed</h3>
                        <p className="text-lg">+10% Speed</p>
                        <button className="upgrade-btn">Upgrade</button>
                    </div>
                </div>
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