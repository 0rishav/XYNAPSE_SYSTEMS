import Select from "react-select";

export default function FormModal({
  modalOpen,
  modalBranch,
  closeModal,
  submitForm,
  formData,
  handleFormChange,
  loading,
  courses,
}) {
  if (!modalOpen) return null;

  const selectStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: state.isFocused
        ? document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#f0f9ff"
        : document.documentElement.classList.contains("dark")
        ? "#111827"
        : "#fff",
      borderColor: state.isFocused
        ? "#0ea5e9"
        : document.documentElement.classList.contains("dark")
        ? "#374151"
        : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #0ea5e9" : "none",
      minHeight: 42,
      borderRadius: 8,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: document.documentElement.classList.contains("dark")
        ? "#f9fafb"
        : "#111827",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: document.documentElement.classList.contains("dark")
        ? "#9ca3af"
        : "#6b7280",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#fff",
      zIndex: 50,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused
        ? document.documentElement.classList.contains("dark")
          ? "rgba(14,165,233,0.3)"
          : "#bae6fd"
        : isSelected
        ? document.documentElement.classList.contains("dark")
          ? "rgba(14,165,233,0.5)"
          : "#7dd3fc"
        : "transparent",
      color: document.documentElement.classList.contains("dark")
        ? "#f9fafb"
        : "#111827",
      cursor: "pointer",
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
        aria-hidden
      />

      {/* Modal container */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900 transform transition-all scale-100 sm:scale-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Enroll - {modalBranch?.name}
          </h3>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                placeholder="123-456-7890"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                name="city"
                value={formData.city || ""}
                onChange={handleFormChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                placeholder="Your city"
              />
            </div>

            {/* Course */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Course
              </label>
              <Select
                value={courses.find((c) => c.value === formData.course) || null}
                onChange={(selected) =>
                  handleFormChange({
                    target: { name: "course", value: selected?.value },
                  })
                }
                options={courses}
                placeholder="Select a course"
                styles={selectStyles}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`rounded-lg px-5 py-2 text-sm font-semibold text-white shadow-md transition
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-sky-500 to-blue-600 hover:shadow-lg hover:from-sky-600 hover:to-blue-700"
      }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
