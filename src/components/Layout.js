import React, {useEffect, useState, useRef} from 'react';

import Item from './Item';
import classes from './Layout.module.css';

const Game = () => {
    const currRowIndex = useRef(0);
    const currColumnIndex = useRef(1);
    const [speed, setSpeed] = useState(1000);
    const [food, setFood] = useState(null);
    const [score, setScore] = useState(0);
    const [direction, setDirection] = useState("right");
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [place, setPlace] = useState(
        [
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
        ]
    );
    const refSnake = useRef([[0,0],[0,1]])
    

    useEffect(() => {
        const keys = (event) => {
            console.log(direction);
            if(event.key === "ArrowUp") {
                if(direction !== "down") { 
                    setDirection("up");
                }
            } else if(event.key === "ArrowDown") {
                if(direction !== "up") {
                    setDirection("down");
                }
            } else if(event.key === "ArrowLeft") {
                if(direction !== "right") {
                    setDirection("left");
                }
            } else if(event.key === "ArrowRight") {
                if(direction !== "left") {
                    setDirection("right");
                }
            }
        }

        document.removeEventListener("keydown", keys);
        document.addEventListener("keydown", keys);
    },[direction])

    useEffect(() => {
        const foodGenerator = () => {
            let row = Math.floor(Math.random() * place.length);
            let column = Math.floor(Math.random() * place.length);
            let inSnake = false;

            for(let part of refSnake.current) {
                if(part[0] === row && part[1] === column) {
                    inSnake = true;
                    break;
                }
            }

            if(inSnake) {
                foodGenerator();
            } else {
                setFood([row, column]);
            }
        };

        foodGenerator();
    },[score])
    
    useEffect(() => {
            let timer;
            let inSnake = false;

            for(let part of refSnake.current.slice(0,refSnake.current.length - 2)) {
                if(part[0] === currRowIndex.current && part[1] === currColumnIndex.current) {
                    inSnake = true;
                    break;
                }
            }

            if(inSnake) {
                setGameOver(true);
            }

            if(direction === "right") {
                timer = setTimeout(()=> {
                    if(currColumnIndex.current === place.length - 1) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex.current, 0]);
                        if(food) {
                            if(currRowIndex.current === food[0] && currColumnIndex.current === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 30);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
            
                        currColumnIndex.current = 0;
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex.current, currColumnIndex.current + 1]);
                        if(food) {
                            if(currRowIndex.current === food[0] && currColumnIndex.current === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 30);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        
                        refSnake.current = newRefSnake;
                    
                        currColumnIndex.current = currColumnIndex.current + 1;
                    }
    
                    setTime(time + 1);
                }, speed)

            } else if(direction === "left") {
                timer = setTimeout(()=> {
                    if(currColumnIndex.current === 0) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex.current, place.length - 1]);
                        if(food) {
                            if(currRowIndex.current === food[0] && currColumnIndex.current === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 30);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        
                        refSnake.current = newRefSnake;
            
                        currColumnIndex.current = place.length - 1;

                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex.current, currColumnIndex.current - 1]);
                        if(food) {
                            if(currRowIndex.current === food[0] && currColumnIndex.current === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 30);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
                    
                        currColumnIndex.current = currColumnIndex.current - 1;
                    }
    
                    setTime(time + 1);
                }, speed)

            } else if(direction === "up") {
                timer = setTimeout(()=> {
                    if(currRowIndex.current === 0) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([place.length - 1, currColumnIndex.current]);
                        if(food) {
                            if(currRowIndex.current === food[0] && currColumnIndex.current === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 30);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
            
                        currRowIndex.current = place.length - 1;
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex.current - 1, currColumnIndex.current]);
                        if(food) {
                            if(currRowIndex.current === food[0] && currColumnIndex.current === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 30);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
                    
                        currRowIndex.current = currRowIndex.current - 1;
                    }
    
                    setTime(time + 1);
                }, speed)

            } else if(direction === "down") {
                timer = setTimeout(()=> {
                    if(currRowIndex.current === place.length - 1) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([0, currColumnIndex.current]);
                        if(food) {
                            if(currRowIndex.current === food[0] && currColumnIndex.current === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 30);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
            
                        currRowIndex.current = 0;
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex.current + 1, currColumnIndex.current]);
                        if(food) {
                            if(currRowIndex.current === food[0] && currColumnIndex.current === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 30);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
                    
                        currRowIndex.current = currRowIndex.current + 1;
                    }
    
                    setTime(time + 1);
                }, speed)                
            }
            
            return () => {
                clearTimeout(timer);
            }

    },[time, direction, refSnake])

    const gameReset = () => {
        currRowIndex.current = 0;
        currColumnIndex.current = 1;
        setSpeed(1000);
        setFood(null);
        setScore(0);
        setDirection("right");
        setTime(0);
        setGameOver(false);
        setPlace(
            [
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0],
            ]
        );
        refSnake.current = [[0,0],[0,1]];
    }

    return (
        <div className={classes.layout}>
            <div className={classes.scoreboard}>
                <h1 className={classes.score}>SCORE {score}</h1>
            </div>
            <div className={classes.game}>
            {gameOver ? <div className={classes.gameoverscreen}>
                <h1>GAME OVER</h1>
                <h2>FINAL SCORE {score}</h2>
                <button onClick={gameReset}>RESTART</button>
            </div>: 
            place.map((row,index) => {
                    return (<div className={classes.row} key={index}>
                        {row.map((item,iindex) => {
                            for(let part of refSnake.current) {
                                if(part[0] === index && part[1] === iindex) {
                                    return <Item active={true} key={iindex}/>
                                } else if(food) {
                                    if(food[0] === index && food[1] === iindex) {
                                        return <Item active={true} key={iindex}/>
                                    }
                                }
                            }
                            return <Item active={false} key={iindex}/>
                        })}
                    </div>)
                })}
            {} 
            </div>         
        </div>
    )
}

export default Game;