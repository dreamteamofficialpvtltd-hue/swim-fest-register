import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RegistrationData } from '@/pages/Register';

interface Props {
  data: RegistrationData;
}

const ConfirmationStep = ({ data }: Props) => {
  const navigate = useNavigate();

  const handleDownloadReceipt = () => {
    // Generate a simple text receipt
    const receipt = `
VIVEKANANDHA SWIMMING POOL JUNIOR SWIM FEST
Registration Receipt
=====================================

Registration ID: ${data.regID}
Student Name: ${data.studentName}
Father's Name: ${data.fatherName}
Age Group: ${data.ageGroup}
Contact: ${data.phone}
Email: ${data.email || 'N/A'}

Events Selected: ${data.selectedEvents.length}
Total Amount: ₹${data.registrationFee + data.eventsFee}

Payment Status: Awaiting Verification

=====================================
Please keep this receipt for reference
`;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${data.regID}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Registration Submitted!</h3>
        <p className="text-muted-foreground">
          Your registration has been successfully submitted. Please save your registration details.
        </p>
      </div>

      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-90">Your Registration ID</p>
              <p className="text-3xl font-bold mt-1">{data.regID}</p>
            </div>

            {data.paymentRef?.qrUrl && (
              <div className="bg-white p-4 rounded-lg">
                <img
                  src={data.paymentRef.qrUrl}
                  alt="Registration QR Code"
                  className="w-48 h-48 mx-auto"
                />
                <p className="text-xs text-foreground mt-2">
                  Show this QR code at the event for check-in
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3 text-left">
            <div>
              <p className="text-sm text-muted-foreground">Student Name</p>
              <p className="font-semibold">{data.studentName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age Group</p>
              <p className="font-semibold">{data.ageGroup}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Events Selected</p>
              <p className="font-semibold">{data.selectedEvents.length} events</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <p className="font-semibold text-yellow-600">Awaiting Verification</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted/50 p-4 rounded-lg text-sm text-left">
        <h4 className="font-semibold mb-2">Important Notes:</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>• Your payment will be verified within 24 hours</li>
          <li>• You'll receive confirmation via SMS/Email (if provided)</li>
          <li>• Please carry this QR code on the event day</li>
          <li>• Arrive 30 minutes before your event time</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={handleDownloadReceipt}
          className="flex-1"
          size="lg"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Receipt
        </Button>
        <Button
          onClick={() => navigate('/')}
          className="flex-1"
          size="lg"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
