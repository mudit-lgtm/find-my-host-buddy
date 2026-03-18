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
    aaaa: string[];
    ns: string[];
    mx: string[];
    txt: string[];
    cname: string[];
  };
  siteStatus: {
    isUp: boolean;
    statusCode: number;
    responseTime: number;
  };
  ssl: {
    issuer: string;
    protocol: string;
    validFrom: string;
    validTo: string;
  };
  securityHeaders: {
    hsts: boolean;
    xFrameOptions: boolean;
    csp: boolean;
    xContentType: boolean;
    referrerPolicy: boolean;
    permissionsPolicy: boolean;
  };
  securityGrade: string;
  technologies: {
    cms: string[];
    frameworks: string[];
    cdn: string[];
    analytics: string[];
    server: string[];
    javascript: string[];
  };
  performance: {
    ttfb: number;
    contentLength: number;
    grade: string;
  };
  favicon: string;
  emailProvider: string;
  screenshot: string;
  whois: {
    registrar: string;
    createdDate: string;
    expiryDate: string;
    updatedDate: string;
    domainAge: string;
    registrant: string;
  };
}
