import { useEffect, useState } from "react";

const STORAGE_KEY = "students_list";

// ✅ Email validation (best practice)
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const AddStudent = () => {
  /* =====================
     STATE (lazy init ✅)
     ===================== */

  const [students, setStudents] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState({
    regNo: "",
    email: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  /* =====================
     SAVE TO LOCALSTORAGE
     ===================== */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  /* =====================
     HANDLERS
     ===================== */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdate = () => {
    const regNo = formData.regNo.trim();
    const email = formData.email.trim().toLowerCase();

    if (!regNo || !email) {
      alert("Please fill all fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const duplicate = students.some(
      (s, index) =>
        s.regNo === regNo && index !== editIndex
    );

    if (duplicate) {
      alert("Registration number already exists");
      return;
    }

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = { regNo, email };
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, { regNo, email }]);
    }

    setFormData({ regNo: "", email: "" });
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  /* =====================
     CSV IMPORT
     ===================== */

  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").slice(1); // skip header

      const imported = [];

      rows.forEach((row) => {
        const [regNo, email] = row
          .split(",")
          .map((v) => v?.trim());

        if (
          regNo &&
          email &&
          isValidEmail(email) &&
          !students.some((s) => s.regNo === regNo)
        ) {
          imported.push({
            regNo,
            email: email.toLowerCase(),
          });
        }
      });

      if (imported.length === 0) {
        alert("No valid students found in CSV");
        return;
      }

      setStudents((prev) => [...prev, ...imported]);
      alert(`${imported.length} students imported successfully`);
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  /* =====================
     CSV EXPORT
     ===================== */

  const handleExportCSV = () => {
    if (students.length === 0) {
      alert("No students to export");
      return;
    }

    const headers = ["regNo", "email"];
    const rows = students.map((s) => [s.regNo, s.email]);

    const csv =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "students.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  /* =====================
     UI
     ===================== */

  return (
    <div className="max-w-5xl w-full mx-auto p-6 text-gray-400">
      <h2 className="text-2xl font-bold mb-6">
        Add Students
      </h2>

      {/* 🔹 FORM */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          name="regNo"
          placeholder="Registration Number"
          value={formData.regNo}
          onChange={handleChange}
          className="flex-1 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="flex-1 p-2 border rounded"
        />

        <button
          onClick={handleAddOrUpdate}
          className={`px-4 text-white rounded ${
            editIndex !== null
              ? "bg-yellow-600"
              : "bg-blue-600"
          }`}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* 🔹 CSV IMPORT */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">
          Import Students (CSV)
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVImport}
        />
      </div>

      {/* 🔹 CSV EXPORT */}
      <div className="mb-6">
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Export Students as CSV
        </button>
      </div>

      {/* 🔹 TABLE */}
      {students.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full max-w-7xl border border-gray-700 rounded-xl">
            <thead className="bg-gray-500 text-gray-100">
              <tr>
                <th className="border border-gray-700 px-4 py-2">#</th>
                <th className="border border-gray-700 px-4 py-2">Reg No</th>
                <th className="border border-gray-700 px-4 py-2">Email</th>
                <th className="border border-gray-700 px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-700 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {student.regNo}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {student.email}
                  </td>
                  <td className="border border-gray-700 px-4 py-2 space-x-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 text-[13px] font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 text-[13px] font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
