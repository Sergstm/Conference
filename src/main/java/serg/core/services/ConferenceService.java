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
        return "conference saved";
    }

    public Conference getConference (String name) {
        return conferenceRepository.getConferenceByName(name);
    }

    public List<Conference> allConferences () {
        return conferenceRepository.findAll();
    }
}
