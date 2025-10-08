import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ParticipantDetails from '@/components/registration/ParticipantDetails';
import EventSelection from '@/components/registration/EventSelection';
import DocumentUpload from '@/components/registration/DocumentUpload';
import PaymentStep from '@/components/registration/PaymentStep';
import ConfirmationStep from '@/components/registration/ConfirmationStep';

export type RegistrationData = {
  studentName: string;
  fatherName: string;
  occupation: string;
  address: string;
  phone: string;
  email: string;
  ageGroup: string;
  selectedEvents: string[];
  aadhaarFile?: File;
  dobFile?: File;
  aadhaarUrl?: string;
  dobUrl?: string;
  regID?: string;
  paymentRef?: {
    txnToken: string;
    upiLink: string;
    qrUrl: string;
  };
};

const STEPS = [
  'Participant Details',
  'Select Events',
  'Upload Documents',
  'Payment',
  'Confirmation'
];

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    studentName: '',
    fatherName: '',
    occupation: '',
    address: '',
    phone: '',
    email: '',
    ageGroup: '',
    selectedEvents: [],
  });

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-custom-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl md:text-3xl text-center">
              Registration Form
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {currentStep + 1} of {STEPS.length}</span>
                <span>{STEPS[currentStep]}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {currentStep === 0 && (
              <ParticipantDetails
                data={registrationData}
                onUpdate={updateData}
                onNext={handleNext}
              />
            )}

            {currentStep === 1 && (
              <EventSelection
                data={registrationData}
                onUpdate={updateData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 2 && (
              <DocumentUpload
                data={registrationData}
                onUpdate={updateData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <PaymentStep
                data={registrationData}
                onUpdate={updateData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <ConfirmationStep data={registrationData} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
