import React, {useEffect, useState, useRef} from 'react';

import Item from './Item';
import classes from './Layout.module.css';

const Game = () => {
    const [currRowIndex, setCurrRowIndex] = useState(0);
    const [currColumnIndex, setCurrColumnIndex] = useState(1);
    const [speed, setSpeed] = useState(500);
    const [direction, setDirection] = useState("right");
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
    const [time, setTime] = useState(0);

    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowUp") {
                if(direction !== "down") {
                    console.log(direction);
                    setDirection("up");
                }
            } else if(event.key === "ArrowDown") {
                if(direction !== "up") {
                    console.log(direction);
                    setDirection("down");
                }
            } else if(event.key === "ArrowLeft") {
                if(direction !== "right") {
                    console.log(direction);
                    setDirection("left");
                }
            } else if(event.key === "ArrowRight") {
                if(direction !== "left") {
                    console.log(direction);
                    setDirection("right");
                }
            }
          })
        },[direction])

    const refSnake = useRef([[0,6],[0,0],[0,1]])
    useEffect(() => {
            let timer;
            if(direction === "right") {
                timer = setTimeout(()=> {
                    if(currColumnIndex === place.length - 1) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex, 0]);
                        newRefSnake.shift();
                        refSnake.current = newRefSnake;
            
                        setCurrColumnIndex(prevColumnIndex => {
                            return 0;
                        });
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex, currColumnIndex + 1]);
                        newRefSnake.shift();
                        refSnake.current = newRefSnake;
                    
                        setCurrColumnIndex(prevColumnIndex => {
                            return prevColumnIndex + 1
                        });
                    }
    
                    setTime(time + 1);
                }, speed)
            } else if(direction === "left") {
                timer = setTimeout(()=> {
                    if(currColumnIndex === 0) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex, place.length - 1]);
                        newRefSnake.shift();
                        refSnake.current = newRefSnake;
            
                        setCurrColumnIndex(prevColumnIndex => {
                            return place.length - 1;
                        });
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex, currColumnIndex - 1]);
                        newRefSnake.shift();
                        refSnake.current = newRefSnake;
                    
                        setCurrColumnIndex(prevColumnIndex => {
                            return prevColumnIndex - 1
                        });
                    }
    
                    setTime(time + 1);
                }, speed)
            } else if(direction === "up") {
                timer = setTimeout(()=> {
                    if(currRowIndex === 0) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([place.length - 1, currColumnIndex]);
                        newRefSnake.shift();
                        refSnake.current = newRefSnake;
            
                        setCurrRowIndex(prevColumnIndex => {
                            return place.length - 1;
                        });
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex - 1, currColumnIndex]);
                        newRefSnake.shift();
                        refSnake.current = newRefSnake;
                    
                        setCurrRowIndex(prevRowIndex => {
                            return prevRowIndex - 1
                        });
                    }
    
                    setTime(time + 1);
                }, speed)
            } else if(direction === "down") {
                timer = setTimeout(()=> {
                    if(currRowIndex === place.length - 1) {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([0, currColumnIndex]);
                        newRefSnake.shift();
                        refSnake.current = newRefSnake;
            
                        setCurrRowIndex(prevRowIndex => {
                            return 0;
                        });
    
                    } else {
                        let newRefSnake = refSnake.current;
                        newRefSnake.push([currRowIndex + 1, currColumnIndex]);
                        newRefSnake.shift();
                        refSnake.current = newRefSnake;
                    
                        setCurrRowIndex(prevRowIndex => {
                            return prevRowIndex + 1
                        });
                    }
    
                    setTime(time + 1);
                }, speed)                
            }
            
            return () => {
                clearTimeout(timer);
            }

    },[time, direction])

    return (
        <div className={classes.layout}>
            {place.map((row,index) => {
                    return (<div className={classes.row} key={index}>
                        {row.map((item,iindex) => {
                            for(let part of refSnake.current) {
                                if(part[0] === index && part[1] === iindex) {
                                    return <Item active={true} key={iindex}/>
                                }
                            }
                            return <Item active={false} key={iindex}/>
                        })}
                    </div>)
                })}         
        </div>
    )
}

export default Game;