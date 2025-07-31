import TiltedCard from "@/components/TiltedCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Zap, Heart, Dumbbell, Bike } from "lucide-react";
import { useState } from "react";
import workoutHero from "@/assets/workout-hero.jpg";

interface Workout {
  id: string;
  title: string;
  duration: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  calories: number;
  equipment: string;
}

const workoutCategories = [
  { id: "cardio", name: "Cardio", icon: Heart, color: "text-red-500" },
  { id: "strength", name: "Strength", icon: Dumbbell, color: "text-blue-500" },
  { id: "yoga", name: "Yoga", icon: Target, color: "text-green-500" },
  { id: "hiit", name: "HIIT", icon: Zap, color: "text-orange-500" },
  { id: "cycling", name: "Cycling", icon: Bike, color: "text-purple-500" },
];

const workouts: Workout[] = [
  {
    id: "1",
    title: "Morning Power Yoga",
    duration: 30,
    difficulty: "Beginner",
    category: "yoga",
    calories: 150,
    equipment: "Mat"
  },
  {
    id: "2",
    title: "Full Body HIIT Circuit",
    duration: 25,
    difficulty: "Intermediate",
    category: "hiit",
    calories: 300,
    equipment: "None"
  },
  {
    id: "3",
    title: "Upper Body Strength",
    duration: 45,
    difficulty: "Advanced",
    category: "strength",
    calories: 280,
    equipment: "Dumbbells"
  },
  {
    id: "4",
    title: "Cardio Dance Workout",
    duration: 20,
    difficulty: "Beginner",
    category: "cardio",
    calories: 200,
    equipment: "None"
  },
  {
    id: "5",
    title: "Virtual Cycling Session",
    duration: 40,
    difficulty: "Intermediate",
    category: "cycling",
    calories: 350,
    equipment: "Bike"
  },
];

export const Workouts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filteredWorkouts = workouts.filter(workout => {
    if (selectedCategory && workout.category !== selectedCategory) return false;
    if (durationFilter !== "all") {
      if (durationFilter === "short" && workout.duration > 30) return false;
      if (durationFilter === "medium" && (workout.duration <= 30 || workout.duration > 45)) return false;
      if (durationFilter === "long" && workout.duration <= 45) return false;
    }
    if (difficultyFilter !== "all" && workout.difficulty !== difficultyFilter) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-foreground">Workouts</h1>
        <p className="text-muted-foreground mt-2">Choose your training style and start exercising</p>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-lg overflow-hidden h-48 md:h-64">
        <img 
          src={workoutHero} 
          alt="Workout" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Find Your Perfect Workout</h2>
            <p className="text-lg opacity-90">From beginner to advanced - we've got you covered</p>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {workoutCategories.map(({ id, name, icon: Icon, color }) => (
          <TiltedCard
            key={id}
            containerHeight="120px"
            imageHeight="120px"
            imageWidth="100%"
            captionText={name}
            showMobileWarning={false}
            scaleOnHover={1.1}
            rotateAmplitude={6}
            className={`cursor-pointer ${
              selectedCategory === id ? "ring-2 ring-primary" : ""
            }`}
          >
            <div 
              className="flex flex-col items-center justify-center p-6 h-full"
              onClick={() => setSelectedCategory(selectedCategory === id ? null : id)}
            >
              <Icon className={`h-8 w-8 mb-2 ${color}`} />
              <span className="text-sm font-medium text-center text-white">{name}</span>
            </div>
          </TiltedCard>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={durationFilter} onValueChange={setDurationFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Durations</SelectItem>
            <SelectItem value="short">Short (≤30 min)</SelectItem>
            <SelectItem value="medium">Medium (30-45 min)</SelectItem>
            <SelectItem value="long">Long (45+ min)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        {(selectedCategory || durationFilter !== "all" || difficultyFilter !== "all") && (
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory(null);
              setDurationFilter("all");
              setDifficultyFilter("all");
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Workout List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <TiltedCard 
            key={workout.id}
            containerHeight="280px"
            imageHeight="280px"
            imageWidth="100%"
            captionText={workout.title}
            showMobileWarning={false}
            scaleOnHover={1.05}
            rotateAmplitude={8}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{workout.title}</h3>
                <Badge className={getDifficultyColor(workout.difficulty)}>
                  {workout.difficulty}
                </Badge>
              </div>
              <div className="space-y-4 flex-1">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{workout.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{workout.calories} cal</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Equipment:</span>
                    <span className="font-medium text-white">{workout.equipment}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">Start Workout</Button>
            </div>
          </TiltedCard>
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No workouts found with current filters.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSelectedCategory(null);
              setDurationFilter("all");
              setDifficultyFilter("all");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};