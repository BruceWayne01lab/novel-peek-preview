import { NovelCard } from "@/components/NovelCard";
import { novels } from "@/data/novels";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Library } from "lucide-react";

const Index = () => {
  const featuredNovels = novels.filter(novel => novel.featured);
  const otherNovels = novels.filter(novel => !novel.featured);

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <Library className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl md:text-6xl font-reading font-bold mb-6">
              Novel Previews
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Discover captivating stories with our exclusive 3-page previews. 
              Fall in love with new worlds, then continue your journey on the full sites.
            </p>
            <div className="flex items-center justify-center gap-6 text-lg">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>3 Free Pages</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                <span>Curated Selection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Novels */}
      {featuredNovels.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Badge variant="default" className="bg-gradient-accent text-accent-foreground text-lg px-4 py-2 mb-4">
              <Star className="w-4 h-4 mr-2" />
              Featured Stories
            </Badge>
            <h2 className="text-3xl font-reading font-bold text-foreground mb-4">
              Editor's Picks
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hand-selected novels that showcase the best in contemporary storytelling
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNovels.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </div>
        </section>
      )}

      {/* All Novels */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-reading font-bold text-foreground mb-4">
            Browse All Novels
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of previews across all genres
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {novels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-reading font-bold mb-6">
              Ready to Start Reading?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Each preview gives you a taste of the story's magic. 
              When you're hooked, continue reading the full novel on the author's official site.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Preview</h3>
                <p className="text-sm opacity-75">Read 3 pages free</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Discover</h3>
                <p className="text-sm opacity-75">Find your next favorite</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Library className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Continue</h3>
                <p className="text-sm opacity-75">Read the full story</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
