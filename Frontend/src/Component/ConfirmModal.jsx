import { useSelector } from "react-redux";
import { CloseModal } from "../Redux/Slices/ModalSlice";
import { useDispatch } from "react-redux";

export function ConfirmModal({ modalName, Title, Message, OnConfirm }) {
  const { Item } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  if (Item != modalName) return null;
  return (
    <div className="fixed inset-0  bg-black/40 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-md p-6 shadow-xl w-80 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#0c2b78">{Title}</h3>
        <p className="text-sm text-gray-500">{Message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => dispatch(CloseModal())}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 cursor-pointer"
            type="button"
          >
            Never mind
          </button>
          <button
            onClick={() => {
              OnConfirm();
              dispatch(CloseModal());
            }}
            className="px-4 py-2 rounded-lg bg-[#0c2b78] text-white text-sm hover:bg-[#0c2b78] active:scale-95 transition cursor-pointer"
            type="button"
          >
            Let's do it
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
