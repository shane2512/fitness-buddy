import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Utensils, Leaf, Fish } from "lucide-react";
import { useState } from "react";
import mealPreview from "@/assets/meal-preview.jpg";

interface Meal {
  id: string;
  title: string;
  calories: number;
  cookTime: number;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  diet: "vegetarian" | "non-vegetarian" | "vegan";
  category: "low-carb" | "high-protein" | "balanced" | "keto";
  ingredients: string[];
  image: string;
  isFavorite: boolean;
}

const meals: Meal[] = [
  {
    id: "1",
    title: "Protein-Packed Oatmeal Bowl",
    calories: 320,
    cookTime: 10,
    type: "breakfast",
    diet: "vegetarian",
    category: "high-protein",
    ingredients: ["Oats", "Greek yogurt", "Berries", "Almonds", "Honey"],
    image: mealPreview,
    isFavorite: false
  },
  {
    id: "2",
    title: "Grilled Chicken Salad",
    calories: 285,
    cookTime: 15,
    type: "lunch",
    diet: "non-vegetarian",
    category: "low-carb",
    ingredients: ["Chicken breast", "Mixed greens", "Cherry tomatoes", "Cucumber", "Olive oil"],
    image: mealPreview,
    isFavorite: true
  },
  {
    id: "3",
    title: "Salmon with Roasted Vegetables",
    calories: 420,
    cookTime: 25,
    type: "dinner",
    diet: "non-vegetarian",
    category: "balanced",
    ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Bell peppers", "Herbs"],
    image: mealPreview,
    isFavorite: false
  },
  {
    id: "4",
    title: "Quinoa Buddha Bowl",
    calories: 350,
    cookTime: 20,
    type: "lunch",
    diet: "vegan",
    category: "high-protein",
    ingredients: ["Quinoa", "Chickpeas", "Avocado", "Kale", "Tahini dressing"],
    image: mealPreview,
    isFavorite: true
  },
  {
    id: "5",
    title: "Greek Yogurt Parfait",
    calories: 180,
    cookTime: 5,
    type: "snack",
    diet: "vegetarian",
    category: "high-protein",
    ingredients: ["Greek yogurt", "Granola", "Fresh berries", "Honey"],
    image: mealPreview,
    isFavorite: false
  },
  {
    id: "6",
    title: "Keto Cauliflower Rice Bowl",
    calories: 240,
    cookTime: 18,
    type: "dinner",
    diet: "vegetarian",
    category: "keto",
    ingredients: ["Cauliflower rice", "Avocado", "Cheese", "Nuts", "Olive oil"],
    image: mealPreview,
    isFavorite: false
  }
];

export const Meals = () => {
  const [mealType, setMealType] = useState<string>("all");
  const [dietFilter, setDietFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>(
    meals.filter(meal => meal.isFavorite).map(meal => meal.id)
  );

  const filteredMeals = meals.filter(meal => {
    if (mealType !== "all" && meal.type !== mealType) return false;
    if (dietFilter !== "all" && meal.diet !== dietFilter) return false;
    if (categoryFilter !== "all" && meal.category !== categoryFilter) return false;
    return true;
  });

  const toggleFavorite = (mealId: string) => {
    setFavorites(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const getDietIcon = (diet: string) => {
    switch (diet) {
      case "vegetarian": return <Leaf className="h-4 w-4 text-green-600" />;
      case "vegan": return <Leaf className="h-4 w-4 text-green-700" />;
      case "non-vegetarian": return <Fish className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "low-carb": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "high-protein": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "balanced": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "keto": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-foreground">Meal Suggestions</h1>
        <p className="text-muted-foreground mt-2">Discover healthy and delicious meal ideas</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={mealType} onValueChange={setMealType}>
          <SelectTrigger>
            <SelectValue placeholder="Meal Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Meals</SelectItem>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="snack">Snacks</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dietFilter} onValueChange={setDietFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Diet Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Diets</SelectItem>
            <SelectItem value="vegetarian">Vegetarian</SelectItem>
            <SelectItem value="vegan">Vegan</SelectItem>
            <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="low-carb">Low-Carb</SelectItem>
            <SelectItem value="high-protein">High-Protein</SelectItem>
            <SelectItem value="balanced">Balanced</SelectItem>
            <SelectItem value="keto">Keto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {(mealType !== "all" || dietFilter !== "all" || categoryFilter !== "all") && (
        <Button
          variant="outline"
          onClick={() => {
            setMealType("all");
            setDietFilter("all");
            setCategoryFilter("all");
          }}
        >
          Clear All Filters
        </Button>
      )}

      {/* Meal Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMeals.map((meal) => (
          <Card key={meal.id} className="hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={meal.image} 
                alt={meal.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(meal.id)}
              >
                <Heart 
                  className={`h-4 w-4 ${
                    favorites.includes(meal.id) 
                      ? "fill-red-500 text-red-500" 
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{meal.title}</CardTitle>
                <div className="flex items-center gap-1">
                  {getDietIcon(meal.diet)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(meal.category)}>
                  {meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {meal.type}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                  <span>{meal.calories} cal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{meal.cookTime} min</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Ingredients:</p>
                <p className="text-sm">{meal.ingredients.join(", ")}</p>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">View Recipe</Button>
                <Button variant="outline" size="sm">
                  {favorites.includes(meal.id) ? "Saved" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No meals found with current filters.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setMealType("all");
              setDietFilter("all");
              setCategoryFilter("all");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};