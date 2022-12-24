import React, { FC } from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';

type Props = {
  mode?: string;
  label: string;
  active?: boolean;
  toggle?: any;
  field?: any;
};

const SortableTH: FC<Props> = ({ mode, label, active, toggle, field }) => {
  return (
    <div className='group flex justify-between align-bottom'>
      <div className='inline-flex mt-[2px]'>{label}</div>
      <div
        className='tooltip tooltip-bottom'
        data-tip={`Sort ${mode || ''}`}
        onClick={() =>
          toggle({
            orderBy: field,
            order: mode === 'asc' ? 'desc' : 'asc',
          })
        }
      >
        <span
          className={`btn btn-ghost btn-xs ${
            !active && 'invisible'
          } group-hover:visible`}
        >
          {mode === 'asc' || typeof mode === 'undefined' ? (
            <IoChevronUpSharp />
          ) : (
            <IoChevronDownSharp />
          )}
        </span>
      </div>
    </div>
  );
};

export default SortableTH;
