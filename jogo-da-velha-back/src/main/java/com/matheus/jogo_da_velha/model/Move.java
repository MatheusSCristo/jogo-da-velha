package com.matheus.jogo_da_velha.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Move {
    private List<List<Integer>> move=new ArrayList<>();
    private String nickname;
}
