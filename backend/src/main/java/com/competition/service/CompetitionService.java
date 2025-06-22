package com.competition.service;

import com.competition.entity.Competition;
import com.competition.repository.CompetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CompetitionService {
    
    @Autowired
    private CompetitionRepository competitionRepository;
    
    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }
    
    public Competition createCompetition(String name) {
        Competition competition = new Competition();
        competition.setName(name);
        competition.setCreatedAt(LocalDateTime.now());
        competition.setUpdatedAt(LocalDateTime.now());
        return competitionRepository.save(competition);
    }
    
    public Competition getCompetitionById(Long id) {
        return competitionRepository.findById(id).orElse(null);
    }
}