import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hall } from '../../../models/competition.model';

@Component({
  selector: 'app-halls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="halls-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Hall Management</h1>
          <p>Manage tennis halls and venues</p>
        </div>
        <button class="btn-primary" (click)="showCreateForm = true">
          <i class="icon">➕</i>
          Add Hall
        </button>
      </div>

      <!-- Create Hall Form -->
      <div class="create-form" *ngIf="showCreateForm">
        <div class="form-card">
          <div class="form-header">
            <h2>Add New Hall</h2>
            <button class="close-btn" (click)="showCreateForm = false">✕</button>
          </div>
          <form (ngSubmit)="createHall()" class="hall-form">
            <div class="form-group">
              <label for="hallName">Hall Name *</label>
              <input
                type="text"
                id="hallName"
                [(ngModel)]="newHall.name"
                name="hallName"
                required
                placeholder="Enter hall name"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="location">Location *</label>
              <textarea
                id="location"
                [(ngModel)]="newHall.location"
                name="location"
                required
                placeholder="Enter hall location/address"
                class="form-control"
                rows="3"
              ></textarea>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="showCreateForm = false">
                Cancel
              </button>
              <button type="submit" class="btn-primary" [disabled]="!isFormValid() || creating">
                {{ creating ? 'Adding...' : 'Add Hall' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Halls List -->
      <div class="halls-content">
        <div class="content-header">
          <h2>All Halls</h2>
          <div class="search-box">
            <input
              type="text"
              placeholder="Search halls..."
              [(ngModel)]="searchTerm"
              (ngModelChange)="filterHalls()"
              class="search-input"
            >
          </div>
        </div>

        <div *ngIf="loading" class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading halls...</p>
        </div>

        <div *ngIf="!loading && filteredHalls.length === 0" class="empty-state">
          <div class="empty-icon">🏟️</div>
          <h3>No halls found</h3>
          <p>Add your first hall to get started</p>
          <button class="btn-primary" (click)="showCreateForm = true">
            Add Hall
          </button>
        </div>

        <div *ngIf="!loading && filteredHalls.length > 0" class="halls-grid">
          <div *ngFor="let hall of filteredHalls" class="hall-card">
            <div class="hall-header">
              <div class="hall-icon">
                <i class="icon">🏟️</i>
              </div>
              <div class="hall-info">
                <h3>{{ hall.name }}</h3>
                <p class="hall-location">{{ hall.location }}</p>
              </div>
              <div class="hall-status">
                <span class="status-badge available">Available</span>
              </div>
            </div>
            
            <div class="hall-stats">
              <div class="stat">
                <span class="stat-value">{{ getBookingCount(hall.id) }}</span>
                <span class="stat-label">Bookings</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ getMatchCount(hall.id) }}</span>
                <span class="stat-label">Matches</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ getUtilizationRate(hall.id) }}%</span>
                <span class="stat-label">Utilization</span>
              </div>
            </div>
            
            <div class="hall-schedule">
              <h4>Today's Schedule</h4>
              <div class="schedule-list">
                <div *ngFor="let slot of getTodaySchedule(hall.id)" class="schedule-item">
                  <span class="time">{{ slot.time }}</span>
                  <span class="event">{{ slot.event }}</span>
                  <span class="status" [class]="slot.status">{{ slot.status }}</span>
                </div>
                <div *ngIf="getTodaySchedule(hall.id).length === 0" class="no-schedule">
                  No matches scheduled today
                </div>
              </div>
            </div>
            
            <div class="hall-actions">
              <button class="btn-outline">
                <i class="icon">📅</i>
                Schedule
              </button>
              <button class="btn-outline">
                <i class="icon">✏️</i>
                Edit
              </button>
              <button class="btn-outline">
                <i class="icon">📊</i>
                Reports
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
    .halls-page {
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

    .hall-form {
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

    .halls-content {
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

    .halls-grid {
      padding: 24px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 24px;
    }

    .hall-card {
      border: 2px solid #f0f0f0;
      border-radius: 12px;
      transition: all 0.3s ease;
      overflow: hidden;
      background: white;
    }

    .hall-card:hover {
      border-color: #1976D2;
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .hall-header {
      padding: 20px;
      background: #fafafa;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .hall-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #FF9800, #FFB74D);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
    }

    .hall-info {
      flex: 1;
    }

    .hall-info h3 {
      font-size: 18px;
      color: #333;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .hall-location {
      color: #666;
      font-size: 14px;
      line-height: 1.4;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.available {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .hall-stats {
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

    .hall-schedule {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0;
    }

    .hall-schedule h4 {
      font-size: 16px;
      color: #333;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .schedule-list {
      space: 8px 0;
    }

    .schedule-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 13px;
      border-bottom: 1px solid #f8f8f8;
    }

    .schedule-item:last-child {
      border-bottom: none;
    }

    .schedule-item .time {
      font-weight: 600;
      color: #1976D2;
      min-width: 60px;
    }

    .schedule-item .event {
      flex: 1;
      color: #333;
      margin: 0 12px;
    }

    .schedule-item .status {
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 500;
    }

    .schedule-item .status.booked {
      background: #ffebee;
      color: #c62828;
    }

    .schedule-item .status.available {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .no-schedule {
      color: #999;
      font-style: italic;
      text-align: center;
      padding: 20px 0;
    }

    .hall-actions {
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
      
      .halls-grid {
        grid-template-columns: 1fr;
      }
      
      .hall-stats {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      
      .hall-actions {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      
      .schedule-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
    }
  `]
})
export class HallsComponent implements OnInit {
  halls: Hall[] = [];
  filteredHalls: Hall[] = [];
  loading = true;
  creating = false;
  showCreateForm = false;
  searchTerm = '';

  newHall = {
    name: '',
    location: ''
  };

  constructor() {}

  ngOnInit() {
    this.loadHalls();
  }

  loadHalls() {
    this.loading = true;
    // Mock halls data since we don't have a SOAP service for halls yet
    setTimeout(() => {
      this.halls = this.generateMockHalls();
      this.filteredHalls = [...this.halls];
      this.loading = false;
    }, 1000);
  }

  generateMockHalls(): Hall[] {
    const hallNames = [
      'Center Court',
      'Court A',
      'Court B',
      'Practice Court 1',
      'Practice Court 2',
      'Championship Court',
      'Indoor Court 1',
      'Indoor Court 2'
    ];

    const locations = [
      'Main Tennis Complex, Downtown',
      'Sports Center, North Wing',
      'Tennis Academy, Building A',
      'Community Center, East Side',
      'University Campus, Sports Facility',
      'Tennis Club, Premium Section',
      'Recreation Center, Court Area',
      'Athletic Complex, Indoor Section'
    ];

    return hallNames.map((name, i) => ({
      id: i + 1,
      name,
      location: locations[i] || `Location ${i + 1}`
    }));
  }

  createHall() {
    if (!this.isFormValid()) return;

    this.creating = true;
    setTimeout(() => {
      const newHall: Hall = {
        id: Date.now(),
        name: this.newHall.name,
        location: this.newHall.location
      };

      this.halls.unshift(newHall);
      this.filteredHalls = [...this.halls];
      this.resetForm();
      this.creating = false;
    }, 1000);
  }

  isFormValid(): boolean {
    return !!(this.newHall.name && this.newHall.location);
  }

  resetForm() {
    this.newHall = {
      name: '',
      location: ''
    };
    this.showCreateForm = false;
  }

  filterHalls() {
    if (!this.searchTerm) {
      this.filteredHalls = [...this.halls];
    } else {
      this.filteredHalls = this.halls.filter(hall =>
        hall.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        hall.location.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  getBookingCount(hallId: number): number {
    // Mock data - in real app, this would come from bookings service
    return Math.floor(Math.random() * 20) + 5;
  }

  getMatchCount(hallId: number): number {
    // Mock data - in real app, this would come from matches service
    return Math.floor(Math.random() * 15) + 3;
  }

  getUtilizationRate(hallId: number): number {
    // Mock data - in real app, this would be calculated from actual bookings
    return Math.floor(Math.random() * 40) + 60; // 60-100% utilization
  }

  getTodaySchedule(hallId: number): any[] {
    // Mock schedule data
    const schedules = [
      [
        { time: '09:00', event: 'Training Session', status: 'booked' },
        { time: '11:00', event: 'Match: Club A vs Club B', status: 'booked' },
        { time: '14:00', event: 'Available', status: 'available' },
        { time: '16:00', event: 'Private Lesson', status: 'booked' }
      ],
      [
        { time: '10:00', event: 'Tournament Match', status: 'booked' },
        { time: '13:00', event: 'Available', status: 'available' },
        { time: '15:00', event: 'Club Practice', status: 'booked' }
      ],
      [],
      [
        { time: '08:00', event: 'Morning Practice', status: 'booked' },
        { time: '12:00', event: 'Available', status: 'available' }
      ]
    ];

    return schedules[hallId % schedules.length] || [];
  }
}