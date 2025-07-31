import TiltedCard from "@/components/TiltedCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Flame, Target, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import mealPreview from "@/assets/meal-preview.jpg";

export const Dashboard = () => {
  const [habits, setHabits] = useState({
    workout: false,
    water: true,
    steps: false,
  });

  const toggleHabit = (habit: keyof typeof habits) => {
    setHabits(prev => ({ ...prev, [habit]: !prev[habit] }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-foreground">Hello, Alex</h1>
        <p className="text-muted-foreground mt-2">Ready to crush your fitness goals today?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Today's Workout</h3>
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Duration</span>
                </div>
                <span className="font-medium text-white">30 min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Type</span>
                </div>
                <span className="font-medium text-white">Upper Body Strength</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Est. Calories</span>
                </div>
                <span className="font-medium text-white">280 cal</span>
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
                <img src={mealPreview} alt="Meal" className="h-5 w-5 rounded" />
                <h3 className="text-lg font-semibold text-white">Meal Plan</h3>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Breakfast</span>
                  <span className="font-medium text-sm text-white">Oatmeal Bowl</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Lunch</span>
                  <span className="font-medium text-sm text-white">Chicken Salad</span>
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
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h3 className="text-lg font-semibold text-white">Daily Habits</h3>
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="workout"
                  checked={habits.workout}
                  onCheckedChange={() => toggleHabit('workout')}
                />
                <label
                  htmlFor="workout"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                >
                  Complete workout
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="water"
                  checked={habits.water}
                  onCheckedChange={() => toggleHabit('water')}
                />
                <label
                  htmlFor="water"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                >
                  Drink 8 glasses of water
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="steps"
                  checked={habits.steps}
                  onCheckedChange={() => toggleHabit('steps')}
                />
                <label
                  htmlFor="steps"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                >
                  Walk 10,000 steps
                </label>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-600">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Progress</span>
                <span className="font-semibold text-success">
                  {Object.values(habits).filter(Boolean).length}/3 completed
                </span>
              </div>
            </div>
          </div>
        </TiltedCard>
      </div>
    </div>
  );
};