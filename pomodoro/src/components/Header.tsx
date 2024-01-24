'use client';

import Link from 'next/link';
import { FC, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SvgEqualizer } from './icons/equalizer';
import { SvgTomato } from './icons/tomato';
import { useLocalStorageState } from '@/hooks/use-storage';
import { StatisticsProps } from '@/hooks/use-countdown';
import { useStore } from '@/store/store';

export const Header: FC = () => {
  const pathname = usePathname();
  const { stopCount, workingTime, pauseTime, successTaskCount } = useStore();
  const [storageStaistics, setStorageStaistics] = useLocalStorageState<Array<StatisticsProps>>(
    'statistics',
    [],
  );

  const currentDay = new Date().getDay();

  useEffect(() => {
    const dayStatisticsIndex = storageStaistics.findIndex((item) => item.day === currentDay);

    if (dayStatisticsIndex !== -1) {
      const updatedStatistics = [...storageStaistics];
      updatedStatistics[dayStatisticsIndex] = {
        ...updatedStatistics[dayStatisticsIndex],
        stopCount,
        workingTime,
        pauseTime,
        successTaskCount,
      };
      setStorageStaistics(updatedStatistics);
    } else {
      setStorageStaistics((prevStatistics) => [
        ...prevStatistics,
        {
          stopCount,
          workingTime,
          pauseTime,
          successTaskCount,
          day: currentDay,
        },
      ]);
    }
  }, [pathname]);

  return (
    <div className='max-w-[1440px] mx-auto flex items-center justify-between py-0 px-20'>
      <Link
        href='/'
        className={clsx(
          'flex items-center hover:text-[#B7280F] transition-colors',
          pathname === '/' ? 'active' : '',
        )}
      >
        <SvgTomato />
        <div className='font-light ml-2'>pomodoro_box</div>
      </Link>

      <Link
        href='/statistics'
        className={clsx(
          'flex items-center hover:text-[#B7280F] transition-colors',
          pathname === '/' ? 'active' : '',
        )}
      >
        <SvgEqualizer />
        <div className='text-base font-normal ml-1'>Статистика</div>
      </Link>
    </div>
  );
};
