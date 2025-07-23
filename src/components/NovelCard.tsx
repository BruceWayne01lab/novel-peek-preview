import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Novel } from "@/data/novels";
import { Link } from "react-router-dom";
import { BookOpen, Star } from "lucide-react";

interface NovelCardProps {
  novel: Novel;
}

export const NovelCard = ({ novel }: NovelCardProps) => {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-gradient-warm border-0 overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={novel.coverImage} 
          alt={`${novel.title} cover`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {novel.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="default" className="bg-gradient-accent text-accent-foreground">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="font-reading text-lg leading-tight hover:text-primary transition-colors">
              {novel.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">by {novel.author}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {novel.genre}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {novel.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Link to={`/novel/${novel.id}`}>
          <Button variant="literary" className="w-full group-hover:scale-105">
            <BookOpen className="w-4 h-4 mr-2" />
            Read Preview
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};