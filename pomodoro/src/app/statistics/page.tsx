'use client';

import { Chart } from '@/components/Chart';
import { Widget } from '@/components/Widget';
import { SvgArrow } from '@/components/icons/arrow';
import { SvgFocus } from '@/components/icons/focus';
import { SvgPause } from '@/components/icons/pause';
import { SvgPomodoro } from '@/components/icons/pomodoro';
import { SvgPomodoroDefault } from '@/components/icons/pomodoro-default';
import { SvgStop } from '@/components/icons/stop';
import { useLocalStorageState } from '@/hooks/use-storage';
import { getDayOfWeek } from '@/utils/get-day-of-week';
import { useEffect, useState } from 'react';

interface StatisticsProps {
  stopCount: number;
  workingTime: number;
  pauseTime: number;
  successTaskCount: number;
  day: number;
  taskCountIsDone: number;
}

export default function StatisticsPage() {
  const [statistic, setStatistic] = useState<Array<StatisticsProps>>();

  const [storageStaistics, setStorageStaistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );

  const dayOfWeek = getDayOfWeek();

  useEffect(() => {
    setStatistic(storageStaistics);
  }, []);

  return (
    <div className='px-[80px] pt-[88px]'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='font-bold text-2xl dark:text-[#ECF0F1]'>Ваша активность</h1>
        <button className='w-[370px] py-5 px-4 text-base font-normal bg-[#F4F4F4] dark:bg-[#2C3E50] flex justify-between items-center'>
          Эта неделя
          <SvgArrow className={'dark:text-[#3498DB] text-[#B7280F]'} />
        </button>
      </div>

      <div className='flex mb-6'>
        <div className='max-w-[296px] flex flex-col mr-8'>
          <div className=' mb-8 p-6 flex flex-col bg-[#F4F4F4] dark:bg-[#2C3E50]'>
            <span className='text-2xl font-bold mb-[14px] dark:text-[#ECF0F1]'>{dayOfWeek}</span>
            <div className='text-base font-normal'>
              {'Вы работали над задачами в течение '}
              <span className='text-[#DC3E22] font-bold dark:text-[#E74C3C]'>
                {statistic ? statistic[statistic.length - 1].workingTime : 0} минуты
              </span>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex p-6 items-center justify-center bg-[#F4F4F4] dark:bg-[#2C3E50]'>
              {statistic ? (
                <>
                  <SvgPomodoro />
                  <span className='text-2xl text-[#999] ml-3 dark:text-[#ECF0F1]'>
                    x{statistic[statistic.length - 1].successTaskCount}
                  </span>
                </>
              ) : (
                <SvgPomodoroDefault />
              )}
            </div>
            {statistic && (
              <span className='bg-[#DC3E22] text-white py-2 text-center dark:text-[#ECF0F1]'>
                {statistic[statistic.length - 1].successTaskCount} помидора
              </span>
            )}
          </div>
        </div>
        <Chart statistic={statistic} />
      </div>
      <div className='flex justify-between dark:text-[#215a80]'>
        <Widget title='Фокус' svg={<SvgFocus />} className='bg-[#FFDDA9]'>
          35%
        </Widget>
        <Widget title='Время на паузе' svg={<SvgPause />} className='bg-[#DFDCFE]'>
          {statistic ? storageStaistics[storageStaistics.length - 1].pauseTime : 0}м
        </Widget>
        <Widget title='Остановки' svg={<SvgStop />} className='bg-[#C5F1FF]'>
          {statistic ? storageStaistics[storageStaistics.length - 1].stopCount : 0}
        </Widget>
      </div>
    </div>
  );
}
