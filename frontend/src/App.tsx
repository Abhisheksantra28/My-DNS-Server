import React, { useState, useEffect } from "react";
import DnsRecordForm from "../src/components/DnsRecordForm";
import DnsRecordList from "../src/components/DnsRecordList";
import axios from "axios";
import { DnsRecord } from "./types";
import { SERVER_URL } from "./utils/constant";

const App: React.FC = () => {
  const [records, setRecords] = useState<DnsRecord[]>([]);

  const fetchRecords = async () => {
    const { data } = await axios.get(`${SERVER_URL}/api/get-all-records`);
    setRecords(data.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="mb-10 text-3xl font-bold">DNS Manager</h1>
      
      {/* Instructions */}
      <div className="mb-5 p-4 border rounded-lg ">
        <h2 className="text-xl font-semibold mb-2">How to Add a DNS Record</h2>
        <p className="mb-2">
          1. Enter the domain name for which you want to add a DNS record.
        </p>
        <p className="mb-2">
          2. Select the type of DNS record (A, CNAME, or NS).
        </p>
        <p className="mb-2">
          3. Provide the data for the DNS record (e.g., IP address for an A record).
        </p>
        <p className="mb-2">
          4. Set the TTL (Time to Live) value in seconds. The default is 3600 seconds.
        </p>
        <p className="mb-2">
          5. Click the <strong>Add Record</strong> button to save the DNS record.
        </p>
        <p className="text-red-500">
          * Ensure your domain's nameserver is set to <strong>ns1.abhisheksantra.tech</strong> before adding a record.
        </p>
      </div>

      {/* Form and List */}
      <div className="flex flex-col items-center space-y-5">
        <DnsRecordForm fetchRecords={fetchRecords} />
        <DnsRecordList records={records} fetchRecords={fetchRecords} />
      </div>
    </div>
  );
};

export default App;
