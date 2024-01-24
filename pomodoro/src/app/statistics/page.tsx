'use client';

import { Chart } from '@/components/Chart';
import { Widget } from '@/components/Widget';
import { SvgArrow } from '@/components/icons/arrow';
import { SvgFocus } from '@/components/icons/focus';
import { SvgPause } from '@/components/icons/pause';
import { SvgPomodoro } from '@/components/icons/pomodoro';
import { SvgStop } from '@/components/icons/stop';
import { useStore } from '@/store/store';

export default function StatisticsPage() {
  const { pauseTime, stopCount, workingTime } = useStore();
  return (
    <div className='px-[80px] pt-[88px]'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='font-bold text-2xl'>Ваша активность</h1>
        <button className='w-[370px] py-5 px-4 text-base font-normal bg-[#F4F4F4] flex justify-between items-center'>
          Эта неделя
          <SvgArrow />
        </button>
      </div>

      <div className='flex mb-6'>
        <div className='max-w-[296px] flex flex-col mr-8'>
          <div className=' mb-8 p-6 flex flex-col bg-[#F4F4F4]'>
            <span className='text-2xl font-bold mb-[14px]'>Понедельник</span>
            <div className='text-base font-normal'>
              {'Вы работали над задачами в течение '}
              <span className='text-[#DC3E22] font-bold'>{workingTime} минуты</span>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex p-6 items-center justify-center bg-[#F4F4F4]'>
              <SvgPomodoro />
              <span className='text-2xl text-[#999] ml-3'>x2</span>
            </div>
            <span className='bg-[#DC3E22] text-white py-2 text-center'>2 помидора</span>
          </div>
        </div>
        <div className='w-full bg-[#F4F4F4]'>
          <Chart />
        </div>
      </div>
      <div className='flex justify-between'>
        <Widget title='Фокус' svg={<SvgFocus />} className='bg-[#FFDDA9]'>
          35%
        </Widget>
        <Widget title='Время на паузе' svg={<SvgPause />} className='bg-[#DFDCFE]'>
          {pauseTime}м
        </Widget>
        <Widget title='Остановки' svg={<SvgStop />} className='bg-[#C5F1FF]'>
          {stopCount ? stopCount : 0}
        </Widget>
      </div>
    </div>
  );
}
