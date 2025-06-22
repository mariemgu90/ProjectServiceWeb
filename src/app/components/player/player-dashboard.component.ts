import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-player-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="player-layout">
      <nav class="sidebar">
        <div class="sidebar-header">
          <h2>Player Portal</h2>
          <p>Your Tennis Journey</p>
        </div>
        
        <ul class="sidebar-menu">
          <li><a href="#" class="active"><i class="icon">📊</i><span>Dashboard</span></a></li>
          <li><a href="#"><i class="icon">🎾</i><span>My Matches</span></a></li>
          <li><a href="#"><i class="icon">🏆</i><span>Competitions</span></a></li>
          <li><a href="#"><i class="icon">📈</i><span>Statistics</span></a></li>
          <li><a href="#"><i class="icon">📅</i><span>Schedule</span></a></li>
          <li><a href="#"><i class="icon">👤</i><span>Profile</span></a></li>
        </ul>
        
        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()">
            <i class="icon">🚪</i>
            <span>Logout</span>
          </button>
        </div>
      </nav>
      
      <main class="main-content">
        <header class="top-header">
          <div class="header-left">
            <h1>Player Dashboard</h1>
          </div>
          <div class="header-right">
            <div class="user-info">
              <span class="user-name">Tennis Player</span>
              <div class="user-avatar">TP</div>
            </div>
          </div>
        </header>
        
        <div class="content-area">
          <div class="dashboard-content">
            <div class="player-profile">
              <div class="profile-card">
                <div class="profile-avatar">
                  <div class="avatar-circle">TP</div>
                </div>
                <div class="profile-info">
                  <h2>Tennis Player</h2>
                  <p class="club-name">Tennis Club A</p>
                  <p class="license">License: LIC001</p>
                </div>
                <div class="profile-stats">
                  <div class="stat">
                    <span class="stat-value">15</span>
                    <span class="stat-label">Matches</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">12</span>
                    <span class="stat-label">Wins</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">80%</span>
                    <span class="stat-label">Win Rate</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">🎾</div>
                <div class="stat-content">
                  <h3>15</h3>
                  <p>Total Matches</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🏆</div>
                <div class="stat-content">
                  <h3>12</h3>
                  <p>Matches Won</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📈</div>
                <div class="stat-content">
                  <h3>80%</h3>
                  <p>Win Rate</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🎯</div>
                <div class="stat-content">
                  <h3>3</h3>
                  <p>Tournaments</p>
                </div>
              </div>
            </div>

            <div class="content-grid">
              <div class="card">
                <div class="card-header">
                  <h2>Recent Matches</h2>
                </div>
                <div class="card-content">
                  <div class="match-list">
                    <div class="match-item">
                      <div class="match-info">
                        <h4>vs Mike Johnson</h4>
                        <p>Championship Quarter Final</p>
                        <span class="match-date">2 days ago</span>
                      </div>
                      <div class="match-result win">
                        <span class="result">WIN</span>
                        <span class="score">6-4, 6-2</span>
                      </div>
                    </div>
                    <div class="match-item">
                      <div class="match-info">
                        <h4>vs Sarah Davis</h4>
                        <p>League Match</p>
                        <span class="match-date">1 week ago</span>
                      </div>
                      <div class="match-result loss">
                        <span class="result">LOSS</span>
                        <span class="score">3-6, 4-6</span>
                      </div>
                    </div>
                    <div class="match-item">
                      <div class="match-info">
                        <h4>vs Emma Wilson</h4>
                        <p>Friendly Match</p>
                        <span class="match-date">2 weeks ago</span>
                      </div>
                      <div class="match-result win">
                        <span class="result">WIN</span>
                        <span class="score">7-5, 6-3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <h2>Upcoming Matches</h2>
                </div>
                <div class="card-content">
                  <div class="schedule-list">
                    <div class="schedule-item">
                      <div class="schedule-time">
                        <span class="date">Tomorrow</span>
                        <span class="time">14:00</span>
                      </div>
                      <div class="schedule-event">
                        <h4>vs John Smith</h4>
                        <p>Semi Final</p>
                        <span class="venue">Center Court</span>
                      </div>
                    </div>
                    <div class="schedule-item">
                      <div class="schedule-time">
                        <span class="date">Next Week</span>
                        <span class="time">10:00</span>
                      </div>
                      <div class="schedule-event">
                        <h4>vs Alex Brown</h4>
                        <p>League Match</p>
                        <span class="venue">Court A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="achievements">
              <div class="card">
                <div class="card-header">
                  <h2>Recent Achievements</h2>
                </div>
                <div class="card-content">
                  <div class="achievement-list">
                    <div class="achievement-item">
                      <div class="achievement-icon">🏆</div>
                      <div class="achievement-info">
                        <h4>Tournament Winner</h4>
                        <p>Spring Championship 2024</p>
                        <span class="achievement-date">Last month</span>
                      </div>
                    </div>
                    <div class="achievement-item">
                      <div class="achievement-icon">🎯</div>
                      <div class="achievement-info">
                        <h4>10 Match Win Streak</h4>
                        <p>Consecutive victories achieved</p>
                        <span class="achievement-date">2 weeks ago</span>
                      </div>
                    </div>
                    <div class="achievement-item">
                      <div class="achievement-icon">⭐</div>
                      <div class="achievement-info">
                        <h4>Player of the Month</h4>
                        <p>Outstanding performance recognition</p>
                        <span class="achievement-date">Last month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .player-layout {
      display: flex;
      height: 100vh;
      background-color: #f5f5f5;
    }

    .sidebar {
      width: 260px;
      background: linear-gradient(180deg, #FF9800 0%, #F57C00 100%);
      color: white;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }

    .sidebar-header {
      padding: 24px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .sidebar-header h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .sidebar-header p {
      font-size: 13px;
      opacity: 0.8;
    }

    .sidebar-menu {
      flex: 1;
      list-style: none;
      padding: 20px 0;
    }

    .sidebar-menu li {
      margin-bottom: 4px;
    }

    .sidebar-menu a {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      border-radius: 0 25px 25px 0;
      margin-right: 20px;
    }

    .sidebar-menu a:hover,
    .sidebar-menu a.active {
      background: rgba(255,255,255,0.15);
      color: white;
    }

    .sidebar-menu .icon {
      font-size: 18px;
      margin-right: 12px;
      width: 20px;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: rgba(255,255,255,0.2);
    }

    .logout-btn .icon {
      margin-right: 8px;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .top-header {
      background: white;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .header-left h1 {
      font-size: 20px;
      color: #333;
      font-weight: 600;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-name {
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: #FF9800;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }

    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }

    .dashboard-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .player-profile {
      margin-bottom: 32px;
    }

    .profile-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .profile-avatar {
      flex-shrink: 0;
    }

    .avatar-circle {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #FF9800, #FFB74D);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 28px;
    }

    .profile-info {
      flex: 1;
    }

    .profile-info h2 {
      font-size: 24px;
      color: #333;
      margin-bottom: 4px;
      font-weight: 700;
    }

    .club-name {
      color: #FF9800;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .license {
      color: #666;
      font-size: 14px;
    }

    .profile-stats {
      display: flex;
      gap: 32px;
    }

    .profile-stats .stat {
      text-align: center;
    }

    .profile-stats .stat-value {
      display: block;
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin-bottom: 4px;
    }

    .profile-stats .stat-label {
      display: block;
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      font-size: 40px;
      margin-right: 16px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #FF9800, #FFB74D);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-content h3 {
      font-size: 32px;
      font-weight: 700;
      color: #333;
      margin-bottom: 4px;
    }

    .stat-content p {
      color: #666;
      font-size: 14px;
      font-weight: 500;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .card-header {
      padding: 20px 24px;
      border-bottom: 1px solid #f0f0f0;
    }

    .card-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .card-content {
      padding: 24px;
    }

    .match-list, .schedule-list, .achievement-list {
      space: 16px 0;
    }

    .match-item, .schedule-item, .achievement-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .match-item:last-child, .schedule-item:last-child, .achievement-item:last-child {
      border-bottom: none;
    }

    .match-info h4, .schedule-event h4, .achievement-info h4 {
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .match-info p, .schedule-event p, .achievement-info p {
      color: #666;
      font-size: 13px;
      margin-bottom: 2px;
    }

    .match-date, .achievement-date {
      color: #999;
      font-size: 12px;
    }

    .match-result {
      text-align: right;
    }

    .match-result .result {
      display: block;
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .match-result.win .result {
      color: #4CAF50;
    }

    .match-result.loss .result {
      color: #f44336;
    }

    .match-result .score {
      color: #666;
      font-size: 14px;
    }

    .schedule-time {
      text-align: right;
      min-width: 80px;
    }

    .schedule-time .date {
      display: block;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .schedule-time .time {
      display: block;
      color: #666;
      font-size: 13px;
    }

    .venue {
      color: #FF9800;
      font-size: 12px;
      font-weight: 500;
    }

    .achievements {
      grid-column: 1 / -1;
    }

    .achievement-icon {
      font-size: 32px;
      margin-right: 16px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #FFD54F, #FFC107);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .player-layout {
        flex-direction: column;
      }
      
      .sidebar {
        width: 100%;
        height: auto;
      }
      
      .profile-card {
        flex-direction: column;
        text-align: center;
      }
      
      .profile-stats {
        justify-content: center;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PlayerDashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}