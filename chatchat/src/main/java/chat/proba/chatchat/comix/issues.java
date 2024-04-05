package chat.proba.chatchat.comix;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

// Document annotation to specify MongoDB collection
@Document(collection="comic_collection")
// Lombok for generating getters, setters, constructors, and toString method
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class issues {
    // Fields representing issue properties
    private int issueNumber;
    private String title;
    private String link;
}
