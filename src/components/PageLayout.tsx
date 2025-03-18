import React from 'react';
import { Navbar } from './common/Navbar';  // Fixed import path
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className={`flex-grow ${className}`}>
      {children}
    </main>
    <Footer />
  </div>
);

export default PageLayout;