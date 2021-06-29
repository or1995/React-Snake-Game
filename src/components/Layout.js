import React, {useEffect, useState, useRef} from 'react';

import Item from './Item';
import classes from './Layout.module.css';

const Game = () => {
    const [currRowIndex, setCurrRowIndex] = useState(0);
    const [currColumnIndex, setCurrColumnIndex] = useState(1);
    const [speed, setSpeed] = useState(1000);
    const [food, setFood] = useState(null);
    const [score, setScore] = useState(0);
    const [direction, setDirection] = useState("right");
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [place, setPlace] = useState(
        [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ]
    );
    const refSnake = useRef([[0,0],[0,1]])
    

    useEffect(() => {
        document.addEventListener("keydown", (event) => {
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
        })
    },[direction])

    useEffect(() => {
        const foodGenerator = () => {
            let row = Math.floor(Math.random() * place.length);
            let column = Math.floor(Math.random() * place.length);
            let inSnake = refSnake.current.find(part => {
                return part === [row, column];
            })

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
            if(direction === "right") {
                timer = setTimeout(()=> {
                    if(currColumnIndex === place.length - 1) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex, 0]);
                        if(food) {
                            if(currRowIndex === food[0] && currColumnIndex === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 100);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
            
                        setCurrColumnIndex(prevColumnIndex => {
                            return 0;
                        });
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex, currColumnIndex + 1]);
                        if(food) {
                            if(currRowIndex === food[0] && currColumnIndex === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 100);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        
                        refSnake.current = newRefSnake;
                    
                        setCurrColumnIndex(prevColumnIndex => {
                            return prevColumnIndex + 1
                        });
                    }

                    let inSnake = refSnake.current.find(part => {
                        
                        return part === [currRowIndex, currColumnIndex];
                    })
        
                    if(inSnake) {
                        setGameOver(true);
                    }

                    console.log(inSnake);
    
                    setTime(time + 1);
                }, speed)
            } else if(direction === "left") {
                timer = setTimeout(()=> {
                    if(currColumnIndex === 0) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex, place.length - 1]);
                        if(food) {
                            if(currRowIndex === food[0] && currColumnIndex === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 100);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        
                        refSnake.current = newRefSnake;
            
                        setCurrColumnIndex(prevColumnIndex => {
                            return place.length - 1;
                        });
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex, currColumnIndex - 1]);
                        if(food) {
                            if(currRowIndex === food[0] && currColumnIndex === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 100);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
                    
                        setCurrColumnIndex(prevColumnIndex => {
                            return prevColumnIndex - 1
                        });
                    }

                    let inSnake = refSnake.current.find(part => {   
                        return part === [currRowIndex, currColumnIndex];
                    })
        
                    if(inSnake) {
                        setGameOver(true);
                    }
    
                    setTime(time + 1);
                }, speed)
            } else if(direction === "up") {
                timer = setTimeout(()=> {
                    if(currRowIndex === 0) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([place.length - 1, currColumnIndex]);
                        if(food) {
                            if(currRowIndex === food[0] && currColumnIndex === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 100);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
            
                        setCurrRowIndex(prevColumnIndex => {
                            return place.length - 1;
                        });
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex - 1, currColumnIndex]);
                        if(food) {
                            if(currRowIndex === food[0] && currColumnIndex === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 100);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
                    
                        setCurrRowIndex(prevRowIndex => {
                            return prevRowIndex - 1
                        });
                    }

                    let inSnake = refSnake.current.find(part => {   
                        return part === [currRowIndex, currColumnIndex];
                    })
        
                    if(inSnake) {
                        setGameOver(true);
                    }
    
                    setTime(time + 1);
                }, speed)
            } else if(direction === "down") {
                timer = setTimeout(()=> {
                    if(currRowIndex === place.length - 1) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([0, currColumnIndex]);
                        if(food) {
                            if(currRowIndex === food[0] && currColumnIndex === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 100);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
            
                        setCurrRowIndex(prevRowIndex => {
                            return 0;
                        });
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex + 1, currColumnIndex]);
                        if(food) {
                            if(currRowIndex === food[0] && currColumnIndex === food[1]) {
                                setScore(prevScore => prevScore + 5);
                                if(speed > 100) {
                                    setSpeed(prevSpeed => prevSpeed - 100);
                                }
                            } else {
                                newRefSnake.shift();
                            }
                        } else {
                            newRefSnake.shift();
                        }
                        refSnake.current = newRefSnake;
                    
                        setCurrRowIndex(prevRowIndex => {
                            return prevRowIndex + 1
                        });
                    }

                    let inSnake = refSnake.current.find(part => {
                        return part === [currRowIndex, currColumnIndex];
                    })
        
                    if(inSnake) {
                        setGameOver(true);
                    }

                    console.log(inSnake);
    
                    setTime(time + 1);
                }, speed)                
            }
            
            return () => {
                clearTimeout(timer);
            }

    },[time, direction])

    return (
        <div className={classes.layout}>
            {gameOver ? <h1>game over</h1> : null}
            <div className={classes.game}>
            {place.map((row,index) => {
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
            </div>         
        </div>
    )
}

export default Game;