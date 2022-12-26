import React, { useEffect, useRef, useState } from "react";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoClose,
} from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetParam } from "../../app/type.d";
import { RouteInterface } from "../../components/Sidebar/routes";
import Table from "../../components/Table";
import {
  DeleteCabang,
  GetCabang,
  selectCabang,
} from "../../slices/CabangSlice";
import { SetMenuActive } from "../../slices/MenuSlice";
import { CabangData } from "../../slices/CabangSlice";
import Form from "./Form";
import Detail from "./Detail";
import { SetToastData } from "../../slices/ConfigSlice";
import ModalConfirm from "../../components/ModalConfirm";

interface Props {
  menu: RouteInterface;
}

export interface DetailData {
  action: string;
  data: CabangData | null;
}
const CabangPage = ({ menu }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { icon, ...payload } = menu;
    dispatch(SetMenuActive(payload));
  }, [menu, dispatch]);

  const { listCabang, count, loading, formResult } =
    useAppSelector(selectCabang);
  const [params, setParams] = useState<GetParam>({
    page: 1,
    size: 20,
    search: "",
    orderBy: "kode",
    order: "asc",
  });

  useEffect(() => {
    dispatch(GetCabang(params));
  }, [dispatch, formResult, params]);

  useEffect(() => {
    if (formResult) {
      const { message } = formResult;
      dispatch(SetToastData({ type: "success", message }));
    }

    if (formResult?.statusCode === 200 || formResult?.statusCode === 201) {
      setModalConfrim(null);
    }
  }, [formResult]);

  useEffect(() => {
    if (!formResult || !listCabang) return;
    const data = listCabang.find(
      ({ publicId }) => publicId === formResult?.publicId,
      null
    );
    if (data) setDetail({ action: "view", data });
    else setDetail(null);
  }, [formResult, listCabang]);

  const onTableChange = (data: any) => {
    setParams({ ...params, ...data });
  };

  const [modalConfirm, setModalConfrim] = useState<any>(null);

  const onDeletePress = (data: any) => {
    setModalConfrim({
      title: "Konfirmasi hapus cabang",
      message: `Apakah Anda yakin akan menghapus cabang ${data?.nama}?`,
      action: () => dispatch(DeleteCabang(data?.publicId)),
      cancel: () => setModalConfrim(null),
    });
  };

  const [detail, setDetail] = useState<DetailData | null>(null);

  useEffect(() => {
    // console.log(detail);
  }, [detail]);

  const onAddAction = (data: DetailData) => {
    setDetail(data);
  };

  const columns = [
    { field: "", label: "No", func: (obj: any) => obj.index + 1 },
    { field: "kode", label: "Kode", sort: true },
    { field: "nama", label: "Nama", sort: true },
    { field: "alamat", label: "Alamat" },
    // {
    //   field: '',
    //   label: 'Action',
    //   w: '100px',
    //   func: ({ row }: any) => {
    //     return (
    //       <div className='flex gap-1'>
    //         <div className='tooltip' data-tip='Edit'>
    //           <button
    //             className='btn btn-sm btn-info'
    //             onClick={() => setDetail({ action: 'view', data: row })}
    //           >
    //             <IoEyeSharp />{' '}
    //           </button>
    //         </div>
    //         <div className='tooltip' data-tip='Edit'>
    //           <button className='btn btn-sm btn-accent'>
    //             <IoPencilSharp />{' '}
    //           </button>
    //         </div>
    //         <div className='tooltip' data-tip='Hapus'>
    //           <button className='btn btn-sm btn-error'>
    //             <IoTrashBinSharp />{' '}
    //           </button>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
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
          {detail ? (
            detail.action === "add" || detail.action === "edit" ? (
              <Form action={detail.action} data={detail.data} />
            ) : (
              <Detail
                data={detail.data}
                setDetail={setDetail}
                onDeletePress={onDeletePress}
              />
            )
          ) : (
            ""
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
            rowEvent={setDetail}
            loading={loading}
          />
          <ModalConfirm {...modalConfirm} show={modalConfirm !== null} />
        </div>
      </div>
    </div>
  );
};

export default CabangPage;
