export const config = { runtime: 'edge' };

export default function handler(req) {
  const country = req.headers.get('x-vercel-ip-country') || '';
  const city    = req.headers.get('x-vercel-ip-city')    || '';

  let region = 'default';

  const gccCountries = ['AE','SA','QA','KW','BH','OM'];
  const seaCountries = ['SG','MY','TH','PH','ID','VN'];
  const euCountries  = ['DE','FR','NL','SE','GB','CH','DK','NO','FI'];

  if (gccCountries.includes(country))      region = 'uae';
  else if (country === 'IN')               region = 'india';
  else if (seaCountries.includes(country)) region = 'sea';
  else if (euCountries.includes(country))  region = 'eu';
  else                                     region = 'international';

  return new Response(
    JSON.stringify({ country, city, region }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  );
}
