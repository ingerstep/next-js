import { FC } from "react";

export const Methodology: FC = () => {
  return (
    <div className="mb-6">
      <div className="mb-1 text-2xl font-bold">
        Ура! Теперь можно начать работать:
      </div>
      <ul className="pl-5">
        <li className="text-[#B7280F] text-base font-normal">
          <span>Выберите категорию и напишите название текущей задачи</span>
        </li>
        <li className="text-[#B7280F] text-base font-normal">
          <span>Запустите таймер («помидор»)</span>
        </li>
        <li className="text-[#B7280F] text-base font-normal">
          <span>Работайте пока «помидор» не прозвонит</span>
        </li>
        <li className="text-[#B7280F] text-base font-normal">
          <span>Сделайте короткий перерыв (3-5 минут)</span>
        </li>
        <li className="text-[#B7280F] text-base font-normal">
          <span>
            Продолжайте работать «помидор» за «помидором», пока задача не будут
            выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30
            минут).
          </span>
        </li>
      </ul>
    </div>
  );
};
