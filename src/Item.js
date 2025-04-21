export default function Item({ item, onDeleteItem, onToggle }) {
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
