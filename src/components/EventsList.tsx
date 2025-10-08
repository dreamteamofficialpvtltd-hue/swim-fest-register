import { EVENTS, AGE_GROUPS } from '@/data/events';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EventsList = () => {
  return (
    <section id="events" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Categories</h2>
          <p className="text-muted-foreground text-lg">Choose from a variety of swimming events across different age groups</p>
        </div>

        <Tabs defaultValue="U-6" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 bg-card p-2 rounded-lg shadow-custom-md mb-8">
            {AGE_GROUPS.map((ageGroup) => (
              <TabsTrigger 
                key={ageGroup} 
                value={ageGroup}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
              >
                {ageGroup}
              </TabsTrigger>
            ))}
          </TabsList>

          {AGE_GROUPS.map((ageGroup) => (
            <TabsContent key={ageGroup} value={ageGroup} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {EVENTS.filter(event => event.ageGroup === ageGroup).map((event) => (
                  <Card key={event.id} className="hover:shadow-custom-lg transition-smooth border-2 hover:border-primary/50">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{event.event}</CardTitle>
                        <Badge className="bg-secondary text-secondary-foreground">₹{event.fee}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Distance:</span>
                          <span className="font-semibold">{event.distance}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="font-semibold">{event.gender}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Age Group:</span>
                          <span className="font-semibold">{event.ageGroup}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mt-12 bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <div className="space-y-2">
                <p className="text-lg">Vivekananda Swimming Pool Management</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="tel:9133555771" className="hover:text-secondary transition-smooth">
                    Vasu – 91335 55771
                  </a>
                  <span className="hidden sm:inline">|</span>
                  <a href="tel:6303075443" className="hover:text-secondary transition-smooth">
                    63030 75443
                  </a>
                </div>
                <p className="text-sm opacity-90 mt-4">
                  Swami Vivekananda Swimming Pool<br />
                  Inside Kulai Cheruvu Park, Kakinada
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EventsList;
