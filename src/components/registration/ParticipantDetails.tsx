import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AGE_GROUPS } from '@/data/events';
import { ArrowRight } from 'lucide-react';
import { RegistrationData } from '@/types';

interface Props {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
}

const ParticipantDetails = ({ data, onUpdate, onNext }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!data.fatherName.trim()) newErrors.fatherName = 'Father name is required';
    if (!data.address.trim()) newErrors.address = 'Address is required';
    if (!data.phone.trim()) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!data.ageGroup) newErrors.ageGroup = 'Please select an age group';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="studentName">Student Name *</Label>
          <Input
            id="studentName"
            value={data.studentName}
            onChange={(e) => onUpdate({ studentName: e.target.value })}
            placeholder="Enter full name"
            className={errors.studentName ? 'border-destructive' : ''}
          />
          {errors.studentName && (
            <p className="text-sm text-destructive mt-1">{errors.studentName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="fatherName">Father's Name *</Label>
          <Input
            id="fatherName"
            value={data.fatherName}
            onChange={(e) => onUpdate({ fatherName: e.target.value })}
            placeholder="Enter father's name"
            className={errors.fatherName ? 'border-destructive' : ''}
          />
          {errors.fatherName && (
            <p className="text-sm text-destructive mt-1">{errors.fatherName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="occupation">Father's Occupation (Optional)</Label>
          <Input
            id="occupation"
            value={data.occupation}
            onChange={(e) => onUpdate({ occupation: e.target.value })}
            placeholder="Enter occupation"
          />
        </div>

        <div>
          <Label htmlFor="address">Address *</Label>
          <Textarea
            id="address"
            value={data.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            placeholder="Enter full address"
            rows={3}
            className={errors.address ? 'border-destructive' : ''}
          />
          {errors.address && (
            <p className="text-sm text-destructive mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Primary Contact Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder="Enter 10-digit mobile number"
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="Enter email address"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="ageGroup">Age Group *</Label>
          <Select
            value={data.ageGroup}
            onValueChange={(value) => onUpdate({ ageGroup: value })}
          >
            <SelectTrigger className={errors.ageGroup ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              {AGE_GROUPS.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.ageGroup && (
            <p className="text-sm text-destructive mt-1">{errors.ageGroup}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Next: Select Events
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default ParticipantDetails;
