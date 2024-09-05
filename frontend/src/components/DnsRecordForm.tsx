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
      // First, check if the nameserver is correctly set
      const checkResponse = await axios.post(
        `${SERVER_URL}/api/check-nameserver`,
        {
          domain: formData.domain,
        }
      );

      if (!checkResponse.data.success) {
        alert(checkResponse.data.message);
        return; // Stop the submission if the nameserver is not set correctly
      }

      // If the nameserver check passes, proceed to create the DNS record
      await axios.post(`${SERVER_URL}/api/create-record`, formData);
      fetchRecords();
      setFormData({ domain: "", type: "A", data: "", ttl: 3600 });
    } catch (error) {
      console.error("Error creating DNS record:", error);
      alert(
        "Please add the nameserver as 'ns1.abhisheksantra.tech' in your domain registrar's DNS settings."
      );
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
      <button type="submit">Add Record</button>
    </form>
  );
};

export default DnsRecordForm;
