import { useEffect, useState } from 'react';
import * as C from './App.styles';
import StartIcon from  './image/start.png';
import RestartIcon from  './image/refresh.png';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/gridItemType';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';
import { increment } from './helpers/increment';
import { Logo } from './components/Logo';



const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  const [buttonStart, setButtonStart] = useState<string>('Começar');
  const [buttonIcon, setButtonIcon] = useState<string>(StartIcon);




  // useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing) {
          setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // verificar se os opened sao iguais.
  useEffect(() => {
    if(showCount === 2 ) {
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2) {

        if(opened[0].item === opened[1].item) {
          //verificação 1 - se eles são igauis, torna-los permanentes
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
            tmpGrid[i].permanentShow = true;
            tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid)
            setShowCount(0);
          }
        } else {
          // verificação 2 - se eles não são igauis, fecha eles. fecha todo o "shwon" e definir um setTimeout para da um delay para virar o card.
          setTimeout(()=>{
            let tmpGrid = [...gridItems];
            for(let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
          setGridItems(tmpGrid)
          setShowCount(0);
          }, 1000);
        }
        

        setMoveCount(increment);
      }
    }
  }, [showCount, gridItems]);

  //verificar se o jogo terminou
  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShow === true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    setButtonStart('Reiniciar');
    setButtonIcon(RestartIcon);


    // passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    // passo 2 - criar o grid
    // passo 2.1 - criar um grid vazio
    let tempGrid: GridItemType[] = [];
    for(let i = 0; i < (items.length * 2); i++) {
      tempGrid.push({
        item: null, 
        shown: false,
        permanentShow: false
      });
    }
    // passo 2.2 - preencher o grid
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < (items.length); i++) {
        // para proteger de não repetir o msm numero, se coloca o gerador de numero dentro de um while, no caso a variavel pos é definida como -1 pois temos que definir um valor, e qualquer valor do 0 a cima, já faz parte de uma posição do array, ai então não daria certo. 
        let pos = -1;
        while(pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }

    // passo 2.3 - jogar no state
    setGridItems(tempGrid);

    // passo 3 - começar o jogo
    setPlaying(true);
  }


  const handleItemClick = (index: number) => {
    if(playing && index !== null && showCount < 2) {
      let tmpGrid =[...gridItems]; //criando um clone do gridItems pois se modificar diretor não funciona direto, por conta disso é bom usar o clone.

      if(tmpGrid[index].permanentShow === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShowCount( showCount + 1);
      }

      setGridItems(tmpGrid);
    }
  }

  return (
    <C.Container>
        <Logo />
      <C.Info>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label="Movimentos" value={moveCount.toString()}/>
          <Button label={buttonStart} icon={buttonIcon} onClick={resetAndCreateGrid}/>
        </C.InfoArea>
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem 
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />

          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
  }

export default App;