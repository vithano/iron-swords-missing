import {PersonData} from '../app/utils/types';
import supabase from './supabase';

const keyTranslationMap: {[key: string]: string} = {
  'id': 'id',
  'first_name': 'firstName',
  'last_name': 'lastName',
  'image': 'image',
  'contact_name': 'contactName',
  'contact_phone': 'contactPhone',
  'status': 'status',
  'last_seen': 'lastSeen',
  'details': 'identifyingDetails',
  'notes': 'notes',
} as const;

type Props = {
  name?: string;
  id?: string;
}

export async function fetchDbData(props?: Props): Promise<PersonData[]> {
  const {name, id} = props ?? {name: null, id: null}

const {data = []} = await
  supabase
    .from('people')
    .select('*')

// .or(
//   client.ilike('first_name', `%${name}%`),
//   client.ilike('last_name', `%${name}%`)
// )

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
  missingPhone: ''
})) ?? []




}

