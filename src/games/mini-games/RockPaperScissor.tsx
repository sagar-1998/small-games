import React, { useState } from 'react';
import RPSButton from '../components/RPSButton';

const RockPaperScissor = () => {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState<string | undefined>('');
  const [result, setResult] = useState<string | undefined>('');

  const decideResult = (
    userSelection: string | undefined,
    computerSelection: string | undefined
  ) => {
    if (userSelection === 'Rock' && computerSelection === 'Scissor') {
      setResult('You Win!');
    } else if (userSelection === 'Rock' && computerSelection === 'Paper') {
      setResult('You lose!');
    } else if (userSelection === 'Paper' && computerSelection === 'Rock') {
      setResult('You win!');
    } else if (userSelection === 'Paper' && computerSelection === 'Scissor') {
      setResult('You lose!');
    } else if (userSelection === 'Scissor' && computerSelection === 'Paper') {
      setResult('You win!');
    } else if (userSelection === 'Scissor' && computerSelection === 'Rock') {
      setResult('You lose!');
    } else {
      setResult('Match Draw!');
    }
  };

  const handleChoice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const choicesArray = ['Rock', 'Paper', 'Scissor'];
    const randomChoice = Math.floor(Math.random() * 3);
    const userSelection = e.currentTarget.textContent;
    const computerSelection = choicesArray.find(
      (choice, i) => randomChoice === i
    );
    setUserChoice(userSelection);
    setComputerChoice(computerSelection);
    decideResult(userSelection, computerSelection);
  };

  const resetStates = () => {
    setUserChoice('');
    setComputerChoice('');
    setResult('');
  }
  return (
    <div>
      <h3 className='text-lg flex justify-between'>
        <span>{'Your Choice: '} </span> <span> {userChoice} </span>
      </h3>
      <h3 className='text-lg flex justify-between'>
        <span>{"Computer's Choice: "} </span> <span>{computerChoice} </span>
         
      </h3>
      <h3 className='text-lg flex justify-between'>
        <span>{'Result: '} </span> <span>  {result} </span>
        
       
      </h3>
      <div className="flex my-3"> 
        <RPSButton btnClass={"py-2 px-5 shadow text-black bg-slate-300 my-2 mr-2 rounded-xl"} btnText='Rock' handleButtonClick={handleChoice} />
        <RPSButton btnClass={"py-2 px-5 shadow text-black bg-white my-2 mr-2 rounded-xl"} btnText='Paper' handleButtonClick={ handleChoice} />
        <RPSButton btnClass={"py-2 px-5 shadow text-black bg-gradient-to-t from-gray-300 my-2 mr-2 rounded-xl"} btnText='Scissor' handleButtonClick={ handleChoice} />
        
      </div>
        <RPSButton btnClass={"py-1 px-3 shadow text-black my-2 mr-2 rounded-xl"} btnText='Reset' handleButtonClick={resetStates} />
      
    </div>
  );
};

export default RockPaperScissor;
