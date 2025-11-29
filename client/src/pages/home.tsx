import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Font } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Shuffle, Copy, Check } from "lucide-react";
import shawarmaIcon from "@assets/generated_images/shawarma_wrap_icon.png";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";

function FontCardSkeleton() {
  return (
    <Card className="py-8 px-6 min-h-32 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Skeleton className="h-10 w-3/4" />
      </div>
      <div className="mt-4 flex justify-center">
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </Card>
  );
}

function FontCard({ font, text, onCopy }: { font: Font; text: string; onCopy: (name: string) => void }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = useCallback(() => {
    onCopy(font.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [font.name, onCopy]);

  return (
    <Card 
      className="group relative py-8 px-6 min-h-32 flex flex-col hover-elevate cursor-default"
      data-testid={`card-font-${font.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          {font.name}
        </span>
        <Button
          size="icon"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
          data-testid={`button-copy-${font.name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      <div 
        className="flex-1 flex items-center justify-center text-2xl md:text-3xl lg:text-[40px] leading-tight text-center break-all"
        style={{ fontFamily: font.family }}
      >
        {text || "Type something..."}
      </div>
      <div className="mt-4 flex justify-center">
        <Badge variant="secondary" className="text-[10px]">
          {font.category}
        </Badge>
      </div>
    </Card>
  );
}

function RandomFontDisplay({ font, text, onRandomize, isLoading }: { font?: Font; text: string; onRandomize: () => void; isLoading?: boolean }) {
  if (isLoading || !font) {
    return (
      <Card className="py-16 px-8 md:py-24 md:px-12 text-center" data-testid="card-random-font">
        <Skeleton className="h-4 w-32 mx-auto mb-6" />
        <Skeleton className="h-16 w-3/4 mx-auto mb-8" />
        <Skeleton className="h-5 w-20 mx-auto rounded-full mb-8" />
        <Skeleton className="h-9 w-40 mx-auto rounded-md" />
      </Card>
    );
  }

  return (
    <Card className="py-16 px-8 md:py-24 md:px-12 text-center" data-testid="card-random-font">
      <span className="text-[12px] uppercase tracking-widest text-muted-foreground font-medium block mb-6">
        {font.name}
      </span>
      <div 
        className="text-5xl md:text-6xl lg:text-7xl leading-tight break-all mb-8"
        style={{ fontFamily: font.family }}
        data-testid="text-random-display"
      >
        {text || "Type something..."}
      </div>
      <Badge variant="outline" className="mb-8">
        {font.category}
      </Badge>
      <div>
        <Button 
          onClick={onRandomize}
          size="lg"
          data-testid="button-randomize"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Randomize Font
        </Button>
      </div>
    </Card>
  );
}

export default function Home() {
  const [text, setText] = useState("");
  const [randomFontIndex, setRandomFontIndex] = useState<number>(0);
  const { toast } = useToast();

  const { data: fonts, isLoading } = useQuery<Font[]>({
    queryKey: ["/api/fonts"],
  });

  useEffect(() => {
    if (fonts && fonts.length > 0) {
      setRandomFontIndex(Math.floor(Math.random() * fonts.length));
    }
  }, [fonts]);

  const randomFont = fonts?.[randomFontIndex];

  const handleRandomize = useCallback(() => {
    if (!fonts) return;
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * fonts.length);
    } while (newIndex === randomFontIndex && fonts.length > 1);
    setRandomFontIndex(newIndex);
  }, [fonts, randomFontIndex]);

  const handleCopyFontName = useCallback((name: string) => {
    navigator.clipboard.writeText(name);
    toast({
      title: "Copied!",
      description: `"${name}" copied to clipboard`,
    });
  }, [toast]);

  const displayText = text || "Shawarma";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto h-full px-6 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={shawarmaIcon} alt="Shawarma" className="h-6 w-6 object-contain" />
            <h1 className="text-xl font-semibold">Sakalla Font Editor</h1>
          </div>
          <div className="flex items-center gap-2">
            {fonts && (
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {fonts.length} fonts
              </Badge>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-12">
        <section className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Very Cool Fonts
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Type in a word and get a really cool font. Also 3D fonts and show them off to your friends and become the coolest person ever.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Type your word here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-center rounded-xl border-2 focus-visible:ring-2 focus-visible:ring-primary"
              data-testid="input-text"
            />
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Random Font</h3>
          </div>
          <RandomFontDisplay 
            font={randomFont} 
            text={displayText} 
            onRandomize={handleRandomize}
            isLoading={isLoading}
          />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h3 className="text-lg font-semibold">All Fonts</h3>
            <span className="text-sm text-muted-foreground">
              Hover to copy font name
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <FontCardSkeleton key={i} />
              ))
            ) : (
              fonts?.map((font) => (
                <FontCard 
                  key={font.name} 
                  font={font} 
                  text={displayText}
                  onCopy={handleCopyFontName}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-center text-sm text-muted-foreground">
          <p>Sakalla Font Editor - Explore and discover beautiful fonts for your projects</p>
        </div>
      </footer>
    </div>
  );
}
