import { IngredientData } from '@/types/ingredients';

export const commonIngredients: Record<string, IngredientData> = {
  'water': {
    description: 'The most common ingredient in food and cosmetics, used as a solvent and base.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'salt': {
    description: 'Common mineral used for flavoring and preservation.',
    category: 'food',
    warnings: ['May contribute to high blood pressure if consumed in excess'],
    safetyLevel: 'safe'
  },
  'sugar': {
    description: 'Natural sweetener derived from plants.',
    category: 'food',
    warnings: ['May contribute to dental issues and diabetes if consumed in excess'],
    safetyLevel: 'caution'
  },
  'flour': {
    description: 'Ground wheat or other grains used as a base in baked goods.',
    category: 'food',
    warnings: ['Contains gluten - not suitable for celiac disease'],
    safetyLevel: 'safe'
  },
  'enriched flour': {
    description: 'Ground wheat flour enriched with nutrients.',
    category: 'food',
    warnings: ['Contains gluten - not suitable for celiac disease'],
    safetyLevel: 'safe'
  },
  'corn syrup': {
    description: 'Sweet syrup made from cornstarch.',
    category: 'food',
    warnings: ['High sugar content - may contribute to obesity and diabetes'],
    safetyLevel: 'caution'
  },
  'corn syrup solids': {
    description: 'Dehydrated corn syrup used as a sweetener.',
    category: 'food',
    warnings: ['High sugar content - may contribute to obesity and diabetes'],
    safetyLevel: 'caution'
  },
  'dextrose': {
    description: 'A simple sugar derived from starch.',
    category: 'food',
    warnings: ['May contribute to high blood sugar levels if consumed in excess'],
    safetyLevel: 'caution'
  },
  'fructose': {
    description: 'A natural sugar found in fruits and honey.',
    category: 'food',
    warnings: ['May contribute to metabolic disorders if consumed in excess'],
    safetyLevel: 'caution'
  },
  'glycerin': {
    description: 'A sugar alcohol used as a sweetener and moisture retainer.',
    category: 'food',
    warnings: ['May cause digestive discomfort if consumed in large amounts'],
    safetyLevel: 'caution'
  },
  'soy lecithin': {
    description: 'Natural emulsifier found in soybeans.',
    category: 'food',
    warnings: ['May contain soy allergens'],
    safetyLevel: 'safe'
  },
  'dried potatoes': {
    description: 'Dehydrated potatoes used as a thickener or base ingredient.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'corn starch': {
    description: 'A starch derived from corn, used as a thickener.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'corn oil': {
    description: 'Oil extracted from corn kernels, used in cooking.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'sea salt': {
    description: 'Unrefined salt obtained from seawater.',
    category: 'food',
    warnings: ['May contribute to high blood pressure if consumed in excess'],
    safetyLevel: 'safe'
  },
  'annatto extracts': {
    description: 'Natural food coloring derived from the annatto seed.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },

  // Oils and Fats
  'vegetable oil': {
    description: 'Oil derived from plants, commonly used for cooking.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'olive oil': {
    description: 'Oil extracted from olives, rich in healthy fats.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'sunflower oil': {
    description: 'Oil extracted from sunflower seeds.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'palm oil': {
    description: 'Oil derived from palm fruits.',
    category: 'food',
    warnings: ['May contribute to environmental concerns'],
    safetyLevel: 'safe'
  },
  'coconut oil': {
    description: 'Oil extracted from coconuts, high in saturated fats.',
    category: 'food',
    warnings: ['High in saturated fat'],
    safetyLevel: 'safe'
  },

  // Spices and Seasonings
  'garlic': {
    description: 'Common flavoring ingredient with potential health benefits.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'onion': {
    description: 'Vegetable used for flavoring.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'black pepper': {
    description: 'Common spice used for seasoning.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'turmeric': {
    description: 'Yellow spice with anti-inflammatory properties.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'cinnamon': {
    description: 'Sweet and warm spice from tree bark.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },

  // Dairy and Alternatives
  'milk': {
    description: 'Dairy product from animals.',
    category: 'food',
    warnings: ['Common allergen', 'Contains lactose'],
    safetyLevel: 'safe'
  },
  'cream': {
    description: 'High-fat dairy product.',
    category: 'food',
    warnings: ['Contains lactose', 'High in fat'],
    safetyLevel: 'safe'
  },
  'butter': {
    description: 'Dairy product made from cream.',
    category: 'food',
    warnings: ['Contains lactose', 'High in saturated fat'],
    safetyLevel: 'safe'
  },
  'cheese': {
    description: 'Dairy product made from milk.',
    category: 'food',
    warnings: ['Contains lactose', 'Common allergen'],
    safetyLevel: 'safe'
  },

  // Proteins
  'whey protein': {
    description: 'Protein derived from milk.',
    category: 'food',
    warnings: ['Contains dairy', 'Common allergen'],
    safetyLevel: 'safe'
  },
  'soy protein': {
    description: 'Protein derived from soybeans.',
    category: 'food',
    warnings: ['Common allergen'],
    safetyLevel: 'safe'
  },
  'pea protein': {
    description: 'Plant-based protein from peas.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },

  // Grains and Starches
  'rice': {
    description: 'Common grain used as a staple food.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'oats': {
    description: 'Whole grain cereal.',
    category: 'food',
    warnings: ['May contain gluten from cross-contamination'],
    safetyLevel: 'safe'
  },
  'barley': {
    description: 'Cereal grain used in food and beverages.',
    category: 'food',
    warnings: ['Contains gluten'],
    safetyLevel: 'safe'
  },
  'quinoa': {
    description: 'Protein-rich pseudo-grain.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },

  // Nuts and Seeds
  'almonds': {
    description: 'Tree nut rich in healthy fats and protein.',
    category: 'food',
    warnings: ['Common tree nut allergen'],
    safetyLevel: 'safe'
  },
  'cashews': {
    description: 'Tree nut with creamy texture.',
    category: 'food',
    warnings: ['Common tree nut allergen'],
    safetyLevel: 'safe'
  },
  'chia seeds': {
    description: 'Small seeds rich in omega-3 fatty acids.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'flax seeds': {
    description: 'Seeds rich in omega-3 fatty acids and fiber.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },

  // Fruits and Vegetables
  'tomato': {
    description: 'Fruit commonly used as a vegetable.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'spinach': {
    description: 'Leafy green vegetable rich in iron.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'carrot': {
    description: 'Root vegetable rich in beta carotene.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'apple': {
    description: 'Common fruit rich in fiber.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },

  // Natural Sweeteners
  'honey': {
    description: 'Natural sweetener produced by bees.',
    category: 'food',
    warnings: ['Not suitable for infants under 12 months'],
    safetyLevel: 'safe'
  },
  'maple syrup': {
    description: 'Natural sweetener from maple trees.',
    category: 'food',
    warnings: ['High sugar content'],
    safetyLevel: 'safe'
  },
  'agave nectar': {
    description: 'Natural sweetener from agave plant.',
    category: 'food',
    warnings: ['High fructose content'],
    safetyLevel: 'safe'
  },

  // Herbs
  'basil': {
    description: 'Aromatic herb used for flavoring.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'oregano': {
    description: 'Mediterranean herb used for flavoring.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'thyme': {
    description: 'Aromatic herb used in cooking.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  },
  'rosemary': {
    description: 'Fragrant herb used in cooking.',
    category: 'food',
    warnings: [],
    safetyLevel: 'safe'
  }
};
