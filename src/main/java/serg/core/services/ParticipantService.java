package serg.core.services;

import org.springframework.stereotype.Service;
import serg.core.models.Conference;
import serg.core.models.Participant;
import serg.core.repositories.ParticipantRepository;

import java.util.List;

@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    public String addParticipant(Participant participant) {
        participantRepository.save(participant);
        return "saved";
    }

    public List<Participant> allParticipants() {
        return participantRepository.findAll();
    }

    public Participant getParticipant(String id) {
        return participantRepository.getParticipantById(id);
    }

    public String putParticipant(Participant participant) {
        Participant part = getParticipant(participant.getId());
        participantRepository.save(part);
        return "Participant " + part.getId() + " updated";
    }

    public String delParticipant(String id) {
        participantRepository.deleteById(id);
        return "Participant " + id + " deleted";
    }
}
