import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SoapService } from '../../../services/soap.service';
import { Club } from '../../../models/competition.model';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="clubs-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Club Management</h1>
          <p>Manage tennis clubs and their information</p>
        </div>
        <button class="btn-primary" (click)="showCreateForm = true">
          <i class="icon">➕</i>
          Add Club
        </button>
      </div>

      <!-- Create Club Form -->
      <div class="create-form" *ngIf="showCreateForm">
        <div class="form-card">
          <div class="form-header">
            <h2>Add New Club</h2>
            <button class="close-btn" (click)="showCreateForm = false">✕</button>
          </div>
          <form (ngSubmit)="createClub()" class="club-form">
            <div class="form-group">
              <label for="clubName">Club Name *</label>
              <input
                type="text"
                id="clubName"
                [(ngModel)]="newClub.name"
                name="clubName"
                required
                placeholder="Enter club name"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <textarea
                id="address"
                [(ngModel)]="newClub.address"
                name="address"
                placeholder="Enter club address"
                class="form-control"
                rows="3"
              ></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="contactMail">Contact Email</label>
                <input
                  type="email"
                  id="contactMail"
                  [(ngModel)]="newClub.contactMail"
                  name="contactMail"
                  placeholder="contact@club.com"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="contactTel">Contact Phone</label>
                <input
                  type="tel"
                  id="contactTel"
                  [(ngModel)]="newClub.contactTel"
                  name="contactTel"
                  placeholder="+1 234 567 8900"
                  class="form-control"
                >
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="showCreateForm = false">
                Cancel
              </button>
              <button type="submit" class="btn-primary" [disabled]="!newClub.name || creating">
                {{ creating ? 'Adding...' : 'Add Club' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Clubs List -->
      <div class="clubs-content">
        <div class="content-header">
          <h2>All Clubs</h2>
          <div class="search-box">
            <input
              type="text"
              placeholder="Search clubs..."
              [(ngModel)]="searchTerm"
              (ngModelChange)="filterClubs()"
              class="search-input"
            >
          </div>
        </div>

        <div *ngIf="loading" class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading clubs...</p>
        </div>

        <div *ngIf="!loading && filteredClubs.length === 0" class="empty-state">
          <div class="empty-icon">🏢</div>
          <h3>No clubs found</h3>
          <p>Add your first club to get started</p>
          <button class="btn-primary" (click)="showCreateForm = true">
            Add Club
          </button>
        </div>

        <div *ngIf="!loading && filteredClubs.length > 0" class="clubs-grid">
          <div *ngFor="let club of filteredClubs" class="club-card">
            <div class="club-header">
              <div class="club-logo">
                <div class="logo-placeholder">{{ getClubInitials(club.name) }}</div>
              </div>
              <div class="club-info">
                <h3>{{ club.name }}</h3>
                <p class="club-date">Registered: {{ formatDate(club.createdAt) }}</p>
              </div>
              <div class="club-status">
                <span class="status-badge active">Active</span>
              </div>
            </div>
            
            <div class="club-details">
              <div class="detail-item" *ngIf="club.address">
                <i class="icon">📍</i>
                <span>{{ club.address }}</span>
              </div>
              <div class="detail-item" *ngIf="club.contactMail">
                <i class="icon">✉️</i>
                <span>{{ club.contactMail }}</span>
              </div>
              <div class="detail-item" *ngIf="club.contactTel">
                <i class="icon">📞</i>
                <span>{{ club.contactTel }}</span>
              </div>
            </div>
            
            <div class="club-stats">
              <div class="stat">
                <span class="stat-value">{{ getPlayerCount(club.id) }}</span>
                <span class="stat-label">Players</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ getMatchCount(club.id) }}</span>
                <span class="stat-label">Matches</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ getTrophyCount(club.id) }}</span>
                <span class="stat-label">Trophies</span>
              </div>
            </div>
            
            <div class="club-actions">
              <button class="btn-outline">
                <i class="icon">👁️</i>
                View
              </button>
              <button class="btn-outline">
                <i class="icon">✏️</i>
                Edit
              </button>
              <button class="btn-outline">
                <i class="icon">👥</i>
                Players
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
    .clubs-page {
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

    .club-form {
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

    textarea.form-control {
      resize: vertical;
      min-height: 80px;
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

    .clubs-content {
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

    .clubs-grid {
      padding: 24px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 24px;
    }

    .club-card {
      border: 2px solid #f0f0f0;
      border-radius: 12px;
      transition: all 0.3s ease;
      overflow: hidden;
      background: white;
    }

    .club-card:hover {
      border-color: #1976D2;
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .club-header {
      padding: 20px;
      background: #fafafa;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .club-logo {
      flex-shrink: 0;
    }

    .logo-placeholder {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #1976D2, #42A5F5);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
    }

    .club-info {
      flex: 1;
    }

    .club-info h3 {
      font-size: 18px;
      color: #333;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .club-date {
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

    .club-details {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 14px;
      color: #666;
    }

    .detail-item:last-child {
      margin-bottom: 0;
    }

    .detail-item .icon {
      font-size: 16px;
      width: 20px;
    }

    .club-stats {
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: 700;
      color: #1976D2;
      margin-bottom: 4px;
    }

    .stat-label {
      display: block;
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .club-actions {
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
      
      .search-input {
        width: 100%;
      }
      
      .clubs-grid {
        grid-template-columns: 1fr;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .club-header {
        flex-direction: column;
        text-align: center;
        gap: 12px;
      }
      
      .club-stats {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      
      .club-actions {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }
  `]
})
export class ClubsComponent implements OnInit {
  clubs: Club[] = [];
  filteredClubs: Club[] = [];
  loading = true;
  creating = false;
  showCreateForm = false;
  searchTerm = '';

  newClub = {
    name: '',
    address: '',
    contactMail: '',
    contactTel: ''
  };

  constructor(private soapService: SoapService) {}

  ngOnInit() {
    this.loadClubs();
  }

  loadClubs() {
    this.loading = true;
    this.soapService.getClubs().subscribe(
      (data) => {
        this.clubs = data;
        this.filteredClubs = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading clubs:', error);
        this.loading = false;
      }
    );
  }

  createClub() {
    if (!this.newClub.name) return;

    this.creating = true;
    // In a real app, this would call the SOAP service to create a club
    setTimeout(() => {
      const newClub: Club = {
        id: Date.now(),
        name: this.newClub.name,
        address: this.newClub.address,
        contactMail: this.newClub.contactMail,
        contactTel: this.newClub.contactTel,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.clubs.unshift(newClub);
      this.filteredClubs = [...this.clubs];
      this.resetForm();
      this.creating = false;
    }, 1000);
  }

  resetForm() {
    this.newClub = {
      name: '',
      address: '',
      contactMail: '',
      contactTel: ''
    };
    this.showCreateForm = false;
  }

  filterClubs() {
    if (!this.searchTerm) {
      this.filteredClubs = [...this.clubs];
    } else {
      this.filteredClubs = this.clubs.filter(club =>
        club.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (club.address && club.address.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  getClubInitials(name: string): string {
    return name.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  getPlayerCount(clubId: number): number {
    // Mock data - in real app, this would come from players service
    return Math.floor(Math.random() * 50) + 10;
  }

  getMatchCount(clubId: number): number {
    // Mock data - in real app, this would come from matches service
    return Math.floor(Math.random() * 30) + 5;
  }

  getTrophyCount(clubId: number): number {
    // Mock data - in real app, this would come from competitions service
    return Math.floor(Math.random() * 10);
  }
}