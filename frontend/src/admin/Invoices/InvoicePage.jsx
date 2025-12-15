import { useEffect, useState } from "react";
import invoiceService from "../../services/invoiceService";
import Modal from "./Modal";
import authService from "../../services/authService";
import courseService from "../../services/courseService";
import axiosInstance from "../../utils/axiosInstance";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    instructorId: "",
    paymentMode: "Cash",
    courseFee: "",
    discount: "",
    taxes: {
      cgst: "",
      sgst: "",
      igst: "",
      otherTaxes: "",
    },
    notes: "",
  });

  useEffect(() => {
    fetchInvoices();
    fetchStudents();
    fetchCourses();
    fetchInstructors();
  }, [currentPage]);

  const fetchStudents = async () => {
    try {
      const response = await authService.getAllUsers();
      setStudents(
        response.data.filter((user) => user.role === "student") || []
      );
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await authService.getAllUsers();
      setInstructors(
        response.data.filter((user) => user.role === "instructor") || []
      );
    } catch (err) {
      console.error("Failed to fetch instructors:", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAllCourses();
      setCourses(response.data || []);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await invoiceService.getAllInvoices({
        page: currentPage,
        limit,
        search: searchTerm,
      });
      setInvoices(response.invoices || []);
      setTotalPages(Math.ceil(response.total / limit) || 1);
    } catch (err) {
      console.error("Failed to fetch invoices:", err);
      setError("Failed to load invoices. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      const { data } = await axiosInstance.patch(
        `/invoice/update-payment-status/${invoiceId}`,
        {
          paymentStatus: newStatus,
        }
      );

      if (data.success) {
        setInvoices((prev) =>
          prev.map((inv) =>
            inv._id === invoiceId ? { ...inv, paymentStatus: newStatus } : inv
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status. Try again!");
    }
  };

  const handleDelete = async (invoiceId) => {
    try {
      await invoiceService.deleteInvoice(invoiceId);
      // Refresh the list
      fetchInvoices();
    } catch (err) {
      console.error("Failed to delete invoice:", err);
      setError("Failed to delete invoice. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      taxes: {
        ...prev.taxes,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        courseFee: parseFloat(formData.courseFee),
        discount: parseFloat(formData.discount || 0),
        taxes: {
          cgst: parseFloat(formData.taxes.cgst || 0),
          sgst: parseFloat(formData.taxes.sgst || 0),
          igst: parseFloat(formData.taxes.igst || 0),
          otherTaxes: parseFloat(formData.taxes.otherTaxes || 0),
        },
      };

      if (editingInvoice) {
        await invoiceService.updateInvoice(editingInvoice._id, payload);
      } else {
        await invoiceService.createInvoice(payload);
      }

      // Reset form and refresh list
      setFormData({
        studentId: "",
        courseId: "",
        instructorId: "",
        paymentMode: "Cash",
        courseFee: "",
        discount: "",
        taxes: {
          cgst: "",
          sgst: "",
          igst: "",
          otherTaxes: "",
        },
        notes: "",
      });
      setEditingInvoice(null);
      setShowModal(false);
      fetchInvoices();
    } catch (err) {
      console.error("Failed to save invoice:", err);
      setError("Failed to save invoice. Please try again.");
    }
  };

  const openEditModal = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      studentId: invoice.studentId?._id || "",
      courseId: invoice.courseId?._id || "",
      instructorId: invoice.instructorId?._id || "",
      paymentMode: invoice.paymentMode || "Cash",
      courseFee: invoice.courseFee?.$numberDecimal || invoice.courseFee || "",
      discount: invoice.discount?.$numberDecimal || invoice.discount || "",
      taxes: {
        cgst: invoice.taxes?.cgst?.$numberDecimal || invoice.taxes?.cgst || "",
        sgst: invoice.taxes?.sgst?.$numberDecimal || invoice.taxes?.sgst || "",
        igst: invoice.taxes?.igst?.$numberDecimal || invoice.taxes?.igst || "",
        otherTaxes:
          invoice.taxes?.otherTaxes?.$numberDecimal ||
          invoice.taxes?.otherTaxes ||
          "",
      },
      notes: invoice.notes || "",
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingInvoice(null);
    setFormData({
      studentId: "",
      courseId: "",
      instructorId: "",
      paymentMode: "Cash",
      courseFee: "",
      discount: "",
      taxes: {
        cgst: "",
        sgst: "",
        igst: "",
        otherTaxes: "",
      },
      notes: "",
    });
    setShowModal(true);
  };

  const viewInvoiceDetails = (invoice) => {
    setViewingInvoice(invoice);
  };

  const closeViewModal = () => {
    setViewingInvoice(null);
  };

  const formatCurrency = (amount) => {
    if (!amount) return "₹0.00";
    const num =
      typeof amount === "object"
        ? parseFloat(amount.$numberDecimal)
        : parseFloat(amount);
    return `₹${num.toFixed(2)}`;
  };

  const calculateTotal = (invoice) => {
    const courseFee = parseFloat(
      invoice.courseFee?.$numberDecimal || invoice.courseFee || 0
    );
    const discount = parseFloat(
      invoice.discount?.$numberDecimal || invoice.discount || 0
    );
    const cgst = parseFloat(
      invoice.taxes?.cgst?.$numberDecimal || invoice.taxes?.cgst || 0
    );
    const sgst = parseFloat(
      invoice.taxes?.sgst?.$numberDecimal || invoice.taxes?.sgst || 0
    );
    const igst = parseFloat(
      invoice.taxes?.igst?.$numberDecimal || invoice.taxes?.igst || 0
    );
    const otherTaxes = parseFloat(
      invoice.taxes?.otherTaxes?.$numberDecimal ||
        invoice.taxes?.otherTaxes ||
        0
    );

    return courseFee - discount + cgst + sgst + igst + otherTaxes;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Invoices
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage all invoices
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600"
          >
            Create Invoice
          </button>
          <button
            onClick={fetchInvoices}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-950/50">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-sky-500"
            />
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing {invoices.length} of {totalPages * limit} invoices
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-2xl bg-slate-200/80 dark:bg-slate-800"
              ></div>
            ))}
          </div>
        ) : invoices.length === 0 ? (
          <div className="rounded-2xl bg-slate-100 p-8 text-center dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              {searchTerm
                ? "No invoices match your search."
                : "No invoices found."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm dark:border-slate-800/80 dark:bg-slate-950/50">
            <table className="min-w-full divide-y divide-slate-200/80 dark:divide-slate-800/80">
              <thead className="bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    Invoice #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-slate-200/80 dark:bg-slate-950/50 dark:divide-slate-800/80">
                {invoices.map((invoice) => (
                  <tr
                    key={invoice._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {invoice.studentId?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {invoice.courseId?.title || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {formatCurrency(calculateTotal(invoice))}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={invoice.paymentStatus}
                        onChange={(e) =>
                          handleStatusChange(invoice._id, e.target.value)
                        }
                        className={`px-2 outline-none py-1 text-xs font-semibold rounded-full ${
                          invoice.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                            : invoice.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* 🔥 Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => viewInvoiceDetails(invoice)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openEditModal(invoice)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(invoice._id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Previous
            </button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal for adding/editing invoices */}
      <Modal
        isOpen={showModal}
        title={editingInvoice ? "Edit Invoice" : "Create Invoice"}
        onClose={() => {
          setShowModal(false);
          setEditingInvoice(null);
          setFormData({
            studentId: "",
            courseId: "",
            instructorId: "",
            paymentMode: "Cash",
            courseFee: "",
            discount: "",
            taxes: {
              cgst: "",
              sgst: "",
              igst: "",
              otherTaxes: "",
            },
            notes: "",
          });
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Student
              </label>
              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Course
              </label>
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleInputChange}
                className="w-full rounded-2xl outline-none border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Instructor
              </label>
              <select
                name="instructorId"
                value={formData.instructorId}
                onChange={handleInputChange}
                className="w-full rounded-2xl border outline-none border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                required
              >
                <option value="">Select an instructor</option>
                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Payment Mode
              </label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleInputChange}
                className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div>
              <label className="block  text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Course Fee
              </label>
              <input
                type="number"
                name="courseFee"
                value={formData.courseFee}
                onChange={handleInputChange}
                className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                required
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-4">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
              Taxes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  CGST
                </label>
                <input
                  type="number"
                  name="cgst"
                  value={formData.taxes.cgst}
                  onChange={handleTaxChange}
                  className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  SGST
                </label>
                <input
                  type="number"
                  name="sgst"
                  value={formData.taxes.sgst}
                  onChange={handleTaxChange}
                  className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  IGST
                </label>
                <input
                  type="number"
                  name="igst"
                  value={formData.taxes.igst}
                  onChange={handleTaxChange}
                  className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Other Taxes
                </label>
                <input
                  type="number"
                  name="otherTaxes"
                  value={formData.taxes.otherTaxes}
                  onChange={handleTaxChange}
                  className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full outline-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingInvoice(null);
                setFormData({
                  studentId: "",
                  courseId: "",
                  instructorId: "",
                  paymentMode: "Cash",
                  courseFee: "",
                  discount: "",
                  taxes: {
                    cgst: "",
                    sgst: "",
                    igst: "",
                    otherTaxes: "",
                  },
                  notes: "",
                });
              }}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {editingInvoice ? "Update Invoice" : "Create Invoice"}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Invoice Details Modal */}
      {viewingInvoice && (
        <Modal
          isOpen={!!viewingInvoice}
          title={`Invoice Details: ${viewingInvoice.invoiceNumber}`}
          onClose={closeViewModal}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Student
                </p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {viewingInvoice.studentId?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {viewingInvoice.studentId?.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Course
                </p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {viewingInvoice.courseId?.title || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Instructor
                </p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {viewingInvoice.instructorId?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Payment Mode
                </p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {viewingInvoice.paymentMode || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Payment Status
                </p>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    viewingInvoice.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : viewingInvoice.paymentStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                  }`}
                >
                  {viewingInvoice.paymentStatus || "N/A"}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-4">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
                Financial Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    Course Fee:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatCurrency(viewingInvoice.courseFee)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    Discount:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatCurrency(viewingInvoice.discount)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    CGST:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatCurrency(viewingInvoice.taxes?.cgst)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    SGST:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatCurrency(viewingInvoice.taxes?.sgst)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    IGST:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatCurrency(viewingInvoice.taxes?.igst)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    Other Taxes:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {formatCurrency(viewingInvoice.taxes?.otherTaxes)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-slate-200/80 dark:border-slate-800/80 pt-2 mt-2">
                  <span className="font-medium text-slate-900 dark:text-white">
                    Total Amount:
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(calculateTotal(viewingInvoice))}
                  </span>
                </div>
              </div>
            </div>

            {viewingInvoice.notes && (
              <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-4">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  Notes
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  {viewingInvoice.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={closeViewModal}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InvoicePage;
