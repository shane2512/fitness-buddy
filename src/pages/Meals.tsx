import { useState } from "react";
import TiltedCard from "@/components/TiltedCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Utensils, Clock, Leaf, Fish, Beef } from "lucide-react";
import mealPreview from "@/assets/meal-preview.jpg";

const mealCategories = ["all", "breakfast", "lunch", "dinner", "snack"];
const dietTypes = ["all", "vegetarian", "vegan", "keto", "high-protein"];

const meals = [
  {
    id: 1,
    title: "Grilled Chicken Salad",
    category: "lunch", 
    calories: 350,
    cookTime: 15,
    type: "main",
    diet: "high-protein",
    image: mealPreview,
    ingredients: ["Chicken breast", "Mixed greens", "Tomatoes", "Cucumber", "Olive oil"]
  },
  {
    id: 2,
    title: "Overnight Oats",
    category: "breakfast",
    calories: 280,
    cookTime: 5,
    type: "main", 
    diet: "vegetarian",
    image: "/placeholder.svg",
    ingredients: ["Oats", "Milk", "Berries", "Honey", "Nuts"]
  },
  {
    id: 3,
    title: "Salmon Bowl",
    category: "dinner",
    calories: 450,
    cookTime: 20,
    type: "main",
    diet: "keto", 
    image: "/placeholder.svg",
    ingredients: ["Salmon fillet", "Quinoa", "Broccoli", "Avocado"]
  },
  {
    id: 4,
    title: "Green Smoothie",
    category: "snack",
    calories: 180,
    cookTime: 5,
    type: "drink",
    diet: "vegan",
    image: "/placeholder.svg", 
    ingredients: ["Spinach", "Banana", "Mango", "Coconut milk"]
  },
  {
    id: 5,
    title: "Protein Pancakes",
    category: "breakfast",
    calories: 320,
    cookTime: 10,
    type: "main",
    diet: "high-protein",
    image: "/placeholder.svg",
    ingredients: ["Protein powder", "Eggs", "Banana", "Oats"]
  },
  {
    id: 6,
    title: "Buddha Bowl",
    category: "lunch",
    calories: 400,
    cookTime: 25,
    type: "main", 
    diet: "vegetarian",
    image: "/placeholder.svg",
    ingredients: ["Sweet potato", "Chickpeas", "Kale", "Tahini"]
  }
];

export const Meals = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredMeals = meals.filter(meal => {
    const categoryMatch = selectedCategory === "all" || meal.category === selectedCategory;
    const dietMatch = selectedDiet === "all" || meal.diet === selectedDiet;
    return categoryMatch && dietMatch;
  });

  const toggleFavorite = (mealId: number) => {
    setFavorites(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const getDietIcon = (diet: string) => {
    switch (diet) {
      case "vegetarian":
        return <Leaf className="h-4 w-4 text-green-500" />;
      case "vegan":
        return <Leaf className="h-4 w-4 text-green-600" />;
      case "keto":
        return <Fish className="h-4 w-4 text-blue-500" />;
      case "high-protein":
        return <Beef className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      breakfast: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      lunch: "bg-blue-500/20 text-blue-400 border-blue-500/30", 
      dinner: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      snack: "bg-green-500/20 text-green-400 border-green-500/30"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-foreground">Meal Suggestions</h1>
        <p className="text-muted-foreground mt-2">Discover healthy recipes tailored to your goals</p>
      </div>

      {/* Filter Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {mealCategories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category === "all" ? "All Meals" : category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Diet Filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground mr-2">Diet:</span>
        {dietTypes.map((diet) => (
          <Button
            key={diet}
            variant={selectedDiet === diet ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDiet(diet)}
            className="capitalize"
          >
            {diet === "all" ? "All" : diet.replace("-", " ")}
          </Button>
        ))}
      </div>

      {/* Meal Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredMeals.length} meal{filteredMeals.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Meal Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMeals.map((meal) => (
          <TiltedCard 
            key={meal.id}
            imageSrc={meal.image}
            altText={meal.title}
            containerHeight="450px"
            imageHeight="450px"
            imageWidth="100%"
            captionText={meal.title}
            showMobileWarning={false}
            scaleOnHover={1.05}
            rotateAmplitude={8}
            displayOverlayContent={true}
            overlayContent={
              <div className="absolute inset-0 bg-black/60 p-6 flex flex-col rounded-lg">
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30"
                    onClick={() => toggleFavorite(meal.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favorites.includes(meal.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-white"
                      }`}
                    />
                  </Button>
                </div>
                
                <div className="flex items-start justify-between mb-4 mt-8">
                  <h3 className="text-lg font-semibold text-white">{meal.title}</h3>
                  <div className="flex items-center gap-1">
                    {getDietIcon(meal.diet)}
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(meal.category)}>
                      {meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="capitalize border-white text-white">
                      {meal.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-gray-300" />
                      <span className="text-white">{meal.calories} cal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-300" />
                      <span className="text-white">{meal.cookTime} min</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Ingredients:</p>
                    <p className="text-sm text-white">{meal.ingredients.join(", ")}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1">View Recipe</Button>
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-black">
                    {favorites.includes(meal.id) ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            }
          />
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No meals found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more meal options.
          </p>
        </div>
      )}
    </div>
  );
};