
// import { useState } from "react";
// import axios from "axios";

// const initialForm = {
//   name: "",
//   age: "",
//   occupation: "",
//   loan_amount: "",
//   monthly_income: "",
//   monthly_expenses: "",
//   existing_loans: "",
//   sacco_savings: "",
//   loan_purpose: "",
//   message: ""
// };

// function Toast({ toast }) {
//   if (!toast) return null;

//   const styles =
//     toast.type === "success"
//       ? "bg-green-100 text-green-700"
//       : "bg-red-100 text-red-700";

//   return (
//     <div className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow ${styles}`}>
//       {toast.message}
//     </div>
//   );
// }

// function Skeleton() {
//   return (
//     <div className="space-y-3 animate-pulse">
//       <div className="h-6 bg-gray-200 rounded w-1/2" />
//       <div className="h-20 bg-gray-200 rounded" />
//       <div className="h-20 bg-gray-200 rounded" />
//     </div>
//   );
// }

// export default function LoanForm() {
//   const [form, setForm] = useState(initialForm);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState(null);

//   const isValid =
//     form.name &&
//     form.age &&
//     form.occupation &&
//     form.loan_amount &&
//     form.monthly_income &&
//     form.monthly_expenses;

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const submit = async () => {
//     if (!isValid) {
//       showToast("Please fill required fields", "error");
//       return;
//     }

//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await axios.post(
//         "https://ujima-1.onrender.com/analyze",
//         form
//       );

//       setResult(res.data);
//       setForm(initialForm);

//       showToast("Analysis completed successfully", "success");
//     } catch (err) {
//       showToast("Request failed. Try again", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const badgeColor = (v) => {
//     if (v === "Low") return "bg-green-100 text-green-700";
//     if (v === "Medium") return "bg-yellow-100 text-yellow-700";
//     if (v === "High") return "bg-red-100 text-red-700";
//     return "bg-gray-100 text-gray-700";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
//       <Toast toast={toast} />

//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

//         <div className="bg-white rounded-2xl shadow-xl p-6">
//           <h1 className="text-2xl font-bold text-gray-800">
//             SACCO Loan Intelligence Dashboard
//           </h1>
//           <p className="text-gray-500 mb-6">
//             AI-powered credit risk evaluation
//           </p>

//           <h2 className="text-sm font-semibold text-gray-600 mb-2">
//             Personal Information
//           </h2>

//           <div className="grid gap-3 mb-5">
//             <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//             <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//             <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//           </div>

//           <h2 className="text-sm font-semibold text-gray-600 mb-2">
//             Financial Information (KSH)
//           </h2>

//           <div className="grid gap-3">
//             <input name="loan_amount" value={form.loan_amount} onChange={handleChange} placeholder="Loan Amount (KSH)" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//             <input name="monthly_income" value={form.monthly_income} onChange={handleChange} placeholder="Monthly Income (KSH)" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//             <input name="monthly_expenses" value={form.monthly_expenses} onChange={handleChange} placeholder="Monthly Expenses (KSH)" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//             <input name="existing_loans" value={form.existing_loans} onChange={handleChange} placeholder="Existing Loans (KSH)" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//             <input name="sacco_savings" value={form.sacco_savings} onChange={handleChange} placeholder="SACCO Savings (KSH)" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//             <input name="loan_purpose" value={form.loan_purpose} onChange={handleChange} placeholder="Loan Purpose" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//             <input name="message" value={form.message} onChange={handleChange} placeholder="Additional Notes" className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//           </div>

//           <button
//             onClick={submit}
//             disabled={loading || !isValid}
//             className={`w-full mt-5 py-3 rounded-lg font-semibold text-white transition ${
//               loading || !isValid
//                 ? "bg-gray-400"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Analyzing..." : "Run Analysis"}
//           </button>
//         </div>

//         <div className="space-y-4">

//           {!result && !loading && (
//             <div className="bg-white p-6 rounded-2xl shadow text-gray-500">
//               Results will appear here
//             </div>
//           )}

//           {loading && (
//             <div className="bg-white p-6 rounded-2xl shadow">
//               <Skeleton />
//             </div>
//           )}

//           {result?.hunter && (
//             <>
//               <div className="grid grid-cols-3 gap-3">

//                 <div className="bg-white p-4 rounded-xl shadow text-center">
//                   <p className="text-xs text-gray-500">Score</p>
//                   <p className="text-xl font-bold text-blue-600">
//                     {result.hunter.risk_score}
//                   </p>
//                 </div>

//                 <div className="bg-white p-4 rounded-xl shadow text-center">
//                   <p className="text-xs text-gray-500">Risk</p>
//                   <span className={`px-2 py-1 rounded text-sm ${badgeColor(result.hunter.risk_level)}`}>
//                     {result.hunter.risk_level}
//                   </span>
//                 </div>

//                 <div className="bg-white p-4 rounded-xl shadow text-center">
//                   <p className="text-xs text-gray-500">Decision</p>
//                   <p className="font-bold text-sm">
//                     {result.hunter.decision}
//                   </p>
//                 </div>

//               </div>

//               <div className="bg-white p-4 rounded-xl shadow">
//                 <h3 className="font-semibold mb-2">Scout Analysis</h3>
//                 <p className="text-sm text-gray-600 whitespace-pre-wrap">
//                   {result.scout}
//                 </p>
//               </div>

//               <div className="bg-white p-4 rounded-xl shadow">
//                 <h3 className="font-semibold mb-2">Guardian Engine</h3>
//                 <p className="text-sm text-gray-600 whitespace-pre-wrap">
//                   {result.guardian}
//                 </p>
//               </div>

//               <div className="bg-white p-4 rounded-xl shadow">
//                 <h3 className="font-semibold mb-2">Audit Explanation</h3>
//                 <ul className="list-disc ml-5 text-sm text-gray-600">
//                   {result.hunter.explanation?.map((x, i) => (
//                     <li key={i}>{x}</li>
//                   ))}
//                 </ul>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const initialForm = {
  name: "",
  age: "",
  occupation: "",
  loan_amount: "",
  monthly_income: "",
  monthly_expenses: "",
  existing_loans: "",
  sacco_savings: "",
  loan_purpose: "",
  message: "",
};

function Toast({ toast }) {
  if (!toast) return null;

  const styles =
    toast.type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow ${styles}`}>
      {toast.message}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2" />
      <div className="h-20 bg-gray-200 rounded" />
      <div className="h-20 bg-gray-200 rounded" />
    </div>
  );
}

export default function LoanForm() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const location = useLocation();

  const isValid =
    form.name &&
    form.age &&
    form.occupation &&
    form.loan_amount &&
    form.monthly_income &&
    form.monthly_expenses;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const submit = async () => {
    if (!isValid) {
      showToast("Please fill required fields", "error");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "https://ujima-1.onrender.com/analyze",
        form
      );

      // SAVE TO LOCALSTORAGE (analytics source)
      const saved = JSON.parse(localStorage.getItem("ujima_data") || "[]");

      const newEntry = {
        ...res.data.input,
        scout: res.data.scout,
        guardian: res.data.guardian,
        hunter: res.data.hunter,
        createdAt: new Date().toISOString(),
      };

      const updated = [newEntry, ...saved];

      localStorage.setItem("ujima_data", JSON.stringify(updated));

      setResult(res.data);
      setForm(initialForm);
      showToast("Analysis completed successfully", "success");
    } catch (err) {
      showToast("Request failed. Try again", "error");
    } finally {
      setLoading(false);
    }
  };

  const badgeColor = (v) => {
    if (v === "Low") return "bg-green-100 text-green-700";
    if (v === "Medium") return "bg-yellow-100 text-yellow-700";
    if (v === "High") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <Toast toast={toast} />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow mb-6 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              Ujima SACCO Loan System
            </h1>
            <p className="text-sm text-gray-500">
              AI-Powered Loan Intelligence
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            U
          </div>
        </div>

        <div className="grid md:grid-cols-[250px_1fr] gap-6">

          {/* SIDEBAR */}
          <div className="bg-white rounded-2xl shadow p-5 h-fit">
            <h2 className="font-bold text-gray-700 mb-4">Navigation</h2>

            <div className="space-y-2">

              <Link
                to="/"
                className={`block px-4 py-3 rounded-lg ${
                  location.pathname === "/"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/analytics"
                className={`block px-4 py-3 rounded-lg ${
                  location.pathname === "/analytics"
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                Analytics
              </Link>

            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="space-y-6">

            {/* FORM */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Personal Information
              </h2>

              <div className="grid gap-3 mb-5">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border p-3 rounded-lg" />
                <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border p-3 rounded-lg" />
                <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" className="border p-3 rounded-lg" />
              </div>

              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Financial Information (KSH)
              </h2>

              <div className="grid gap-3">
                <input name="loan_amount" value={form.loan_amount} onChange={handleChange} placeholder="Loan Amount (KSH)" className="border p-3 rounded-lg" />
                <input name="monthly_income" value={form.monthly_income} onChange={handleChange} placeholder="Monthly Income (KSH)" className="border p-3 rounded-lg" />
                <input name="monthly_expenses" value={form.monthly_expenses} onChange={handleChange} placeholder="Monthly Expenses (KSH)" className="border p-3 rounded-lg" />
                <input name="existing_loans" value={form.existing_loans} onChange={handleChange} placeholder="Existing Loans (KSH)" className="border p-3 rounded-lg" />
                <input name="sacco_savings" value={form.sacco_savings} onChange={handleChange} placeholder="SACCO Savings (KSH)" className="border p-3 rounded-lg" />
                <input name="loan_purpose" value={form.loan_purpose} onChange={handleChange} placeholder="Loan Purpose" className="border p-3 rounded-lg" />
                <input name="message" value={form.message} onChange={handleChange} placeholder="Additional Notes" className="border p-3 rounded-lg" />
              </div>

              <button
                onClick={submit}
                disabled={loading || !isValid}
                className={`w-full mt-5 py-3 rounded-lg font-semibold text-white ${
                  loading || !isValid
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Analyzing..." : "Run Analysis"}
              </button>
            </div>

            {/* RESULTS */}
            <div className="space-y-4">

              {!result && !loading && (
                <div className="bg-white p-6 rounded-2xl shadow text-gray-500">
                  Results will appear here
                </div>
              )}

              {loading && (
                <div className="bg-white p-6 rounded-2xl shadow">
                  <Skeleton />
                </div>
              )}

              {result?.hunter && (
                <>
                  <div className="grid grid-cols-3 gap-3">

                    <div className="bg-white p-4 rounded-xl shadow text-center">
                      <p className="text-xs text-gray-500">Score</p>
                      <p className="text-xl font-bold text-blue-600">
                        {result.hunter.risk_score}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow text-center">
                      <p className="text-xs text-gray-500">Risk</p>
                      <span className={`px-2 py-1 rounded text-sm ${badgeColor(result.hunter.risk_level)}`}>
                        {result.hunter.risk_level}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow text-center">
                      <p className="text-xs text-gray-500">Decision</p>
                      <p className="font-bold text-sm">
                        {result.hunter.decision}
                      </p>
                    </div>

                  </div>

                  <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Scout Analysis</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {result.scout}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Guardian Engine</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {result.guardian}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Audit Explanation</h3>
                    <ul className="list-disc ml-5 text-sm text-gray-600">
                      {result.hunter.explanation?.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}