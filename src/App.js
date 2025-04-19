import { useState } from "react";

export default function App() {
  const [items, setItem] = useState([]);
  const [isPin, setIsPin] = useState(false);

  const addItemHandler = (item) => {
    setItem((items) => [...items, item]);
  };

  const deleteHandler = (id) => {
    const deleteItem = items.filter((item) => item.id !== id);
    setItem(() => deleteItem);
  };

  const toggleHandler = (id) => {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const pinHandler = () => {
    setIsPin((pervItem) => !pervItem);
  };

  return (
    <div className="container">
      <SideBar pinHandler={pinHandler} isPin={isPin} />
      <div className={`app ${isPin ? "pinMain" : ""}`}>
        <Logo />
        <Form onAddItem={addItemHandler} />
        <PackingList
          items={items}
          onDeleteItem={deleteHandler}
          onToggle={toggleHandler}
        />
        <Stats />
      </div>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");

  function submitHandler(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for you'r 🤩 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggle }) {
  const { description, quantity, packed, id } = item;
  return (
    <li>
      <input type="checkBox" value={packed} onChange={() => onToggle(id)} />
      <span
        className="itemContent"
        style={packed ? { textDecoration: "line-through" } : {}}
      >
        <span>{quantity}</span>
        <span>{description}</span>
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        💼 you have X items in you'r lists , and you have already packed X (X%)
      </em>
    </footer>
  );
}

function SideBar({ pinHandler, isPin }) {
  const [closeSubSideBar, setCloseSideBar] = useState(true);
  const openSubSideBarHandler = () => {
    setCloseSideBar((closeSubSideBar) => !closeSubSideBar);

    isPin && pinHandler();
  };
  return (
    <div className="sideBarContainer">
      <ul>
        <li>
          <button>item1</button>
        </li>
        <li>
          <button>item2</button>
        </li>
        <li>
          <button onClick={openSubSideBarHandler}>item3</button>
        </li>
        <li>
          <button>item4</button>
        </li>
      </ul>

      <SubMenu
        pinHandler={pinHandler}
        isPin={isPin}
        isCloseSubSideBar={closeSubSideBar}
      />
    </div>
  );
}

function SubMenu({ pinHandler, isPin, isCloseSubSideBar }) {
  return (
    <div
      className={`subMenuContainer  ${isCloseSubSideBar ? "closeSideBar" : ""}`}
    >
      <div className="pinContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4rem"
          height="4rem"
          viewBox="0 0 16 16"
          onClick={pinHandler}
          style={isPin ? { transform: "rotate(45deg)" } : {}}
        >
          <path
            fill={isPin ? "#000" : "none"}
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m10.25 10.25l4 4m-12.5-7.5l5-5s1 2 2 3s4.5 2 4.5 2l-6.5 6.5s-1-3.5-2-4.5s-3-2-3-2"
          />
        </svg>
      </div>
      <ul>
        <li>Sub Menu 1</li>
        <li>Sub Menu 2</li>
        <li>Sub Menu 3</li>
        <li>Sub Menu 4</li>
      </ul>
    </div>
  );
}
