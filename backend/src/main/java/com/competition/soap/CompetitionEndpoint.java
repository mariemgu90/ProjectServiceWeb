package com.competition.soap;

import com.competition.util.DateUtils;
import com.competition.schemas.*;
import com.competition.service.CompetitionService;
import com.competition.service.MatchService;
import com.competition.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class CompetitionEndpoint {
    private static final String NAMESPACE_URI = "http://competition.com/schemas";
    
    @Autowired
    private CompetitionService competitionService;
    
    @Autowired
    private MatchService matchService;
    
    @Autowired
    private ClubService clubService;
    
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getCompetitionsRequest")
    @ResponsePayload
    public GetCompetitionsResponse getCompetitions(@RequestPayload GetCompetitionsRequest request) {
        GetCompetitionsResponse response = new GetCompetitionsResponse();
        competitionService.getAllCompetitions().forEach(comp -> {
            Competition competition = new Competition();
            competition.setId(comp.getId());
            competition.setName(comp.getName());
            competition.setCreatedAt(DateUtils.toXMLGregorianCalendar(comp.getCreatedAt()));
            competition.setUpdatedAt(DateUtils.toXMLGregorianCalendar(comp.getUpdatedAt()));
            response.getCompetition().add(competition);
        });
        return response;
    }
    
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "createCompetitionRequest")
    @ResponsePayload
    public CreateCompetitionResponse createCompetition(@RequestPayload CreateCompetitionRequest request) {
        com.competition.entity.Competition newComp = competitionService.createCompetition(request.getName());
        
        CreateCompetitionResponse response = new CreateCompetitionResponse();
        Competition competition = new Competition();
        competition.setId(newComp.getId());
        competition.setName(newComp.getName());
        competition.setCreatedAt(DateUtils.toXMLGregorianCalendar(newComp.getCreatedAt()));
        competition.setUpdatedAt(DateUtils.toXMLGregorianCalendar(newComp.getUpdatedAt()));
        response.setCompetition(competition);
        
        return response;
    }
    
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getMatchesRequest")
    @ResponsePayload
    public GetMatchesResponse getMatches(@RequestPayload GetMatchesRequest request) {
        GetMatchesResponse response = new GetMatchesResponse();
        matchService.getAllMatches().forEach(match -> {
            Match matchData = new Match();
            matchData.setId(match.getId());
            matchData.setCompetitionId(match.getCompetition().getId());
            matchData.setClub1Id(match.getClub1().getId());
            matchData.setClub2Id(match.getClub2().getId());
            if (match.getScore1() != null) matchData.setScore1(match.getScore1());
            if (match.getScore2() != null) matchData.setScore2(match.getScore2());
            matchData.setCreatedAt(DateUtils.toXMLGregorianCalendar(match.getCreatedAt()));
            matchData.setUpdatedAt(DateUtils.toXMLGregorianCalendar(match.getUpdatedAt()));
            response.getMatch().add(matchData);
        });
        return response;
    }
    
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getClubsRequest")
    @ResponsePayload
    public GetClubsResponse getClubs(@RequestPayload GetClubsRequest request) {
        GetClubsResponse response = new GetClubsResponse();
        clubService.getAllClubs().forEach(club -> {
            Club clubData = new Club();
            clubData.setId(club.getId());
            clubData.setName(club.getName());
            clubData.setAddress(club.getAddress());
            clubData.setContactMail(club.getContactMail());
            clubData.setContactTel(club.getContactTel());
            clubData.setCreatedAt(DateUtils.toXMLGregorianCalendar(club.getCreatedAt()));
            clubData.setUpdatedAt(DateUtils.toXMLGregorianCalendar(club.getUpdatedAt()));
            response.getClub().add(clubData);
        });
        return response;
    }
}