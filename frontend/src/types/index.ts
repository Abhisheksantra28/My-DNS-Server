export interface DnsRecord {
    _id?: string;
    domain: string;
    type: 'A' | 'CNAME' | 'NS';
    data: string;
    ttl: number;
  }
  