package serg.core.services;

import org.springframework.stereotype.Service;
import serg.core.models.ConfRoom;
import serg.core.repositories.ConfRoomRepository;

import java.util.List;

@Service
public class ConfRoomService {

    private final ConfRoomRepository confRoomRepository;

    public ConfRoomService(ConfRoomRepository confRoomRepository) {
        this.confRoomRepository = confRoomRepository;
    }

    public String addConfRoom(ConfRoom confRoom) {
        confRoomRepository.save(confRoom);
        return "saved";
    }

    public List<ConfRoom> allConfRooms() {
        return confRoomRepository.findAll();
    }

    public ConfRoom getConfRoom(String id) {
        return confRoomRepository.getConfRoomById(id);
    }

    public String putConfRoom(ConfRoom confRoom) {
        ConfRoom confR = getConfRoom(confRoom.getId());
        confRoomRepository.save(confR);
        return "Conference room " + confR.getId() + " updated";
    }

    public String delConfRoom(String id) {
        confRoomRepository.deleteById(id);
        return "Conference room " + id + " deleted";
    }
}
