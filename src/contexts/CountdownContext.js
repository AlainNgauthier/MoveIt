import { createContext, useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

export const CountdownContext = createContext({})

export function CountdownProvider({ children }) {

    const { startNewChallenge } = useContext(ChallengesContext);
    
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        //clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            setTimeout(()=>{
                setTime(time - 1);
            }, 1000)
        } else if(isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown
            }}
        >
            {children}
        </CountdownContext.Provider>
    )
}
