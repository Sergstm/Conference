package serg.core.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import serg.core.models.Conference;

@Repository
public interface ConferenceRepository extends MongoRepository<Conference, String> {
    Conference getConferenceByName(String name);
}
