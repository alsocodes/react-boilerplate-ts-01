import React, { FC } from "react";

interface Props {
  title: string;
  message: string;
  action: any;
  cancel?: any;
  show: boolean;
}

const ModalConfirm: FC<Props> = ({ title, message, action, cancel, show }) => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="modal-confirm"
        className="modal-toggle"
        checked={show}
        onChange={() => console.log("")}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={() => cancel()}
            htmlFor="modal-confirm"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-error">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="flex justify-between">
            <button className="btn btn-md" onClick={() => cancel()}>
              Batal
            </button>
            <button className="btn btn-error btn-md" onClick={() => action()}>
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
