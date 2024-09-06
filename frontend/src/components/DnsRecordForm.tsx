import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { DnsRecord } from "../types";
import { SERVER_URL } from "../utils/constant";

interface DnsRecordFormProps {
  fetchRecords: () => void;
}

const DnsRecordForm: React.FC<DnsRecordFormProps> = ({ fetchRecords }) => {
  const [formData, setFormData] = useState<DnsRecord>({
    domain: "",
    type: "A",
    data: "",
    ttl: 3600,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Proceed to create the DNS record
      await axios.post(`${SERVER_URL}/api/create-record`, formData);
      fetchRecords();
      setFormData({ domain: "", type: "A", data: "", ttl: 3600 });
    } catch (error) {
      console.error("Error creating DNS record:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        name="domain"
        placeholder="Domain"
        className="text-center p-2 rounded-md"
        value={formData.domain}
        onChange={handleChange}
        required
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        className="text-center p-2 rounded-md"
      >
        <option value="A">A</option>
        <option value="CNAME">CNAME</option>
        <option value="NS">NS</option>
        <option value="TXT">TXT</option>
      </select>
      <input
        type="text"
        name="data"
        placeholder="Data"
        className="text-center p-2 rounded-md"
        value={formData.data}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="ttl"
        placeholder="TTL"
        className="text-center p-2 rounded-md"
        value={formData.ttl}
        onChange={handleChange}
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
        Add Record
      </button>
    </form>
  );
};

export default DnsRecordForm;
