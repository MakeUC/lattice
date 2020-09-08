import React from 'react';
import { AuthProvider } from '../providers/AuthProvider';
import { ProfileProvider } from '../providers/ProfileProvider';
import { MatchProvider } from '../providers/MatchProvider';
import { ProfileListProvider } from '../providers/ProfileListProvider';

export default function({ children }) {
  return <>
    <AuthProvider>
      <ProfileProvider>
        <ProfileListProvider>
          <MatchProvider>
            {children}
          </MatchProvider>
        </ProfileListProvider>
      </ProfileProvider>
    </AuthProvider>
  </>;
}