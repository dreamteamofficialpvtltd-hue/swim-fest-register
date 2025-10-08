import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EVENTS, MAX_EVENTS_PER_PERSON, PER_EVENT_FEE } from '@/data/events';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { RegistrationData } from '@/pages/Register';

interface Props {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EventSelection = ({ data, onUpdate, onNext, onBack }: Props) => {
  const [error, setError] = useState('');
  
  const availableEvents = EVENTS.filter(
    (event) => event.ageGroup === data.ageGroup
  );

  const handleEventToggle = (eventId: string) => {
    const currentEvents = data.selectedEvents;
    const isSelected = currentEvents.includes(eventId);

    if (isSelected) {
      onUpdate({
        selectedEvents: currentEvents.filter((id) => id !== eventId),
      });
      setError('');
    } else {
      if (currentEvents.length >= MAX_EVENTS_PER_PERSON) {
        setError(`You can select a maximum of ${MAX_EVENTS_PER_PERSON} events`);
        return;
      }
      onUpdate({
        selectedEvents: [...currentEvents, eventId],
      });
      setError('');
    }
  };

  const handleNext = () => {
    if (data.selectedEvents.length === 0) {
      setError('Please select at least one event');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm font-medium mb-2">
          Selected: {data.selectedEvents.length} / {MAX_EVENTS_PER_PERSON} events
        </p>
        <p className="text-sm text-muted-foreground">
          Each event costs ₹{PER_EVENT_FEE}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        {availableEvents.map((event) => {
          const isSelected = data.selectedEvents.includes(event.id);
          
          return (
            <Card
              key={event.id}
              className={`cursor-pointer transition-smooth hover:shadow-custom-md ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => handleEventToggle(event.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleEventToggle(event.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{event.event}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {event.distance}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {event.gender}
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-secondary text-secondary-foreground">
                        ₹{event.fee}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
          disabled={data.selectedEvents.length === 0}
        >
          Next: Upload Documents
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EventSelection;
