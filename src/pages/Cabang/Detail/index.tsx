import React from 'react';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';

const Detail = ({ data, setDetail, onDeletePress }: any) => {
  return (
    <div className='p-6'>
      <h3 className='font-semibold'>Detail Cabang</h3>

      <div className='flex my-2'>
        <div>
          <label className='text-sm'>Kode</label>
          <div>{data?.kode}</div>
        </div>
      </div>
      <div className='flex my-2'>
        <div>
          <label className='text-sm'>Nama</label>
          <div>{data?.nama}</div>
        </div>
      </div>
      <div className='flex my-2'>
        <div>
          <label className='text-sm'>Alamat</label>
          <div>{data?.alamat}</div>
        </div>
      </div>
      <div className='flex justify-start gap-2 mt-4'>
        <button
          className='btn btn-sm btn-accent'
          onClick={() => setDetail({ action: 'edit', data })}
        >
          <IoPencilSharp /> edit
        </button>
        <button
          className='btn btn-sm btn-error'
          onClick={() => onDeletePress(data)}
        >
          <IoTrashBinSharp /> Hapus
        </button>
      </div>
    </div>
  );
};

export default Detail;
