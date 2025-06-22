import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SoapService } from '../../../services/soap.service';
import { Competition } from '../../../models/competition.model';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="competitions-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Competition Management</h1>
          <p>Create and manage tennis competitions</p>
        </div>
        <button class="btn-primary" (click)="showCreateForm = true">
          <i class="icon">➕</i>
          New Competition
        </button>
      </div>

      <!-- Create Competition Form -->
      <div class="create-form" *ngIf="showCreateForm">
        <div class="form-card">
          <div class="form-header">
            <h2>Create New Competition</h2>
            <button class="close-btn" (click)="showCreateForm = false">✕</button>
          </div>
          <form (ngSubmit)="createCompetition()" class="competition-form">
            <div class="form-group">
              <label for="competitionName">Competition Name</label>
              <input
                type="text"
                id="competitionName"
                [(ngModel)]="newCompetitionName"
                name="competitionName"
                required
                placeholder="Enter competition name"
                class="form-control"
              >
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="showCreateForm = false">
                Cancel
              </button>
              <button type="submit" class="btn-primary" [disabled]="!newCompetitionName || creating">
                {{ creating ? 'Creating...' : 'Create Competition' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Competitions List -->
      <div class="competitions-content">
        <div class="content-header">
          <h2>All Competitions</h2>
          <div class="search-box">
            <input
              type="text"
              placeholder="Search competitions..."
              [(ngModel)]="searchTerm"
              class="search-input"
            >
          </div>
        </div>

        <div *ngIf="loading" class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading competitions...</p>
        </div>

        <div *ngIf="!loading && filteredCompetitions.length === 0" class="empty-state">
          <div class="empty-icon">🏆</div>
          <h3>No competitions found</h3>
          <p>Create your first competition to get started</p>
          <button class="btn-primary" (click)="showCreateForm = true">
            Create Competition
          </button>
        </div>

        <div *ngIf="!loading && filteredCompetitions.length > 0" class="competitions-grid">
          <div *ngFor="let competition of filteredCompetitions" class="competition-card">
            <div class="card-header">
              <div class="competition-info">
                <h3>{{ competition.name }}</h3>
                <p class="competition-date">Created: {{ formatDate(competition.createdAt) }}</p>
              </div>
              <div class="competition-status">
                <span class="status-badge active">Active</span>
              </div>
            </div>
            
            <div class="card-content">
              <div class="competition-stats">
                <div class="stat">
                  <span class="stat-label">Matches</span>
                  <span class="stat-value">{{ getMatchCount(competition.id) }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Clubs</span>
                  <span class="stat-value">{{ getClubCount(competition.id) }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Status</span>
                  <span class="stat-value">Ongoing</span>
                </div>
              </div>
            </div>
            
            <div class="card-actions">
              <button class="btn-outline">
                <i class="icon">👁️</i>
                View Details
              </button>
              <button class="btn-outline">
                <i class="icon">⚙️</i>
                Manage
              </button>
              <button class="btn-outline danger">
                <i class="icon">🗑️</i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .competitions-page {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid #f0f0f0;
    }

    .header-content h1 {
      font-size: 28px;
      color: #333;
      margin-bottom: 8px;
      font-weight: 700;
    }

    .header-content p {
      color: #666;
      font-size: 16px;
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #1976D2;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      background: #1565C0;
      transform: translateY(-1px);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .create-form {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .form-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .form-header {
      padding: 24px 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .form-header h2 {
      font-size: 20px;
      color: #333;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #999;
      padding: 4px;
    }

    .close-btn:hover {
      color: #333;
    }

    .competition-form {
      padding: 24px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #1976D2;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    .btn-secondary {
      padding: 12px 24px;
      background: #f5f5f5;
      color: #666;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: #e0e0e0;
    }

    .competitions-content {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .content-header {
      padding: 24px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .content-header h2 {
      font-size: 20px;
      color: #333;
      font-weight: 600;
    }

    .search-box {
      position: relative;
    }

    .search-input {
      padding: 10px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      width: 300px;
      transition: border-color 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #1976D2;
    }

    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #1976D2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      font-size: 20px;
      color: #333;
      margin-bottom: 8px;
    }

    .empty-state p {
      color: #666;
      margin-bottom: 24px;
    }

    .competitions-grid {
      padding: 24px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .competition-card {
      border: 2px solid #f0f0f0;
      border-radius: 12px;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .competition-card:hover {
      border-color: #1976D2;
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      padding: 20px;
      background: #fafafa;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .competition-info h3 {
      font-size: 18px;
      color: #333;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .competition-date {
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

    .card-content {
      padding: 20px;
    }

    .competition-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .stat {
      text-align: center;
    }

    .stat-label {
      display: block;
      color: #666;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .stat-value {
      display: block;
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }

    .card-actions {
      padding: 16px 20px;
      background: #fafafa;
      display: flex;
      gap: 8px;
    }

    .btn-outline {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 12px;
      border: 2px solid #e0e0e0;
      background: white;
      color: #666;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-outline:hover {
      border-color: #1976D2;
      color: #1976D2;
    }

    .btn-outline.danger:hover {
      border-color: #f44336;
      color: #f44336;
    }

    .icon {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }
      
      .content-header {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }
      
      .search-input {
        width: 100%;
      }
      
      .competitions-grid {
        grid-template-columns: 1fr;
      }
      
      .competition-stats {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      
      .card-actions {
        flex-direction: column;
      }
    }
  `]
})
export class CompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  filteredCompetitions: Competition[] = [];
  loading = true;
  creating = false;
  showCreateForm = false;
  newCompetitionName = '';
  searchTerm = '';

  constructor(private soapService: SoapService) {}

  ngOnInit() {
    this.loadCompetitions();
  }

  loadCompetitions() {
    this.loading = true;
    this.soapService.getCompetitions().subscribe(
      (data) => {
        this.competitions = data;
        this.filteredCompetitions = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading competitions:', error);
        this.loading = false;
      }
    );
  }

  createCompetition() {
    if (!this.newCompetitionName) return;

    this.creating = true;
    this.soapService.createCompetition(this.newCompetitionName).subscribe(
      (competition) => {
        this.competitions.unshift(competition);
        this.filteredCompetitions = [...this.competitions];
        this.newCompetitionName = '';
        this.showCreateForm = false;
        this.creating = false;
      },
      (error) => {
        console.error('Error creating competition:', error);
        this.creating = false;
      }
    );
  }

  filterCompetitions() {
    if (!this.searchTerm) {
      this.filteredCompetitions = [...this.competitions];
    } else {
      this.filteredCompetitions = this.competitions.filter(comp =>
        comp.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  getMatchCount(competitionId: number): number {
    // Mock data - in real app, this would come from matches service
    return Math.floor(Math.random() * 20) + 1;
  }

  getClubCount(competitionId: number): number {
    // Mock data - in real app, this would come from clubs service
    return Math.floor(Math.random() * 10) + 2;
  }
}