import QRCode from 'qrcode';

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
  try {
    const qrDataUrl = await QRCode.toDataURL(upiLink, {
      width: 300,
      margin: 2,
      color: {
        dark: '#1e3a8a',
        light: '#ffffff'
      }
    });
    return qrDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};
