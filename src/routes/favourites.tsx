import { Title } from "@solidjs/meta";
import { createSignal, onMount, Show } from "solid-js";
import { A } from "@solidjs/router";
import QuoteCard from "~/components/QuoteCard";
import Layout from "~/components/Layout";
import type { Quote } from "../types";

export default function Favourites() {
  const [favorites, setFavorites] = createSignal<Quote[]>([]);
  const [notification, setNotification] = createSignal<string | null>(null);

  // Load favorites from localStorage on client side only
  onMount(() => {
    try {
      const storedFavs = typeof window !== 'undefined' ? localStorage.getItem("favs") : null;
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (error) {
      console.error("Błąd wczytywania ulubionych:", error);
      setNotification("Wystąpił błąd podczas wczytywania ulubionych cytatów.");
      setTimeout(() => setNotification(null), 3000);
    }
  });

  const removeFromFavorites = (quoteToRemove: Quote) => {
    try {
      const updatedFavorites = favorites().filter(
        (quote) => !(quote.content === quoteToRemove.content && quote.author === quoteToRemove.author)
      );
      
      setFavorites(updatedFavorites);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("favs", JSON.stringify(updatedFavorites));
      }
      
      setNotification("Cytat został usunięty z ulubionych");
      setTimeout(() => setNotification(null), 3000);
      
    } catch (error) {
      console.error("Błąd usuwania z ulubionych:", error);
      setNotification("Wystąpił błąd podczas usuwania cytatu");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <Layout>
      <Title>Favourites</Title>
      
      <div class="container mx-auto px-4 py-8">
        <div class="text-center mb-8 md:mb-12">
          <h1 class="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">⭐ Favourites</h1>
          <p class="text-gray-600 text-base md:text-lg">Your collection of favorite quotes</p>
        </div>
        
        <A 
          href="/" 
          class="inline-block mt-6 px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium hover:bg-indigo-200 transition-colors duration-200 mb-4.5"
        >
          ← Back to Home
        </A>

        <Show when={notification()}>
          <div class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in-up z-50">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{notification()}</span>
          </div>
        </Show>

        <Show when={favorites().length === 0} fallback={
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites().map((quote, index) => (
              <div class="animate-fade-in" style={`animation-delay: ${index * 100}ms`}>
                <QuoteCard 
                  quote={quote} 
                  addToFav={removeFromFavorites} 
                  favPage={true} 
                />
              </div>
            ))}
          </div>
        }>
          <div class="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div class="mx-auto w-24 h-24 text-gray-300 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">No favorites quotes</h2>
            <p class="text-gray-500 mb-6">Add quotes to favorites to see them here</p>
            <A 
              href="/" 
              class="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Generate quote
            </A>
          </div>
        </Show>
      </div>
    </Layout>
  );
}
