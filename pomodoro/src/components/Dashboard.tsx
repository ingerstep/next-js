'use client';

import { FC, useEffect } from 'react';
import { useCountdown } from '@/hooks/use-countdown';
import { useStore } from '@/store/store';
import { Button } from './ui/button';
import { SvgPlus } from './icons/plus';
import clsx from 'clsx';
import { useLocalStorageState } from '@/hooks/use-storage';

export const Dashboard: FC = () => {
  const { tasksArray } = useStore();

  const {
    formatTime,
    timeRemaining,
    addOneMinute,
    isRunning,
    start,
    pause,
    resume,
    stop,
    skip,
    isPaused,
    isStarted,
    successTaskCount,
    taskCountIsDone,
    TOTAL_TIME,
    setTimeRemaining,
  } = useCountdown();

  const [lastSavedTime, setLastSavedTime] = useLocalStorageState<number>(
    'lastSavedTime',
    TOTAL_TIME,
  );

  useEffect(() => {
    setTimeRemaining(lastSavedTime);
  }, []);

  return (
    <div className='relative w-[120%] h-[510px] flex flex-col justify-start items-start bg-[#C4C4C4]'>
      <div
        className={clsx(
          'flex justify-between items-center py-5 px-10 w-full h-14',
          isStarted ? (isRunning ? 'bg-[#A8B64F]' : 'bg-[#DC3E22]') : 'bg-[#C4C4C4]',
        )}
      >
        <div className='text-white text-base font-bold'>{tasksArray[0] && tasksArray[0].value}</div>
        {tasksArray.length !== 0 && (
          <div className='text-white text-base font-normal'>
            Помидор {successTaskCount > 0 ? successTaskCount : 1}
          </div>
        )}
      </div>
      <div className='w-full h-full flex justify-center items-center flex-col bg-[#F4F4F4]'>
        <div className='relative'>
          <div className='font-extralight text-[160px] leading-normal'>
            {formatTime(timeRemaining)}
          </div>
          <button onClick={addOneMinute} className='absolute top-1/2 -translate-y-1/2 -right-20'>
            <SvgPlus className='text-[#C4C4C4] hover:text-[#899441] transition-colors' />
          </button>
        </div>
        {tasksArray.length !== 0 && (
          <span className='mb-8 text-[#999] text-base font-normal'>
            {clsx('Задача ', taskCountIsDone, '- ')}
            <span className='text-base font-normal'>{tasksArray[0].value}</span>
          </span>
        )}
        <div>
          {isRunning ? (
            <>
              <Button size='sm' variant='green' onClick={pause} className='mr-6'>
                Пауза
              </Button>
              <Button onClick={skip} size='md' variant='red'>
                Пропустить
              </Button>
            </>
          ) : (
            <>
              {!isPaused ? (
                <Button size='sm' variant='green' onClick={start} className='mr-6'>
                  Старт
                </Button>
              ) : (
                <Button size='md' variant='green' onClick={resume} className='mr-6'>
                  Продолжить
                </Button>
              )}
              <Button size='sm' variant='red' onClick={stop}>
                Стоп
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
