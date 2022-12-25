import React, { useEffect, useRef, useState } from "react";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoClose,
  IoPencilSharp,
  IoTrashBinSharp,
} from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IGetParam } from "../../app/type";
import { RouteInterface } from "../../components/Sidebar2/routes";
import Table from "../../components/Table";
import { GetCabang, selectCabang } from "../../slices/CabangSlice";
import { SetMenuActive } from "../../slices/MenuSlice";
import { CabangData } from "../../slices/CabangSlice";
import DetailOrForm from "./Detail";

type Props = {
  menu: RouteInterface;
};

export type Detail = {
  action: string;
  data: CabangData | null;
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

  const [detail, setDetail] = useState<Detail | null>(null);

  const onAddAction = (data: Detail) => {
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

  const [dataCollpase, setDataCollapse] = useState(false);

  return (
    <div className="">
      <h1 className="font-bold text-2xl mb-4">Cabang</h1>
      <div className="flex">
        <div
          className={`relative rounded-lg bg-base-300 transition-all duration-700 ease-in-out ${
            detail === null ? "w-0" : "w-full flex-grow mr-6"
          } `}
        >
          <div className="absolute -top-2 -right-2">
            {detail && (
              <button
                onClick={() => {
                  setDataCollapse(false);
                  setDetail(null);
                }}
                className="btn btn-circle btn-sm btn-primary"
              >
                <IoClose />
              </button>
            )}
          </div>
          {detail && (
            <DetailOrForm action={detail?.action} data={detail?.data} />
          )}
        </div>
        <div
          className={`
          flex flex-col
          h-auto rounded-lg bg-base-300 
          px-6 py-6 transition-all duration-500 ease-in relative w-full flex-grow
          ${dataCollpase && "-mr-[95%]"}
          `}
        >
          <div className="absolute -top-2 -left-2">
            {detail && (
              <button
                onClick={() => setDataCollapse(!dataCollpase)}
                className="btn btn-circle btn-sm btn-primary"
              >
                {dataCollpase ? (
                  <IoChevronBackSharp />
                ) : (
                  <IoChevronForwardSharp />
                )}
              </button>
            )}
          </div>
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
