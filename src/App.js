import { useState } from "react";

export default function App() {
  const [items, setItem] = useState([]);

  const addItemHandler = (item) => {
    setItem((items) => [...items, item]);
  };

  const deleteItemHandler = (id) => {
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

  const deleteAllItemHandler = () => {
    const isDelete = window.confirm("Are You Sure To Delete All Items");
    isDelete && setItem([]);
  };

  return (
    <div className="container">
      {/* <SideBar pinHandler={pinHandler} isPin={isPin} /> */}
      <div className="app">
        <Logo />
        <Form onAddItem={addItemHandler} />
        <PackingList
          items={items}
          onDeleteItem={deleteItemHandler}
          onToggle={toggleHandler}
          onDeleteAllItem={deleteAllItemHandler}
        />
        <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggle, onDeleteAllItem }) {
  const [sortBy, setSortBy] = useState("input");
  const sortHandler = (e) => {
    setSortBy(e.target.value);
  };

  let soretedItem;

  if (sortBy === "input") {
    soretedItem = items.slice();
  } else if (sortBy === "description") {
    soretedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    soretedItem = items.slice().sort((a, b) => a.packed - b.packed);
  }
  return (
    <div className="list">
      <ul>
        {soretedItem.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={sortHandler}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteAllItem}>Cleat List</button>
      </div>
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

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );
  }

  const numItems = items.length;
  const packedItem = items.filter((item) => item.packed).length;
  const packedPercent = Math.round((packedItem / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercent === 100
          ? "You Got Everythings! Ready To Go ✈️"
          : `💼 you have ${numItems} items in you'r lists , and you have already packed ${packedItem} (${packedPercent}%)`}
      </em>
    </footer>
  );
}

// function SideBar({ pinHandler, isPin }) {
//   const [closeSubSideBar, setCloseSideBar] = useState(true);
//   const openSubSideBarHandler = () => {
//     setCloseSideBar((closeSubSideBar) => !closeSubSideBar);

//     isPin && pinHandler();
//   };
//   return (
//     <div className="sideBarContainer">
//       <ul>
//         <li>
//           <button>item1</button>
//         </li>
//         <li>
//           <button>item2</button>
//         </li>
//         <li>
//           <button onClick={openSubSideBarHandler}>item3</button>
//         </li>
//         <li>
//           <button>item4</button>
//         </li>
//       </ul>

//       <SubMenu
//         pinHandler={pinHandler}
//         isPin={isPin}
//         isCloseSubSideBar={closeSubSideBar}
//       />
//     </div>
//   );
// }

// function SubMenu({ pinHandler, isPin, isCloseSubSideBar }) {
//   return (
//     <div
//       className={`subMenuContainer  ${isCloseSubSideBar ? "closeSideBar" : ""}`}
//     >
//       <div className="pinContainer">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="4rem"
//           height="4rem"
//           viewBox="0 0 16 16"
//           onClick={pinHandler}
//           style={isPin ? { transform: "rotate(45deg)" } : {}}
//         >
//           <path
//             fill={isPin ? "#000" : "none"}
//             stroke="#000"
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             stroke-width="1.5"
//             d="m10.25 10.25l4 4m-12.5-7.5l5-5s1 2 2 3s4.5 2 4.5 2l-6.5 6.5s-1-3.5-2-4.5s-3-2-3-2"
//           />
//         </svg>
//       </div>
//       <ul>
//         <li>Sub Menu 1</li>
//         <li>Sub Menu 2</li>
//         <li>Sub Menu 3</li>
//         <li>Sub Menu 4</li>
//       </ul>
//     </div>
//   );
// }
