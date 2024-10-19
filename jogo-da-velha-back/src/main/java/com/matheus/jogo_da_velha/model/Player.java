package com.matheus.jogo_da_velha.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Player {

    private String nickname;
    private Type type;
    private Integer simbol;


}
