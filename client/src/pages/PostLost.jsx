import { useState } from "react";
import API from "../services/api";

export default function PostLost() {
  const [form, setForm] = useState({});

  const submit = async () => {
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));

    await API.post("/items/lost", data);
    alert("Lost item posted");
  };

  return (
    <div>
      <h2>Report Lost Item</h2>
      <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
      <input type="file" onChange={e => setForm({...form, image: e.target.files[0]})} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
