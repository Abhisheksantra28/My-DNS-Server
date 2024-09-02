import React, { useState, useEffect } from 'react';
import DnsRecordForm from '../src/components/DnsRecordForm';
import DnsRecordList from '../src/components/DnsRecordList';
import axios from 'axios';
import { DnsRecord } from './types';
import { SERVER_URL } from './utils/constant';

const App: React.FC = () => {
  const [records, setRecords] = useState<DnsRecord[]>([]);

  const fetchRecords = async () => {
    const {data} = await axios.get<DnsRecord[]>(`${SERVER_URL}/api/get-all-records`);
    setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <h1>DNS Manager</h1>
      <DnsRecordForm fetchRecords={fetchRecords} />
      <DnsRecordList records={records} fetchRecords={fetchRecords} />
    </div>
  );
};

export default App;
