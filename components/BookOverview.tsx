import Image from "next/image";
import BookCover from "./BookCover";
import { Button } from "@/components/ui/button";
import  { Book } from "@/types";
export default function BookOverview({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  color,
  cover,
 video,
  summary,
  isLoanedBook
}: Book) {
  return (
    <section className="book-overview">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-5 flex-1">
        <h1 className="text-5xl font-bold text-light-100 md:text-6xl">
          {title}
        </h1>

        {/* Book Info */}
        <div className="book-info  space-y-2">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category: <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex items-center gap-1">
            <Image src="/icons/star.svg" alt="rating" width={22} height={22} />
            <p>{rating}</p>
          </div>

          <div className="book-copies space-y-1">
            <p>
              Total Books:{" "}
              <span className="font-semibold text-light-200">{totalCopies}</span>
            </p>
            <p>
              Available:{" "}
              <span className="font-semibold text-light-200">{availableCopies}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="book-description max-w-xl leading-relaxed text-light-500">
          {description}
        </p>

        {/* Borrow Button */}
        <Button className="book-overview_btn w-fit">
          <Image
            src="/icons/book.svg"
            alt="book"
            width={20}
            height={20}
            className="mr-2"
          />
          Borrow
        </Button>

      </div>
    {/* RIGHT SIDE (Book Cover 3D) */}
      <div className="relative flex justify-center flex-1">
        <div className="relative">
          <BookCover variant="wide" coverColor={color} coverImage={cover} className="z-10" />
        </div>

        {/* خلفية ثانية مائلة قليلاً */}
        <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
          <BookCover variant="wide" coverColor={color} coverImage={cover} />
        </div>
      </div>
  
    </section>
  );
}
