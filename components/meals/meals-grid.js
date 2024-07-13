import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem
            title={meal.title}
            slug={meal.slug}
            images={meal.images} // Pass the images array to MealItem
            summary={meal.summary}
            creator={meal.creator}
          />
        </li>
      ))}
    </ul>
  );
}
