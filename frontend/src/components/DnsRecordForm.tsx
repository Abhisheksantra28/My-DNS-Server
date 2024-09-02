import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { DnsRecord } from '../types';
import { SERVER_URL } from '../utils/constant';

interface DnsRecordFormProps {
  fetchRecords: () => void;
}

const DnsRecordForm: React.FC<DnsRecordFormProps> = ({ fetchRecords }) => {
  const [formData, setFormData] = useState<DnsRecord>({
    domain: '',
    type: 'A',
    data: '',
    ttl: 3600
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`${SERVER_URL}/api/create-record`, formData);
    fetchRecords();
    setFormData({ domain: '', type: 'A', data: '', ttl: 3600 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="domain"
        placeholder="Domain"
        value={formData.domain}
        onChange={handleChange}
        required
      />
      <select name="type" value={formData.type} onChange={handleChange} required>
        <option value="A">A</option>
        <option value="CNAME">CNAME</option>
        <option value="NS">NS</option>
      </select>
      <input
        type="text"
        name="data"
        placeholder="Data"
        value={formData.data}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="ttl"
        placeholder="TTL"
        value={formData.ttl}
        onChange={handleChange}
      />
      <button type="submit">Add Record</button>
    </form>
  );
};

export default DnsRecordForm;
