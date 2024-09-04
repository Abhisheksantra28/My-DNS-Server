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

    console.log(data.data);
    setRecords(data.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col  justify-center items-center">
      <h1 className="mb-10">DNS Manager</h1>
      <div className=" flex flex-col items-center space-y-5 ">
        <DnsRecordForm fetchRecords={fetchRecords} />
        <DnsRecordList records={records} fetchRecords={fetchRecords} />
      </div>
    </div>
  );
};

export default App;
