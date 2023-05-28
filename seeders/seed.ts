import fs from "fs";
import csv from "csv-parser";
import prisma from "../config/DatabaseConnection";

async function initSeed() {
  // const result = await prisma.foods.findMany({
  //   take: 1,
  //   skip: 1,
  // });
  const result: any[] = [];
  // if (result.length !== 0) {
  //   throw new Error("Data has been seeded");
  // }
  const resultParent: any[] = [];

  fs.createReadStream("./seeders/tummyfit_dataset.csv")
    .pipe(csv())
    .on("data", async (data) => {
      // if (data["Gluten Free"] === "True") result.push("Gluten Free");
      // if (data["Dairy Free"] === "True") result.push("Dairy Free");
      // if (data["Vegetarian"] === "True") result.push("Vegetarian");
      // result.push(data["Dish Type"]);
      const ingredientData = data["Ingredients"].split(",  ");
      await prisma.foods.create({
        data: {
          protein: parseFloat(data["Protein/g"]).toFixed(2),
          price: parseFloat(data["Price Per Serving"]).toFixed(4),
          ready_minutes: data["Ready in Minutes"],
          calories: parseFloat(data["Calories"]).toFixed(2),
          dishType: data["Dish Type"],
          vegetarian: data["Vegetarian"],
          fat: parseFloat(data["Fat/g"]).toFixed(2),
          carbo: parseFloat(data["Fat/g"]).toFixed(2),
          alcohol: parseFloat(data["Alcohol"]).toFixed(2),
          name: data["Recipe Title"],
          ingredients: ingredientData,
          image: data["Image"],
          popular: data["Popular"],
          halal: data["Halal"],
          instructions: data["Instructions"],
        },
      });
    })
    .on("end", async () => {});
}

initSeed()
  .then(() => {
    console.log("Success seeding data");
  })
  .catch((err) => {
    console.log(err.message);
  });
