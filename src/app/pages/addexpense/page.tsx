import { useState } from 'react';

export default function AddExpense() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = async (event: React.FormEvent) => {
    event.preventDefault();

    const userId = 'userId-from-session'; // Replace with actual user ID after login

    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        name,
        type,
        amount,
        description,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Expense added');
    } else {
      alert(data.error || 'Failed to add expense');
    }
  };

  return (
    <div>
      <h1>Add Expense</h1>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
