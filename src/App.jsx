import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import PlayerController from "./components/PlayerController";
import MapBase from "./components/MapBase";
import NPCController from "./components/NPCController";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import StarterScreen from "./components/StarterScreen";
import { Upgrades } from "./components/Upgrades.jsx";
import store from "./store/store";
import theme from "./sounds/main-theme.mp3";
import battle from "./sounds/battle_theme.mp3";
import "./index.css";
import WebApp from "@twa-dev/sdk";

const App = () => {
  // ------------------Variables----------------
  const first_name = WebApp.initDataUnsafe.user.first_name;
  // ------------------ State ------------------
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(1);
  const [playerStrength, setPlayerStrength] = useState(10);
  const [enemyStrength, setEnemyStrength] = useState(10);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [bossHealth, setBossHealth] = useState(2);
  const [hasEntered, setHasEntered] = useState(false);
  const [hasPressedUpgrades, setHasPressedUpgrades] = useState(false);
  const [talkCounter, setTalkCounter] = useState(0);
  const [enemyDeathCounter, setEnemyDeathCounter] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [showInteractButton, setShowInteractButton] = useState(false);
  const [audio, setAudio] = useState(new Audio(theme));
  const [playing, setPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Main Theme");
  const [bitblops, setBitblops] = useState(0);
  const [healthUpgradeCost, setHealthUpgradeCost] = useState(10);
  const [strengthUpgradeCost, setStrengthUpgradeCost] = useState(15);
  const [healthUpgradeValue, setHealthUpgradeValue] = useState(0); // Track health upgrade value

  // ------------------ Functions ------------------
  const toggle = () => setPlaying(!playing);

  const upgradeHealth = () => {
    if (bitblops >= healthUpgradeCost) {
      const upgradeValue = Math.floor(playerHealth * (healthUpgradeCost / 100));
      setPlayerHealth(playerHealth + upgradeValue);
      setHealthUpgradeValue(healthUpgradeValue + upgradeValue); // Track total upgrade value
      setBitblops(bitblops - healthUpgradeCost);
      setHealthUpgradeCost(healthUpgradeCost + 10);
    }
  };

  const upgradeStrength = () => {
    if (bitblops >= strengthUpgradeCost) {
      setPlayerStrength(playerStrength + Math.floor(strengthUpgradeCost / 10));
      setBitblops(bitblops - strengthUpgradeCost);
      setStrengthUpgradeCost(strengthUpgradeCost + 10);
    }
  };

  const resetPlayerHealth = () => {
    setPlayerHealth(100 + healthUpgradeValue); // Reset to base health plus upgrades
  };

  // ------------------ Effects ------------------
  useEffect(() => {
    const loadStorage = () => {
      WebApp.CloudStorage.getItem("bitblops", (error, data) => {
        if (error) {
          console.error("Error loading bitblops", error);
        } else if (data) {
          setBitblops(parseInt(data, 10));
        }
      });

      WebApp.CloudStorage.getItem("playerHealth", (error, data) => {
        if (error) {
          console.error("Error loading playerHealth", error);
        } else if (data) {
          setPlayerHealth(parseInt(data, 10));
        }
      });

      WebApp.CloudStorage.getItem("playerStrength", (error, data) => {
        if (error) {
          console.error("Error loading playerStrength", error);
        } else if (data) {
          setPlayerStrength(parseInt(data, 10));
        }
      });

      WebApp.CloudStorage.getItem("strengthUpgradeCost", (error, data) => {
        if (error) {
          console.error("Error loading upgradeCost", error);
        } else if (data) {
          setStrengthUpgradeCost(parseInt(data, 10));
        }
      });

      WebApp.CloudStorage.getItem("healthUpgradeCost", (error, data) => {
        if (error) {
          console.error("Error loading upgradeCost", error);
        } else if (data) {
          setHealthUpgradeCost(parseInt(data, 10));
        }
      });

      WebApp.CloudStorage.getItem("healthUpgradeValue", (error, data) => {
        if (error) {
          console.error("Error loading healthUpgradeValue", error);
        } else if (data) {
          setHealthUpgradeValue(parseInt(data, 10));
        }
      });
    };

    loadStorage();
  }, []);

  useEffect(() => {
    WebApp.CloudStorage.setItem(
      "bitblops",
      bitblops.toString(),
      (error, success) => {
        if (error) {
          console.error("Error saving bitblops", error);
        } else if (success) {
          console.log("Bitblops saved successfully!");
        }
      }
    );
  }, [bitblops]);

  useEffect(() => {
    WebApp.CloudStorage.setItem(
      "playerHealth",
      playerHealth.toString(),
      (error, success) => {
        if (error) {
          console.error("Error saving playerHealth", error);
        } else if (success) {
          console.log("Player health saved successfully!");
        }
      }
    );
  }, [playerHealth]);

  useEffect(() => {
    WebApp.CloudStorage.setItem(
      "playerStrength",
      playerStrength.toString(),
      (error, success) => {
        if (error) {
          console.error("Error saving playerStrength", error);
        } else if (success) {
          console.log("Player strength saved successfully!");
        }
      }
    );
  }, [playerStrength]);

  useEffect(() => {
    WebApp.CloudStorage.setItem(
      "strengthUpgradeCost",
      strengthUpgradeCost.toString(),
      (error, success) => {
        if (error) {
          console.error("Error saving upgradeCost", error);
        } else if (success) {
          console.log("Upgrade cost saved successfully!");
        }
      }
    );
  }, [strengthUpgradeCost]);

  useEffect(() => {
    WebApp.CloudStorage.setItem(
      "healthUpgradeCost",
      healthUpgradeCost.toString(),
      (error, success) => {
        if (error) {
          console.error("Error saving healthUpgradeCost", error);
        } else if (success) {
          console.log("Upgrade cost saved successfully!");
        }
      }
    );
  }, [healthUpgradeCost]);

  useEffect(() => {
    WebApp.CloudStorage.setItem(
      "healthUpgradeValue",
      healthUpgradeValue.toString(),
      (error, success) => {
        if (error) {
          console.error("Error saving healthUpgradeValue", error);
        } else if (success) {
          console.log("Health upgrade value saved successfully!");
        }
      }
    );
  }, [healthUpgradeValue]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") setHasEntered(true);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (playing) {
      audio.play();
      audio.volume = 0.3;
    } else {
      audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    audio.pause();
    const newAudio = new Audio(isModalOpen ? battle : theme);
    newAudio.volume = 0.3;
    newAudio.loop = true;
    setAudio(newAudio);
    setCurrentTheme(isModalOpen ? "Battle Theme" : "Main Theme");
    if (playing) newAudio.play();
  }, [isModalOpen, audio, playing]);

  useEffect(() => {
    if (playerHealth <= 0) {
      resetPlayerHealth();
    }
  }, [playerHealth]);

  if (hasPressedUpgrades) {
    return (
      <>
        <Header />
        <Upgrades
          setHasPressedUpgrades={setHasPressedUpgrades}
          bitblops={bitblops}
          upgradeHealth={upgradeHealth}
          upgradeStrength={upgradeStrength}
          strengthUpgradeCost={strengthUpgradeCost}
          healthUpgradeCost={healthUpgradeCost}
          playerHealth={playerHealth}
          playerStrength={playerStrength}
        />
        <Footer
          isModalOpen={isModalOpen}
          playerHealth={playerHealth}
          playing={playing}
          toggle={toggle}
          currentTheme={currentTheme}
        />
      </>
    );
  }

  if (!hasEntered) {
    return (
      <>
        <div className="player-starter-page">
          <Header />
          <StarterScreen
            setHasEntered={setHasEntered}
            setHasPressedUpgrade={setHasPressedUpgrades}
            first_name={first_name}
          />
          <Footer
            isModalOpen={isModalOpen}
            playerHealth={playerHealth}
            playing={playing}
            toggle={toggle}
            currentTheme={currentTheme}
          />
        </div>
      </>
    );
  }

  return (
    <Provider store={store}>
      <div className="App">
        {playerHealth > 0 && <Header />}
        {playerHealth > 0 ? (
          <main>
            <div className="game-container">
              <div className="bitblops">
                <p>Bitblops: {bitblops}</p>
              </div>
              <MapBase
                isDown={isDown}
                isUp={isUp}
                isLeft={isLeft}
                isRight={isRight}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                enemyHealth={enemyHealth}
                setEnemyHealth={setEnemyHealth}
                playerHealth={playerHealth}
                setPlayerHealth={setPlayerHealth}
                playerStrength={playerStrength}
                setPlayerStrength={setPlayerStrength}
                enemyStrength={enemyStrength}
                setEnemyStrength={setEnemyStrength}
                isDoorOpen={isDoorOpen}
                setIsDoorOpen={setIsDoorOpen}
                bossHealth={bossHealth}
                setBossHealth={setBossHealth}
                isBoss={currentEnemy !== 1}
                currentEnemy={currentEnemy}
                setCurrentEnemy={setCurrentEnemy}
                talkCounter={talkCounter}
                setTalkCounter={setTalkCounter}
                enemyDeathCounter={enemyDeathCounter}
                setEnemyDeathCounter={setEnemyDeathCounter}
                showInteractButton={showInteractButton}
                setShowInteractButton={setShowInteractButton}
                setBitblops={setBitblops}
                resetPlayerHealth={resetPlayerHealth}
              />
            </div>
            <PlayerController
              setIsDown={setIsDown}
              isDown={isDown}
              isUp={isUp}
              setIsUp={setIsUp}
              isLeft={isLeft}
              setIsLeft={setIsLeft}
              isRight={isRight}
              setIsRight={setIsRight}
              isModalOpen={isModalOpen}
            />
            <NPCController
              isModalOpen={isModalOpen}
              bossHealth={bossHealth}
              isBoss={currentEnemy !== 1}
            />
          </main>
        ) : (
          <GameOver resetPlayerHealth={resetPlayerHealth} />
        )}
        <Footer
          isModalOpen={isModalOpen}
          playerHealth={playerHealth}
          playing={playing}
          toggle={toggle}
          currentTheme={currentTheme}
        />
      </div>
    </Provider>
  );
};

export default App;
