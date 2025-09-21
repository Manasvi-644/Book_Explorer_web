import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchFilters } from "@/components/SearchFilters";
import { BookGrid } from "@/components/BookGrid";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    rating?: string;
    availability?: string;
    priceRange?: string;
  }>({
    rating: "",
    availability: "",
    priceRange: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: {
    rating?: string;
    availability?: string;
    priceRange?: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <SearchFilters 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
          
          <BookGrid 
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>
      </main>
      
      <footer className="mt-16 py-8 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Book Explorer - Built with React, TypeScript, and Tailwind CSS
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Ready to connect to your Supabase backend for full functionality
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;