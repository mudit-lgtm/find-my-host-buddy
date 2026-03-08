export interface HostingResult {
  domain: string;
  ipAddress: string;
  hostingProvider: string;
  serverLocation: {
    country: string;
    city: string;
    lat: number;
    lon: number;
    isp: string;
    org: string;
  };
  dns: {
    a: string[];
    ns: string[];
    mx: string[];
  };
  siteStatus: {
    isUp: boolean;
    statusCode: number;
    responseTime: number;
  };
}
