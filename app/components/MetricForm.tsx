'use client';

import { useState } from 'react';

// Update the prop to include the addMetric function
export default function MetricForm({ addMetric }: { addMetric: (metric: any) => void }) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const metric = { name, value: parseFloat(value), category };

    // API call to save the data in Supabase
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric)
    });

    if (res.ok) {
      setSuccess('Metric added successfully!');
      addMetric(metric); // Update state in Dashboard immediately
      setName('');
      setValue('');
      setCategory('');
    } else {
      setError('Failed to add metric.');
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-4">Add New Metric</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Metric Name</label>
          <input
            id="name"
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="value" className="block">Value</label>
          <input
            id="value"
            type="number"
            step="0.01"
            className="border p-2 w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block">Category (Optional)</label>
          <input
            id="category"
            type="text"
            className="border p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2">Add Metric</button>
      </form>
    </div>
  );
}
