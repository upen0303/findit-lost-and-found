import { useState } from "react";
import API from "../services/api";

export default function PostFound() {
  const [form, setForm] = useState({});

  const submit = async () => {
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    await API.post("/items/found", data);
    alert("Found item posted");
  };

  return (
    <div>
      <h3>Report Found Item</h3>
      <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
      <input type="file" onChange={e => setForm({...form, image: e.target.files[0]})} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
