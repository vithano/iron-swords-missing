import {PersonData} from '../app/utils/types';
import supabase from './supabase';

type Props = {
  name?: string;
  id?: string;
}

export async function fetchDbData(props?: Props): Promise<PersonData[]> {
  const {name, id} = props ?? {name: '', id: null}
  const isFullname = name?.includes(' ');
  const firstName = (isFullname ? name?.split(' ')[0] : name)?.trim();
  const lastName = (isFullname ? name?.split(' ')[1] : name)?.trim();
  
  if(!firstName && !lastName && !id) return [];

  const nameQuery = `first_name.ilike.%${firstName}%,last_name.ilike.%${lastName}%`;
  const idQuery = id ? `id.eq.${id}` : '';
  
  let query = isFullname ? `and(${nameQuery})` : `or(${nameQuery})`;
  if(id) query = `or(${idQuery})`;

  
  const { data = [] } = await supabase
      .from('people')
      .select('*')
      .or(query);
      
  // @ts-ignore
  return data?.map(({id, contact_name, contact_phone, details, first_name, image, last_name, last_seen, notes, status}) => ({
    id,
    contactName: contact_name,
    contactPhone: contact_phone,
    identifyingDetails: details,
    firstName: first_name,
    image,
    lastName: last_name,
    lastSeen: last_seen,
    notes,
    status,
  })) ?? []




}

