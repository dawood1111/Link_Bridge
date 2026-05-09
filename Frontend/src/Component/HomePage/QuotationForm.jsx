import React, { Component } from "react";
import { useSelector } from "react-redux";
import {
  CloseModal,
  OpenConfirm,
  CloseConfirm,
} from "../../Redux/Slices/ModalSlice";
import { useDispatch } from "react-redux";
import {
  FaBuilding,
  FaFileInvoiceDollar,
  FaRegHandshake,
  FaGlobe,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useState } from "react";
import { PostData } from "../../Redux/Slices/PostQuotationSlice";
import { Confirm } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";

export function QuotationPage() {
  const location = useLocation();
  const item = location.state?.item;
  console.log(item);
  const Dispatch = useDispatch();
  const ModalState = useSelector((state) => state.modal || {});

  const [formData, setFormData] = useState({
    quotationNumber: "",
    date: new Date().toISOString().split("T")[0],
    companyName: "",
    companyEmail: "",
    clientCompany: "",
    companyHistory: "",
    keyAchievements: [""],
    financialItems: [
      { itemNo: "1", description: "", unit: "pcs", quantity: 1, unitPrice: 0 },
    ],
    paymentTerms: "",
    deliveryTimeline: "",
    termsAndConditions: "",
    notes: "",
    discountPercentage: 0,
    taxPercentage: 15,
    taxLabel: "VAT",
    currency: "USD",
    pdFurl: "",
    AboutCompaniesId: null,
  });
  const Navigate = useNavigate();
  const HandleSubmit = () => {
    Dispatch(OpenConfirm({}));
  };

  const HandleConfirm = async () => {
    const DataForm = {
      ...formData,
      UserId: item?.userId,
      ProjectId: item?.id,
    };
    console.log("id", DataForm.ProjectId, "userId", DataForm.UserId);
    const result = await Dispatch(PostData(DataForm));

    if (PostData.fulfilled.match(result)) {
      Navigate("/MainPage/HomePage");
    }

    Dispatch(CloseConfirm());
  };

  const AddFinancialItems = () => {
    setFormData((prev) => ({
      ...prev,
      financialItems: [
        ...prev.financialItems,
        {
          itemNo: (prev.financialItems.length + 1).toString().padStart(2, "0"),
          description: "",
          unit: "pcs",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    }));
  };

  //if (!ModalState.isOpen) {
  //return null;
  // }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white   w-350  max-h-[96vh] overflow-hidden  shadow-sm flex flex-col  justify-center   z-50">
        {/* HEADER SECTION */}
        <div className="p-6 bg-white border-none flex justify-between items-end">
          <div>
            <h2 className="font-bold  text-[#0c2b78] tracking-tight">
              QUOTATION
            </h2>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 justify-end text-sm"></div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="p-8 overflow-y-auto flex-1 space-y-8 glass">
          {/* ROW 1: COMPANY & CLIENT PROFILES */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Your Company */}
            <div className="space-y-4">
              <p className="flex items-center gap-2  text-[#0c2b78]  pb-2 ml-2 font-bold">
                <FaBuilding /> FROM (SENDER)
              </p>

              <textarea
                placeholder="Company History"
                className="w-full  bg-gray-100  pl-3 pr-3 pt-2 pb-2 border-none rounded-sm focus:ring-2 ring-slate-800 outline-none transition  text-sm"
                value={formData.companyHistory}
                onChange={(e) =>
                  setFormData({ ...formData, companyHistory: e.target.value })
                }
              />
            </div>

            {/* Right Column: Key Achievements & Client */}
            <div className="space-y-4 ">
              <p className="flex items-center gap-2  text-[#0c2b78]  pb-2 font-bold ml-2">
                <FaGlobe /> CLIENT & ACHIEVEMENTS
              </p>
              <input
                placeholder="Client Company"
                className="w-full bg-gray-100 pl-3 pr-3 pt-2 pb-2 border-none rounded-sm focus:ring-2 ring-slate-800 outline-none transition"
                value={formData.clientCompany}
                onChange={(e) =>
                  setFormData({ ...formData, clientCompany: e.target.value })
                }
              />
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Key Achievements
                </label>
                <div className="flex gap-2">
                  <input
                    placeholder="e.g. ISO 9001 Certified"
                    className="flex-1 bg-gray-100 p-2 text-sm border-none rounded-md outline-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        keyAchievements: [e.target.value],
                      })
                    }
                  />
                  <button className="bg-slate-200 p-2 rounded hover:bg-slate-300 transition text-slate-600">
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: FINANCIAL ITEMS TABLE */}
          <div className="space-y-3 ">
            <p className="flex items-center gap-2 font-bold  text-[#0c2b78] pb-2 uppercase  tracking-wider ml-4">
              <FaFileInvoiceDollar className="bg-whit text-[#0c2b78]" />{" "}
              Financial Breakdown
            </p>

            <div className="bg-white rounded-sm shadow-sm border-none overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 border-b text-[11px] font-black text-[#0c2b78] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-center w-19">Item #</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3 w-24">Unit</th>
                    <th className="px-4 py-3 w-24 text-center">Qty</th>
                    <th className="px-4 py-3 w-32">Unit Price</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {formData.financialItems.map((item, index) => (
                    <tr className="hover:bg-slate-50/50 transition" key={index}>
                      {/* Item Number */}
                      <td className="px-4 py-3 text-center font-mono">
                        {item.itemNo}
                      </td>

                      {/* Description */}
                      <td className="px-4 py-3">
                        <input
                          className="w-full bg-transparent outline-none font-medium border-none"
                          placeholder="Project Description..."
                          value={item.description}
                          onChange={(e) => {
                            const updatedItems = [...formData.financialItems];
                            updatedItems[index].description = e.target.value;
                            setFormData({
                              ...formData,
                              financialItems: updatedItems,
                            });
                          }}
                        />
                      </td>

                      {/* Unit */}
                      <td className="px-4 py-3">
                        <input
                          className="w-full bg-transparent outline-none"
                          placeholder="e.g. M2"
                          value={item.unit}
                          onChange={(e) => {
                            const updatedItems = [...formData.financialItems];
                            updatedItems[index].unit = e.target.value;
                            setFormData({
                              ...formData,
                              financialItems: updatedItems,
                            });
                          }}
                        />
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-3">
                        <input
                          className="w-full bg-transparent outline-none text-center"
                          placeholder="0"
                          value={item.quantity}
                          onChange={(e) => {
                            const updateItems = [...formData.financialItems];
                            updateItems[index].quantity = e.target.value;
                            setFormData({
                              ...formData,
                              financialItems: updateItems,
                            });
                          }}
                        />
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3 font-mono font-bold">
                        <input
                          className="w-full bg-transparent outline-none"
                          placeholder="0.00"
                          value={item.unitPrice}
                          onChange={(e) => {
                            const updateItems = [...formData.financialItems];
                            updateItems[index].unitPrice = e.target.value;
                            setFormData({
                              ...formData,
                              financialItems: updateItems,
                            });
                          }}
                        />
                      </td>

                      {/* Delete Button */}
                      <td className="px-4 py-3">
                        <button className="text-slate-300 hover:text-red-500 transition">
                          <FaTrash size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="w-full py-4 text-xs font-bold text-slate-400 hover:text-white hover:bg-gray-300 cursor-pointer transition border-t border-dashed uppercase tracking-widest flex items-center justify-center gap-2"
                onClick={AddFinancialItems}
              >
                <FaPlus size={10} /> Add Line Item
              </button>
            </div>
          </div>

          {/* SECTION 3: TERMS & ADDITIONAL INFO */}
          <div className="grid grid-cols-2 gap-3">
            <div className=" space-y-4">
              <p className="flex items-center gap-2 font-bold text-[#0c2b78]  pb-2 uppercase">
                <FaRegHandshake /> Delivery & Payment
              </p>
              <textarea
                placeholder="Payment Terms..."
                className="w-full bg-gray-100 p-3 border-none rounded-lg h-24 text-sm"
                value={formData.paymentTerms}
                onChange={(e) =>
                  setFormData({ ...formData, paymentTerms: e.target.value })
                }
              />
              <textarea
                placeholder="Delivery Timeline..."
                className="w-full bg-gray-100 p-3 border-none rounded-lg h-24 text-sm "
                value={formData.deliveryTimeline}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryTimeline: e.target.value })
                }
              />
            </div>
            <div className=" space-y-4 ">
              <p className="flex items-center gap-2 font-bold text-[#0c2b78]  pb-2 uppercase">
                <FaRegHandshake /> Terms & Conditions / Notes
              </p>
              <textarea
                placeholder="Terms and Conditions..."
                className="w-full bg-gray-100 p-3 border-none rounded-lg h-24 text-sm"
                value={formData.termsAndConditions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    termsAndConditions: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Extra Notes..."
                className="w-full bg-gray-100 p-3 border-none rounded-lg h-24 text-sm"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SUMMARY FOOTER */}
        <div className="p-4  bg-[#0c2b78] text-white flex justify-between items-center rounded-b-sm">
          <div className="flex gap-5 justify-center   ">
            <p className="text-[16px] text-white  uppercase ">Grand Total</p>
            <div className="text-[16px] font-black font-mono ">
              0.00{" "}
              <span className="text-[16px] font-normal text-white">USD</span>
            </div>
          </div>
          <button
            className="  bg-white text-[#0c2b78]  pl-6 pr-6 pt-2 pb-2 rounded-sm font-black  shadow-xl  active:scale-95 transition transform"
            onClick={HandleSubmit}
          >
            Submit
          </button>
        </div>
        {ModalState.Confirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-xl p-6 shadow-xl w-80 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-[#0c2b78">
                Submit Quotation
              </h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to submit this quotation?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => Dispatch(CloseConfirm())}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50"
                >
                  Never mind
                </button>
                <button
                  onClick={HandleConfirm}
                  className="px-4 py-2 rounded-lg bg-[#0c2b78] text-white text-sm hover:bg-[#0c2b78] active:scale-95 transition"
                >
                  Let's do it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuotationPage;
