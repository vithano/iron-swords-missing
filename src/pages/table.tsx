import axios from 'axios';
import React from 'react';
const Table = ({ data }:any) => {
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/getSheetData');
    return { props: { data: response.data } };
  } catch (error) {
    return { props: { data: [] } };
  }
};

export default Table;