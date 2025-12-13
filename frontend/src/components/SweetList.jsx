function SweetList({ sweets }) {
  return (
    <div>
      <h3>Sweets</h3>
      <ul>
        {sweets.map((s) => (
          <li key={s._id}>
            {s.name} - {s.category} - ₹{s.price} - Qty: {s.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SweetList;
