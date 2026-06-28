import { useSelector } from "react-redux";
export function DeleteModal({ onConfirm, modalName }) {
  const { Item } = useSelector((state) => state.modal);
  if (Item != modalName) return null;
  return (
    <div className="bg-white rounded-md z-50   shadow-sm fixed">
      <button
        className="hover:bg-gray-100 text-red-600 w-40  cursor-pointer pt-2 pb-2"
        onClick={onConfirm}
      >
        Delete
      </button>
    </div>
  );
}
export default DeleteModal;
