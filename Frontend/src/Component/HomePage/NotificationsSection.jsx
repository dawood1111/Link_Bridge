import react from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetNotficationData } from "../../Redux/Slices/GetNotificationSlice";
import { formatDistanceToNow } from "date-fns";
import { DeleteModal } from "../../Component/deleteModal";
import { Icon } from "semantic-ui-react";
import { OpenConfirm, OpenModal } from "../../Redux/Slices/ModalSlice";
import { DeleteNotification } from "../../Redux/Slices/NotificationDeleteSlice";

export function NotificationsSection() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetNotficationData());
  }, [dispatch]);
  const [OpenDelete, SetOpenDelete] = useState("");
  const SelectNotifications = useSelector(
    (state) => state.notification.GetNotficationData || [],
  );
  const [SelectedId, SetSelectedId] = useState(null);
  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="bg-white rounded-4xl fixed top-65 right-3 shadow-md p-6 w-110 h-140 overflow-x-scroll">
      <div className=" mb-8">
        <h2 className="text-xl font-semibold   text-[#0c2b78] ">
          Notifications
        </h2>
      </div>

      <div className="space-y-2 flex flex-col gap-2">
        {SelectNotifications.map((notification, index) => (
          <div
            className="p-1 bg-gray-100 rounded-2xl flex  items-center cursor-pointer shadow-md min-h-14   pt-2  justify-between "
            key={index}
          >
            <div className="shrink-0">
              <img
                className="  w-10 h-10  flex justify-center items-center rounded-full ml-2 bg-white"
                src={notification.senderPfp}
              />
            </div>
            <div className=" flex flex-col  ">
              <p className="text-sm leading-tight line-clamp-1 ">
                <span className="font-bold text-[#3c5db2]">
                  {notification.senderName}
                </span>
                {"  "}
                {notification.message}
              </p>

              <p className="text-xs stat-title leading-none ">
                {timeAgo(notification.sentAt)}
              </p>
            </div>
            <div className="relative">
              <button
                className=" hover:bg-black/6 p-1 rounded-full flex justify-center cursor-pointer "
                onClick={() => {
                  dispatch(OpenModal("DeleteModal"));
                  SetSelectedId(notification.id);
                  SetOpenDelete(index);
                }}
              >
                <Icon name="ellipsis vertical" className="text-gray-500" />
              </button>
              {index === OpenDelete && (
                <DeleteModal
                  modalName={"DeleteModal"}
                  onConfirm={() =>
                    dispatch(DeleteNotification(SelectedId)).then(() => {
                      dispatch(GetNotficationData());
                      SetOpenDelete(null);
                    })
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsSection;
