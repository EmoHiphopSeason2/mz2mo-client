import React, { useEffect, useState } from 'react';

import { useSetAtom } from 'jotai';

import AlertError from '@/assets/icons/alertError.svg';
import AlertInfo from '@/assets/icons/alertInfo.svg';
import AlertSuccess from '@/assets/icons/alertSuccess.svg';
import { removeToastAtom } from '@/stores/toast';
import { Type } from '@/types/atom/toast';

const toastDuration = 3000;
const ANIMATION_DURATION = 350;

interface ToastProps {
  title: string;
  message: string;
  id: string;
  type: Type;
}

const ToastIcon = ({ type }: { type: Type }) => {
  switch (type) {
    case 'success':
      return <AlertSuccess className="w-6 h-6 text-[#4F6EFF]" />;
    case 'error':
      return <AlertError className="w-6 h-6 text-[#F35B3C]" />;
    case 'info':
      return <AlertInfo className="w-6 h-6 text-[#00BA77]" />;
    default:
      return null;
  }
};

const Toast = ({ title, id, message, type }: ToastProps) => {
  const removeToastItem = useSetAtom(removeToastAtom);
  const [opacity, setOpacity] = useState(0.2);

  useEffect(() => {
    setOpacity(1);
    const timeoutForRemove = setTimeout(() => {
      removeToastItem(id);
    }, toastDuration);

    const timeoutForVisible = setTimeout(() => {
      setOpacity(0);
    }, toastDuration - ANIMATION_DURATION);

    return () => {
      clearTimeout(timeoutForRemove);
      clearTimeout(timeoutForVisible);
    };
  }, [id, removeToastItem]);

  return (
    <div
      style={{
        opacity: opacity,
        transition: 'all 0.35s ease-in-out',
        transform: `translateY(${opacity === 0 ? '-10px' : '0'})`,
      }}
      className="bg-gray-900 border min-w-[300px] max-w-[360px] p-4 flex items-center rounded-lg border-gray-800"
    >
      <div className="flex text-white">
        <span className="mr-2.5">
          <ToastIcon type={type} />
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-subtitle1">{title}</span>
          <span className="text-caption">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
