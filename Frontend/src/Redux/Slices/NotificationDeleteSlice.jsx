import { createAsyncThunk } from "@reduxjs/toolkit";
export const DeleteNotification = createAsyncThunk(
  "NotiDeletion",
  async (Id) => {
    console.log("Deleting notification with id:", Id); // ← add this

    await fetch(`http://localhost:5194/api/Notification?id=${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete notification");
    }
    return Id;
    s;
  },
);
