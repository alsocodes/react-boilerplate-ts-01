import React, { useEffect, useRef, useState } from "react";
import { IoPencilSharp, IoTrashBinSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IGetParam } from "../../app/type";
import { RouteInterface } from "../../components/Sidebar2/routes";
import Table from "../../components/Table";
import { GetCabang, selectCabang } from "../../slices/CabangSlice";
import { CabangData } from "../../slices/ConfigSlice";
import { SetMenuActive } from "../../slices/MenuSlice";

type Props = {
  menu: RouteInterface;
};

const CabangPage = ({ menu }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { icon, ...payload } = menu;
    dispatch(SetMenuActive(payload));
  }, [menu, dispatch]);

  const { listCabang, count, loading } = useAppSelector(selectCabang);
  const [params, setParams] = useState<IGetParam>({
    page: 1,
    size: 20,
    search: "",
    orderBy: "kode",
    order: "asc",
  });

  useEffect(() => {
    // if (loading) return;
    dispatch(GetCabang(params));
  }, [dispatch, params]);

  const onTableChange = (data: any) => {
    setParams({ ...params, ...data });
  };

  const [detail, setDetail] = useState<CabangData | null | undefined>(
    undefined
  );

  const onAddAction = (data: CabangData) => {
    if (detail !== undefined) return;
    setDetail(data);
  };

  const columns = [
    { field: "", label: "No", func: (obj: any) => obj.index + 1 },
    { field: "kode", label: "Kode", sort: true },
    { field: "nama", label: "Nama", sort: true },
    { field: "alamat", label: "Alamat" },
    {
      field: "",
      label: "Action",
      w: "100px",
      func: (obj: any) => {
        return (
          <div className="flex gap-1">
            <div className="tooltip" data-tip="Edit">
              <button className="btn btn-sm btn-accent">
                <IoPencilSharp />{" "}
              </button>
            </div>
            <div className="tooltip" data-tip="Hapus">
              <button className="btn btn-sm btn-error">
                <IoTrashBinSharp />{" "}
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <h1 className="font-bold text-2xl mb-4">Cabang</h1>
      <div className="flex gap-2">
        <div
          className={`flex flex-col flex-grow w-full max-w-2xl rounded-lg bg-base-300 px-6 py-4 ${
            detail === undefined && "hidden"
          } transition-transform duration-150 ease-in`}
        >
          a
        </div>
        <div className="flex flex-col flex-grow rounded-lg bg-base-300 px-6 py-4 transition-transform duration-150 ease-in">
          <Table
            data={listCabang}
            columns={columns}
            pagination
            compact
            zebra
            hover
            server
            count={count}
            params={params}
            onChange={onTableChange}
            addAction={onAddAction}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CabangPage;
