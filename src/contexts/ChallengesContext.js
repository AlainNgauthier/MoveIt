import { createContext, useState } from 'react';
import challenges from '../../challenges.json';

export const ChallengesContext = createContext({});

export function ChallengesProvider({ children }) {
    
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    //
    const [activeChallenge, setActiveChallenge] = useState(null);

    function levelUp() {
        setLevel(level + 1);
    }
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        //console.log(challenges.length) //
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
        //console.log(activeChallenge)//
    }
    function resetChallenge() {
        setActiveChallenge(null);
    }
    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                startNewChallenge,
                resetChallenge,
                levelUp }} 
        >
            {children}
        </ChallengesContext.Provider>
    )
}