const UPI_ID = '6303075443';
const PAYEE_NAME = 'Killi Uma Mesherwari';

export const generateUPILink = (amount: number, regID: string): string => {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME,
    am: amount.toString(),
    cu: 'INR',
    tn: `SwimFest Registration ${regID}`,
    tr: regID,
  });
  
  return `upi://pay?${params.toString()}`;
};

export const generateQRCode = async (upiLink: string): Promise<string> => {
  const encoded = encodeURIComponent(upiLink);
  // Use a lightweight external QR generator to avoid heavy client-side QR libraries
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
};
