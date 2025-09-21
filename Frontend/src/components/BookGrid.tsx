import { BookCard } from "./BookCard";
import { BookModal } from "./BookModal";
import { useState } from "react";
import book1 from "@/assets/book1.jpg";
import book2 from "@/assets/book2.jpg";
import book3 from "@/assets/book3.jpg";
import book4 from "@/assets/book4.jpg";

interface Book {
  id: string;
  title: string;
  price: string;
  rating: number;
  availability: "In stock" | "Out of stock";
  thumbnail: string;
  detailUrl: string;
  description?: string;
  author?: string;
  genre?: string;
}

const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Adventure",
    price: "£16.99",
    rating: 5,
    availability: "In stock",
    thumbnail: book1,
    detailUrl: "#",
    description: "A thrilling tale of courage and discovery that will captivate readers from beginning to end.",
    author: "Jane Smith",
    genre: "Adventure"
  },
  {
    id: "2",
    title: "Midnight Secrets",
    price: "£12.50",
    rating: 4,
    availability: "In stock",
    thumbnail: book2,
    detailUrl: "#",
    description: "A dark mystery that unfolds in the shadows of the night, keeping you guessing until the very last page.",
    author: "John Doe",
    genre: "Mystery"
  },
  {
    id: "3",
    title: "Dragon's Quest",
    price: "£19.99",
    rating: 5,
    availability: "Out of stock",
    thumbnail: book3,
    detailUrl: "#",
    description: "An epic fantasy journey through magical realms filled with dragons, wizards, and ancient mysteries.",
    author: "Sarah Johnson",
    genre: "Fantasy"
  },
  {
    id: "4",
    title: "Summer Romance",
    price: "£14.75",
    rating: 4,
    availability: "In stock",
    thumbnail: book4,
    detailUrl: "#",
    description: "A heartwarming romance set against the beautiful backdrop of a summer coastal town.",
    author: "Emily Brown",
    genre: "Romance"
  },
  {
    id: "5",
    title: "The Great Adventure",
    price: "£16.99",
    rating: 5,
    availability: "In stock",
    thumbnail: book1,
    detailUrl: "#",
    description: "A thrilling tale of courage and discovery that will captivate readers from beginning to end.",
    author: "Jane Smith",
    genre: "Adventure"
  },
  {
    id: "6",
    title: "Midnight Secrets",
    price: "£12.50",
    rating: 4,
    availability: "In stock",
    thumbnail: book2,
    detailUrl: "#",
    description: "A dark mystery that unfolds in the shadows of the night, keeping you guessing until the very last page.",
    author: "John Doe",
    genre: "Mystery"
  },
  {
    id: "7",
    title: "The Great Adventure",
    price: "£16.99",
    rating: 5,
    availability: "In stock",
    thumbnail: book1,
    detailUrl: "#",
    description: "A thrilling tale of courage and discovery that will captivate readers from beginning to end.",
    author: "Jane Smith",
    genre: "Adventure"
  },
  {
    id: "8",
    title: "Midnight Secrets",
    price: "£12.50",
    rating: 4,
    availability: "In stock",
    thumbnail: book2,
    detailUrl: "#",
    description: "A dark mystery that unfolds in the shadows of the night, keeping you guessing until the very last page.",
    author: "John Doe",
    genre: "Mystery"
  },
  {
    id: "9",
    title: "Dragon's Quest",
    price: "£19.99",
    rating: 5,
    availability: "Out of stock",
    thumbnail: book3,
    detailUrl: "#",
    description: "An epic fantasy journey through magical realms filled with dragons, wizards, and ancient mysteries.",
    author: "Sarah Johnson",
    genre: "Fantasy"
  },
  {
    id: "10",
    title: "Summer Romance",
    price: "£14.75",
    rating: 4,
    availability: "In stock",
    thumbnail: book4,
    detailUrl: "#",
    description: "A heartwarming romance set against the beautiful backdrop of a summer coastal town.",
    author: "Emily Brown",
    genre: "Romance"
  },
  // Duplicate some books to show pagination
  {
    id: "11",
    title: "The Great Adventure",
    price: "£16.99",
    rating: 5,
    availability: "In stock",
    thumbnail: book1,
    detailUrl: "#",
    description: "A thrilling tale of courage and discovery that will captivate readers from beginning to end.",
    author: "Jane Smith",
    genre: "Adventure"
  },
  {
    id: "12",
    title: "Midnight Secrets",
    price: "£12.50",
    rating: 4,
    availability: "In stock",
    thumbnail: book2,
    detailUrl: "#",
    description: "A dark mystery that unfolds in the shadows of the night, keeping you guessing until the very last page.",
    author: "John Doe",
    genre: "Mystery"
  },
];

interface BookGridProps {
  searchQuery: string;
  filters: {
    rating?: string;
    availability?: string;
    priceRange?: string;
  };
}

export const BookGrid = ({ searchQuery, filters }: BookGridProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Filter books based on search and filters
  const filteredBooks = mockBooks.filter((book) => {
    // Search filter
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Rating filter
    if (filters.rating && book.rating < parseInt(filters.rating)) {
      return false;
    }

    // Availability filter
    if (filters.availability && book.availability !== filters.availability) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const price = parseFloat(book.price.replace('£', ''));
      const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''));
      
      if (max) {
        if (price < parseFloat(min) || price > parseFloat(max)) {
          return false;
        }
      } else {
        if (price < parseFloat(min)) {
          return false;
        }
      }
    }

    return true;
  });

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters to find more books.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={handleBookClick}
          />
        ))}
      </div>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};