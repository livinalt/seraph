const API_URL = 'http://localhost:5000/api';

export const fetchScams = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/scams?${query}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export const fetchScamById = async (id: any) => {
  const res = await fetch(`${API_URL}/scams/${id}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
};

export const scanUrl = async (url: any) => {
  const res = await fetch(`${API_URL}/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  if (!res.ok) throw new Error('Scan failed');
  return res.json();
};

export const reportScam = async (data: any) => {
  const res = await fetch(`${API_URL}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Report failed');
  return res.json();
};