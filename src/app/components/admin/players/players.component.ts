import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SoapService } from '../../../services/soap.service';
import { Player, Club } from '../../../models/competition.model';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="players-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Player Management</h1>
          <p>Manage tennis players and their profiles</p>
        </div>
        <button class="btn-primary" (click)="showCreateForm = true">
          <i class="icon">➕</i>
          Add Player
        </button>
      </div>

      <!-- Create Player Form -->
      <div class="create-form" *ngIf="showCreateForm">
        <div class="form-card">
          <div class="form-header">
            <h2>Add New Player</h2>
            <button class="close-btn" (click)="showCreateForm = false">✕</button>
          </div>
          <form (ngSubmit)="createPlayer()" class="player-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  [(ngModel)]="newPlayer.firstName"
                  name="firstName"
                  required
                  placeholder="Enter first name"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  [(ngModel)]="newPlayer.lastName"
                  name="lastName"
                  required
                  placeholder="Enter last name"
                  class="form-control"
                >
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="birthday">Date of Birth</label>
                <input
                  type="date"
                  id="birthday"
                  [(ngModel)]="newPlayer.birthday"
                  name="birthday"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="license">License Number</label>
                <input
                  type="text"
                  id="license"
                  [(ngModel)]="newPlayer.license"
                  name="license"
                  placeholder="Enter license number"
                  class="form-control"
                >
              </div>
            </div>
            <div class="form-group">
              <label for="club">Club</label>
              <select id="club" [(ngModel)]="newPlayer.clubId" name="club" class="form-control">
                <option value="">Select Club</option>
                <option *ngFor="let club of clubs" [value]="club.id">{{ club.name }}</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="showCreateForm = false">
                Cancel
              </button>
              <button type="submit" class="btn-primary" [disabled]="!isFormValid() || creating">
                {{ creating ? 'Adding...' : 'Add Player' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Players List -->
      <div class="players-content">
        <div class="content-header">
          <h2>All Players</h2>
          <div class="filters">
            <select [(ngModel)]="selectedClub" (ngModelChange)="filterPlayers()" class="filter-select">
              <option value="">All Clubs</option>
              <option *ngFor="let club of clubs" [value]="club.id">{{ club.name }}</option>
            </select>
            <input
              type="text"
              placeholder="Search players..."
              [(ngModel)]="searchTerm"
              (ngModelChange)="filterPlayers()"
              class="search-input"
            >
          </div>
        </div>

        <div *ngIf="loading" class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading players...</p>
        </div>

        <div *ngIf="!loading && filteredPlayers.length === 0" class="empty-state">
          <div class="empty-icon">👤</div>
          <h3>No players found</h3>
          <p>Add your first player to get started</p>
          <button class="btn-primary" (click)="showCreateForm = true">
            Add Player
          </button>
        </div>

        <div *ngIf="!loading && filteredPlayers.length > 0" class="players-grid">
          <div *ngFor="let player of filteredPlayers" class="player-card">
            <div class="player-header">
              <div class="player-avatar">
                {{ getPlayerInitials(player.firstName, player.lastName) }}
              </div>
              <div class="player-info">
                <h3>{{ player.firstName }} {{ player.lastName }}</h3>
                <p class="player-club">{{ getClubName(player.clubId) }}</p>
                <p class="player-license" *ngIf="player.license">License: {{ player.license }}</p>
              </div>
              <div class="player-status">
                <span class="status-badge active">Active</span>
              </div>
            </div>
            
            <div class="player-details">
              <div class="detail-row">
                <div class="detail-item">
                  <span class="detail-label">Age</span>
                  <span class="detail-value">{{ calculateAge(player.birthday) }} years</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Matches</span>
                  <span class="detail-value">{{ getMatchCount(player.id) }}</span>
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-item">
                  <span class="detail-label">Wins</span>
                  <span class="detail-value">{{ getWinCount(player.id) }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Win Rate</span>
                  <span class="detail-value">{{ getWinRate(player.id) }}%</span>
                </div>
              </div>
            </div>
            
            <div class="player-actions">
              <button class="btn-outline">
                <i class="icon">👁️</i>
                View Profile
              </button>
              <button class="btn-outline">
                <i class="icon">✏️</i>
                Edit
              </button>
              <button class="btn-outline">
                <i class="icon">🎾</i>
                Matches
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
    .players-page {
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

    .player-form {
      padding: 24px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
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
      font-family: inherit;
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

    .players-content {
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
      align-items: center;
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

    .search-input {
      padding: 10px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      width: 250px;
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

    .players-grid {
      padding: 24px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .player-card {
      border: 2px solid #f0f0f0;
      border-radius: 12px;
      transition: all 0.3s ease;
      overflow: hidden;
      background: white;
    }

    .player-card:hover {
      border-color: #1976D2;
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .player-header {
      padding: 20px;
      background: #fafafa;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .player-avatar {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #4CAF50, #66BB6A);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 20px;
      flex-shrink: 0;
    }

    .player-info {
      flex: 1;
    }

    .player-info h3 {
      font-size: 18px;
      color: #333;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .player-club {
      color: #1976D2;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .player-license {
      color: #666;
      font-size: 12px;
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

    .player-details {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0;
    }

    .detail-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 12px;
    }

    .detail-row:last-child {
      margin-bottom: 0;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .detail-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .detail-value {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .player-actions {
      padding: 16px 20px;
      background: #fafafa;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }

    .btn-outline {
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
      
      .filters {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-input {
        width: 100%;
      }
      
      .players-grid {
        grid-template-columns: 1fr;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .player-actions {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }
  `]
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  filteredPlayers: Player[] = [];
  clubs: Club[] = [];
  loading = true;
  creating = false;
  showCreateForm = false;
  searchTerm = '';
  selectedClub = '';

  newPlayer = {
    firstName: '',
    lastName: '',
    birthday: '',
    license: '',
    clubId: ''
  };

  constructor(private soapService: SoapService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Load clubs first
    this.soapService.getClubs().subscribe(
      (data) => {
        this.clubs = data;
      },
      (error) => {
        console.error('Error loading clubs:', error);
      }
    );

    // Mock players data since we don't have a SOAP service for players yet
    setTimeout(() => {
      this.players = this.generateMockPlayers();
      this.filteredPlayers = [...this.players];
      this.loading = false;
    }, 1000);
  }

  generateMockPlayers(): Player[] {
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'Chris', 'Lisa', 'Tom', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    return Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      birthday: this.generateRandomDate(),
      license: `LIC${String(i + 1).padStart(4, '0')}`,
      clubId: this.clubs.length > 0 ? this.clubs[Math.floor(Math.random() * this.clubs.length)].id : 1
    }));
  }

  generateRandomDate(): string {
    const start = new Date(1980, 0, 1);
    const end = new Date(2005, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  }

  createPlayer() {
    if (!this.isFormValid()) return;

    this.creating = true;
    setTimeout(() => {
      const newPlayer: Player = {
        id: Date.now(),
        firstName: this.newPlayer.firstName,
        lastName: this.newPlayer.lastName,
        birthday: this.newPlayer.birthday,
        license: this.newPlayer.license,
        clubId: parseInt(this.newPlayer.clubId) || 0
      };

      this.players.unshift(newPlayer);
      this.filteredPlayers = [...this.players];
      this.resetForm();
      this.creating = false;
    }, 1000);
  }

  isFormValid(): boolean {
    return !!(this.newPlayer.firstName && this.newPlayer.lastName);
  }

  resetForm() {
    this.newPlayer = {
      firstName: '',
      lastName: '',
      birthday: '',
      license: '',
      clubId: ''
    };
    this.showCreateForm = false;
  }

  filterPlayers() {
    let filtered = [...this.players];

    if (this.selectedClub) {
      filtered = filtered.filter(player => 
        player.clubId === parseInt(this.selectedClub)
      );
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(player =>
        player.firstName.toLowerCase().includes(term) ||
        player.lastName.toLowerCase().includes(term) ||
        player.license.toLowerCase().includes(term)
      );
    }

    this.filteredPlayers = filtered;
  }

  getPlayerInitials(firstName: string, lastName: string): string {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  getClubName(clubId: number): string {
    const club = this.clubs.find(c => c.id === clubId);
    return club ? club.name : 'No Club';
  }

  calculateAge(birthday: string): number {
    if (!birthday) return 0;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  getMatchCount(playerId: number): number {
    // Mock data - in real app, this would come from matches service
    return Math.floor(Math.random() * 50) + 5;
  }

  getWinCount(playerId: number): number {
    // Mock data - in real app, this would come from matches service
    const matches = this.getMatchCount(playerId);
    return Math.floor(matches * (Math.random() * 0.6 + 0.2)); // 20-80% win rate
  }

  getWinRate(playerId: number): number {
    const matches = this.getMatchCount(playerId);
    const wins = this.getWinCount(playerId);
    return matches > 0 ? Math.round((wins / matches) * 100) : 0;
  }
}