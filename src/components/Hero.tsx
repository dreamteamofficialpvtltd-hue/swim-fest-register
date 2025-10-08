import { Button } from '@/components/ui/button';
import { Waves, Trophy, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-primary-foreground">
          <Waves size={80} />
        </div>
        <div className="absolute bottom-20 right-10 text-primary-foreground">
          <Trophy size={80} />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-16 mx-auto text-center">
        {/* Sponsor Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
          <span className="text-sm font-medium text-primary-foreground">Powered by</span>
          <span className="text-lg font-bold text-secondary">SBI LIFE</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Vivekanandha Swimming Pool<br />
          <span className="text-secondary">Junior Swim Fest</span>
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
          Join us for an exciting swimming competition for young talents
        </p>

        <div className="flex items-center justify-center gap-2 text-primary-foreground/80 mb-8">
          <Calendar size={20} />
          <span className="text-sm md:text-base">Date to be announced | Kulai Cheruvu Swimming Pool, Kakinada</span>
        </div>

        <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <p className="text-sm md:text-base text-primary-foreground">
            <strong>Important:</strong> Registration Fee ₹100 | Per Event Fee ₹100 | Maximum 2 events per participant
          </p>
          <p className="text-sm text-primary-foreground/80 mt-2">
            No spot registrations will be accepted
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => navigate('/register')}
            className="text-lg px-8 py-6 gradient-accent hover:opacity-90 transition-smooth shadow-custom-lg"
          >
            Register Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => {
              document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-lg px-8 py-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 transition-smooth"
          >
            View Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
