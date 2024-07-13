import { notFound } from "next/navigation";
import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import MealSlugCarousel2 from "@/components/meals/MealSlugCarousel2";

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({ params }) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <div className='flex  justify-center gap-8 '>
        <div className='h-[500px] w-[500px]'>
          <MealSlugCarousel2 meal={meal} />
        </div>
        <div>
          <div className={classes.headerText}>
            <h1>{meal.title}</h1>
            <p className={classes.creator}>
              by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            </p>
            <p className={classes.summary}>{meal.summary}</p>
          </div>
          <div>
            <p
              className={classes.instructions}
              dangerouslySetInnerHTML={{
                __html: meal.instructions,
              }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
}
