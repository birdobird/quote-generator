import { Title } from "@solidjs/meta";
import { createSignal, onMount, Show } from "solid-js";
import { A } from "@solidjs/router";
import QuoteCard from "~/components/QuoteCard";
import Layout from "~/components/Layout";

type Quote = {
  content: string;
  author: string;
};

export default function Home() {
  const [quote, setQuote] = createSignal<Quote | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [notification, setNotification] = createSignal<string | null>(null);
  const [bgIndex, setBgIndex] = createSignal(0);

  const backgrounds = [
    'from-purple-600/20 via-pink-600/20 to-blue-600/20',
    'from-emerald-600/20 via-teal-600/20 to-cyan-600/20',
    'from-rose-600/20 via-fuchsia-600/20 to-violet-600/20',
    'from-amber-600/20 via-orange-600/20 to-pink-600/20',
  ];

  // Generate first quote on mount
  onMount(() => {
    generateQuote();
    // Change background gradient every 15 seconds
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 15000);
    return () => clearInterval(interval);
  });

  async function generateQuote() {
    setLoading(true);
    setError(null);
    setNotification(null);

    try {
      const res = await fetch("https://api.quotable.io/random");
      if (!res.ok) throw new Error("Błąd pobierania cytatu");

      const data: Quote = await res.json();
      setQuote(data);
      // Change background on new quote
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function addToFav(quote: Quote) {
    try {
      const favs = localStorage.getItem("favs") || "[]";
      const favsArray: Quote[] = JSON.parse(favs);
      
      // Check if quote already exists in favorites
      const quoteExists = favsArray.some(
        (fav) => fav.content === quote.content && fav.author === quote.author
      );
      
      if (quoteExists) {
        setNotification("Ten cytat jest już w ulubionych!");
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      
      favsArray.push(quote);
      localStorage.setItem("favs", JSON.stringify(favsArray));
      setNotification("Quote added to favorites!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error adding quote to favorites:", error);
      setNotification("Error Occurred");
      setTimeout(() => setNotification(null), 3000);
    }
  }

  return (
    <Layout>
      <Title>Quote Generator</Title>
      
      <div class="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <div class="text-center mb-8 md:mb-12">
          <h1 class="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">📜 Quote Generator</h1>
          <p class="text-gray-600 text-base md:text-lg">Discover inspiring quotes for every day</p>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center">
          <button
            onClick={generateQuote}
            disabled={loading()}
            class="mb-8 px-8 py-3 bg-indigo-600 text-white cursor-pointer rounded-full font-medium text-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading() ? (
              <>
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ładowanie...
              </>
            ) : (
              <>
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Generate quote
              </>
            )}
          </button>

          {error() && (
            <div class="bg-red-500/20 border-l-4 border-red-500 text-red-200 p-4 mb-8 rounded-lg max-w-2xl w-full">
              <p class="font-medium">Błąd:</p>
              <p>{error()}</p>
            </div>
          )}

          <Show when={quote()} keyed>
            {(q) => (
              <QuoteCard quote={q} addToFav={addToFav} favPage={false} />
            )}
          </Show>

          {notification() && (
            <div class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in-up">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{notification()}</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
