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
        return "conference room saved";
    }

    public List<ConfRoom> allConfRooms() {
        return confRoomRepository.findAll();
    }
}
