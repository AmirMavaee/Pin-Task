export default function Stats({ items }) {
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
