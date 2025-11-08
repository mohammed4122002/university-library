import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export default async function HomePage() {
  const result = await  db.select().from(users);
  console.log(JSON.stringify(result, null, 2));

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
