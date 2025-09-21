import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Package, User, BookOpen, ExternalLink } from "lucide-react";

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

interface BookModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal = ({ book, isOpen, onClose }: BookModalProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "fill-secondary text-secondary"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {book.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Book Cover */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden shadow-book">
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={book.availability === "In stock" ? "default" : "destructive"}
                  className="shadow-sm backdrop-blur-sm"
                >
                  <Package className="w-3 h-3 mr-1" />
                  {book.availability}
                </Badge>
              </div>
            </div>

            {/* Price and Buy Button */}
            <div className="space-y-3">
              <div className="text-3xl font-bold text-primary">
                {book.price}
              </div>
              <Button 
                className="w-full" 
                size="lg"
                disabled={book.availability === "Out of stock"}
              >
                {book.availability === "In stock" ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-lg font-medium text-foreground">
                {book.rating}/5
              </span>
            </div>

            {/* Author */}
            {book.author && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>by {book.author}</span>
              </div>
            )}

            {/* Genre */}
            {book.genre && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{book.genre}</span>
              </div>
            )}

            {/* Description */}
            {book.description && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}

            {/* External Link */}
            <Button variant="outline" className="w-full" asChild>
              <a href={book.detailUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original Page
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};