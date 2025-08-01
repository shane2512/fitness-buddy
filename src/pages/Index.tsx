import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Dumbbell, Target, TrendingUp, Users, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Dumbbell,
    title: "Personalized Workouts",
    description: "AI-powered fitness routines tailored to your goals and fitness level"
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set, track, and achieve your fitness milestones with precision"
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Detailed insights into your fitness journey with visual progress reports"
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Access to certified trainers and nutrition specialists"
  }
];

const stats = [
  { number: "50K+", label: "Active Users" },
  { number: "2M+", label: "Workouts Completed" },
  { number: "95%", label: "Goal Achievement Rate" },
  { number: "4.9/5", label: "User Rating" }
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Fitness Enthusiast",
    content: "Fitness Buddy transformed my workout routine. The personalized approach really works!",
    rating: 5
  },
  {
    name: "David K.",
    role: "Professional Athlete",
    content: "The analytics and progress tracking keep me motivated and on track with my goals.",
    rating: 5
  },
  {
    name: "Emma L.",
    role: "Busy Professional",
    content: "Perfect for my hectic schedule. Quick, effective workouts that fit into my day.",
    rating: 5
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-32 sm:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
            Your Personal Fitness Companion
          </Badge>
          
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            Transform Your Fitness Journey with{" "}
            <span className="text-primary">FitLife</span>
          </h1>
          
          <p className="mt-8 text-xl leading-9 text-muted-foreground max-w-4xl mx-auto">
            Experience the future of fitness with personalized workouts, nutrition guidance, and AI-powered progress tracking. 
            Your complete wellness companion designed to help you achieve lasting results and build healthy habits that stick.
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-x-8 flex-col sm:flex-row">
            <Link to="/dashboard">
              <Button size="lg" className="group text-lg px-10 py-6">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/workouts">
              <Button variant="outline" size="lg" className="text-lg px-10 py-6">
                Explore Workouts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose FitLife?
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            FitLife combines cutting-edge AI technology with proven fitness methodologies to deliver a personalized experience 
            that adapts to your unique goals, preferences, and lifestyle. Whether you're a beginner starting your fitness journey 
            or an experienced athlete looking to optimize performance, our platform provides the tools and guidance you need to succeed.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30 backdrop-blur-sm border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Everything you need to succeed
            </h2>
            <p className="mt-8 text-xl leading-8 text-muted-foreground">
              Comprehensive tools and features designed to help you achieve your fitness goals efficiently and sustainably.
            </p>
          </div>
          
          <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-32 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-10 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-card/60 backdrop-blur-sm p-8 rounded-xl border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="mb-6">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by fitness enthusiasts
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join thousands of users who have transformed their fitness journey with Fitness Buddy.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to start your fitness journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Join Fitness Buddy today and discover a smarter way to achieve your fitness goals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/dashboard">
                <Button size="lg" className="group">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/workouts">
                <Button variant="outline" size="lg">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
