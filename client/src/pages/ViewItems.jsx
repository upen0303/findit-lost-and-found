import { useEffect, useState } from "react";
import API from "../services/api";

export default function ViewItems() {
  const [lost, setLost] = useState([]);

  useEffect(() => {
    API.get("/items/lost").then(res => setLost(res.data));
  }, []);

  return (
    <div>
      <h3>Lost Items</h3>
      {lost.map(item => (
        <div key={item._id}>
          <p>{item.title}</p>
          {item.image && <img src={item.image} width="100" />}
        </div>
      ))}
    </div>
  );
}
