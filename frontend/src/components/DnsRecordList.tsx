import React from "react";
import axios from "axios";
import { DnsRecord } from "../types";
import { SERVER_URL } from "../utils/constant";

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
    <ul className="space-y-4">
      {Array.isArray(records) && records.length > 0 ? (
        records.map((record) => (
          <li key={record._id} className="flex justify-between items-center p-2  border rounded-md">
            <div className="flex space-x-10">
              <span className="font-semibold">{record.domain}</span>
              <span>{record.type}</span>
              <span>{record.data}</span>
              <span>TTL: {record.ttl}</span>
            </div>

            <button
              onClick={() => deleteRecord(record._id!)}
              className="ml-10 bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <li>No DNS records found</li>
      )}
    </ul>
  );
};

export default DnsRecordList;
