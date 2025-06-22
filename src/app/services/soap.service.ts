import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Competition, Match, Club } from '../models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class SoapService {
  private soapUrl = 'http://localhost:8083/ws';

  constructor(private http: HttpClient) {}

  private createSoapEnvelope(body: string): string {
    return `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" 
                     xmlns:tns="http://competition.com/schemas">
        <soap:Header/>
        <soap:Body>
          ${body}
        </soap:Body>
      </soap:Envelope>`;
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': ''
      }),
      responseType: 'text' as 'text'
    };
  }

  getCompetitions(): Observable<Competition[]> {
    const soapBody = '<tns:getCompetitionsRequest/>';
    const soapEnvelope = this.createSoapEnvelope(soapBody);

    return this.http.post(this.soapUrl, soapEnvelope, this.getHttpOptions()).pipe(
      map(response => this.parseCompetitionsResponse(response))
    );
  }

  createCompetition(name: string): Observable<Competition> {
    const soapBody = `<tns:createCompetitionRequest>
                        <tns:name>${name}</tns:name>
                      </tns:createCompetitionRequest>`;
    const soapEnvelope = this.createSoapEnvelope(soapBody);

    return this.http.post(this.soapUrl, soapEnvelope, this.getHttpOptions()).pipe(
      map(response => this.parseCompetitionResponse(response))
    );
  }

  getMatches(): Observable<Match[]> {
    const soapBody = '<tns:getMatchesRequest/>';
    const soapEnvelope = this.createSoapEnvelope(soapBody);

    return this.http.post(this.soapUrl, soapEnvelope, this.getHttpOptions()).pipe(
      map(response => this.parseMatchesResponse(response))
    );
  }

  getClubs(): Observable<Club[]> {
    const soapBody = '<tns:getClubsRequest/>';
    const soapEnvelope = this.createSoapEnvelope(soapBody);

    return this.http.post(this.soapUrl, soapEnvelope, this.getHttpOptions()).pipe(
      map(response => this.parseClubsResponse(response))
    );
  }

  private parseCompetitionsResponse(response: string): Competition[] {
    // Simple XML parsing - in production, use a proper XML parser
    const competitions: Competition[] = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    const competitionNodes = xmlDoc.getElementsByTagName('competition');

    for (let i = 0; i < competitionNodes.length; i++) {
      const node = competitionNodes[i];
      competitions.push({
        id: parseInt(this.getNodeValue(node, 'id')),
        name: this.getNodeValue(node, 'name'),
        createdAt: this.getNodeValue(node, 'createdAt'),
        updatedAt: this.getNodeValue(node, 'updatedAt')
      });
    }

    return competitions;
  }

  private parseCompetitionResponse(response: string): Competition {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    const competitionNode = xmlDoc.getElementsByTagName('competition')[0];

    return {
      id: parseInt(this.getNodeValue(competitionNode, 'id')),
      name: this.getNodeValue(competitionNode, 'name'),
      createdAt: this.getNodeValue(competitionNode, 'createdAt'),
      updatedAt: this.getNodeValue(competitionNode, 'updatedAt')
    };
  }

  private parseMatchesResponse(response: string): Match[] {
    const matches: Match[] = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    const matchNodes = xmlDoc.getElementsByTagName('match');

    for (let i = 0; i < matchNodes.length; i++) {
      const node = matchNodes[i];
      matches.push({
        id: parseInt(this.getNodeValue(node, 'id')),
        competitionId: parseInt(this.getNodeValue(node, 'competitionId')),
        club1Id: parseInt(this.getNodeValue(node, 'club1Id')),
        club2Id: parseInt(this.getNodeValue(node, 'club2Id')),
        score1: this.getNodeValue(node, 'score1') ? parseInt(this.getNodeValue(node, 'score1')) : undefined,
        score2: this.getNodeValue(node, 'score2') ? parseInt(this.getNodeValue(node, 'score2')) : undefined,
        createdAt: this.getNodeValue(node, 'createdAt'),
        updatedAt: this.getNodeValue(node, 'updatedAt')
      });
    }

    return matches;
  }

  private parseClubsResponse(response: string): Club[] {
    const clubs: Club[] = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    const clubNodes = xmlDoc.getElementsByTagName('club');

    for (let i = 0; i < clubNodes.length; i++) {
      const node = clubNodes[i];
      clubs.push({
        id: parseInt(this.getNodeValue(node, 'id')),
        name: this.getNodeValue(node, 'name'),
        address: this.getNodeValue(node, 'address'),
        contactMail: this.getNodeValue(node, 'contactMail'),
        contactTel: this.getNodeValue(node, 'contactTel'),
        createdAt: this.getNodeValue(node, 'createdAt'),
        updatedAt: this.getNodeValue(node, 'updatedAt')
      });
    }

    return clubs;
  }

  private getNodeValue(parent: Element, tagName: string): string {
    const node = parent.getElementsByTagName(tagName)[0];
    return node ? node.textContent || '' : '';
  }
}