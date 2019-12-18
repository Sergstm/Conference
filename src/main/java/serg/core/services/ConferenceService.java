package serg.core.services;

import org.springframework.stereotype.Service;
import serg.core.models.ConfRoom;
import serg.core.models.Conference;
import serg.core.models.Participant;
import serg.core.repositories.ConferenceRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;

    public ConferenceService(ConferenceRepository conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }

    public String addConference(Conference conference) {
        conferenceRepository.save(conference);
        return "saved";
    }

    public List<Conference> allConferences() {
        return conferenceRepository.findAll();
    }

    public Conference getConference(String id) {
        return conferenceRepository.getConferenceById(id);
    }

    public String putConference(Conference conference) {
        Conference conf = getConference(conference.getId());
        conferenceRepository.save(conference);
        return "saved";
    }

    public String addRoomToConf(ConfRoom confRoom, String confId) {
        Conference conf = getConference(confId);
        List<ConfRoom> rooms = conf.getConfRooms();
        rooms.add(confRoom);
        conferenceRepository.save(conf);
        return "saved";
    }

    public String addPartToConf(Participant participant, String confId) {
        Conference conf = getConference(confId);
        List<Participant> participants = conf.getParticipants();
        participants.add(participant);
        conferenceRepository.save(conf);
        return "saved";
    }

    public String delRoomFromConf(String roomId, String confId) {
        Conference conf = getConference(confId);
        List<ConfRoom> rooms = conf.getConfRooms();
        List<ConfRoom> collect = rooms.stream()
                .filter(r -> !r.getId().contains(roomId)).collect(Collectors.toList());
        conf.setConfRooms(collect);
        conferenceRepository.save(conf);
        return "saved";
    }

    public String delPartFromConf(String partId, String confId) {
        Conference conf = getConference(confId);
        List<Participant> parts = conf.getParticipants();
        List<Participant> collect = parts.stream()
                .filter(p -> !p.getId().contains(partId)).collect(Collectors.toList());
        conf.setParticipants(collect);
        conferenceRepository.save(conf);
        return "saved";
    }

    public String delConference(String id) {
        conferenceRepository.deleteById(id);
        return "saved";
    }
}
