import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    name: "Alex Johnson",
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
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p className="text-muted-foreground">Fitness Enthusiast</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={profile.weight}
                  onChange={(e) => setProfile(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={profile.height}
                  onChange={(e) => setProfile(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Fitness Goal</Label>
                <Select
                  value={profile.goal}
                  onValueChange={(value) => setProfile(prev => ({ ...prev, goal: value }))}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
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
                <Label htmlFor="activity">Activity Level</Label>
                <Select
                  value={profile.activityLevel}
                  onValueChange={(value) => setProfile(prev => ({ ...prev, activityLevel: value }))}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
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
            <div className="p-4 border rounded-lg bg-muted/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Your BMI</p>
                  <p className="text-2xl font-bold">{calculateBMI()}</p>
                  <p className={`text-sm font-medium ${bmiCategory.color}`}>
                    {bmiCategory.text}
                  </p>
                </div>
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.earned ? "bg-success/10 border-success/20" : "bg-muted/20"
                }`}
              >
                <achievement.icon
                  className={`h-6 w-6 ${
                    achievement.earned ? "text-success" : "text-muted-foreground"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{achievement.title}</p>
                </div>
                {achievement.earned && (
                  <Badge variant="secondary" className="text-xs">Earned</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Workouts Completed</p>
                <p className="text-sm text-muted-foreground">
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
                <p className="text-sm font-medium">Meals Followed</p>
                <p className="text-sm text-muted-foreground">
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
                <p className="text-sm font-medium">Calories Burned</p>
                <p className="text-sm text-muted-foreground">
                  {weeklyStats.caloriesBurned}/{weeklyStats.caloriesTarget}
                </p>
              </div>
              <Progress
                value={(weeklyStats.caloriesBurned / weeklyStats.caloriesTarget) * 100}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};