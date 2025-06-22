package com.competition.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "competitions_id")
    private Competition competition;
    
    @ManyToOne
    @JoinColumn(name = "club1_id")
    private Club club1;
    
    @ManyToOne
    @JoinColumn(name = "club2_id")
    private Club club2;
    
    @ManyToOne
    @JoinColumn(name = "players11_id")
    private Player player11;
    
    @ManyToOne
    @JoinColumn(name = "players12_id")
    private Player player12;
    
    @ManyToOne
    @JoinColumn(name = "players21_id")
    private Player player21;
    
    @ManyToOne
    @JoinColumn(name = "players22_id")
    private Player player22;
    
    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;
    
    private Integer score1;
    private Integer score2;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    private List<Set> sets;
    
    // Constructors, getters and setters
    public Match() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Competition getCompetition() { return competition; }
    public void setCompetition(Competition competition) { this.competition = competition; }
    
    public Club getClub1() { return club1; }
    public void setClub1(Club club1) { this.club1 = club1; }
    
    public Club getClub2() { return club2; }
    public void setClub2(Club club2) { this.club2 = club2; }
    
    public Player getPlayer11() { return player11; }
    public void setPlayer11(Player player11) { this.player11 = player11; }
    
    public Player getPlayer12() { return player12; }
    public void setPlayer12(Player player12) { this.player12 = player12; }
    
    public Player getPlayer21() { return player21; }
    public void setPlayer21(Player player21) { this.player21 = player21; }
    
    public Player getPlayer22() { return player22; }
    public void setPlayer22(Player player22) { this.player22 = player22; }
    
    public Hall getHall() { return hall; }
    public void setHall(Hall hall) { this.hall = hall; }
    
    public Integer getScore1() { return score1; }
    public void setScore1(Integer score1) { this.score1 = score1; }
    
    public Integer getScore2() { return score2; }
    public void setScore2(Integer score2) { this.score2 = score2; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public List<Set> getSets() { return sets; }
    public void setSets(List<Set> sets) { this.sets = sets; }
}