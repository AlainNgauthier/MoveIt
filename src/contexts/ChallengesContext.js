import { createContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

export const ChallengesContext = createContext({});

export function ChallengesProvider({ children }) {
    
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(40);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    //
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level+1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
        
        if(Notification.requestPermission === "granted") {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }
    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                levelUp }} 
        >
            {children}
        </ChallengesContext.Provider>
    )
}