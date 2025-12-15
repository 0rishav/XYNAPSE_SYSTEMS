import React, { useState } from "react";

const EditOfferModal = ({ isOpen, onClose, intern, onSave }) => {
  const [formData, setFormData] = useState({
    date: intern.offerLetterData?.date || "",
    startDate: intern.offerLetterData?.startDate || "",
    endDate: intern.offerLetterData?.endDate || "",
    duration: intern.offerLetterData?.duration || "",
    location: intern.offerLetterData?.location || "",
    reportingManager: intern.offerLetterData?.reportingManager || "",
    stipend: intern.offerLetterData?.stipend || "",
    workingHours: intern.offerLetterData?.workingHours || "",
    responsibilities:
      intern.offerLetterData?.responsibilities?.length > 0
        ? intern.offerLetterData.responsibilities
        : [""], // ← minimum 1 input
    completionBenefits:
      intern.offerLetterData?.completionBenefits?.length > 0
        ? intern.offerLetterData.completionBenefits
        : [""],
    notes:
      intern.offerLetterData?.notes?.length > 0
        ? intern.offerLetterData.notes
        : [""],
    signatoryName: intern.offerLetterData?.signatoryName || "",
    signatoryDesignation: intern.offerLetterData?.signatoryDesignation || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, index, value) => {
    const arr = [...formData[name]];
    arr[index] = value;
    setFormData((prev) => ({ ...prev, [name]: arr }));
  };

  const addArrayItem = (name) => {
    setFormData((prev) => ({ ...prev, [name]: [...prev[name], ""] }));
  };

  const removeArrayItem = (name, index) => {
    const arr = [...formData[name]];
    arr.splice(index, 1);
    setFormData((prev) => ({ ...prev, [name]: arr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Offer Letter</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Other Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 3 months"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Remote / Office"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reporting Manager
              </label>
              <input
                type="text"
                name="reportingManager"
                value={formData.reportingManager}
                onChange={handleChange}
                placeholder="Manager Name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stipend
              </label>
              <input
                type="text"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                placeholder="e.g., $500/month"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Responsibilities
            </label>
            {formData.responsibilities.map((res, idx) => (
              <div key={idx} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={res}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleArrayChange("responsibilities", idx, e.target.value);
                  }}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-gray-900"
                  placeholder={`Responsibility #${idx + 1}`}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeArrayItem("responsibilities", idx);
                  }}
                  className="bg-red-500 text-white px-2 rounded-md"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addArrayItem("responsibilities");
              }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              + Add Responsibility
            </button>
          </div>

          {/* Working Hours */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Working Hours
            </label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => {
                e.stopPropagation();
                setFormData({ ...formData, workingHours: e.target.value });
              }}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900 mt-1"
              placeholder="e.g. 10:00 AM – 5:00 PM (Monday to Friday)"
            />
          </div>

          {/* Completion Benefits */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Completion Benefits
            </label>

            {formData.completionBenefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleArrayChange(
                      "completionBenefits",
                      idx,
                      e.target.value
                    );
                  }}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-gray-900"
                  placeholder={`Benefit #${idx + 1}`}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeArrayItem("completionBenefits", idx);
                  }}
                  className="bg-red-500 text-white px-2 rounded-md"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addArrayItem("completionBenefits");
              }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              + Add Benefit
            </button>
          </div>

          {/* Notes */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>

            {formData.notes.map((note, idx) => (
              <div key={idx} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleArrayChange("notes", idx, e.target.value);
                  }}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-gray-900"
                  placeholder={`Note #${idx + 1}`}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeArrayItem("notes", idx);
                  }}
                  className="bg-red-500 text-white px-2 rounded-md"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addArrayItem("notes");
              }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              + Add Note
            </button>
          </div>

          {/* Signatory Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Signatory Name
              </label>
              <input
                type="text"
                name="signatoryName"
                value={formData.signatoryName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Signatory Designation
              </label>
              <input
                type="text"
                name="signatoryDesignation"
                value={formData.signatoryDesignation}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-4 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOfferModal;
