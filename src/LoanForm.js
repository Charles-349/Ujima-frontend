import { useState } from "react";
import axios from "axios";

export default function LoanForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    occupation: "",
    loan_amount: "",
    message: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "https://ujima.onrender.com/analyze",
        form
      );

      setResult(res.data);
    } catch (err) {
      setResult({ error: "Request failed" });
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Loan Application</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="occupation" placeholder="Occupation" onChange={handleChange} />
      <input name="loan_amount" placeholder="Loan Amount" onChange={handleChange} />
      <textarea name="message" placeholder="Message" onChange={handleChange} />

      <button onClick={submit}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}