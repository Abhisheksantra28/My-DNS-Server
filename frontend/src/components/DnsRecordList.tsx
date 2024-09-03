import React from 'react';
import axios from 'axios';
import { DnsRecord } from '../types';
import { SERVER_URL } from '../utils/constant';

interface DnsRecordListProps {
  records: DnsRecord[];
  fetchRecords: () => void;
}

const DnsRecordList: React.FC<DnsRecordListProps> = ({ records, fetchRecords }) => {
  const deleteRecord = async (id: string) => {
    await axios.delete(`${SERVER_URL}/api/delete-record/${id}`);
    fetchRecords();
  };

  return (
    <ul>
      {Array.isArray(records) && records.length > 0 ? (
        records.map((record) => (
          <li key={record._id}>
            {record.domain} {record.type} {record.data} TTL: {record.ttl}
            <button onClick={() => deleteRecord(record._id!)} className='ml-4'>Delete</button>
          </li>
        ))
      ) : (
        <li>No DNS records found</li>
      )}
    </ul>
  );
};

export default DnsRecordList;
