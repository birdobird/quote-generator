import { createEffect, onMount } from "solid-js";

type Quote = {
  content: string;
  author: string;
};

export default function QuoteCard({ 
  quote, 
  addToFav, 
  favPage 
}: { 
  quote: Quote; 
  addToFav: (quote: Quote) => void; 
  favPage?: boolean; 
}) {
  return (
    <div class="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:shadow-xl w-full max-w-2xl mx-auto border border-gray-100">
      <div class="relative">
        <svg 
          class="absolute -top-8 -left-8 text-gray-100 w-24 h-24" 
          aria-hidden="true" 
          viewBox="0 0 24 27" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.017 21.728C14.017 22.319 13.558 23 12.87 23H10.96C10.28 23 9.7 22.4 9.7 21.8C9.7 17.6 12.5 14.6 15.4 11.3C15.8 10.8 16.2 10.2 16.2 9.5C16.2 8.8 15.6 8.2 14.9 8.2C12.6 8.2 8.4 11.3 8.4 21.8C8.4 22.4 7.8 23 7.1 23H5.2C4.5 23 4 22.5 4 21.8C4 10.1 9.9 0 21.7 0H23V1.3C23 1.9 22.4 2.5 21.7 2.5C15.6 2.5 14 7.5 14 10.1C14 15.9 14.1 21.1 14 21.7L14.017 21.728Z" fill="currentColor"/>
        </svg>
        
        {/* Wymuś reaktywność poprzez funkcję */}
        <blockquote class="relative z-10 text-xl md:text-2xl font-light text-gray-800 leading-relaxed mb-6">
          "{(() => {
            return quote.content;
          })()}"
        </blockquote>
        
        <div class="flex items-center justify-between flex-wrap gap-4">
          <p class="text-lg font-medium text-gray-600">
            — {(() => {
              return quote.author;
            })()}
          </p>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToFav(quote);
            }}
            class={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              favPage 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
            }`}
          >
            {favPage ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          </button>
        </div>
      </div>
    </div>
  );
}