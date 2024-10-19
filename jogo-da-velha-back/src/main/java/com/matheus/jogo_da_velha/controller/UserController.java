package com.matheus.jogo_da_velha.controller;

import com.matheus.jogo_da_velha.model.Player;
import org.apache.catalina.User;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController {
    private List<Player> list = new ArrayList<>();


    @MessageMapping("endGame")
    public void endGame(){
        list=new ArrayList<>();
    }


    @MessageMapping("user")
    @SendTo("/topic/public/user")
    public Player addPlayer(@Payload Player player, SimpMessageHeaderAccessor headerAccessor) {
        if (list.size() < 2) {
            list.add(player);
            headerAccessor.getSessionAttributes().put("username", player.getNickname());
            player.setSimbol(list.size());
            return player;
        }
        return null;
    }

    @MessageMapping("checkUser")
    @SendTo("/topic/public/user/check")
    public List<Player> checkUser(){
        return list;
    }





}
