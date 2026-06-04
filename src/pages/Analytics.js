import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ujima_data") || "[]");
    setData(stored);
  }, []);

  const stats = {
    total: data.length,
    approved: data.filter(d => d?.hunter?.decision === "APPROVE").length,
    rejected: data.filter(d => d?.hunter?.decision === "REJECT").length,
    review: data.filter(d => d?.hunter?.decision === "REVIEW").length,
    highRisk: data.filter(d => d?.hunter?.risk_level === "High").length,
    mediumRisk: data.filter(d => d?.hunter?.risk_level === "Medium").length,
    lowRisk: data.filter(d => d?.hunter?.risk_level === "Low").length,
  };

  // Pie chart (decisions)
  const decisionData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Review", value: stats.review },
  ];

  // Bar chart (risk levels)
  const riskData = [
    { name: "Low", value: stats.lowRisk },
    { name: "Medium", value: stats.mediumRisk },
    { name: "High", value: stats.highRisk },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-blue-700">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          SACCO loan insights powered by AI decisions
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">High Risk</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.highRisk}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Loan Decisions</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={decisionData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {decisionData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Risk Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
        <h2 className="font-semibold mb-4">Recent Applications</h2>

        {data.length === 0 ? (
          <p className="text-gray-500">No data yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Name</th>
                <th>Loan</th>
                <th>Income</th>
                <th>Risk</th>
                <th>Decision</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-medium">{item.name}</td>
                  <td>{item.loan_amount}</td>
                  <td>{item.monthly_income}</td>

                  <td>
                    <span className="px-2 py-1 rounded text-xs bg-gray-100">
                      {item?.hunter?.risk_level}
                    </span>
                  </td>

                  <td>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item?.hunter?.decision === "APPROVE"
                        ? "bg-green-100 text-green-700"
                        : item?.hunter?.decision === "REJECT"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item?.hunter?.decision}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}