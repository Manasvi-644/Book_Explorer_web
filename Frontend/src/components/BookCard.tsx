import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Package } from "lucide-react";

interface Book {
  id: string;
  title: string;
  price: string;
  rating: number;
  availability: "In stock" | "Out of stock";
  thumbnail: string;
  detailUrl: string;
}

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

export const BookCard = ({ book, onClick }: BookCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-secondary text-secondary"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card 
      className="group cursor-pointer bg-gradient-card hover:shadow-book-hover transition-all duration-300 hover:-translate-y-2 border-border/50"
      onClick={() => onClick(book)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <Badge 
              variant={book.availability === "In stock" ? "default" : "destructive"}
              className="shadow-sm backdrop-blur-sm"
            >
              <Package className="w-3 h-3 mr-1" />
              {book.availability}
            </Badge>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(book.rating)}
              <span className="text-sm text-muted-foreground ml-1">
                ({book.rating})
              </span>
            </div>
            <div className="text-lg font-bold text-primary">
              {book.price}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};