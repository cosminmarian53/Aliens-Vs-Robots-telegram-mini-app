import {useState, useEffect} from "react";
import PlayerController from "./components/PlayerController";
import MapBase from "./components/MapBase";
import NPCController from "./components/NPCController";
import Footer from "./components/Footer";
import {Provider} from "react-redux";
import store from "./store/store";
import "./index.css";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import StarterScreen from "./components/StarterScreen";
import theme from "./sounds/main-theme.mp3";
import battle from "./sounds/battle_theme.mp3";

const App = () => {
    // Define all states
    const [isUp, setIsUp] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playerHealth, setPlayerHealth] = useState(100); // Assuming initial health is 100
    const [enemyHealth, setEnemyHealth] = useState(1); // Assuming initial health is 100
    const [playerStrength, setPlayerStrength] = useState(10); // Assuming initial strength is 10
    const [enemyStrength, setEnemyStrength] = useState(10); // Assuming initial strength is 10
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [bossHealth, setBossHealth] = useState(2);
    const [bossStrength] = useState(20);
    const [hasEntered, setHasEntered] = useState(false);
    const [talkCounter, setTalkCounter] = useState(0);
    const [enemyDeathCounter, setEnemyDeathCounter] = useState(0);
    const [currentEnemy, setCurrentEnemy] = useState(1);
    const isBoss = currentEnemy !== 1;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    const [audio, setAudio] = useState(new Audio(theme));
    const [playing, setPlaying] = useState(false);
    const [currentTheme, setCurrentTheme] = useState("Main Theme");

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                setHasEntered(true);
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
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
        newAudio.loop = true; // Add this line to enable audio looping
        setAudio(newAudio);
        setCurrentTheme(isModalOpen ? "Battle Theme" : "Main Theme");
        if (playing) {
            newAudio.play();
        }
    }, [isModalOpen]);

    if (!hasEntered) {
        return (
            <>
                <div className="player-starter-page">
                    <Header/>
                    <StarterScreen
                        hasEntered={hasEntered}
                        setHasEntered={setHasEntered}
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
            <>
                <div className="App">
                    {playerHealth > 0 && <Header/>}
                    {playerHealth > 0 ? (
                        <main>
                            <div className="game-container">
                                {isMobile && (
                                    <div className="arena-and-npc-stats">
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
                                            bossStrength={bossStrength}
                                            isBoss={isBoss}
                                            currentEnemy={currentEnemy}
                                            setCurrentEnemy={setCurrentEnemy}
                                            talkCounter={talkCounter}
                                            setTalkCounter={setTalkCounter}
                                            enemyDeathCounter={enemyDeathCounter}
                                            setEnemyDeathCounter={setEnemyDeathCounter}
                                        />
                                    </div>
                                )}

                                {!isMobile && (
                                    <>
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
                                            bossStrength={bossStrength}
                                            isBoss={isBoss}
                                            currentEnemy={currentEnemy}
                                            setCurrentEnemy={setCurrentEnemy}
                                            talkCounter={talkCounter}
                                            setTalkCounter={setTalkCounter}
                                            enemyDeathCounter={enemyDeathCounter}
                                            setEnemyDeathCounter={setEnemyDeathCounter}
                                        />
                                    </>
                                )}
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
                                isBoss={isBoss}
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
            </>
        </Provider>
    );
};

export default App;