import { FAQ } from '@/data/faq';
import { ingredientsDatabase } from '@/data/ingredients';

export function findIngredientInDatabase(query: string): { found: boolean; response: string } {
  const cleanQuery = query.toLowerCase().trim();
  
  // Check direct matches in ingredients database
  for (const [ingredient, data] of Object.entries(ingredientsDatabase)) {
    if (cleanQuery.includes(ingredient)) {
      return {
        found: true,
        response: `${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}: ${data.description}\n\n` +
          `Category: ${data.category}\n` +
          `Safety Level: ${data.safetyLevel}\n` +
          (data.warnings.length > 0 ? `\nWarnings:\n${data.warnings.map(w => `• ${w}`).join('\n')}` : '')
      };
    }
  }

  return { found: false, response: '' };
}

export function findBestMatch(query: string, faqData: typeof FAQ): string {
  query = query.toLowerCase();
  
  // Check for ingredient matches first
  const ingredientMatch = findIngredientInDatabase(query);
  if (ingredientMatch.found) {
    return ingredientMatch.response;
  }
  
  // Check for exact FAQ matches
  for (const item of faqData) {
    if (item.keywords.some(keyword => query === keyword)) {
      return item.response;
    }
  }

  // Check for partial FAQ matches
  for (const item of faqData) {
    if (item.keywords.some(keyword => query.includes(keyword))) {
      return item.response;
    }
  }

  // Fallback response if no match is found
  return "I understand you're asking about our service. While I'm currently operating in offline mode, I can still help with basic questions about ingredients, our website, or direct you to the right resources. Feel free to ask about our features, team, or how to use ingreSnap!";
}

export function processQuery(query: string): string {
  // Remove special characters and extra spaces
  return query.replace(/[^\w\s]/gi, '').trim().toLowerCase();
}

export function isGreeting(query: string): boolean {
  const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
  return greetings.some(greeting => query.toLowerCase().includes(greeting));
}

export function getGreetingResponse(): string {
  const greetings = [
    "Hello! How can I help you today?",
    "Hi there! I'm here to help with any questions about ingreSnap.",
    "Welcome! Feel free to ask me about our ingredient analysis features.",
    "Greetings! I'm here to assist you with any questions about our service."
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}