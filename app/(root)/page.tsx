import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <BookOverview {...sampleBooks[0]} />

      
       <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
}
