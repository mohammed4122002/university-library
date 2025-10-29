import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";
type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute inset-y-[6%] left-[12%] z-10"
        style={{ width: "87.5%" }}
      >
        <Image
          src={coverImage}
          alt="book cover"
          fill
          className="rounded-sm object-cover"
          sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 320px"
        />
      </div>
    </div>
  );
};
 
export default BookCover;
