'use client';

import '@/lib/docs/mdx_prism_github.css';

import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import React from 'react';

import AppHeader from '@/components/header/AppHeader';
import AuthContext from '@/context/AuthContext';

type DocsProps = {
  user: DecodedIdToken | null;
  children: React.ReactNode;
};

const Docs = ({ user, children }: DocsProps) => {
  return (
    <AuthContext.Provider value={user}>
      <AppHeader />
      <div className="markdown-body">{children}</div>
    </AuthContext.Provider>
  );
};

export default Docs;
