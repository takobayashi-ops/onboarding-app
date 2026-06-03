const GAS_URL = 'https://script.google.com/a/macros/gmo-c.jp/s/AKfycbwOchb5e0gCs0tUEFNBRqanAPn6_typyvS0lH9FDHmdWu2RNOAk1h4jDHlp26I6HHQU/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let response;
    if (req.method === 'GET') {
      response = await fetch(GAS_URL + '?action=getAll');
    } else {
      response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(req.body)
      });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.toString() });
  }
}
