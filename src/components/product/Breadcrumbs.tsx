
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  productName: string;
  category: string;
}

const Breadcrumbs = ({ productName, category }: BreadcrumbsProps) => {
  return (
    <div className="mb-6 flex items-center text-sm text-muted-foreground">
      <Link to="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <span className="mx-2">/</span>
      <Link 
        to={`/products/${category}`} 
        className="hover:text-primary transition-colors"
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-foreground">
        {productName}
      </span>
    </div>
  );
};

export default Breadcrumbs;
