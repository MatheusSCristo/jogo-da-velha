"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { checkEnd } from "./util/checkEnd";
import { checkWin } from "./util/checkWin";

type UserType = { nickname: ""; simbol: number };

const Home = () => {
  const stompClient = useStompClient();
  const [nickname, setNickname] = useState("");
  const [moves, setMoves] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [otherUser, setOtherUser] = useState<null | UserType>(null);
  const [user, setUser] = useState<null | UserType>(null);
  const [winner, setWinner] = useState<string | undefined>("");
  const [leftMatch, setLeftMatch] = useState(false);
  const [turn, setTurn] = useState(1);

  useSubscription("/topic/public/user", (message) => {
    const user = JSON.parse(message.body);
    if (user.type == "JOIN") {
      if (user.nickname == nickname) {
        setUser({ nickname: user.nickname, simbol: user.simbol });
      } else {
        setOtherUser({ nickname: user.nickname, simbol: user.simbol });
      }
    }
  });

  useSubscription("/topic/public/move", (message) => {
    const move = JSON.parse(message.body).move;
    setMoves(move);
    setTurn((prevState) => (prevState === 1 ? 2 : 1));
  });

  useSubscription("/topic/public/left", (message) => {
    const user = JSON.parse(message.body);
    if ((user.type = "LEAVE")) {
      setLeftMatch(true);
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
  });

  useSubscription("/topic/public/user/check", (message) => {
    const users = JSON.parse(message.body);
    if (users[0].nickname !== nickname)
      setOtherUser({ nickname: users[0].nickname, simbol: users[0].simbol });
  });

  useEffect(() => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/checkUser",
      });
    }
  }, [stompClient]);

  const handleMove = (tmp: number[][]) => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/move",
        body: JSON.stringify({ move: tmp, nickname }),
      });
    }
  };

  const resetGame = () => {
    setOtherUser(null);
    setUser(null);
    setLeftMatch(false);
    handleMove([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    if (stompClient) {
      stompClient.publish({
        destination: "/app/endGame",
      });
    }
  };

  useEffect(() => {
    const win = checkWin(moves);
    if (win) {
      if (win == user?.simbol) {
        setWinner(user.nickname);
      } else {
        setWinner(otherUser?.nickname);
      }
      setTimeout(() => {
        setWinner("");
        resetGame();
      }, 2000);
      return;
    }
    const end = checkEnd(moves);
    if (end) {
      setWinner("Empate");
      setTimeout(() => {
        setWinner("");
        resetGame();
      }, 2000);
    }
  }, [moves]);

  const enterUser = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/user",
        body: JSON.stringify({ nickname, type: "JOIN", simbol: 0 }),
      });
    }
  };

  const handleClick = (i: number, j: number) => {
    if (user) {
      const tmp = [...moves];
      if (tmp[i][j] != 0 || turn !== user.simbol) return;
      tmp[i][j] = user.simbol;
      handleMove(tmp);
    }
  };

  return (
    <div className=" relative w-screen h-screen gap-5 flex flex-col justify-center items-center bg-[#1F2937]">
      {winner && (
        <div className="w-full h-full bg-[#ededed7a] absolute z-20 flex items-center justify-center">
          <div className="flex items-center flex-col p-10 border border-black bg-white w-[600px] rounded-lg gap-2 text-[3em] text-center">
            <h1>
              {winner.length > 0 && winner === user?.nickname
                ? "Você ganhou, Parabéns!"
                : winner==="Empate" ? "Empate" : "Você perdeu!"}
            </h1>
          </div>
        </div>
      )}
      {user && !otherUser && (
        <div className="w-full h-full bg-[#ededed7a] absolute z-20 flex items-center justify-center">
          <div className="flex items-center flex-col p-10 border border-black bg-white w-[600px] rounded-lg gap-2 text-[3em] text-center">
            <h1>Aguardando seu adversário!!!</h1>
          </div>
        </div>
      )}
      {leftMatch && (
        <div className="w-full h-full bg-[#ededed7a] absolute z-20 flex items-center justify-center">
          <div className="flex items-center flex-col p-10 border border-black bg-white w-[600px] rounded-lg gap-2 text-[3em] text-center">
            <h1>Seu adversário desistiu!!!</h1>
          </div>
        </div>
      )}
      {!user && (
        <div className="w-full h-full bg-[#ededed7a] absolute z-10 flex items-center justify-center">
          <div className="flex items-center flex-col p-10 border border-black bg-white w-[600px] rounded-lg gap-2">
            <h1 className="text-[2em]">Entre com um nickname</h1>
            <input
              type="text"
              placeholder="Nickname"
              className="bg-white border-black border w-3/4 py-2 px-1 rounded text-2xl"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button
              className="rounded border-black border px-5 py-2 text-2xl"
              onClick={enterUser}
            >
              Entrar
            </button>
          </div>
        </div>
      )}
      <h1 className="text-[2em] text-white">JOGO DA VELHA</h1>
      <div className="relative flex items-center justify-center">
        <Image
          src="/bg.png"
          width={800}
          height={800}
          alt=""
          className="object-cover opacity-[0.2]"
        />
        <div className="absolute top-5 left-5 text-[3em] text-white">
          {user && otherUser && (
            <>
              <h2 className={`${turn == user.simbol && "text-[#f75f5f]"}`}>
                Você: {user?.nickname} -{" "}
                <span className="text-green-500">
                  {user?.simbol == 1 ? "X" : "O"}
                </span>
              </h2>
              <h2 className={`${turn == otherUser.simbol && "text-[#f75f5f]"}`}>
                Adversário: {otherUser?.nickname} -{" "}
                <span className="text-red-500">
                  {otherUser?.simbol == 1 ? "X" : "O"}
                </span>
              </h2>
            </>
          )}
        </div>
        <div
          className={`bg-yellow-500 w-3/5 h-3/5 absolute ${
            turn !== user?.simbol && "opacity-[0.8]"
          }`}
        >
          {moves.map((row, i) => (
            <div className="flex h-1/3" key={i}>
              {row.map((col, j) => (
                <div
                  onClick={() => handleClick(i, j)}
                  className={`cursor-pointer w-1/3 h-full  ${
                    j == 0 ? "border-r-[1px]" : j != 1 ? "border-l-[1px]" : ""
                  } ${
                    i != 2 && "border-b-[1px]"
                  } border-black text-[5em] flex items-center justify-center p-3`}
                  key={j}
                >
                  {col == 1 ? "X" : col == 2 ? "O" : ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
