package serg.core.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "conferences")
public class Conference {

    @Id
    private String id;
    private String name;
    private LocalDateTime dateTime;
    private List<ConfRoom> confRooms = new ArrayList<>();
    private List<Participant> participants = new ArrayList<>();

    public Conference() {
    }

    public Conference(String name, LocalDateTime dateTime,
                      List<ConfRoom> confRooms, List<Participant> participants) {
        this.name = name;
        this.dateTime = dateTime;
        this.confRooms = confRooms;
        this.participants = participants;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public List<ConfRoom> getConfRooms() {
        return confRooms;
    }

    public void setConfRooms(List<ConfRoom> confRooms) {
        this.confRooms = confRooms;
    }

    public List<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Participant> participants) {
        this.participants = participants;
    }

    @Override
    public String toString() {
        return "Conference{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", dateTime=" + dateTime +
                ", confRooms=" + confRooms +
                ", participants=" + participants +
                '}';
    }
}
