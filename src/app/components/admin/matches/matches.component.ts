import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SoapService } from '../../../services/soap.service';
import { Match, Competition, Club } from '../../../models/competition.model';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="matches-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Match Management</h1>
          <p>Schedule and manage competition matches</p>
        </div>
        <button class="btn-primary" (click)="showCreateForm = true">
          <i class="icon">➕</i>
          Schedule Match
        </button>
      </div>

      <!-- Create Match Form -->
      <div class="create-form" *ngIf="showCreateForm">
        <div class="form-card">
          <div class="form-header">
            <h2>Schedule New Match</h2>
            <button class="close-btn" (click)="showCreateForm = false">✕</button>
          </div>
          <form (ngSubmit)="createMatch()" class="match-form">
            <div class="form-row">
              <div class="form-group">
                <label for="competition">Competition</label>
                <select id="competition" [(ngModel)]="newMatch.competitionId" name="competition" required class="form-control">
                  <option value="">Select Competition</option>
                  <option *ngFor="let comp of competitions" [value]="comp.id">{{ comp.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="hall">Hall</label>
                <select id="hall" [(ngModel)]="newMatch.hallId" name="hall" class="form-control">
                  <option value="">Select Hall</option>
                  <option value="1">Main Court</option>
                  <option value="2">Court 2</option>
                  <option value="3">Court 3</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="club1">Club 1</label>
                <select id="club1" [(ngModel)]="newMatch.club1Id" name="club1" required class="form-control">
                  <option value="">Select Club</option>
                  <option *ngFor="let club of clubs" [value]="club.id">{{ club.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="club2">Club 2</label>
                <select id="club2" [(ngModel)]="newMatch.club2Id" name="club2" required class="form-control">
                  <option value="">Select Club</option>
                  <option *ngFor="let club of clubs" [value]="club.id">{{ club.name }}</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="showCreateForm = false">
                Cancel
              </button>
              <button type="submit" class="btn-primary" [disabled]="!isFormValid() || creating">
                {{ creating ? 'Scheduling...' : 'Schedule Match' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Matches List -->
      <div class="matches-content">
        <div class="content-header">
          <h2>All Matches</h2>
          <div class="filters">
            <select [(ngModel)]="selectedCompetition" (ngModelChange)="filterMatches()" class="filter-select">
              <option value="">All Competitions</option>
              <option *ngFor="let comp of competitions" [value]="comp.id">{{ comp.name }}</option>
            </select>
            <select [(ngModel)]="selectedStatus" (ngModelChange)="filterMatches()" class="filter-select">
              <option value="">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div *ngIf="loading" class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading matches...</p>
        </div>

        <div *ngIf="!loading && filteredMatches.length === 0" class="empty-state">
          <div class="empty-icon">🎾</div>
          <h3>No matches found</h3>
          <p>Schedule your first match to get started</p>
          <button class="btn-primary" (click)="showCreateForm = true">
            Schedule Match
          </button>
        </div>

        <div *ngIf="!loading && filteredMatches.length > 0" class="matches-table">
          <div class="table-header">
            <div class="table-row">
              <div class="table-cell">Match</div>
              <div class="table-cell">Competition</div>
              <div class="table-cell">Clubs</div>
              <div class="table-cell">Score</div>
              <div class="table-cell">Status</div>
              <div class="table-cell">Actions</div>
            </div>
          </div>
          <div class="table-body">
            <div *ngFor="let match of filteredMatches" class="table-row">
              <div class="table-cell">
                <div class="match-id">#{{ match.id }}</div>
                <div class="match-date">{{ formatDate(match.createdAt) }}</div>
              </div>
              <div class="table-cell">
                <div class="competition-name">{{ getCompetitionName(match.competitionId) }}</div>
              </div>
              <div class="table-cell">
                <div class="clubs-match">
                  <span class="club-name">{{ getClubName(match.club1Id) }}</span>
                  <span class="vs">vs</span>
                  <span class="club-name">{{ getClubName(match.club2Id) }}</span>
                </div>
              </div>
              <div class="table-cell">
                <div class="match-score" *ngIf="match.score1 !== undefined && match.score2 !== undefined">
                  <span class="score">{{ match.score1 }} - {{ match.score2 }}</span>
                </div>
                <div class="no-score" *ngIf="match.score1 === undefined">
                  <span>Not played</span>
                </div>
              </div>
              <div class="table-cell">
                <span class="status-badge" [class]="getMatchStatus(match)">
                  {{ getMatchStatusText(match) }}
                </span>
              </div>
              <div class="table-cell">
                <div class="action-buttons">
                  <button class="btn-small btn-outline" (click)="viewMatch(match)">
                    <i class="icon">👁️</i>
                  </button>
                  <button class="btn-small btn-outline" *ngIf="match.score1 === undefined" (click)="editMatch(match)">
                    <i class="icon">✏️</i>
                  </button>
                  <button class="btn-small btn-outline danger" (click)="deleteMatch(match)">
                    <i class="icon">🗑️</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .matches-page {
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
      max-width: 600px;
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

    .match-form {
      padding: 24px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
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

    .matches-content {
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

    .filters {
      display: flex;
      gap: 12px;
    }

    .filter-select {
      padding: 8px 12px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      background: white;
      cursor: pointer;
    }

    .filter-select:focus {
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

    .matches-table {
      overflow-x: auto;
    }

    .table-header, .table-body {
      width: 100%;
    }

    .table-row {
      display: grid;
      grid-template-columns: 150px 200px 250px 120px 100px 120px;
      gap: 16px;
      padding: 16px 24px;
      border-bottom: 1px solid #f0f0f0;
      align-items: center;
    }

    .table-header .table-row {
      background: #fafafa;
      font-weight: 600;
      color: #333;
    }

    .table-body .table-row:hover {
      background: #f8f9fa;
    }

    .table-cell {
      font-size: 14px;
    }

    .match-id {
      font-weight: 600;
      color: #1976D2;
      margin-bottom: 2px;
    }

    .match-date {
      color: #666;
      font-size: 12px;
    }

    .competition-name {
      font-weight: 500;
      color: #333;
    }

    .clubs-match {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .club-name {
      font-weight: 500;
      color: #333;
    }

    .vs {
      color: #999;
      font-size: 12px;
    }

    .match-score .score {
      font-weight: 600;
      color: #1976D2;
      font-size: 16px;
    }

    .no-score span {
      color: #999;
      font-style: italic;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.scheduled {
      background: #fff3e0;
      color: #f57c00;
    }

    .status-badge.completed {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .action-buttons {
      display: flex;
      gap: 4px;
    }

    .btn-small {
      padding: 6px 8px;
      border: 1px solid #e0e0e0;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-small:hover {
      border-color: #1976D2;
      color: #1976D2;
    }

    .btn-small.danger:hover {
      border-color: #f44336;
      color: #f44336;
    }

    .icon {
      font-size: 12px;
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
      
      .filters {
        flex-direction: column;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .table-row {
        grid-template-columns: 1fr;
        gap: 8px;
      }
      
      .table-header {
        display: none;
      }
      
      .table-cell {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .table-cell:before {
        content: attr(data-label);
        font-weight: 600;
        color: #666;
        font-size: 12px;
      }
    }
  `]
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];
  filteredMatches: Match[] = [];
  competitions: Competition[] = [];
  clubs: Club[] = [];
  loading = true;
  creating = false;
  showCreateForm = false;
  selectedCompetition = '';
  selectedStatus = '';

  newMatch = {
    competitionId: '',
    club1Id: '',
    club2Id: '',
    hallId: ''
  };

  constructor(private soapService: SoapService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Load matches
    this.soapService.getMatches().subscribe(
      (data) => {
        this.matches = data;
        this.filteredMatches = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading matches:', error);
        this.loading = false;
      }
    );

    // Load competitions
    this.soapService.getCompetitions().subscribe(
      (data) => {
        this.competitions = data;
      },
      (error) => {
        console.error('Error loading competitions:', error);
      }
    );

    // Load clubs
    this.soapService.getClubs().subscribe(
      (data) => {
        this.clubs = data;
      },
      (error) => {
        console.error('Error loading clubs:', error);
      }
    );
  }

  createMatch() {
    if (!this.isFormValid()) return;

    this.creating = true;
    // In a real app, this would call the SOAP service to create a match
    setTimeout(() => {
      const newMatch: Match = {
        id: Date.now(),
        competitionId: parseInt(this.newMatch.competitionId),
        club1Id: parseInt(this.newMatch.club1Id),
        club2Id: parseInt(this.newMatch.club2Id),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.matches.unshift(newMatch);
      this.filteredMatches = [...this.matches];
      this.resetForm();
      this.creating = false;
    }, 1000);
  }

  isFormValid(): boolean {
    return !!(this.newMatch.competitionId && 
              this.newMatch.club1Id && 
              this.newMatch.club2Id &&
              this.newMatch.club1Id !== this.newMatch.club2Id);
  }

  resetForm() {
    this.newMatch = {
      competitionId: '',
      club1Id: '',
      club2Id: '',
      hallId: ''
    };
    this.showCreateForm = false;
  }

  filterMatches() {
    let filtered = [...this.matches];

    if (this.selectedCompetition) {
      filtered = filtered.filter(match => 
        match.competitionId === parseInt(this.selectedCompetition)
      );
    }

    if (this.selectedStatus) {
      if (this.selectedStatus === 'scheduled') {
        filtered = filtered.filter(match => 
          match.score1 === undefined || match.score2 === undefined
        );
      } else if (this.selectedStatus === 'completed') {
        filtered = filtered.filter(match => 
          match.score1 !== undefined && match.score2 !== undefined
        );
      }
    }

    this.filteredMatches = filtered;
  }

  getCompetitionName(competitionId: number): string {
    const competition = this.competitions.find(c => c.id === competitionId);
    return competition ? competition.name : `Competition ${competitionId}`;
  }

  getClubName(clubId: number): string {
    const club = this.clubs.find(c => c.id === clubId);
    return club ? club.name : `Club ${clubId}`;
  }

  getMatchStatus(match: Match): string {
    return (match.score1 !== undefined && match.score2 !== undefined) ? 'completed' : 'scheduled';
  }

  getMatchStatusText(match: Match): string {
    return (match.score1 !== undefined && match.score2 !== undefined) ? 'Completed' : 'Scheduled';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  viewMatch(match: Match) {
    console.log('View match:', match);
  }

  editMatch(match: Match) {
    console.log('Edit match:', match);
  }

  deleteMatch(match: Match) {
    if (confirm('Are you sure you want to delete this match?')) {
      this.matches = this.matches.filter(m => m.id !== match.id);
      this.filteredMatches = this.filteredMatches.filter(m => m.id !== match.id);
    }
  }
}