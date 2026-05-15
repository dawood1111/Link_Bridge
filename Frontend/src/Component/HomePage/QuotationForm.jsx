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
import { QuotationFormSchema } from "../../Schema/Schema";
import { useFormik } from "formik";

export function QuotationPage() {
  const location = useLocation();
  const item = location.state?.item;

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
  const OnSubmit = () => {};

  const HandleConfirm = async () => {
    const DataForm = {
      ...values,
      UserId: item?.userId,
      ProjectId: item?.id,
    };

    const result = await Dispatch(PostData(DataForm));

    if (PostData.fulfilled.match(result)) {
      Navigate("/MainPage/HomePage");
    }

    Dispatch(CloseConfirm());
  };

  const AddFinancialItems = () => {
    const newItem = {
      itemNo: values.financialItems.length + 1,
      description: "",
      unit: "pcs",
      quantity: 1,
      unitPrice: 0,
    };
    setFieldValue("financialItems", [...values.financialItems, newItem]);
  };
  const { errors, values, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        projectName: "",
        description: "",
        budget: "",
        deadline: "",
        companyHistory: "",
        clientCompany: "",
        keyAchievements: [""],
        financialItems: [
          {
            itemNo: "1",
            description: "",
            unit: "pcs",
            quantity: 1,
            unitPrice: 0,
          },
        ],
        paymentTerms: "",
        deliveryTimeline: "",
        termsAndConditions: "",
        notes: "",
      },
      validationSchema: QuotationFormSchema,

      onSubmit: (values) => {
        Dispatch(OpenConfirm({}));
      },
    });
  const HandleDelete = (index) => {
    //splice the financial items array to remove the item at the specified index and should create copy of the array
    const UpdateFinancial = [...values.financialItems];
    UpdateFinancial.splice(index, 1);
    setFieldValue("financialItems", UpdateFinancial);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <form action="" onSubmit={handleSubmit}>
        <div className="bg-white   w-260  max-h-[96vh] overflow-hidden mt-5 shadow-sm flex flex-col  justify-center rounded-sm   z-50">
          {/* HEADER SECTION */}
          <div className="p-4 bg-white border-none flex justify-between items-end">
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
                  name="companyHistory"
                  placeholder="Company History"
                  className="w-full  bg-gray-100 h-30  pl-3 pr-3 pt-2 pb-2 border-none rounded-sm focus:ring-2 ring-slate-800 outline-none transition  text-sm"
                  value={values.companyHistory}
                  onChange={handleChange}
                />
                {errors.companyHistory && (
                  <p className="text-red-500 text-xs">
                    {errors.companyHistory}
                  </p>
                )}
              </div>

              {/* Right Column: Key Achievements & Client */}
              <div className="space-y-4 ">
                <p className="flex items-center gap-2  text-[#0c2b78]  pb-2 font-bold ml-2">
                  <FaGlobe /> CLIENT & ACHIEVEMENTS
                </p>
                <input
                  name="clientCompany"
                  placeholder="Client Company"
                  className="w-full bg-gray-100 pl-3 pr-3 pt-2 pb-2 border-none rounded-sm focus:ring-2 ring-slate-800 outline-none transition"
                  value={values.clientCompany}
                  onChange={handleChange}
                />
                {errors.clientCompany && (
                  <p className="text-red-500 text-xs">{errors.clientCompany}</p>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Key Achievements
                  </label>
                  <div className="flex gap-2">
                    <input
                      name="keyAchievements"
                      placeholder="e.g. ISO 9001 Certified"
                      className="flex-1 bg-gray-100 p-2 text-sm border-none rounded-md outline-none"
                      onChange={handleChange}
                    />

                    <button
                      className="bg-slate-200 p-2 rounded hover:bg-slate-300 transition text-slate-600 block cursor-pointer"
                      type="button"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                  {errors.keyAchievements && (
                    <p className="text-red-500 text-xs ">
                      {errors.keyAchievements}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: FINANCIAL ITEMS TABLE */}
            <div className="space-y-3 ">
              <p className="flex items-center gap-2 font-bold  text-[#0c2b78] pb-2 uppercase  tracking-wider ml-4">
                <FaFileInvoiceDollar className="bg-whit text-[#0c2b78]" />{" "}
                Financial Breakdown
              </p>

              <div className="bg-white  shadow-sm border-none overflow-hidden  flex justify-center items-center flex-col">
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
                    {values.financialItems.map((item, index) => (
                      <tr
                        className="hover:bg-slate-50/50 transition"
                        key={index}
                      >
                        {/* Item Number */}
                        <td className="px-4 py-3 text-center font-mono">
                          {item.itemNo}
                        </td>

                        {/* Description */}
                        <td className="px-4 py-3">
                          <input
                            name="description"
                            className="w-full bg-transparent outline-none font-medium border-none"
                            placeholder="Project Description..."
                            value={values.financialItems[index].description}
                            name={`financialItems[${index}].description`}
                            onChange={handleChange}
                          />
                          {errors.financialItems?.[index]?.description && (
                            <p className="text-red-500 text-xs">
                              {errors.financialItems?.[index]?.description}
                            </p>
                          )}
                        </td>

                        {/* Unit */}
                        <td className="px-4 py-3">
                          <input
                            name={`financialItems[${index}].unit`}
                            className="w-full bg-transparent outline-none"
                            placeholder="e.g. M2"
                            value={values.financialItems[index].unit}
                            onChange={handleChange}
                          />
                          {errors.financialItems?.[index]?.unit && (
                            <p className="text-red-500 text-xs">
                              {errors.financialItems?.[index]?.unit}
                            </p>
                          )}
                        </td>

                        {/* Quantity */}
                        <td className="px-4 py-3">
                          <input
                            name={`financialItems[${index}].quantity`}
                            className="w-full bg-transparent outline-none text-center"
                            placeholder="0"
                            value={values.financialItems[index].quantity}
                            onChange={handleChange}
                          />
                          {errors.financialItems?.[index]?.quantity && (
                            <p className="text-red-500 text-xs">
                              {errors.financialItems?.[index]?.quantity}
                            </p>
                          )}
                        </td>

                        {/* Price */}
                        <td className="px-4 py-3 font-mono font-bold">
                          <input
                            name="unitPrice"
                            className="w-full bg-transparent outline-none"
                            placeholder="0.00"
                            value={values.financialItems[index].unitPrice}
                            onChange={handleChange}
                          />
                          {errors.financialItems?.[index]?.unitPrice && (
                            <p className="text-red-500 text-xs">
                              {errors.financialItems?.[index]?.unitPrice}
                            </p>
                          )}
                        </td>

                        {/* Delete Button */}
                        <td className="px-4 py-3">
                          <button
                            className="text-slate-300 hover:text-red-500 transition cursor-pointer"
                            type="button"
                            onClick={() => HandleDelete(index)}
                          >
                            <FaTrash size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  className="w-full py-4 text-xs font-bold text-slate-400 hover:text-white hover:bg-gray-300 cursor-pointer transition border-t border-dashed uppercase tracking-widest flex items-center justify-center gap-2"
                  onClick={AddFinancialItems}
                >
                  <FaPlus size={10} /> Add Line Item
                </button>
              </div>
            </div>

            {/* SECTION 3: TERMS & ADDITIONAL INFO */}
            <div className="grid grid-cols-2 gap-1">
              <div className=" ">
                <p className="flex items-center gap-2 font-bold text-[#0c2b78]  pb-2 uppercase">
                  <FaRegHandshake /> Delivery & Payment
                </p>
                <textarea
                  placeholder="Payment Terms..."
                  className="w-120 bg-gray-100 p-3 border-none rounded-sm h-14 text-sm"
                  name="paymentTerms"
                  value={values.paymentTerms}
                  onChange={handleChange}
                />
                {errors.paymentTerms && (
                  <p className="text-red-500 text-xs">{errors.paymentTerms}</p>
                )}
                <textarea
                  placeholder="Delivery Timeline..."
                  className="w-120 bg-gray-100 p-3 border-none rounded-sm h-14 text-sm "
                  value={values.deliveryTimeline}
                  name="deliveryTimeline"
                  onChange={handleChange}
                />
                {errors.deliveryTimeline && (
                  <p className="text-red-500 text-xs">
                    {errors.deliveryTimeline}
                  </p>
                )}
              </div>
              <div className="  ">
                <p className="flex items-center gap-2 font-bold text-[#0c2b78]  pb-2 uppercase">
                  <FaRegHandshake /> Terms & Conditions / Notes
                </p>
                <textarea
                  placeholder="Terms and Conditions..."
                  className="w-120 bg-gray-100 p-3 border-none rounded-sm h-14 text-sm"
                  name="termsAndConditions"
                  value={values.termsAndConditions}
                  onChange={handleChange}
                />
                {errors.termsAndConditions && (
                  <p className="text-red-500 text-xs">
                    {errors.termsAndConditions}
                  </p>
                )}
                <textarea
                  placeholder="Extra Notes..."
                  className="w-120 bg-gray-100 p-3 border-none rounded-sm max-h-14 h-14 text-sm"
                  value={values.notes}
                  onChange={handleChange}
                />
                {errors.notes && (
                  <p className="text-red-500 text-xs">{errors.notes}</p>
                )}
              </div>
            </div>
          </div>

          {/* BOTTOM SUMMARY FOOTER */}
          <div className="p-3  bg-[#0c2b78] text-white flex justify-between items-center rounded-b-sm">
            <div className="flex gap-5 justify-center   ">
              <p className="text-[16px] text-white  uppercase ">Grand Total</p>
              <div className="text-[16px] font-black font-mono ">
                0.00{" "}
                <span className="text-[16px] font-normal text-white">USD</span>
              </div>
            </div>
            <button
              type="submit"
              className="  bg-white text-[#0c2b78]   pl-6 pr-6 pt-2 pb-2 rounded-sm font-black  shadow-xl  active:scale-95 transition transform cursor-pointer"
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
      </form>
    </div>
  );
}

export default QuotationPage;
