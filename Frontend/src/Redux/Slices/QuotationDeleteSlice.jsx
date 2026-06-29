import { createAsyncThunk } from "@reduxjs/toolkit";
export const DeleteQuotationRequest = createAsyncThunk(
  "QuotationDelete",
  async (Id) => {
    console.log("Deleting Quotation Request with id:", Id);

    await fetch(
      `http://localhost:5194/api/quotations/DeleteQuotationsRequest?id=${Id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to delete Quotation Request");
    }
    return Id;
  },
);
