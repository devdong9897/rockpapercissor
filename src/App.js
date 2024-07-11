import { useState } from "react";
import "./App.css";
import Box from "./components/Box";

// 1. 박스 2개 (타이틀, 사진, 결과)
// 2. 가위 바위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5  3,4의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패결과에 따라 테두리 색이 바뀐다. (이기면-초록, 지면-빨강, 비기면-검정)

const choice = {
  rock: {
    name: "Rock",
    img: "https://image.auction.co.kr/itemimage/28/65/8e/28658ea5e6.jpg",
  },
  scissors: {
    name: "Scissors",
    img: "https://img.danawa.com/prod_img/500000/261/156/img/5156261_1.jpg?_v=20171116155341",
  },
  paper: {
    name: "Paper",
    img: "https://cafe24img.poxo.com/kangkd78910/web/product/big/20191118/383d851c932528f52e9aa585c46d8331.jpg",
  },
};
function App() {
  // you 스테이트
  const [userSelect, setUserSelect] = useState(null);
  // 컴퓨터 스테이트
  const [computerSelect, setComputerSelect] = useState(null);
  // 승패 스테이트
  const [result, setResult] = useState("");

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    // 유저가 아이템을 선택할 때 랜덤한 값을 선택하므로 선택하는 play부분에 코드작성
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgment(choice[userChoice], computerChoice));
  };

  const judgment = (user, computer) => {
    console.log("user", user, "computer", computer);

    // user == computer tie
    // user == rock, computer == "scissors" user 이긴거지
    // user == "rock" computer == paper   user 진거지
    // user == scissors computer paper    user 이긴거지
    // user == scissors computer rock     user 진거지
    // user == paper computer rock   user 이긴거지
    // user paper computer scissors user 진거지

    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "Rock")
      return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "win" : "lose";
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); // 객체에 키값만 뽑아서 배열로 만들어주는 함수.
    console.log(itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };
  return (
    <>
      <div className="main">
        <Box title="you" item={userSelect} result={result} />
        <Box title="computer" item={computerSelect} result={result} />
      </div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </>
  );
}

export default App;
