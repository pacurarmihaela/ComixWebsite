package chat.proba.chatchat.comix;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

// Lombok for generating getters, setters, constructors, and toString method
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
// Document annotation to specify MongoDB collection
@Document(collection = "comic_collection")
public class Comix {
    // MongoDB document ID field
    @Id
    private ObjectId id;
    // Fields representing comic properties
    private String title;
    private String publisher;
    private String author;
    private List<String> genre;
    private String poster;
    private List<issues> issues;
    private List<soundtrack> soundtrack;
    private String backdrop;
    private String about;



}
