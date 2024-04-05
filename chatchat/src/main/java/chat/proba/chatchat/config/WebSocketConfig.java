package chat.proba.chatchat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // Configuring WebSocket endpoints for STOMP communication
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();

    }
    // Configuring message broker for message handling
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Configuring prefixes for destination-based message handling
        registry.setApplicationDestinationPrefixes("/app");
        // Enabling simple broker for broadcasting messages to clients
        registry.enableSimpleBroker("/chatroom","/user");
        // Setting prefix for user-specific destinations
        registry.setUserDestinationPrefix("/user");

    }


}
