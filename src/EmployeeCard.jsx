function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <h2>{employee.name}</h2>

      <p>
        <b>Employee ID:</b> {employee.id}
      </p>

      <p>
        <b>Department:</b> {employee.department}
      </p>

      <p>
        <b>Gender:</b> {employee.gender}
      </p>

      <p>
        <b>Phone:</b> {employee.phone}
      </p>

      <p>
        <b>Local Address:</b> {employee.localAddress}
      </p>

      <p>
        <b>Permanent Address:</b>{" "}
        {employee.permanentAddress}
      </p>
    </div>
  );
}

export default EmployeeCard;