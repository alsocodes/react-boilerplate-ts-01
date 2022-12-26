import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DetailData } from '..';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import TextInput from '../../../components/TextInput';
import {
  PostCabang,
  PutCabang,
  selectCabang,
} from '../../../slices/CabangSlice';

export interface IFormCabang {
  publicId?: string | null;
  kode: string;
  nama: string;
  alamat: string;
}

const Form: FC<DetailData> = ({ action, data }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormCabang>();

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectCabang);
  const formSubmit = (data: IFormCabang) => {
    if (data?.publicId) {
      dispatch(PutCabang({ ...data, kode: data.kode.toUpperCase() }));
    } else {
      delete data.publicId;
      dispatch(PostCabang({ ...data, kode: data.kode.toUpperCase() }));
    }
  };

  useEffect(() => {
    setValue('publicId', data?.publicId || null);
    setValue('kode', data?.kode || '');
    setValue('nama', data?.nama || '');
    setValue('alamat', data?.alamat || '');
  }, [data]);

  return (
    <div className='p-6'>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className='flex gap-4'>
          <div className='w-2/6'>
            <TextInput
              layout='horizontal'
              label='Kode'
              className='uppercase'
              name='kode'
              type='text'
              register={register('kode', { required: 'Kode harus diisi' })}
              errors={errors}
            />
          </div>
          <div className='w-4/6'>
            <TextInput
              layout='horizontal'
              label='Nama'
              name='nama'
              type='text'
              register={register('nama', { required: 'Nama harus diisi' })}
              errors={errors}
            />
          </div>
        </div>
        <div className=''>
          <TextInput
            layout='horizontal'
            label='Alamat'
            name='alamat'
            type='textarea'
            register={register('alamat', { required: 'Alamat harus diisi' })}
            errors={errors}
          />
        </div>
        <div>
          <button className='btn btn-primary' type='submit' disabled={loading}>
            {action === 'add' ? 'Tambahkan' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
