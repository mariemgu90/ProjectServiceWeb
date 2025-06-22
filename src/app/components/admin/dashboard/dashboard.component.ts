import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoapService } from '../../../services/soap.service';
import { Competition, Match, Club } from '../../../models/competition.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome to the Competition Management System</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <h3>{{ competitions.length }}</h3>
            <p>Total Competitions</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🎾</div>
          <div class="stat-content">
            <h3>{{ matches.length }}</h3>
            <p>Total Matches</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🏢</div>
          <div class="stat-content">
            <h3>{{ clubs.length }}</h3>
            <p>Registered Clubs</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>{{ activeUsers }}</h3>
            <p>Active Users</p>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="content-grid">
          <div class="card">
            <div class="card-header">
              <h2>Recent Competitions</h2>
              <button class="btn-primary">View All</button>
            </div>
            <div class="card-content">
              <div *ngIf="loading" class="loading-spinner">
                <div class="spinner"></div>
              </div>
              <div *ngIf="!loading && competitions.length === 0" class="empty-state">
                <p>No competitions found</p>
              </div>
              <div *ngIf="!loading && competitions.length > 0" class="competition-list">
                <div *ngFor="let competition of competitions.slice(0, 5)" class="competition-item">
                  <div class="competition-info">
                    <h4>{{ competition.name }}</h4>
                    <p>Created: {{ formatDate(competition.createdAt) }}</p>
                  </div>
                  <div class="competition-status">
                    <span class="status-badge active">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h2>Recent Matches</h2>
              <button class="btn-secondary">View All</button>
            </div>
            <div class="card-content">
              <div *ngIf="loading" class="loading-spinner">
                <div class="spinner"></div>
              </div>
              <div *ngIf="!loading && matches.length === 0" class="empty-state">
                <p>No matches scheduled</p>
              </div>
              <div *ngIf="!loading && matches.length > 0" class="match-list">
                <div *ngFor="let match of matches.slice(0, 5)" class="match-item">
                  <div class="match-teams">
                    <span>Club {{ match.club1Id }} vs Club {{ match.club2Id }}</span>
                  </div>
                  <div class="match-score" *ngIf="match.score1 !== undefined && match.score2 !== undefined">
                    <span>{{ match.score1 }} - {{ match.score2 }}</span>
                  </div>
                  <div class="match-status" *ngIf="match.score1 === undefined">
                    <span class="status-badge pending">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="activity-feed">
          <div class="card">
            <div class="card-header">
              <h2>Recent Activity</h2>
            </div>
            <div class="card-content">
              <div class="activity-list">
                <div class="activity-item">
                  <div class="activity-icon">🏆</div>
                  <div class="activity-content">
                    <p><strong>New competition</strong> "Spring Championship" created</p>
                    <span class="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div class="activity-item">
                  <div class="activity-icon">🎾</div>
                  <div class="activity-content">
                    <p><strong>Match scheduled</strong> between Club A and Club B</p>
                    <span class="activity-time">4 hours ago</span>
                  </div>
                </div>
                <div class="activity-item">
                  <div class="activity-icon">🏢</div>
                  <div class="activity-content">
                    <p><strong>New club</strong> "Tennis Stars" registered</p>
                    <span class="activity-time">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 32px;
    }

    .dashboard-header h1 {
      font-size: 28px;
      color: #333;
      margin-bottom: 8px;
      font-weight: 700;
    }

    .dashboard-header p {
      color: #666;
      font-size: 16px;
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
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .stat-icon {
      font-size: 40px;
      margin-right: 16px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #1976D2, #42A5F5);
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

    .dashboard-content {
      display: grid;
      gap: 24px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .btn-primary, .btn-secondary {
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #1976D2;
      color: white;
    }

    .btn-primary:hover {
      background: #1565C0;
    }

    .btn-secondary {
      background: #f5f5f5;
      color: #666;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }

    .card-content {
      padding: 24px;
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 120px;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #1976D2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: #999;
    }

    .competition-list, .match-list {
      space: 16px 0;
    }

    .competition-item, .match-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .competition-item:last-child, .match-item:last-child {
      border-bottom: none;
    }

    .competition-info h4, .match-teams {
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .competition-info p {
      color: #666;
      font-size: 13px;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.active {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .status-badge.pending {
      background: #fff3e0;
      color: #f57c00;
    }

    .match-score {
      font-weight: 600;
      color: #1976D2;
    }

    .activity-feed {
      grid-column: 1 / -1;
    }

    .activity-list {
      space: 16px 0;
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      font-size: 20px;
      margin-right: 16px;
      width: 40px;
      height: 40px;
      background: #f5f5f5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .activity-content p {
      color: #333;
      margin-bottom: 4px;
      font-size: 14px;
    }

    .activity-time {
      color: #999;
      font-size: 12px;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .card-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  competitions: Competition[] = [];
  matches: Match[] = [];
  clubs: Club[] = [];
  loading = true;
  activeUsers = 147; // Mock data

  constructor(private soapService: SoapService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;

    // Load competitions
    this.soapService.getCompetitions().subscribe(
      (data) => {
        this.competitions = data;
      },
      (error) => {
        console.error('Error loading competitions:', error);
      }
    );

    // Load matches
    this.soapService.getMatches().subscribe(
      (data) => {
        this.matches = data;
      },
      (error) => {
        console.error('Error loading matches:', error);
      }
    );

    // Load clubs
    this.soapService.getClubs().subscribe(
      (data) => {
        this.clubs = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading clubs:', error);
        this.loading = false;
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}