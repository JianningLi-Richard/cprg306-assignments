"use client";

import { useEffect, useState } from "react";

interface MealIdeasProps {
  ingredient: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (err) {
    console.error("Failed to fetch meals:", err);
    return [];
  }
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMealIdeas = async () => {
    if (!ingredient) {
      setMeals([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const mealData = await fetchMealIdeas(ingredient);
      setMeals(mealData);
    } catch (err) {
      setError("Failed to fetch meals");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  if (!ingredient) {
    return <p className="text-gray-500">Select an item to see meal ideas.</p>;
  }

  if (loading) {
    return <p className="text-blue-500">Loading meal ideas...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Meals with {ingredient}
      </h2>
      {meals.length > 0 ? (
        <ul className="space-y-2">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="p-4 border rounded-lg hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold">{meal.strMeal}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          No meals found with {ingredient}.
        </p>
      )}
    </div>
  );
}
