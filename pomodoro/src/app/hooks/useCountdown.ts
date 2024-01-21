import { useEffect, useState } from 'react';
import { useStore } from '../store/store';

export const useCountdown = () => {
    const totalTime = 1500
    const { pauseTime, setPauseTime, stopCount, setStopCount, workingTime, setWorkingTime } = useStore();
    const [timeRemaining, setTimeRemaining] = useState(totalTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        let countdownTimer: any = null;
        let pauseTimer: any = null;

        if (isRunning) {
            countdownTimer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
                setWorkingTime(workingTime + 1)
            }, 1000);
        } else {
            clearInterval(countdownTimer);
        }

        if (isPaused) {
            pauseTimer = setInterval(() => {
                setPauseTime(pauseTime + 1);
            }, 1000);
        } else {
            clearInterval(pauseTimer);
        }

        if (timeRemaining === 0) {
            clearInterval(countdownTimer);
            setIsRunning(false);
            setTimeRemaining(totalTime);
        }

        return () => {
            clearInterval(countdownTimer);
            clearInterval(pauseTimer);
        };
    }, [isRunning, isPaused, timeRemaining, setPauseTime]);

    const start = () => {
        setTimeRemaining(totalTime);
        setIsRunning(true);
        setIsPaused(false)
    };

    const pause = () => {
        if (isRunning) {
            setIsRunning(false);
            setIsPaused(true)
        }
    };

    const resume = () => {
        if (!isRunning && timeRemaining > 0) {
            setIsRunning(true);
            setIsPaused(false)
        }
    };

    const stop = () => {
        setIsRunning(false);
        setTimeRemaining(totalTime);
        setIsPaused(false)
        setStopCount(stopCount + 1);
    };

    const skip = () => {
        stop();
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return {
        formatTime,
        timeRemaining,
        isRunning,
        start,
        pause,
        resume,
        stop,
        skip,
        totalTime
    };
};