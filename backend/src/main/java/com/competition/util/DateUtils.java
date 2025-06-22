package com.competition.util;

import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.time.LocalDateTime;
import java.util.GregorianCalendar;

public class DateUtils {
    public static XMLGregorianCalendar toXMLGregorianCalendar(LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return null;
        }
        try {
            GregorianCalendar gCalendar = GregorianCalendar.from(
                localDateTime.atZone(java.time.ZoneId.systemDefault()));
            return DatatypeFactory.newInstance().newXMLGregorianCalendar(gCalendar);
        } catch (Exception e) {
            throw new RuntimeException("Error converting LocalDateTime to XMLGregorianCalendar", e);
        }
    }
}