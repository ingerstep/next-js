'use client';

import { FC } from 'react';
import { useStore } from '@/store/store';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { createPortal } from 'react-dom';
import { SvgExit } from '../icons/exit';
import { Button } from './button';

interface ModalProps {
  removeItem: () => void;
}

export const Modal: FC<ModalProps> = ({ removeItem }) => {
  const { setModalOpen, isPaused, setIsPaused, setIsRunning } = useStore();
  const node = document.querySelector('#modal');
  const ref = useOutsideClick(() => setModalOpen(false));

  const handleClick = () => {
    removeItem();
    setIsPaused(true);
    setIsRunning(false);
  };
  if (!node) return;

  return createPortal(
    <div className='absolute w-full h-full top-0 flex justify-center items-center bg-black/50 z-30'>
      <div ref={ref} className='relative flex flex-col items-center py-6 px-20 bg-white'>
        <div className='mb-6 text-[#333] text-2xl font-normal'>Удалить задачу?</div>
        <Button size='default' variant='red' onClick={handleClick}>
          Удалить
        </Button>
        <button onClick={() => setModalOpen(false)}>
          <span className='pb-1 text-base text-[#333] font-light hover:border-b hover:border-[#333] transition-all'>
            Отмена
          </span>
        </button>
        <button
          onClick={() => setModalOpen(false)}
          className='absolute top-3 right-3 text-[#C4C4C4] hover:text-[#DC3E22] transition-colors'
        >
          <SvgExit />
        </button>
      </div>
    </div>,
    node,
  );
};
