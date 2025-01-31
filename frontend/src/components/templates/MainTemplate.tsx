import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-grow flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default MainTemplate;
