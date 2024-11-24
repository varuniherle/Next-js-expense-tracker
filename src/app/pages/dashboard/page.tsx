'use client';
import { useEffect, useState } from 'react';
import { ExpenseMessages } from '../expense_messages';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    type: '',
  });
  const router = useRouter();

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('auth_token') : null;

  const handleLogout = () => {
    sessionStorage.removeItem('auth_token');
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict";
    router.push('/pages/login');
  };

  useEffect(() => {
    if (token) {
      async function fetchData() {
        try {
          const response = await fetch('/api/expense/getexpense', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(ExpenseMessages.FETCH_FAILED);
          }

          const data = await response.json();
          setExpenses(data);
          setLoading(false);
        } catch (err) {
          setError(ExpenseMessages.FETCH_FAILED);
          setLoading(false);
        }
      }

      fetchData();
    }
  }, [token]);

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async () => {
    try {
      const response = await fetch('/api/expense/addexpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newExpense),
      });
      

      const addedExpense = await response.json();
      setExpenses([...expenses, addedExpense]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmed) return;
  
    try {
      const response = await fetch(`/api/expense/deleteExpense`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ _id: id })
      });
  
      if (response.ok) {
        alert("Expense deleted successfully!");
        // Optionally, remove the deleted item from the state
        setExpenses(expenses.filter((expense) => expense._id !== id));
      } else {
        const { error } = await response.json();
        alert(error || "Failed to delete expense");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      {token ? (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div>
              <div className="fixed top-4 right-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                  Logout
                </button>
              </div>

              {/* Tagline */}
              <div className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                {ExpenseMessages.TagLine}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4">
                {ExpenseMessages.add_expense}
              </button>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">{ExpenseMessages.Description}</th>
                      <th scope="col" className="px-6 py-3">{ExpenseMessages.Spent_price}</th>
                      <th scope="col" className="px-6 py-3">{ExpenseMessages.date}</th>
                      <th scope="col" className="px-6 py-3">{ExpenseMessages.type}</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{expense.description}</td>
                        <td className="px-6 py-4">{expense.amount}</td>
                        <td className="px-6 py-4">{expense.created_at}</td>
                        <td className="px-6 py-4">
                          {expense.type === 'debit' ? (
                            <p className="text-red-500">{expense.type}</p>
                          ) : (
                            <p className="text-green-500">{expense.type}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteExpense(expense._id)}
                            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{ExpenseMessages.form}</h2>
      <form onSubmit={handleAddExpense}>
        <div>
          <label className="block text-sm font-medium mb-2">{ExpenseMessages.Description}</label>
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{ExpenseMessages.Spent_price}</label>
          <input
            type="number"
            name="amount"
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{ExpenseMessages.date}</label>
          <input
            type="date"
            name="created_at"
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            name="type"
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
)}

            </div>
          )}
        </>
      ) : (
        <div>{ExpenseMessages.SignINmessage}</div>
      )}
    </div>
  );
}
