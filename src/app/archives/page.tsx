"use client";

import Archives from "../components/Archives.jsx";
import Footer from "../components/Footer.jsx";
import NavigationBar from "../components/NavigationBar.jsx";

export default function ArchivesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <NavigationBar pageName="Archives" />
      <main className="flex-1 px-6 sm:pt-8 sm:px-8 md:px-10 space-y-8">
        <Archives />
      </main>
      <Footer />
    </div>
  );
}
