import TiltedCard from "@/components/TiltedCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Utensils, Droplets, Footprints, Target, Clock, Flame } from "lucide-react";
import workoutHero from "@/assets/workout-hero.jpg";
import mealPreview from "@/assets/meal-preview.jpg";

export const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-foreground">Hello, Alex</h1>
        <p className="text-muted-foreground mt-1">{today}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Workout Summary */}
        <TiltedCard
          containerHeight="350px"
          imageHeight="350px"
          imageWidth="100%"
          captionText="Today's Workout"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={8}
        >
          <div className="p-6 h-full flex flex-col bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Today's Workout</h3>
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Type</span>
                <Badge>Full Body</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Duration</span>
                <span className="font-medium text-sm text-white">45 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Calories</span>
                <span className="font-medium text-sm text-white">380 cal</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Progress</span>
                  <span className="text-sm text-white">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
            <Button className="w-full mt-4">Start Workout</Button>
          </div>
        </TiltedCard>

        {/* Meal Plan Preview */}
        <TiltedCard
          imageSrc={mealPreview}
          altText="Meal Plan"
          containerHeight="350px"
          imageHeight="350px"
          imageWidth="100%"
          captionText="Meal Plan"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={8}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-6 h-full flex flex-col bg-black/60 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-white">Meal Plan</h3>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Breakfast</span>
                  <span className="font-medium text-sm text-white">Oatmeal Bowl</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Lunch</span>
                  <span className="font-medium text-sm text-white">Grilled Chicken</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Dinner</span>
                  <span className="font-medium text-sm text-white">Salmon & Veggies</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-600">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Total Calories</span>
                  <span className="font-semibold text-primary">1,650 cal</span>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-4">View Full Plan</Button>
            </div>
          }
        />

        {/* Habit Tracker */}
        <TiltedCard
          containerHeight="350px"
          imageHeight="350px"
          imageWidth="100%"
          captionText="Daily Habits"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={8}
        >
          <div className="p-6 h-full flex flex-col bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Daily Habits</h3>
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                <div className="flex items-center gap-3">
                  <Dumbbell className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-white">Workout</span>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Complete
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/40">
                <div className="flex items-center gap-3">
                  <Droplets className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-white">Water (6/8 glasses)</span>
                </div>
                <div className="w-20">
                  <Progress value={75} className="h-2" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/40">
                <div className="flex items-center gap-3">
                  <Footprints className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-white">Steps (7.2k/10k)</span>
                </div>
                <div className="w-20">
                  <Progress value={72} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </TiltedCard>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-muted-foreground">Calories Burned</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">1,247</p>
          <p className="text-xs text-muted-foreground">Today</p>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Active Time</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">2h 15m</p>
          <p className="text-xs text-muted-foreground">Today</p>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Goals Met</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">3/4</p>
          <p className="text-xs text-muted-foreground">Today</p>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">Streak</span>
          </div>
          <p className="text-2xl font-bold text-foreground mt-1">12 days</p>
          <p className="text-xs text-muted-foreground">Current</p>
        </div>
      </div>
    </div>
  );
};