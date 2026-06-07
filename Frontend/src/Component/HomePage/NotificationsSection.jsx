import react from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetNotficationData } from "../../Redux/Slices/GetNotificationSlice";
import { formatDistanceToNow } from "date-fns";

export function NotificationsSection() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetNotficationData());
  }, [dispatch]);

  const SelectNotifications = useSelector(
    (state) => state.notification.GetNotficationData || [],
  );
  const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="bg-white rounded-4xl shadow-md p-6 w-110 h-140 fixed overflow-hidden  right-2">
      <div className=" mb-8">
        <h2 className="text-xl font-semibold   text-[#0c2b78] ">
          Notifications
        </h2>
      </div>

      <div className="space-y-2 flex flex-col gap-2">
        {SelectNotifications.map((notification, index) => (
          <div
            className="p-1 bg-gray-100 rounded-2xl flex gap-5 items-center cursor-pointer shadow-md h-auto pt-2  "
            key={index}
          >
            <div>
              <img
                className="  w-10 h-10  flex justify-center items-center rounded-full ml-2 bg-white"
                src={notification.senderPfp}
              />
            </div>
            <div className=" flex flex-col  ">
              <p className="text-sm leading-tight">
                <span className="font-bold text-[#3c5db2]">
                  {notification.senderName}
                </span>
                {"  "}
                {notification.message}
              </p>

              <p className="text-xs stat-title leading-none">
                {timeAgo(notification.sentAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsSection;
