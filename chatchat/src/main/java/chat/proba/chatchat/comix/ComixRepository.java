package chat.proba.chatchat.comix;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

// Repository interface for interacting with MongoDB for Comix entities
@Repository
public interface ComixRepository extends MongoRepository<Comix, ObjectId> {
    // Method to find a comic by its title
    Optional<Comix> findComicByTitle(String title);
}
