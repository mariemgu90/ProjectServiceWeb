import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-dashboard.component').then(c => c.AdminDashboardComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'competitions',
        loadComponent: () => import('./components/admin/competitions/competitions.component').then(c => c.CompetitionsComponent)
      },
      {
        path: 'matches',
        loadComponent: () => import('./components/admin/matches/matches.component').then(c => c.MatchesComponent)
      },
      {
        path: 'clubs',
        loadComponent: () => import('./components/admin/clubs/clubs.component').then(c => c.ClubsComponent)
      },
      {
        path: 'players',
        loadComponent: () => import('./components/admin/players/players.component').then(c => c.PlayersComponent)
      },
      {
        path: 'halls',
        loadComponent: () => import('./components/admin/halls/halls.component').then(c => c.HallsComponent)
      }
    ]
  },
  {
    path: 'club-manager',
    loadComponent: () => import('./components/club-manager/club-manager-dashboard.component').then(c => c.ClubManagerDashboardComponent)
  },
  {
    path: 'player',
    loadComponent: () => import('./components/player/player-dashboard.component').then(c => c.PlayerDashboardComponent)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];