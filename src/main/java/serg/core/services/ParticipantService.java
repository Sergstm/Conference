package serg.core.services;

import org.springframework.stereotype.Service;
import serg.core.models.Participant;
import serg.core.repositories.ParticipantRepository;

import java.util.List;

@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    public String addParticipant (Participant participant) {
        participantRepository.save(participant);
        return "participant saved";
    }

    public List<Participant> allParticipants () {
        return participantRepository.findAll();
    }
}
