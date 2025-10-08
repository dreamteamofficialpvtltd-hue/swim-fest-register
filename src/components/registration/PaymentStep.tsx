import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateUPILink, generateQRCode } from '@/lib/upi';
import { REGISTRATION_FEE, PER_EVENT_FEE, EVENTS } from '@/data/events';
import { ArrowLeft, Loader2, QrCode, Smartphone } from 'lucide-react';
import { RegistrationData } from '@/types';
import { toast } from 'sonner';

interface Props {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PaymentStep = ({ data, onUpdate, onNext, onBack }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [upiLink, setUpiLink] = useState('');

  const eventsFee = data.selectedEvents.length * PER_EVENT_FEE;
  const totalAmount = REGISTRATION_FEE + eventsFee;

  const selectedEventDetails = EVENTS.filter(e => 
    data.selectedEvents.includes(e.id)
  );

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Generate registration ID
      const regID = `SWIM${Date.now().toString().slice(-8)}`;
      
      // Create registration document
      const registrationRef = await addDoc(collection(db, 'registrations'), {
        regID,
        studentName: data.studentName,
        fatherName: data.fatherName,
        occupation: data.occupation || '',
        address: data.address,
        phone: data.phone,
        email: data.email || '',
        ageGroup: data.ageGroup,
        selectedEvents: data.selectedEvents,
        attachments: {
          aadhaarUrl: data.aadhaarUrl,
          dobUrl: data.dobUrl,
        },
        registrationFee: REGISTRATION_FEE,
        eventsFee,
        totalAmount,
        paymentStatus: 'pending',
        attended: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Generate UPI payment link and QR
      const upiLinkGenerated = generateUPILink(totalAmount, regID);
      const qrCodeGenerated = await generateQRCode(upiLinkGenerated);

      // Update payment reference
      setUpiLink(upiLinkGenerated);
      setQrCode(qrCodeGenerated);

      onUpdate({
        regID,
        paymentRef: {
          txnToken: regID,
          upiLink: upiLinkGenerated,
          qrUrl: qrCodeGenerated,
        },
      });

      setShowPaymentModal(true);
      toast.success('Registration created! Please complete payment.');
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    onNext();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Registration Fee:</span>
              <span className="font-semibold">₹{REGISTRATION_FEE}</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Events ({data.selectedEvents.length}):</span>
                <span className="font-semibold">₹{eventsFee}</span>
              </div>
              <div className="pl-4 space-y-1">
                {selectedEventDetails.map(event => (
                  <div key={event.id} className="text-xs text-muted-foreground">
                    • {event.event} - {event.distance}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-primary">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          After clicking "Proceed to Payment", you'll receive a UPI QR code to complete your payment.
          You can pay using any UPI app like Google Pay, PhonePe, or Paytm.
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          size="lg"
          disabled={loading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          type="button"
          onClick={handlePayment}
          className="flex-1"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Proceed to Payment
              <QrCode className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Complete Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg flex justify-center">
              {qrCode && (
                <img src={qrCode} alt="UPI QR Code" className="w-64 h-64" />
              )}
            </div>
            
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">Amount: ₹{totalAmount}</p>
              <p className="text-sm text-muted-foreground">
                Scan QR code with any UPI app
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={upiLink}
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full" variant="outline">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Pay with UPI App
                </Button>
              </a>

              <Button onClick={handlePaymentComplete} className="w-full">
                I've Completed Payment
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Payment verification may take a few moments. You'll receive confirmation shortly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentStep;
