package chat.proba.chatchat.comix;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

// Document annotation to specify MongoDB collection
@Document(collection="comic_collection")
// Lombok  for generating getters, setters, constructors, and toString method
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class soundtrack {
    // Fields representing soundtrack properties
    private int songId;
    private String title;
    private String picture;
    private String youtubeLink;
}
