import { useState, useEffect } from "react";
import "./App.css"; // Importa el archivo de estilos

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="items-container">
      {items.map((item) => (
        <div className="item-card" key={item.id}>
          <h4 className="username"> Username: {item.username}</h4>
          <p className="email"> Email: {item.email}</p>
          <p className="address"> Ciudad: {item.address.city}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
