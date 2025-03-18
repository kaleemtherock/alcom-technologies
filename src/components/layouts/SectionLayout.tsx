import React from 'react';

interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  className = '',
  title,
  description
}) => (
  <section className={`py-12 ${className}`}>
    <div className="container mx-auto px-4">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>}
          {description && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>}
        </div>
      )}
      {children}
    </div>
  </section>
);

export default SectionLayout;