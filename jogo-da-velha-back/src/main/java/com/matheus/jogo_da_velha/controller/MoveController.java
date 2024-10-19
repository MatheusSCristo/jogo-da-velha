package com.matheus.jogo_da_velha.controller;

import com.matheus.jogo_da_velha.model.Move;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MoveController {


    @MessageMapping("move")
    @SendTo("/topic/public/move")
    public Move nextMove(@Payload Move move){
        return move;
    }


}
