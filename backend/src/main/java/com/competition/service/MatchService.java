package com.competition.service;

import com.competition.entity.Match;
import com.competition.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {
    
    @Autowired
    private MatchRepository matchRepository;
    
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }
    
    public Match getMatchById(Long id) {
        return matchRepository.findById(id).orElse(null);
    }
    
    public List<Match> getMatchesByCompetition(Long competitionId) {
        return matchRepository.findByCompetitionId(competitionId);
    }
}