/* eslint-disable react/prop-types */
export const Upgrades = ({
  setHasPressedUpgrades,
  bitblops,
  upgradeHealth,
  upgradeStrength,
  strengthUpgradeCost,
  healthUpgradeCost,
  playerHealth,
  playerStrength,
}) => {
  return (
    <div className="container mx-auto flex flex-col upgrade items-center justify-around h-100 arcade-font">
      <h3 className="text-3xl text-center underline">Upgrades</h3>
      <p>Current tokens: {bitblops} BITBLOPS</p>
      <p>👾Player</p>
      <div className="flex flex-col items-center">
        <div className="player-img-wrapper">
          <div className="player-img"></div>
        </div>
        <div className="upgrade-card">
          <h3 className="text-2xl font-bold">
            ❤️Current Health: {playerHealth}
          </h3>
          <p className="text-lg">+ {healthUpgradeCost / 10} Health</p>
          <button
            className="bg-slate-300 active:translate-y-[3px] arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors mt-4"
            onClick={upgradeHealth}
          >
            Upgrade for {healthUpgradeCost} BITBLOPS
          </button>
        </div>

        <div className="upgrade-card">
          <h3 className="text-2xl font-bold">
            🗡️Current Damage: {playerStrength}
          </h3>
          <p className="text-lg">+{strengthUpgradeCost / 10} Damage</p>
          <button
            className="bg-slate-300 active:translate-y-[3px] arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors mt-4"
            onClick={upgradeStrength}
          >
            Upgrade for {strengthUpgradeCost} BITBLOPS
          </button>
        </div>
      </div>
      <button className="bg-slate-300 arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors mt-4">
        BUY BITBLOPS💰
      </button>
      <button
        className="bg-slate-300 arcade-font py-2 px-4 rounded hover:bg-slate-500 transition-colors mt-4"
        onClick={() => setHasPressedUpgrades(false)}
      >
        ← Exit
      </button>
    </div>
  );
};
