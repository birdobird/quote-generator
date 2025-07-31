import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { A } from "@solidjs/router";
import Layout from "~/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <Title>Nie znaleziono strony - 404</Title>
      <HttpStatusCode code={404} />
      
      <div class="flex-1 flex items-center justify-center px-4 py-12">
        <div class="text-center max-w-2xl w-full">
          <div class="text-8xl md:text-9xl font-bold text-indigo-500 mb-4">404</div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p class="text-gray-600 text-base md:text-lg mb-8">
            It looks like the page you're looking for has been moved or doesn't exist.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <A 
              href="/" 
              class="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex-1 sm:flex-none text-center"
            >
              Back to Home
            </A>
            <A 
              href="/favourites" 
              class="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors duration-200 flex-1 sm:flex-none text-center"
            >
              See Favourites
            </A>
          </div>
        </div>
      </div>
      <div class="mt-12 text-sm text-gray-400">
        <p>If you think this is a mistake, contact us.</p>
      </div>
    </Layout>
  );
}
