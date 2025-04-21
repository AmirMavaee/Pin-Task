import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggle,
  onDeleteAllItem,
}) {
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
