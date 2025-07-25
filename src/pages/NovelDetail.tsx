import { useParams } from "react-router-dom";
import { novels } from "@/data/novels";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { processNovelContent, schemas } from "@/lib/security";

export default function NovelDetail() {
  const { id } = useParams();
  
  // Validate novel ID
  const validationResult = schemas.novelId.safeParse(id);
  if (!validationResult.success) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Invalid Novel ID</h1>
          <Link to="/">
            <Button variant="literary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const novel = novels.find(n => n.id === id);
  const [currentPage, setCurrentPage] = useState(0);

  if (!novel) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Novel Not Found</h1>
          <Link to="/">
            <Button variant="literary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-primary-foreground hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="relative">
                <img 
                  src={novel.coverImage} 
                  alt={`${novel.title} cover`}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-elegant"
                />
                {novel.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h1 className="text-4xl font-reading font-bold mb-2">{novel.title}</h1>
                <p className="text-xl opacity-90">by {novel.author}</p>
                <Badge variant="secondary" className="mt-2">
                  {novel.genre}
                </Badge>
              </div>
              
              <p className="text-lg leading-relaxed opacity-90">
                {novel.description}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={novel.externalUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="continue" size="lg">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Continue Reading Full Novel
                  </Button>
                </a>
                <div className="flex items-center text-sm opacity-75">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Preview: 3 pages available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-reading font-semibold">
              Preview - Page {currentPage + 1} of {novel.pages.length}
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(Math.min(novel.pages.length - 1, currentPage + 1))}
                disabled={currentPage === novel.pages.length - 1}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Reading Content */}
          <Card className="bg-card shadow-book border-0">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none font-reading leading-relaxed">
                <div 
                  className="whitespace-pre-line text-foreground"
                  dangerouslySetInnerHTML={{ 
                    __html: processNovelContent(novel.pages[currentPage]) 
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Continue Reading CTA */}
          {currentPage === novel.pages.length - 1 && (
            <div className="mt-8 text-center">
              <Card className="bg-gradient-accent text-accent-foreground shadow-elegant border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-reading font-bold mb-4">
                    Want to read more?
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    This preview ends here, but the story continues! Click below to read the complete novel.
                  </p>
                  <a href={novel.externalUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="literary" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Continue Reading Full Novel
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Page Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {novel.pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentPage 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}