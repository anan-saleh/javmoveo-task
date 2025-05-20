import React from 'react';
import classNames from 'classnames';

interface BoxWrapperProps {
  isDashed?: boolean;
  children: React.ReactNode;
}

export const BoxWrapper: React.FC<BoxWrapperProps> = ({ isDashed = false, children }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={classNames(
          'w-[1340px] h-[660px] p-10 text-center bg-white rounded-lg shadow-md',
          {
            'border-2 border-dashed border-black': isDashed,
            'border-2 border-black': !isDashed,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};