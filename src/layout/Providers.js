import React from 'react';
import { AuthProvider } from '../providers/AuthProvider';
import { ProfileProvider } from '../providers/ProfileProvider';
import { MatchProvider } from '../providers/MatchProvider';
import { ProfileListProvider } from '../providers/ProfileListProvider';
import { NotificationProvider } from '../providers/NotificationProvider';
import { LatticeThemeProvider } from '../providers/LatticeThemeProvider';

export default function({ children }) {
  return <>
    <AuthProvider>
      <ProfileProvider>
        <ProfileListProvider>
          <MatchProvider>
            <NotificationProvider>
              <LatticeThemeProvider>
                {children}
              </LatticeThemeProvider>
            </NotificationProvider>
          </MatchProvider>
        </ProfileListProvider>
      </ProfileProvider>
    </AuthProvider>
  </>;
}