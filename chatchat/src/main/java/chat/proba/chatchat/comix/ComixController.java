package chat.proba.chatchat.comix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// Cross-origin resource sharing allowed for all origins
@CrossOrigin(origins="*")
// Controller class for handling comic-related HTTP requests
@RestController
@RequestMapping("/api/v1/comix")
public class ComixController {
    // Autowiring ComixService for handling comic-related operations
    @Autowired
    private ComixService comicService;
    // Endpoint to retrieve all comics
    @GetMapping
    public ResponseEntity<List<Comix>> getAllComic(){
        return new ResponseEntity<List<Comix>>(comicService.allComic(), HttpStatus.OK);
    }
    // Endpoint to retrieve a single comic by its title
    @GetMapping("/{title}")
    public ResponseEntity<Optional<Comix>> getSingleComic(@PathVariable String title){
        return new ResponseEntity<Optional<Comix>>(comicService.singleComic(title), HttpStatus.OK);
    }
    // Endpoint to retrieve a single issue of a comic by its title and issue number
    @GetMapping("/{title}/issues/{issueNumber}")
    public ResponseEntity<Optional<issues>> getSingleIssue(@PathVariable String title, @PathVariable int issueNumber){
        return new ResponseEntity<Optional<issues> >(comicService.singleIssue(title, issueNumber), HttpStatus.OK);
    }

}

