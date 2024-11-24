'use client';
import { useState, useEffect } from 'react';

export default function AddExpense() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Safely access sessionStorage only on the client side
    const authToken = sessionStorage.getItem('auth_token');
    setToken(authToken);
  }, []);

  return (
    <div>
      {token ? (
        <>
          <h1>Add Expense</h1>
        </>
      ) : (
        <>
          <h1>Please login</h1>
        </>
      )}
    </div>
  );
}
