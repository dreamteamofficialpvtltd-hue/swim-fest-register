import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { uploadToCloudinary, validateFile } from '@/lib/cloudinary';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { RegistrationData } from '@/pages/Register';
import { toast } from 'sonner';

interface Props {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DocumentUpload = ({ data, onUpdate, onNext, onBack }: Props) => {
  const [uploading, setUploading] = useState<{ aadhaar: boolean; dob: boolean }>({
    aadhaar: false,
    dob: false,
  });
  const [errors, setErrors] = useState<{ aadhaar?: string; dob?: string }>({});

  const handleFileUpload = async (type: 'aadhaar' | 'dob', file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setErrors({ ...errors, [type]: validation.error });
      toast.error(validation.error);
      return;
    }

    setUploading({ ...uploading, [type]: true });
    setErrors({ ...errors, [type]: undefined });

    try {
      const url = await uploadToCloudinary(file);
      
      if (type === 'aadhaar') {
        onUpdate({ aadhaarFile: file, aadhaarUrl: url });
      } else {
        onUpdate({ dobFile: file, dobUrl: url });
      }
      
      toast.success(`${type === 'aadhaar' ? 'Aadhaar' : 'DOB proof'} uploaded successfully`);
    } catch (error) {
      console.error(`${type} upload error:`, error);
      setErrors({ ...errors, [type]: 'Upload failed. Please try again.' });
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  const handleNext = () => {
    if (!data.aadhaarUrl || !data.dobUrl) {
      toast.error('Please upload both documents');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription>
          Please upload clear images or PDFs of the following documents. Maximum file size: 5MB each.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {/* Aadhaar Upload */}
        <div className="space-y-2">
          <Label>Aadhaar Card *</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-smooth">
            {data.aadhaarUrl ? (
              <div className="space-y-3">
                <CheckCircle className="h-12 w-12 text-success mx-auto" />
                <p className="text-sm font-medium text-success">Aadhaar uploaded successfully</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.getElementById('aadhaar-upload') as HTMLInputElement;
                    input?.click();
                  }}
                >
                  Replace File
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploading.aadhaar}
                    onClick={() => {
                      const input = document.getElementById('aadhaar-upload') as HTMLInputElement;
                      input?.click();
                    }}
                  >
                    {uploading.aadhaar ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or PDF (max 5MB)
                  </p>
                </div>
              </div>
            )}
            <input
              id="aadhaar-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('aadhaar', file);
              }}
            />
          </div>
          {errors.aadhaar && (
            <p className="text-sm text-destructive">{errors.aadhaar}</p>
          )}
        </div>

        {/* DOB Proof Upload */}
        <div className="space-y-2">
          <Label>Date of Birth Proof *</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-smooth">
            {data.dobUrl ? (
              <div className="space-y-3">
                <CheckCircle className="h-12 w-12 text-success mx-auto" />
                <p className="text-sm font-medium text-success">DOB proof uploaded successfully</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.getElementById('dob-upload') as HTMLInputElement;
                    input?.click();
                  }}
                >
                  Replace File
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploading.dob}
                    onClick={() => {
                      const input = document.getElementById('dob-upload') as HTMLInputElement;
                      input?.click();
                    }}
                  >
                    {uploading.dob ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or PDF (max 5MB)
                  </p>
                </div>
              </div>
            )}
            <input
              id="dob-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload('dob', file);
              }}
            />
          </div>
          {errors.dob && (
            <p className="text-sm text-destructive">{errors.dob}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          size="lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="flex-1"
          size="lg"
          disabled={!data.aadhaarUrl || !data.dobUrl || uploading.aadhaar || uploading.dob}
        >
          Next: Payment
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;
