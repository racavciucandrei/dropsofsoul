
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider';
import ProfileDropdown from './ProfileDropdown';

const AuthNavItems = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <ProfileDropdown />;
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link to="/auth">Sign In</Link>
      </Button>
      <Button asChild>
        <Link to="/auth?tab=register">Register</Link>
      </Button>
    </div>
  );
};

export default AuthNavItems;
