'use server'
const apiEndpoint = '/api/supabase';
export async function fetchById({id}: {id: string}) {
  const response = await fetch(`${apiEndpoint}?id=${id}`);
  const data = await response.json();
  return data[0];
}