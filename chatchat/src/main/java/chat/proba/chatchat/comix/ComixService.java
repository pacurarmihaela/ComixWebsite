package chat.proba.chatchat.comix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Service class for handling comic-related operations
@Service
public class ComixService {
    // Autowiring ComixRepository for database interaction
    @Autowired
    private ComixRepository comicRepository;
    // Method to retrieve all comics
    public List<Comix> allComic(){
        return comicRepository.findAll();
    }
    // Method to retrieve a single comic by its title
    public Optional<Comix> singleComic(String title){
        return comicRepository.findComicByTitle(title);
    }
    // Method to retrieve a single issue of a comic by its title and issue number
    public Optional<issues> singleIssue(String title, int issueNumber){
        // Retrieve the comic by title
        Optional<Comix> optionalComic = comicRepository.findComicByTitle(title);

        if(optionalComic.isPresent()){
            Comix comic = optionalComic.get();
            // Filter issues of the comic by issue number
            return comic.getIssues().stream()
                    .filter(issue -> issue.getIssueNumber()==issueNumber)
                    .findFirst();
        }
        return Optional.empty();
    }

}

