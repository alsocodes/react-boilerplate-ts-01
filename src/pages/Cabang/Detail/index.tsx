import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Detail } from "..";
import TextInput from "../../../components/TextInput";

export interface IFormCabang {
  id?: string | null;
  kode: string;
  nama: string;
  alamat: string;
}

const DetailOrForm: FC<Detail> = ({ action, data }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormCabang>();

  const formSubmit = (data: IFormCabang) => {
    console.log(data);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="flex gap-4">
          <div className="w-2/6">
            <TextInput
              layout="horizontal"
              label="Kode"
              className="uppercase"
              name="kode"
              type="text"
              register={register("kode", { required: "Kode harus diisi" })}
              errors={errors}
            />
          </div>
          <div className="w-4/6">
            <TextInput
              layout="horizontal"
              label="Nama"
              name="nama"
              type="text"
              register={register("nama", { required: "Nama harus diisi" })}
              errors={errors}
            />
          </div>
        </div>
        <div className="">
          <TextInput
            layout="horizontal"
            label="Alamat"
            name="alamat"
            type="textarea"
            register={register("alamat", { required: "Alamat harus diisi" })}
            errors={errors}
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            {action === "add" ? "Tambahkan" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailOrForm;
