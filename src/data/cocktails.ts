
/**
 * Contains signature cocktail data that can be reused across the application
 */

export interface CocktailData {
  name: string;
  description: string;
  ingredients: string[];
  garnish: string[];
  imagePath: string;
}

// The Maiz à Trois cocktail with direct hardcoded image path
export const maizATroisCocktail: CocktailData = {
  name: 'Maiz à Trois',
  description: 'The Maiz à Trois celebrates the heart of Mexican culture with an intriguing combination of smoky, earthy, and subtly sweet flavors. Nixta Corn Liqueur provides a rich, corn-forward sweetness, balanced by the deep, bold character of Maiz Nation Mexican Whiskey. The Pox adds an extra layer of complexity, while the Roasted Corn and Chipotle Bitters introduce smoky heat and a touch of spice. The garnish of pickled baby corn, flambéed with aromatic salt, adds a touch of acidity and drama, enhancing the cocktail\'s overall depth. This drink is both a visual and flavorful experience, perfect for those who appreciate bold, nuanced flavors with a hint of flair.',
  ingredients: [
    '3cl Nixta Corn Liqueur',
    '1cl Pox',
    '2cl Maiz Nation Mexican Whiskey',
    '3 dashes Roasted Corn & Smoked Chili Bitters'
  ],
  garnish: [
    'Pickled baby corn, flambéed for dramatic effect',
    'A sprinkle of homemade aromatic salt (smoked paprika, chili flakes, and sea salt)'
  ],
  // Using absolute path to fix image loading issues
  imagePath: '/lovable-uploads/0d0bdbcb-f301-475f-bbbc-33e40d2d9fef.png'
};
