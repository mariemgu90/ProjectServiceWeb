//
// Ce fichier a été généré par Eclipse Implementation of JAXB, v3.0.0 
// Voir https://eclipse-ee4j.github.io/jaxb-ri 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2025.06.22 à 02:20:51 AM CEST 
//


package com.competition.schemas;

import javax.xml.datatype.XMLGregorianCalendar;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlSchemaType;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java pour match complex type.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * 
 * <pre>
 * &lt;complexType name="match"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="competitionId" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="club1Id" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="club2Id" type="{http://www.w3.org/2001/XMLSchema}long"/&gt;
 *         &lt;element name="score1" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="score2" type="{http://www.w3.org/2001/XMLSchema}int" minOccurs="0"/&gt;
 *         &lt;element name="createdAt" type="{http://www.w3.org/2001/XMLSchema}dateTime"/&gt;
 *         &lt;element name="updatedAt" type="{http://www.w3.org/2001/XMLSchema}dateTime"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "match", propOrder = {
    "id",
    "competitionId",
    "club1Id",
    "club2Id",
    "score1",
    "score2",
    "createdAt",
    "updatedAt"
})
public class Match {

    protected long id;
    protected long competitionId;
    protected long club1Id;
    protected long club2Id;
    protected Integer score1;
    protected Integer score2;
    @XmlElement(required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar createdAt;
    @XmlElement(required = true)
    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar updatedAt;

    /**
     * Obtient la valeur de la propriété id.
     * 
     */
    public long getId() {
        return id;
    }

    /**
     * Définit la valeur de la propriété id.
     * 
     */
    public void setId(long value) {
        this.id = value;
    }

    /**
     * Obtient la valeur de la propriété competitionId.
     * 
     */
    public long getCompetitionId() {
        return competitionId;
    }

    /**
     * Définit la valeur de la propriété competitionId.
     * 
     */
    public void setCompetitionId(long value) {
        this.competitionId = value;
    }

    /**
     * Obtient la valeur de la propriété club1Id.
     * 
     */
    public long getClub1Id() {
        return club1Id;
    }

    /**
     * Définit la valeur de la propriété club1Id.
     * 
     */
    public void setClub1Id(long value) {
        this.club1Id = value;
    }

    /**
     * Obtient la valeur de la propriété club2Id.
     * 
     */
    public long getClub2Id() {
        return club2Id;
    }

    /**
     * Définit la valeur de la propriété club2Id.
     * 
     */
    public void setClub2Id(long value) {
        this.club2Id = value;
    }

    /**
     * Obtient la valeur de la propriété score1.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getScore1() {
        return score1;
    }

    /**
     * Définit la valeur de la propriété score1.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setScore1(Integer value) {
        this.score1 = value;
    }

    /**
     * Obtient la valeur de la propriété score2.
     * 
     * @return
     *     possible object is
     *     {@link Integer }
     *     
     */
    public Integer getScore2() {
        return score2;
    }

    /**
     * Définit la valeur de la propriété score2.
     * 
     * @param value
     *     allowed object is
     *     {@link Integer }
     *     
     */
    public void setScore2(Integer value) {
        this.score2 = value;
    }

    /**
     * Obtient la valeur de la propriété createdAt.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getCreatedAt() {
        return createdAt;
    }

    /**
     * Définit la valeur de la propriété createdAt.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setCreatedAt(XMLGregorianCalendar value) {
        this.createdAt = value;
    }

    /**
     * Obtient la valeur de la propriété updatedAt.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getUpdatedAt() {
        return updatedAt;
    }

    /**
     * Définit la valeur de la propriété updatedAt.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setUpdatedAt(XMLGregorianCalendar value) {
        this.updatedAt = value;
    }

}
