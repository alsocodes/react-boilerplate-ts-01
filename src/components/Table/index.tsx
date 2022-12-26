import React, { FC, useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import SortableTH from "../SortableTH";

interface Props {
  zebra?: boolean;
  compact?: boolean;
  server?: boolean;
  hover?: boolean;
  columns: any[];
  data: any[];
  pagination: boolean;
  count?: number;
  params?: any;
  onChange?: any;
  addAction?: any;
  loading?: boolean;
  rowEvent?: any;
}

const sizes = [10, 20, 50, 100];
const Table: FC<Props> = ({
  zebra,
  compact,
  hover,
  data,
  columns,
  server,
  pagination,
  count = 1,
  params,
  onChange,
  addAction,
  loading,
  rowEvent,
}) => {
  const { search, page, size, orderBy, order } = params;
  const pageingButtons = paginationGenerator(page, Math.ceil(count / size));

  const showFrom = (page - 1) * size;
  const showTo = Math.min(showFrom + size, count - showFrom);
  const [onTypeSearch, setOnTypeSearch] = useState<string | null>();

  useEffect(() => {
    if (onTypeSearch === undefined) return;
    const timeOutId = setTimeout(
      () => onParamChange({ search: onTypeSearch }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [onTypeSearch]);

  const onParamChange = (data: any) => {
    if (loading) return;
    onChange(data);
  };

  const onRowClick = (data: any) => {
    if (typeof rowEvent === "function") {
      rowEvent({ action: "view", data });
    }
  };

  return (
    <div className="overflow-x-auto h-100">
      <div className="flex justify-between mb-2 p-1">
        {typeof search !== "undefined" && (
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onParamChange({ search: onTypeSearch });
              }
            }}
            onChange={(e) => setOnTypeSearch(e.target.value)}
            type="text"
            placeholder="Pencarian"
            className="input input-bordered w-full max-w-sm"
          />
        )}
        {typeof addAction !== "undefined" && (
          <div className="self-end">
            <button
              onClick={() => addAction({ action: "add", data: null })}
              className="btn btn-primary btn-md"
            >
              Tambah
            </button>
          </div>
        )}
      </div>
      <table
        className={`table w-full ${zebra && "table-zebra"} ${
          compact && "table-compact"
        }`}
      >
        <thead>
          <tr>
            {columns?.map(({ label, sort, field }, i) => {
              return (
                <th className="py-4" key={`th-${i}`}>
                  {sort ? (
                    <SortableTH
                      field={field}
                      active={orderBy === field}
                      mode={order}
                      label={label}
                      toggle={(data: any) => onParamChange({ ...data })}
                    />
                  ) : (
                    label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="relative">
          {data?.length < 1 ? (
            <tr>
              <td className="p-4 text-center" colSpan={columns.length}>
                Tidak ada data
              </td>
            </tr>
          ) : (
            data?.map((row, index) => {
              return (
                <tr
                  onClick={() => onRowClick(row)}
                  key={`row-${index}`}
                  className={`${hover && "hover"}`}
                >
                  {columns.map((c, ii) => {
                    const { field, func, w } = c;
                    const value =
                      typeof func === "function"
                        ? func({ value: row[field], row, index })
                        : row[field];
                    return (
                      <td
                        key={`row-${index}-${ii}`}
                        className={`${w && `w-[${w}]`}`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="my-2 flex justify-between px-1">
        <div className="flex justify-center align-middle">
          <div className="btn-group">
            {pageingButtons.map((p: any, i: number) => {
              const active = p === page ? "btn-active" : "";
              return (
                <button key={`p-${i}`} className={`btn btn-md ${active}`}>
                  {p}
                </button>
              );
            })}
          </div>
          <div className="px-4 py-2">
            Menampilkan {showFrom + 1} - {showTo} dari {count}
          </div>
        </div>
        <select
          className="select select-md w-20"
          defaultValue={size}
          onChange={(e) => onParamChange({ size: Number(e.target.value) })}
        >
          {sizes.map((s: number) => {
            return <option key={s}>{s}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

const paginationGenerator = (current: number, last: number, width = 2) => {
  const left = current - width;
  const right = current + width + 1;
  const range = [];
  const rangeWithDots: any = [];
  let l: number;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i <= right)) {
      range.push(i);
    } else if (i < left) {
      i = left - 1;
    } else if (i > right) {
      range.push(last);
      break;
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};

export default Table;
