import { useEffect, useState } from 'react';
import { tesloApi } from '../../../api/tesloApi';

export default function RequestInfo() {
  const [requestInfo, setRequestInfo] = useState<unknown>({
    method: 'GET',
  });

  async function fetchRequestInfo() {
    try {
      const response = await tesloApi.get('/auth/private');
      setRequestInfo(response.data);
    } catch (error) {
      setRequestInfo({ error: 'Failed to fetch request info' });
      console.error('Error fetching request info:', error);
    }
  }

  useEffect(() => {
    fetchRequestInfo();
  }, []);

  return (
    <>
      <h2>Información</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(requestInfo, null, 2)}</pre>
    </>
  );
}
