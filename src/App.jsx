import {useEffect, useState} from "react";
import {Provider} from "react-redux";
import PlayerController from "./components/PlayerController";
import MapBase from "./components/MapBase";
import NPCController from "./components/NPCController";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import StarterScreen from "./components/StarterScreen";
import {Upgrades} from "./components/Upgrades.jsx";
import store from "./store/store";
import theme from "./sounds/main-theme.mp3";
import battle from "./sounds/battle_theme.mp3";
import "./index.css";

const App = () => {
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

    const toggle = () => setPlaying(!playing);

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
    }, [isModalOpen]);

    if (hasPressedUpgrades) {
        return (
            <>
                <Header/>
                <Upgrades setHasPressedUpgrades={setHasPressedUpgrades}/>
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
                    <Header/>
                    <StarterScreen
                        setHasEntered={setHasEntered}
                        setHasPressedUpgrade={setHasPressedUpgrades}
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
                {playerHealth > 0 && <Header/>}
                {playerHealth > 0 ? (
                    <main>
                        <div className="game-container">
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
                    <GameOver/>
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