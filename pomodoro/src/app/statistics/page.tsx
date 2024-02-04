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
import { StatisticsProps, useTimerStore } from '@/store/timer-store';
import { getDayOfWeek } from '@/utils/get-day-of-week';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function StatisticsPage() {
  const { statisticArray, setStatisticArray } = useTimerStore();

  const [storageStaistics, setStorageStaistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );

  const [currentPeriod, setCurrentPeriod] = useState('current');
  const [filteredData, setFilteredData] = useState([]);

  const dayOfWeek = getDayOfWeek();

  useEffect(() => {
    storageStaistics.length !== 0 && setStatisticArray(storageStaistics);

    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Получаем текущий день недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)
    const endDate = new Date(currentDate);

    endDate.setHours(0, 0, 0, 0); // Обнуляем часы для корректного сравнения

    switch (currentPeriod) {
      case 'current':
        endDate.setDate(currentDate.getDate());
        break;
      case 'previous':
        endDate.setDate(currentDate.getDate() - currentDay - 6); // Начинаем с прошлого понедельника
        break;
      case 'twoWeeksAgo':
        endDate.setDate(currentDate.getDate() - currentDay - 13); // Начинаем с понедельника две недели назад
        break;
      default:
        break;
    }

    const filtered: any = statisticArray.filter(
      (item) => new Date(item.date) >= endDate && new Date(item.date) <= currentDate,
    );
    setFilteredData(filtered);
  }, [currentPeriod]);

  const handlePeriodChange = (period: any) => {
    setCurrentPeriod(period);
  };

  return (
    <div className='px-[80px] pt-[88px]'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='font-bold text-2xl dark:text-[#ECF0F1]'>Ваша активность</h1>
        <button
          onClick={() => handlePeriodChange('current')}
          className='w-[370px] py-5 px-4 text-base font-normal bg-[#F4F4F4] dark:bg-[#2C3E50] flex justify-between items-center'
        >
          Эта неделя
          <SvgArrow className={'dark:text-[#3498DB] text-[#B7280F]'} />
        </button>
        <button
          onClick={() => handlePeriodChange('previous')}
          className='w-[370px] py-5 px-4 text-base font-normal bg-[#F4F4F4] dark:bg-[#2C3E50] flex justify-between items-center'
        >
          Прошлая неделя
          <SvgArrow className={'dark:text-[#3498DB] text-[#B7280F]'} />
        </button>
        <button
          onClick={() => handlePeriodChange('twoWeeksAgo')}
          className='w-[370px] py-5 px-4 text-base font-normal bg-[#F4F4F4] dark:bg-[#2C3E50] flex justify-between items-center'
        >
          2 недели назад
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
                {statisticArray.length !== 0 &&
                  statisticArray[statisticArray.length - 1].workingTime}
                минуты
              </span>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex p-6 items-center justify-center bg-[#F4F4F4] dark:bg-[#2C3E50]'>
              {statisticArray ? (
                <>
                  <SvgPomodoro />
                  <span className='text-2xl text-[#999] ml-3 dark:text-[#ECF0F1]'>
                    x
                    {statisticArray.length !== 0 &&
                      statisticArray[statisticArray.length - 1].successTaskCount}
                  </span>
                </>
              ) : (
                <SvgPomodoroDefault />
              )}
            </div>
            {statisticArray && (
              <span className='bg-[#DC3E22] text-white py-2 text-center dark:text-[#ECF0F1]'>
                {statisticArray.length !== 0 &&
                  statisticArray[statisticArray.length - 1].successTaskCount}
                помидора
              </span>
            )}
          </div>
        </div>

        {/* <Chart statistic={statisticArray} /> */}

        <div className='w-full min-h-[471px] pt-11 bg-[#F4F4F4] dark:bg-[#2C3E50] overflow-hidden relative'>
          <div className='flex gap-8 pl-14'>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                className={clsx(
                  'w-full h-[300px]',
                  Number(dayOfWeek) === 1 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                className={clsx(
                  'w-full h-[300px]',
                  Number(dayOfWeek) === 2 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                className={clsx(
                  'w-full h-[300px]',
                  Number(dayOfWeek) === 3 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                className={clsx(
                  'w-full h-[300px]',
                  Number(dayOfWeek) === 4 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                className={clsx(
                  'w-full h-[300px]',
                  Number(dayOfWeek) === 5 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                className={clsx(
                  'w-full h-[300px]',
                  Number(dayOfWeek) === 6 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
            <span className=' h-[375px] flex items-end w-[77px]'>
              <span
                className={clsx(
                  'w-full h-[300px]',
                  Number(dayOfWeek) === 0 ? 'bg-[#DC3E22]' : 'bg-[#EA8A79]',
                )}
              ></span>
            </span>
          </div>
          <div className='flex gap-20 bg-[#ECECEC] text-[#999] text-2xl pt-3 pb-3 pl-20 pr-[189px]'>
            <span className={clsx(Number(dayOfWeek) === 1 && 'text-[#DC3E22]')}>Пн</span>
            <span className={clsx(Number(dayOfWeek) === 2 && 'text-[#DC3E22]')}>Вт</span>
            <span className={clsx(Number(dayOfWeek) === 3 && 'text-[#DC3E22]')}>Ср</span>
            <span className={clsx(Number(dayOfWeek) === 4 && 'text-[#DC3E22]')}>Чт</span>
            <span className={clsx(Number(dayOfWeek) === 5 && 'text-[#DC3E22]')}>Пт</span>
            <span className={clsx(Number(dayOfWeek) === 6 && 'text-[#DC3E22]')}>Сб</span>
            <span className={clsx(Number(dayOfWeek) === 0 && 'text-[#DC3E22]')}>Вс</span>
          </div>
          <div className='absolute top-[68px] right-7 flex flex-col text-xs'>
            <span className='pb-[51px]'>
              <span className='relative flex items-center'>
                <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 1ч
                40 мин
              </span>
            </span>
            <span className='pb-[51px]'>
              <span className='relative flex items-center'>
                <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 1ч
                15 мин
              </span>
            </span>
            <span className='pb-[51px]'>
              <span className='relative flex items-center'>
                <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 50
                мин
              </span>
            </span>
            <span className='pb-[51px]'>
              <span className='relative flex items-center'>
                <span className='absolute right-[80px] w-[1000px] h-px mr-8 bg-[#ECECEC]'></span> 25
                мин
              </span>
            </span>
          </div>
        </div>
        {/* <Chart statistic={statisticArray} /> */}
      </div>
      <div className='flex justify-between dark:text-[#215a80]'>
        <Widget title='Фокус' svg={<SvgFocus />} className='bg-[#FFDDA9]'>
          35%
        </Widget>
        <Widget title='Время на паузе' svg={<SvgPause />} className='bg-[#DFDCFE]'>
          {statisticArray.length !== 0 && storageStaistics[storageStaistics.length - 1].pauseTime}м
        </Widget>
        <Widget title='Остановки' svg={<SvgStop />} className='bg-[#C5F1FF]'>
          {statisticArray.length !== 0 && storageStaistics[storageStaistics.length - 1].stopCount}
        </Widget>
      </div>
    </div>
  );
}
