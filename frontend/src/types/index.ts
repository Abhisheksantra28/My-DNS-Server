export interface DnsRecord {
    _id?: string;
    domain: string;
    type: 'A' | 'CNAME' | 'NS'| 'TXT';
    data: string;
    ttl: number;
  }
  