import "../index.css";

const GameOver = () => {
    return (
        <div className="game-over flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="game-over-header text-4xl md:text-6xl font-bold mb-4 text-center">Game Over</h1>
            <p className="text-lg md:text-xl mb-4 text-center">
                Please, refresh the page in order to try again!
            </p>
            <p className="text-lg md:text-xl mb-4 text-center">
                💡Tip: Attacking or defending at the wrong time will result in damage❗
            </p>
            <button
                className="refresh-btn bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                onClick={() => window.location.reload()}
            >
                Refresh
            </button>
        </div>
    );
};

export default GameOver;