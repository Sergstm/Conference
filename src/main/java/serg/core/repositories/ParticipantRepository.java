package serg.core.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import serg.core.models.Participant;

@Repository
public interface ParticipantRepository extends MongoRepository<Participant, String> {
    Participant getParticipantById(String id);
}
