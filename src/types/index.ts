export interface Event {
  id: string;
  ageGroup: string;
  event: string;
  distance: string;
  gender: string;
  fee: number;
}

export interface Registration {
  regID: string;
  studentName: string;
  fatherName: string;
  occupation?: string;
  address: string;
  phone: string;
  email?: string;
  ageGroup: string;
  selectedEvents: string[];
  attachments: {
    aadhaarUrl: string;
    dobUrl: string;
  };
  registrationFee: number;
  eventsFee: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'awaiting_verification' | 'failed';
  paymentRef: {
    txnToken: string;
    upiLink: string;
    qrUrl: string;
    utr?: string;
  };
  attended: boolean;
  attendedAt?: string;
  verifiedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  targetId: string;
  targetType: 'registration' | 'payment' | 'attendance';
  before?: any;
  after?: any;
  timestamp: string;
}
