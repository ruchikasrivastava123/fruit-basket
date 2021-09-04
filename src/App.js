import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  let fruitBasket = [
    { id: 1, name: "mango", emoji: "🥭", quantity: 10 },
    { id: 2, name: "apple", emoji: "🍏", quantity: 12 },
    { id: 3, name: "strawberry", emoji: "🍓", quantity: 14 },
    { id: 4, name: "kiwi", emoji: "🥝", quantity: 16 },
    { id: 5, name: "grapes", emoji: "🍇", quantity: 18 }
  ];

  const [fruitname, setfruitname] = useState("");
  const [fruitupdate, setfruitupdate] = useState({
    id: "",
    name: "",
    quantity: ""
  });

  let fruitdata, fruitqty;
  useEffect(() => {
    sessionStorage.clear();
    setfruitupdate({ id: "", name: "", quantity: "" });
  }, []);
  const fruitName = (e) => {
    setfruitname(e.target.value);
  };
  const increaseQuantity = () => {
    fruitBasket.map((fruit) => {
      if (fruitname === fruit.name) {
        sessionStorage.getItem(fruit.name) != null
          ? (fruitqty = sessionStorage.getItem(fruit.name))
          : (fruitqty = fruit.quantity);
        fruitdata = { ...fruit, quantity: Number(fruitqty) + 1 };
        const { id, name, quantity } = fruitdata;

        setfruitupdate({ id: id, name: name, quantity: quantity });

        sessionStorage.setItem(fruit.name, quantity);
      }
    });

    setfruitname("");
  };
  const decreaseQuantity = () => {
    fruitBasket.map((fruit) => {
      if (fruitname === fruit.name) {
        sessionStorage.getItem(fruit.name) != null
          ? (fruitqty = sessionStorage.getItem(fruit.name))
          : (fruitqty = fruit.quantity);
        fruitdata = { ...fruit, quantity: Number(fruitqty) - 1 };
        const { id, name, quantity } = fruitdata;
        if (quantity > 0) {
          setfruitupdate({ id: id, name: name, quantity: quantity });

          sessionStorage.setItem(fruit.name, quantity);
        }
      }
    });

    setfruitname("");
  };
  const showBasket = () => {};

  return (
    <div className="App">
      <h1>Fruit Basket</h1>

      <br />
      <br />

      <input
        onChange={fruitName}
        placeholder="Enter fruit name whose quantity needs to be change"
        value={fruitname}
        className="inputfruit"
      ></input>
      <br />
      <br />
      <button onClick={increaseQuantity} className="incbutton">
        +
      </button>
      <button onClick={decreaseQuantity} className="decbutton">
        -
      </button>
      <br />
      <br />

      <h4 className="fruitheading">fruits in basket</h4>
      <table className="fruitable">
        {fruitBasket.map((fruit) => (
          <tbody
            style={{
              position: "relative",
              left: "-30px",
              top: "-70px",
              fontSize: "35px"
            }}
          >
            {fruit.emoji}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {fruitupdate.name === fruit.name
              ? fruitupdate.quantity
              : sessionStorage.getItem(fruit.name) != null
              ? sessionStorage.getItem(fruit.name)
              : fruit.quantity}
          </tbody>
        ))}
      </table>
    </div>
  );
}
