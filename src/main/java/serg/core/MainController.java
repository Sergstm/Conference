package serg.core;

import org.springframework.web.bind.annotation.*;
import serg.core.models.ConfRoom;
import serg.core.models.Conference;
import serg.core.models.Participant;
import serg.core.services.ConfRoomService;
import serg.core.services.ConferenceService;
import serg.core.services.ParticipantService;

import java.util.List;

@CrossOrigin
@RestController
public class MainController {

    private final ConferenceService conferenceService;
    private final ConfRoomService confRoomService;
    private final ParticipantService participantService;

    public MainController(ConferenceService conferenceService, ConfRoomService confRoomService,
                          ParticipantService participantService) {
        this.conferenceService = conferenceService;
        this.confRoomService = confRoomService;
        this.participantService = participantService;
    }

    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/addConference")
    public String addConference(@RequestBody Conference conference) {
        return conferenceService.addConference(conference);
    }

    @GetMapping("/allConferences")
    public List<Conference> allConferences() {
        return conferenceService.allConferences();
    }

    @PostMapping("/addConfRoom")
    public String addConfRoom(@RequestBody ConfRoom confRoom) {
        return confRoomService.addConfRoom(confRoom);
    }

    @GetMapping("/allConfRooms")
    public List<ConfRoom> allConfRooms() {
        return confRoomService.allConfRooms();
    }

    @PostMapping("/addParticipant")
    public String addParticipant(@RequestBody Participant participant) {
        return participantService.addParticipant(participant);
    }

    @GetMapping("/allParticipants")
    public List<Participant> allParticipants() {
        return participantService.allParticipants();
    }
}
