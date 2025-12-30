import { useEffect, useState } from "react";

const STORAGE_KEY = "teachers_list";

// ✅ Email validation (best practice)
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const AddTeacher = () => {
  /* =====================
     STATE (lazy init)
     ===================== */

  const [teachers, setTeachers] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [formData, setFormData] = useState({
    teacherId: "",
    email: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  /* =====================
     SAVE TO LOCALSTORAGE
     ===================== */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
  }, [teachers]);

  /* =====================
     HANDLERS
     ===================== */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdate = () => {
    const teacherId = formData.teacherId.trim();
    const email = formData.email.trim().toLowerCase();

    if (!teacherId || !email) {
      alert("Please fill all fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const duplicate = teachers.some(
      (t, index) =>
        t.teacherId === teacherId && index !== editIndex
    );

    if (duplicate) {
      alert("Teacher ID already exists");
      return;
    }

    if (editIndex !== null) {
      const updated = [...teachers];
      updated[editIndex] = { teacherId, email };
      setTeachers(updated);
      setEditIndex(null);
    } else {
      setTeachers([...teachers, { teacherId, email }]);
    }

    setFormData({ teacherId: "", email: "" });
  };

  const handleEdit = (index) => {
    setFormData(teachers[index]);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    setTeachers(teachers.filter((_, i) => i !== index));
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
      const rows = text.split("\n").slice(1);

      const imported = [];

      rows.forEach((row) => {
        const [teacherId, email] = row
          .split(",")
          .map((v) => v?.trim());

        if (
          teacherId &&
          email &&
          isValidEmail(email) &&
          !teachers.some(
            (t) => t.teacherId === teacherId
          )
        ) {
          imported.push({
            teacherId,
            email: email.toLowerCase(),
          });
        }
      });

      if (imported.length === 0) {
        alert("No valid teachers found in CSV");
        return;
      }

      setTeachers((prev) => [...prev, ...imported]);
      alert(`${imported.length} teachers imported successfully`);
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  /* =====================
     SEARCH LOGIC
     ===================== */

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.teacherId
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* =====================
     UI
     ===================== */

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-400">
      <h2 className="text-2xl font-bold mb-6">
        Add Teachers
      </h2>

      {/* 🔹 FORM */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          name="teacherId"
          placeholder="Teacher ID"
          value={formData.teacherId}
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
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">
          Import Teachers (CSV)
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVImport}
        />
      </div>

      {/* 🔍 SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Teacher ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* 🔹 TABLE */}
      {filteredTeachers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">
                  Teacher ID
                </th>
                <th className="border px-4 py-2">
                  Email
                </th>
                <th className="border px-4 py-2">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((teacher, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border px-4 py-2">
                    {teacher.teacherId}
                  </td>
                  <td className="border px-4 py-2">
                    {teacher.email}
                  </td>
                  <td className="border px-4 py-2 space-x-3">
                    <button
                      onClick={() => handleEdit(
                        teachers.findIndex(
                          (t) =>
                            t.teacherId === teacher.teacherId
                        )
                      )}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(
                        teachers.findIndex(
                          (t) =>
                            t.teacherId === teacher.teacherId
                        )
                      )}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-6 text-gray-500">
          No teachers found
        </p>
      )}
    </div>
  );
};

export default AddTeacher;
