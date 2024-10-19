package com.matheus.jogo_da_velha.infra.component;

import com.matheus.jogo_da_velha.controller.UserController;
import com.matheus.jogo_da_velha.model.Player;
import com.matheus.jogo_da_velha.model.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messageTemplate;

    @Autowired
    private UserController userController;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            Player player = Player.builder()
                    .nickname(username)
                    .type(Type.LEAVE).build();
            userController.endGame();
            messageTemplate.convertAndSend("/topic/public/left", player);

        }
    }

}
