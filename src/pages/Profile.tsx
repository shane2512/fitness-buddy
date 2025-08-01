import TiltedCard from "@/components/TiltedCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, Target, TrendingUp, Calendar, Award, Edit } from "lucide-react";
import { useState } from "react";

interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
}

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Shane joans",
    age: 28,
    weight: 70,
    height: 175,
    goal: "weight-loss",
    activityLevel: "moderate"
  });

  const weeklyStats = {
    workoutsCompleted: 4,
    workoutsTarget: 5,
    mealsFollowed: 18,
    mealsTarget: 21,
    caloriesBurned: 1250,
    caloriesTarget: 1500
  };

  const achievements = [
    { id: 1, title: "First Workout", icon: Award, earned: true },
    { id: 2, title: "Week Warrior", icon: Calendar, earned: true },
    { id: 3, title: "Meal Master", icon: Target, earned: false },
    { id: 4, title: "30-Day Streak", icon: TrendingUp, earned: false },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to backend here
  };

  const calculateBMI = () => {
    const heightInM = profile.height / 100;
    return (profile.weight / (heightInM * heightInM)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { text: "Normal", color: "text-green-600" };
    if (bmi < 30) return { text: "Overweight", color: "text-yellow-600" };
    return { text: "Obese", color: "text-red-600" };
  };

  const bmi = parseFloat(calculateBMI());
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your fitness profile and track progress</p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <TiltedCard
          containerHeight="600px"
          imageHeight="600px"
          imageWidth="100%"
          captionText="Personal Information"
          showMobileWarning={false}
          scaleOnHover={1.02}
          rotateAmplitude={4}
          className="lg:col-span-2"
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Personal Information</h3>
            </div>
            
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                  <p className="text-gray-400">Fitness Enthusiast</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-white">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    disabled={!isEditing}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-white">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                    disabled={!isEditing}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-white">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height}
                    onChange={(e) => setProfile(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                    disabled={!isEditing}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-white">Fitness Goal</Label>
                  <Select
                    value={profile.goal}
                    onValueChange={(value) => setProfile(prev => ({ ...prev, goal: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                      <SelectItem value="endurance">Improve Endurance</SelectItem>
                      <SelectItem value="general-health">General Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity" className="text-white">Activity Level</Label>
                  <Select
                    value={profile.activityLevel}
                    onValueChange={(value) => setProfile(prev => ({ ...prev, activityLevel: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light Activity</SelectItem>
                      <SelectItem value="moderate">Moderate Activity</SelectItem>
                      <SelectItem value="active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* BMI Calculation */}
              <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Your BMI</p>
                    <p className="text-2xl font-bold text-white">{calculateBMI()}</p>
                    <p className={`text-sm font-medium ${bmiCategory.color}`}>
                      {bmiCategory.text}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </TiltedCard>

        {/* Achievements */}
        <TiltedCard
          containerHeight="600px"
          imageHeight="600px"
          imageWidth="100%"
          captionText="Achievements"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Achievements</h3>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.earned ? "bg-success/10 border-success/20" : "bg-gray-800/50 border-gray-600"
                  }`}
                >
                  <achievement.icon
                    className={`h-6 w-6 ${
                      achievement.earned ? "text-success" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-white">{achievement.title}</p>
                  </div>
                  {achievement.earned && (
                    <Badge variant="secondary" className="text-xs">Earned</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TiltedCard>
      </div>

      {/* Weekly Progress */}
      <TiltedCard
        containerHeight="250px"
        imageHeight="250px"
        imageWidth="100%"
        captionText="Weekly Progress"
        showMobileWarning={false}
        scaleOnHover={1.02}
        rotateAmplitude={4}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">This Week's Progress</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Workouts Completed</p>
                <p className="text-sm text-gray-400">
                  {weeklyStats.workoutsCompleted}/{weeklyStats.workoutsTarget}
                </p>
              </div>
              <Progress
                value={(weeklyStats.workoutsCompleted / weeklyStats.workoutsTarget) * 100}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Meals Followed</p>
                <p className="text-sm text-gray-400">
                  {weeklyStats.mealsFollowed}/{weeklyStats.mealsTarget}
                </p>
              </div>
              <Progress
                value={(weeklyStats.mealsFollowed / weeklyStats.mealsTarget) * 100}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Calories Burned</p>
                <p className="text-sm text-gray-400">
                  {weeklyStats.caloriesBurned}/{weeklyStats.caloriesTarget}
                </p>
              </div>
              <Progress
                value={(weeklyStats.caloriesBurned / weeklyStats.caloriesTarget) * 100}
                className="h-2"
              />
            </div>
          </div>
        </div>
      </TiltedCard>
    </div>
  );
};