import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Today's Workout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Duration</span>
                </div>
                <span className="font-medium">30 min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Type</span>
                </div>
                <span className="font-medium">Upper Body Strength</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Est. Calories</span>
                </div>
                <span className="font-medium">280 cal</span>
              </div>
            </div>
            <Button className="w-full mt-4">Start Workout</Button>
          </CardContent>
        </Card>

        {/* Meal Plan Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <img src={mealPreview} alt="Meal" className="h-5 w-5 rounded" />
              Meal Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Breakfast</span>
                <span className="font-medium text-sm">Oatmeal Bowl</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Lunch</span>
                <span className="font-medium text-sm">Chicken Salad</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Dinner</span>
                <span className="font-medium text-sm">Salmon & Veggies</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Calories</span>
                <span className="font-semibold text-primary">1,650 cal</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">View Full Plan</Button>
          </CardContent>
        </Card>

        {/* Habit Tracker */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Daily Habits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="workout"
                  checked={habits.workout}
                  onCheckedChange={() => toggleHabit('workout')}
                />
                <label
                  htmlFor="workout"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Walk 10,000 steps
                </label>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="font-semibold text-success">
                  {Object.values(habits).filter(Boolean).length}/3 completed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};