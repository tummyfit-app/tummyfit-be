function calculateDailyCalorieRequirement(
  weight: number,
  height: number,
  sex: string,
  age: number,
  dailyActivity: string,
  goal: string
): number {
  // Menghitung BMR (Basal Metabolic Rate)
  let bmr: number;
  if (sex === "male") {
    bmr = 66 + 13.75 * weight + 5 * height - 6.75 * age;
  } else if (sex === "female") {
    bmr = 655 + 9.56 * weight + 1.85 * height - 4.68 * age;
  } else {
    throw new Error("Invalid sex. Please enter 'male' or 'female'.");
  }

  // Menyesuaikan kebutuhan kalori berdasarkan aktivitas harian
  const activityFactors: Record<string, number> = {
    sedentary: 1.2,
    "lightly active": 1.375,
    "moderately active": 1.55,
    "very active": 1.725,
    "extra active": 1.9,
  };
  if (!(dailyActivity in activityFactors)) {
    throw new Error(
      "Invalid daily activity. Please choose from: 'sedentary', 'lightly active', 'moderately active', 'very active', 'extra active'."
    );
  }

  const dailyCalorieRequirement = bmr * activityFactors[dailyActivity];

  // Menyesuaikan kebutuhan kalori berdasarkan tujuan
  if (goal === "Maintain weight") {
    return dailyCalorieRequirement;
  } else if (goal === "Weight loss") {
    // Mengurangi 500 kalori per hari untuk tujuan penurunan berat badan
    const calorieDeficit = 500;
    return dailyCalorieRequirement - calorieDeficit;
  } else {
    throw new Error(
      "Invalid goal. Please choose from: 'Maintain weight' or 'Weight loss'."
    );
  }
}

export default calculateDailyCalorieRequirement;
