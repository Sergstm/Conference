package serg.core.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import serg.core.models.ConfRoom;

@Repository
public interface ConfRoomRepository extends MongoRepository<ConfRoom, String> {
}
