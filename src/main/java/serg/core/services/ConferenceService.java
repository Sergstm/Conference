package serg.core.services;

import org.springframework.stereotype.Service;
import serg.core.models.Conference;
import serg.core.repositories.ConferenceRepository;

import java.util.List;

@Service
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;

    public ConferenceService(ConferenceRepository conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }

    public String addConference (Conference conference) {
        conferenceRepository.save(conference);
        return "Conference saved";
    }

    public Conference getConference (String id) {
        return conferenceRepository.getConferenceById(id);
    }

    public List<Conference> allConferences () {
        return conferenceRepository.findAll();
    }

    public String putConference (Conference conference) {
        Conference conf = getConference(conference.getId());
        conferenceRepository.save(conference);
        return "Conference " + conf.getId() + " updated";
    }

    public String delConference (String id) {
        conferenceRepository.deleteById(id);
        return "Conference " + id + " deleted";
    }
}
