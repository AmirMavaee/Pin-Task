import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
