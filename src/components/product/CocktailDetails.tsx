
import React from 'react';
import { CocktailData } from '@/data/cocktails';
import { Card, CardContent } from '@/components/ui/card';

interface CocktailDetailsProps {
  cocktails: CocktailData[];
}

const CocktailDetails = ({ cocktails }: CocktailDetailsProps) => {
  if (!cocktails || cocktails.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {cocktails.map((cocktail, index) => (
        <Card key={`cocktail-${index}`} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                {/* Direct path to image to ensure reliable loading */}
                <img 
                  src="/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png" 
                  alt={cocktail.name}
                  className="w-full h-auto rounded-md object-cover shadow-md"
                />
              </div>
              
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-2xl font-semibold">{cocktail.name}</h3>
                
                <p className="text-muted-foreground">{cocktail.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2">Ingredients:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {cocktail.ingredients.map((ingredient, i) => (
                      <li key={`ingredient-${i}`} className="text-muted-foreground">{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Garnish:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {cocktail.garnish.map((item, i) => (
                      <li key={`garnish-${i}`} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CocktailDetails;
