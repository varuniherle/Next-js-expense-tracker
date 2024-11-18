'use client';
import { useEffect, useState } from 'react';
import {ExpenseMessages} from '../expense_messages'

const token = sessionStorage.getItem('auth_token');

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div>
      {token ? (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  {ExpenseMessages.YOUREXPENSE}
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{ExpenseMessages.TagLine}</p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">{ExpenseMessages.Description}</th>
                    <th scope="col" className="px-6 py-3">{ExpenseMessages.Spent_price}</th>
                    <th scope="col" className="px-6 py-3">{ExpenseMessages.date}</th>
                    <th scope="col" className="px-6 py-3">{ExpenseMessages.type}</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {expense.description}
                      </th>
                      <td className="px-6 py-4">
                        {expense.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        {expense.type == 'debit'? <p className="text-red-500 mt-4">
                            {expense.type}
                        </p>:<p className="text-green-500 mt-4">
                        {expense.type}
                        </p>}
                      </td>
                      <td className="px-6 py-4">
                        {expense.created_at}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div>{ExpenseMessages.SignINmessage}</div>
      )}
    </div>
  );
}
