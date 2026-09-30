import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Ankita Dey",
      department: "IT",
      gender: "Female",
      phone: "7044800290",
      localAddress: "Kolkata",
      permanentAddress: "West Bengal",
    },
    {
      id: "EMP002",
      name: "Rahul Sharma",
      department: "HR",
      gender: "Male",
      phone: "9876543211",
      localAddress: "Kolkata",
      permanentAddress: "Bihar",
    },
    {
      id: "EMP003",
      name: "Priya Singh",
      department: "Finance",
      gender: "Female",
      phone: "9876543212",
      localAddress: "Kolkata",
      permanentAddress: "Jharkhand",
    },
  ]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "IT",
    gender: "Male",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Add / Update Employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.id ||
      !form.name ||
      !form.phone ||
      !form.localAddress ||
      !form.permanentAddress
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? { ...form }
            : employee
        )
      );

      setEditingId(null);
    } else {
      setEmployees([...employees, form]);
    }

    setForm({
      id: "",
      name: "",
      department: "IT",
      gender: "Male",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  // Delete
  const deleteEmployee = (id) => {
    setEmployees(
      employees.filter((employee) => employee.id !== id)
    );
  };

  // Edit
  const editEmployee = (employee) => {
    setForm(employee);
    setEditingId(employee.id);
  };

  // Search + Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.id
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      <header>
        <h1>Employee Directory</h1>
        <p>Employee Management System</p>
      </header>

      <main>
        <h2>Employee Count: {employees.length}</h2>

        {/* Employee Form */}
        <form onSubmit={handleSubmit} className="form">
          <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

          <input
            type="text"
            placeholder="Employee ID"
            value={form.id}
            onChange={(e) =>
              setForm({ ...form, id: e.target.value })
            }
            disabled={editingId !== null}
          />

          <input
            type="text"
            placeholder="Employee Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value,
              })
            }
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <select
            value={form.gender}
            onChange={(e) =>
              setForm({
                ...form,
                gender: e.target.value,
              })
            }
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Local Address"
            value={form.localAddress}
            onChange={(e) =>
              setForm({
                ...form,
                localAddress: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Permanent Address"
            value={form.permanentAddress}
            onChange={(e) =>
              setForm({
                ...form,
                permanentAddress: e.target.value,
              })
            }
          />

          <button type="submit">
            {editingId ? "Update Employee" : "Add Employee"}
          </button>
        </form>

        {/* Search and Filter */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
          >
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Employee List */}
        <div className="employee-list">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div key={employee.id}>
                <EmployeeCard employee={employee} />

                <div className="actions">
                  <button
                    onClick={() => editEmployee(employee)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteEmployee(employee.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      </main>

      <footer>
        <p>© 2026 Employee Management System</p>
      </footer>
    </div>
  );
}

export default App;