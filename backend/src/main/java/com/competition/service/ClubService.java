package com.competition.service;

import com.competition.entity.Club;
import com.competition.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClubService {
    
    @Autowired
    private ClubRepository clubRepository;
    
    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }
    
    public Club createClub(String name, String address, String contactMail, String contactTel) {
        Club club = new Club();
        club.setName(name);
        club.setAddress(address);
        club.setContactMail(contactMail);
        club.setContactTel(contactTel);
        club.setCreatedAt(LocalDateTime.now());
        club.setUpdatedAt(LocalDateTime.now());
        return clubRepository.save(club);
    }
    
    public Club getClubById(Long id) {
        return clubRepository.findById(id).orElse(null);
    }
}