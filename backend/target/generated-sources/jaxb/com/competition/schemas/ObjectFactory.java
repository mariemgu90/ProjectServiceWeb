//
// Ce fichier a été généré par Eclipse Implementation of JAXB, v3.0.0 
// Voir https://eclipse-ee4j.github.io/jaxb-ri 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2025.06.22 à 02:20:51 AM CEST 
//


package com.competition.schemas;

import jakarta.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.competition.schemas package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.competition.schemas
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetCompetitionsRequest }
     * 
     */
    public GetCompetitionsRequest createGetCompetitionsRequest() {
        return new GetCompetitionsRequest();
    }

    /**
     * Create an instance of {@link GetCompetitionsResponse }
     * 
     */
    public GetCompetitionsResponse createGetCompetitionsResponse() {
        return new GetCompetitionsResponse();
    }

    /**
     * Create an instance of {@link Competition }
     * 
     */
    public Competition createCompetition() {
        return new Competition();
    }

    /**
     * Create an instance of {@link CreateCompetitionRequest }
     * 
     */
    public CreateCompetitionRequest createCreateCompetitionRequest() {
        return new CreateCompetitionRequest();
    }

    /**
     * Create an instance of {@link CreateCompetitionResponse }
     * 
     */
    public CreateCompetitionResponse createCreateCompetitionResponse() {
        return new CreateCompetitionResponse();
    }

    /**
     * Create an instance of {@link GetMatchesRequest }
     * 
     */
    public GetMatchesRequest createGetMatchesRequest() {
        return new GetMatchesRequest();
    }

    /**
     * Create an instance of {@link GetMatchesResponse }
     * 
     */
    public GetMatchesResponse createGetMatchesResponse() {
        return new GetMatchesResponse();
    }

    /**
     * Create an instance of {@link Match }
     * 
     */
    public Match createMatch() {
        return new Match();
    }

    /**
     * Create an instance of {@link GetClubsRequest }
     * 
     */
    public GetClubsRequest createGetClubsRequest() {
        return new GetClubsRequest();
    }

    /**
     * Create an instance of {@link GetClubsResponse }
     * 
     */
    public GetClubsResponse createGetClubsResponse() {
        return new GetClubsResponse();
    }

    /**
     * Create an instance of {@link Club }
     * 
     */
    public Club createClub() {
        return new Club();
    }

}
